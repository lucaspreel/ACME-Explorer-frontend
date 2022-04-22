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
        managerId: number;
    
        constructor() {
            super();
        }
}
