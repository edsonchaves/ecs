import {System} from '../../src/index.js';

export class Render extends System{
    constructor(ctx, cW, cH) {
        super();
        this.canvasContext = ctx;
        this.canvasWidth = cW;
        this.canvasHeight = cH;
    }
    execute(entity) {
        if(!this.canExecute(entity)) return;

        let appearance = entity.appearance;
        let position = entity.position;

        if(appearance.shape == 'rectangle') {
            this.drawRectangle(position, appearance); 
        }  else {
            this.drawCircle(position, appearance);
        }
    }
    canExecute(entity) {
        return entity.position && entity.appearance;
    }
    drawCircle(position, appearance) {
        let posX = position.x;
        let posY = position.y;
        let radius = appearance.size / 2;

        posX = posX + radius >= this.canvasWidth ? this.canvasWidth - radius - 1 : posX;
        posY = posY + radius >= this.canvasHeight ? this.canvasHeight - radius - 1 : posY;

        position.x = posX = posX - radius <= 0 ? radius + 1 : posX;
        position.y = posY = posY - radius <= 0 ? radius + 1  : posY;

        this.canvasContext.beginPath();
        this.canvasContext.arc(posX, posY, radius, 0, 2 * Math.PI, false);
        this.canvasContext.fillStyle= appearance.fill;
        this.canvasContext.fill();
        this.canvasContext.lineWidth = 2;
        this.canvasContext.strokeStyle = appearance.stroke;
        this.canvasContext.stroke();  
    }
    drawRectangle(position, appearance) {
        let posX = position.x;
        let posY = position.y;
        let size = appearance.size;

        position.x = posX = posX + size >= this.canvasWidth ? this.canvasWidth - size - 1 : posX;
        position.y = posY = posY + size >= this.canvasHeight ? this.canvasHeight - size - 1 : posY;

        this.canvasContext.beginPath();
        this.canvasContext.rect(posX, posY, size, size);
        this.canvasContext.fillStyle= appearance.fill;
        this.canvasContext.fill();
        this.canvasContext.lineWidth = 2;
        this.canvasContext.strokeStyle = appearance.stroke;
        this.canvasContext.stroke();
    } 
    clearCanvas () {
        this.canvasContext.fillStyle = "#d4d4d4";
        this.canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
}