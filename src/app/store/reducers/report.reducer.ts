import { IReport } from './../../interface';
import { tassign } from 'tassign';
import * as _ from 'lodash';
import { IReportStore } from '../report.store';

export function getReportsSuccess (state: IReportStore, action) {
  return tassign<IReportStore, IReportStore>(state, {
    ...state,
    limit: action.payload.limit,
    page: action.payload.page,
    count: action.payload.count,
    reports: action.payload.reports
  });
}

export function getReportData (state: IReportStore, action) {
  const incommingReport: IReport = action.payload.report;
  const index = _.findIndex(state.reports, report => report._id === incommingReport._id);
  let reports;
  if (index > -1) {
    reports = state.reports.slice();
    reports.splice(index, 1, incommingReport);
  } else {
    reports = state.reports.concat([incommingReport]);
  }
  return tassign<IReportStore, IReportStore>(state, {
    ...state,
    reports: reports
  });
}

export function getReportsFailed (state: IReportStore, action) {
  return tassign<IReportStore, IReportStore>(state, {
    ...state,
    error: action.payload.error
  });
}

export function getReportDetailsSuccess (state: IReportStore, action) {
  return tassign<IReportStore, IReportStore>(state, {
    ...state,
    reportDetails: action.payload.report
  });
}

export function getReportDetailsFailed (state: IReportStore, action) {
  return tassign<IReportStore, IReportStore>(state, {
    ...state,
    error: action.payload.error
  });
}

export function sendReportSuccess (state: IReportStore, action) {
  return tassign<IReportStore, IReportStore>(state, {
    ...state
  });
}

export function sendReportFailed (state: IReportStore, action) {
  return tassign<IReportStore, IReportStore>(state, {
    ...state,
    error: action.payload.error
  });
}
