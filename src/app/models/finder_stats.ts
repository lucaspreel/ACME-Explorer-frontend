import { Entity } from "./entity.model";

export class FinderStats extends Entity {
    max: Number;
    min: Number;
    top_10: Array<String>;

    constructor() {
        super();
    }
}
