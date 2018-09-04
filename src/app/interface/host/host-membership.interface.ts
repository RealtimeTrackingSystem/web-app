import { IHost } from './host.interface';
import { IHostMember } from './host-member.interface';

export interface IHostMemberships {
  host: IHost;
  hostMember: IHostMember;
}
