import { IProfilePicture } from './../media/profile-picture.interface';
import { IHostMember } from './../host/host-member.interface';

export interface IUser {
  _id?: string;
  fname?: string;
  lname?: string;
  gender?: string;
  address?: string;
  alias?: string;
  email?: string;
  username?: string;
  street?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  lat?: number;
  long?: number;
  reporterID?: string;
  hosts?: IHostMember[];
  profilePicture?: IProfilePicture
}
