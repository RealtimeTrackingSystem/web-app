import { tassign } from 'tassign';
import * as _ from 'lodash';
import { IReporterStore } from '../reporter.store';

export function getPendingHostRequestSuccess (state: IReporterStore, action) {
  return tassign<IReporterStore, IReporterStore>(state, {
    ...state,
    reporters: action.payload.reporters,
    count: action.payload.count,
    page: action.payload.page,
    limit: action.payload.limit
  });
}

export function getPendingHostRequestFailed (state: IReporterStore, action) {
  return tassign<IReporterStore, IReporterStore>(state, {
    ...state,
    error: action.payload.error
  });
}

export function acceptRequestSuccess (state: IReporterStore, action) {
  return tassign<IReporterStore, IReporterStore>(state, {
    ...state
  });
}

export function acceptRequestFailed (state: IReporterStore, action) {
  return tassign<IReporterStore, IReporterStore>(state, {
    ...state,
    error: action.payload.error
  });
}
