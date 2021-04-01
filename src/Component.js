export class Component{
    constructor(props) {
        Object.assign(this, props);
    }
    getName() {
        return this.constructor.name.toLowerCase();
    }
}