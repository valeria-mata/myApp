import {ISqlModel} from '../interface/interfaces-funtional';

export class User implements ISqlModel{

    constructor() {
        this.id = null;
        this.active = null;
        this.data = null;
    }
    id: number;
    active: number;
    data:string;
}
