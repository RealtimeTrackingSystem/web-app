import { IHost } from '../interface';
import {
  HOST_GET_FAILED,
  HOST_GET_SUCCESS,
  HOST_SEND_REQUEST_FAILED,
  HOST_SEND_REQUEST_SUCCESS,
  HOST_CREATE_FAILED,
  HOST_CREATE_SUCCESS
} from './actions/host.action';
import * as host from './reducers/host.reducer';
export interface IHostStore {
  hosts: IHost[];
  hostsDetails: IHost;
  limit: number;
  page: number;
  count: number;
  spinner: boolean;
  error: string;
  success: string;
}

export const HOST_INITIAL_STATE: IHostStore = {
  hosts: [],
  hostsDetails: null,
  limit: 0,
  page: 0,
  count: 0,
  spinner: null,
  error: null,
  success: null
}

export function hostReducer(state: IHostStore = HOST_INITIAL_STATE, action): IHostStore {
  switch (action.type) {
    case HOST_GET_FAILED: return host.getHostsFailed(state, action);
    case HOST_GET_SUCCESS: return host.getHostsSuccess(state, action);
    case HOST_SEND_REQUEST_FAILED: return host.sendHostRequestFailed(state, action);
    case HOST_SEND_REQUEST_SUCCESS: return host.sendHostRequestSuccess(state, action);
    case HOST_CREATE_FAILED: return host.createHostFailed(state, action);
    case HOST_CREATE_SUCCESS: return host.createHostSuccess(state, action);
  }
  return state;
};
