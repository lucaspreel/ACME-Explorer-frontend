import { Entity } from './entity.model';

export class Sponsorship extends Entity {
    banner: string;
    page: string;
    tripTicker: string;
    isPayed: boolean;

    constructor() {
        super();
    }
}
