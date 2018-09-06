import { tassign } from 'tassign';
import * as _ from 'lodash';
import { IHostStore } from '../host.store';

export function getHostsSuccess (state: IHostStore, action) {
  return tassign<IHostStore, IHostStore>(state, {
    ...state,
    limit: action.payload.limit,
    page: action.payload.page,
    count: action.payload.count,
    hosts: action.payload.hosts
  });
}

export function getHostsFailed (state: IHostStore, action) {
  return tassign<IHostStore, IHostStore>(state, {
    ...state,
    error: action.payload.error
  });
}

export function sendHostRequestSuccess (state: IHostStore, action) {
  return tassign<IHostStore, IHostStore>(state, {
    ...state
  });
}

export function sendHostRequestFailed (state: IHostStore, action) {
  return tassign<IHostStore, IHostStore>(state, {
    ...state,
    error: action.payload.error
  });
}

export function createHostSuccess (state: IHostStore, action) {
  return tassign<IHostStore, IHostStore>(state, {
    ...state,
    hosts: state.hosts.concat([action.payload.host])
  });
}

export function createHostFailed (state: IHostStore, action) {
  return tassign<IHostStore, IHostStore>(state, {
    ...state,
    error: action.payload.error
  });
}
