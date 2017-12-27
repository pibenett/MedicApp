export interface Notif {
  title?: string;
  body?: string;
  data?: {
    link?: string;
    date?: any;
    read?: boolean;
    patientFirstName?: string;
    patientLastName?: string;
    patientBirthdate?: string;
  };
}
