import { Upload } from './Upload';

export interface Followup {
  key?: string;
  date?: any;
  type?: string;
  name?: string;
  content?: string;
  alert?: boolean;
  link?: string;
  uploads?: Upload[];
}
