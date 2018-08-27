export interface IHost {
  _id: string;
  defaultTags: string[];
  name: string;
  email: string;
  location: string;
  hostNature: string;
  long: number;
  lat: number;
  street: string;
  barangay: string;
  city: string;
  region: string;
  country: string;
  zip: string;
  createdAt: Date;
  updatedAt: Date;
}
