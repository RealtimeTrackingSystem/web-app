import { IReporter } from '../interface/reporter/reporter.interface';

import {
  REPORTER_GET_PENDING_REQUEST_FAILED,
  REPORTER_GET_PENDING_REQUEST_SUCCESS,
  REPORTER_ACCEPT_REQUEST_FAILED,
  REPORTER_ACCEPT_REQUEST_SUCCESS
} from './actions/reporter.action';

import * as reporter from './reducers/reporter.reducer';
export interface IReporterStore {
  reporters: IReporter[];
  limit: number;
  page: number;
  count: number;
  spinner: boolean;
  error: string;
  success: string;
}

export const REPORTER_INITIAL_STATE: IReporterStore = {
  reporters: [],
  limit: 0,
  page: 0,
  count: 0,
  spinner: false,
  error: null,
  success: null
}

export function reporterReducer(state: IReporterStore = REPORTER_INITIAL_STATE, action): IReporterStore {
  switch (action.type) {
    case REPORTER_GET_PENDING_REQUEST_FAILED: return reporter.getPendingHostRequestFailed(state, action);
    case REPORTER_GET_PENDING_REQUEST_SUCCESS: return reporter.getPendingHostRequestSuccess(state, action);
    case REPORTER_ACCEPT_REQUEST_FAILED: return reporter.acceptRequestFailed(state, action);
    case REPORTER_ACCEPT_REQUEST_SUCCESS: return reporter.acceptRequestSuccess(state, action);
  }
  return state;
};
