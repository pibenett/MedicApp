import { Allergie } from './Allergie';
import { Followup } from './Followup';
import { Address } from './Address';

export class Patient {
    key?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    birthdate?: any;
    age?: number;
    email?: string;
    phone?: string;
    address?: Address;
    allergies?: Allergie[];
    followup?: Followup;

constructor() {}

}
