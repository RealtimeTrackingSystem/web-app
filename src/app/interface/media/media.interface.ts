import { IMetaData } from './meta-data.interface';

export interface IMedia {
  _report: string;
  platform: string;
  metaData: IMetaData;
}
