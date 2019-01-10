import { IHost, IReporter, IPerson, IProperty, IMedia } from './../../interface';
export interface INote {
  _id: string;
  _report: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};
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
  notes?: INote[];
  duplicateParent?: IReport;
  duplicates?: IReport[];
  isDuplicate?: boolean;
  category?: any;
}
