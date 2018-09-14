import { IHost, IReporter, IPerson, IProperty, IMedia } from './../../interface';

export interface IReport {
  _id: string;
  title: string;
  description: string;
  location: string;
  long: number;
  lat: number;
  _reporter?: IReporter;
  _host?: IHost;
  hostId?: string;
  reporterId?: string;
  status: string;
  people?: IPerson[];
  properties?: IProperty[];
  medias?: IMedia[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
