import {System} from '../../src/index.js';

export class BorderCollision extends System{
    constructor(cW, cH) {
        super();

        this.canvasWidth = cW;
        this.canvasHeight = cH;
    }
    execute(entity) {
        if(!this.canExecute(entity)) return;

        let velocity = entity.velocity;
        let position = entity.position;
        let size = entity.appearance.size;
        let radius = size / 2;

        if(entity.appearance.shape == 'rectangle') {
            if(position.y <=0 || position.y + size >= this.canvasHeight) {
                velocity.y = velocity.y * -1;
            }
            if(position.x <= 0 || position.x + size >= this.canvasWidth) {
                velocity.x = velocity.x * -1;
            }
        } else {
            if(position.y - radius <=0 || position.y + radius >= this.canvasHeight) {
                velocity.y = velocity.y * -1;
            }
            if(position.x - radius <= 0 || position.x + radius >= this.canvasWidth) {
                velocity.x = velocity.x * -1;
            }
        }
    }
    canExecute(entity) {
        return entity.appearance && entity.position && entity.velocity;
    }
}