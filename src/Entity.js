export class Entity {

    constructor() {
        this.id = Math.random();
        this._components = {};

        return new Proxy(this, {
            get(target, name, receiver) {
                if(!Reflect.has(target, name)) {
                    if(target.hasComponent(name)) {
                        return target.getComponent(name);
                    }
                    return undefined;
                }
                return Reflect.get(target, name, receiver);
            }
        })
    }

    /**
     * 
     * @param {Component} component 
     */
    addComponent(component) {
        this._components[component.getName()] = component;
    }

    /**
     * 
     * @param {String} component 
     */
    removeComponent(componentName) {
        this[componentName] = undefined;
    }

    /**
     * 
     * @param {String} componentName 
     */
    getComponent(componentName) {
        return this._components[componentName];
    }

    /**
     * 
     * @param {String} componentName 
     */
     hasComponent(componentName) {
        return !!~Object.keys(this._components).indexOf(componentName);
    }
}