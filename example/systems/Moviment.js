import {System} from '../../src/index.js';

export class Moviment extends System{
    constructor(cW, cH) {
        super();

        this.canvasWidth = cW;
        this.canvasHeight = cH;
    }
    execute(entity, delta) {
        if(!this.canExecute(entity)) return;

        let velocity = entity.velocity;
        let position = entity.position;

        position.x += velocity.x * delta;
        position.y += velocity.y * delta;
    }
    canExecute(entity) {
        return entity.position && entity.velocity;
    }
}