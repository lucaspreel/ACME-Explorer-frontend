import { Entity } from './entity.model';

export class Sponsorship extends Entity {
    banner: string;
    page: string;
    tripTicker: string;
    isPayed: boolean;
    isDeleted: boolean;

    constructor() {
        super();
    }
}
