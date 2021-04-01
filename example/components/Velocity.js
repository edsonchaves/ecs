import {Component} from '../../src/index.js';

export class Velocity extends Component{
    constructor(props){
        super(props);
        if(props == undefined) {
            this.x = 0;
            this.y = 0;
        }
    }
}