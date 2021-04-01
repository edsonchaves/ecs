import {Component} from '../../src/index.js';

export class Appearance extends Component{
    constructor(props){
        super(props);
        if(props == undefined) {
            this.shape = 'rectangle';
            this.fill = '#fff';
            this.stroke = '#000';
            this.size = 50;
        }
    }
}