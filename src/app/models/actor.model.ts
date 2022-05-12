import { Entity } from './entity.model';
import { Picture } from './picture.model';

export class Actor extends Entity {
  name: string;
  surname: string;
  phone: string;
  role: string;
  email: string;
  password: string;
  address: string;
  photo: string;
  photoObject: Picture;
  validated: string;
  preferredLanguage: ['en', 'es', 'fr'];
  constructor() {
    super();
  }
}

