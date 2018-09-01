import { IReport } from '../interface';

import {
  REPORT_GET_FULFILLED,
  REPORT_GET_FAILED,
  REPORT_GET_DATA,
  REPORT_GET_DETAILS_FAILED,
  REPORT_GET_DETAILS_SUCCESS
} from './actions/report.action';

import * as report from './reducers/report.reducer';
export interface IReportStore {
  reports: IReport[];
  limit: number;
  page: number;
  count: number;
  reportDetails: IReport;
  spinner: boolean;
  error: string;
  success: string;
}

export const REPORT_INITIAL_STATE: IReportStore = {
  reports: [],
  reportDetails: null,
  limit: null,
  page: null,
  count: null,
  spinner: false,
  error: null,
  success: null
}

export function reportReducer(state: IReportStore = REPORT_INITIAL_STATE, action): IReportStore {
  switch (action.type) {
    case REPORT_GET_FAILED: return report.getReportsFailed(state, action);
    case REPORT_GET_FULFILLED: return report.getReportsSuccess(state, action);
    case REPORT_GET_DATA: return report.getReportData(state, action);
    case REPORT_GET_DETAILS_FAILED: return report.getReportDetailsFailed(state, action);
    case REPORT_GET_DETAILS_SUCCESS: return report.getReportDetailsSuccess(state, action);
  }
  return state;
};
