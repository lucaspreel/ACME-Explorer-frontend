import { Entity } from "./entity.model";
export class Actor extends Entity {
  private_name:string;
  private_surname:string;
  private_phone:string;
  private_role:string;
  private_email:string;
  private_password:string;
  private_address:string;
  private_validated:string;
  constructor() {
    super();
  }
}

