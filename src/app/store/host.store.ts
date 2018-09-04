import { IHost } from '../interface';
import {
  HOST_GET_FAILED,
  HOST_GET_SUCCESS
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
  }
  return state;
};
