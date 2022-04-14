import { Entity } from "./entity.model";

export class Trip extends Entity {
        ticker: string;
        title: string;
        description: string;
        price: number;
        picture: string;
        startDate: string;
        endDate: string;
        cancelled: boolean;
    
        constructor() {
            super();
        }
}
