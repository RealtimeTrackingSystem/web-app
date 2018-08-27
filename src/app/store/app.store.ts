import { combineReducers } from 'redux';
import { SESSION_INITIAL_STATE, ISessionStore, sessionReducer } from './session.store';
import { HOST_INITIAL_STATE, IHostStore, hostReducer } from './host.store';
import { REPORT_INITIAL_STATE, IReportStore, reportReducer } from './report.store';
import { REPORTER_INITIAL_STATE, IReporterStore, reporterReducer } from './reporter.store';
import { userDataReducer, IUserDataStore, USER_DATA_INITIAL_STATE } from './user-data.store';

export interface IAppState {
  session: ISessionStore,
  host: IHostStore,
  report: IReportStore,
  reporter: IReporterStore,
  userData: IUserDataStore
}

export const INITIAL_STATE: IAppState = {
  session: SESSION_INITIAL_STATE,
  host: HOST_INITIAL_STATE,
  report: REPORT_INITIAL_STATE,
  reporter: REPORTER_INITIAL_STATE,
  userData: USER_DATA_INITIAL_STATE
}

export const rootReducer = combineReducers<IAppState>({
  session: sessionReducer,
  host: hostReducer,
  report: reportReducer,
  reporter: reporterReducer,
  userData: userDataReducer
});
