import { IProfilePicture } from './../media/profile-picture.interface';
import { IHostMember } from './../host/host-member.interface';

export interface IUser {
  _id?: string;
  fname?: string;
  lname?: string;
  gender?: string;
  age?: number;
  address?: string;
  alias?: string;
  email?: string;
  username?: string;
  street?: string;
  barangay?: string;
  city?: string;
  region?: string;
  country?: string;
  zip?: string;
  lat?: number;
  long?: number;
  reporterID?: string;
  hosts?: IHostMember[];
  profilePicture?: IProfilePicture;
  birthday?: string;
}
