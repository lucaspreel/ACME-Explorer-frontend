import { Entity } from "./entity.model";

export class DashboardStats extends Entity {
    trip_admin: Stats;
    app_price: Stats;
    price_stats: Stats;
    app_by_status:ApplicationsStats;

    constructor() {
        super();
    }
}

class Stats extends Entity {
    avg: Number;
    max: Number;
    min: Number;
    dev: Number;

    constructor() {
        super();
    }
}
class ApplicationsStats extends Entity {
    pending: Number;
    accepted: Number;
    due: Number;
    rejected: Number;

    constructor() {
        super();
    }
}