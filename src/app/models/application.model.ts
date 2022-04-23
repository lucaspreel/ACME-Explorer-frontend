import { Entity } from "./entity.model";

export class Application extends Entity {
    applicationMoment: string;
    comments: string;
    status: string;
    explorer_Id: string;
    trip_Id: number;
    rejected_reason: string;
    tripPrice: number;
    manager_Id: number;
    deleted: boolean;


    constructor() {
        super();
    }
}
