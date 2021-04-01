import {Entity} from '../src/index.js';
import * as Components from './components/index.js';
import * as Systems from './systems/index.js';



let canvas = document.getElementById('gameDisplay');
let cW = canvas.width = document.body.clientWidth - 100;
let cH = canvas.height = document.body.clientHeight - 100;
let canvasCtx = canvas.getContext("2d");

const randomShape = () => Math.random() >= .5 ? 'circle' : 'rectangle';
const randomSpeed = () => .8 * (2 * Math.random() - 1);
const randomPosX = () => Math.random() * cW;
const randomPosY = () => Math.random() * cH;
const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomHex = () => Math.floor(Math.random()*16777215).toString(16);

let entities = [];
for(let count = 0; count < 30; count++) {

    let entity = new Entity();
    entity.addComponent(new Components.Appearance({shape: randomShape(), fill: `#${randomHex()}`, stroke: `#${randomHex()}`, size: randomInt(40, 60) }));
    entity.addComponent(new Components.Position({ x : randomPosX(), y: randomPosY() }));
    entity.addComponent(new Components.Velocity({ x : randomSpeed(), y: randomSpeed() }));

    entities.push(entity);
}

const borderCollision = new Systems.BorderCollision(cW, cH);
const renderSystem = new Systems.Render(canvasCtx, cW, cH);
const movimentSystem = new Systems.Moviment(cW, cH);

const runLoop = () => {
    let time = performance.now();
    let delta = time - lastTime;

    renderSystem.clearCanvas();
    for(let i=0,len=entities.length; i < len; i++) {
        borderCollision.execute(entities[i]);
        renderSystem.execute(entities[i]);
        movimentSystem.execute(entities[i], delta);
    }

    lastTime = time;
    requestAnimationFrame(runLoop);
}

let lastTime = performance.now();
requestAnimationFrame(runLoop);

export default entities;