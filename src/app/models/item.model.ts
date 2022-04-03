// import { TrustedScriptString } from "@angular/core/src/sanitization/bypass";
import { Entity } from './entity.model';



export class Item extends Entity {
  sku: string;
  name: string;
  description: number;
  price: number;
  picture: string;
  comment: string[];
  deleted: boolean;

  constructor() {
    super();
  }
}
