import { Entity } from "./entity.model";
import { Picture } from "./picture.model";

export class Trip extends Entity {
        ticker: string;
        title: string;
        description: string;
        price: number;
        picture: string;
        photoObject: Picture;
        startDate: Date;
        endDate: Date;
        cancelled: boolean;
        managerId: number;
        stages: Stage[];
    
        constructor() {
            super();
        }
}

export class Stage extends Entity {
    title: string;
    description: string;
    price: number;

    constructor() {
        super();
    }
}
