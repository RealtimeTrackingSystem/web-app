import { IReporter } from './../interface/reporter/reporter.interface';
import { IHostMember } from './../interface/host/host-member.interface';
import { IHost } from './../interface/host/host.interface';
import { ISession } from '../interface';
import { IUser } from '../interface';
import {
  USER_DATA_DESTROY,
  USER_DATA_POPULATE_HOST_SUCCESS,
  USER_DATA_POPULATE_USER_SUCCESS,
  USER_DATA_POPULATE_REPORTER_SUCCESS,
  USER_DATA_POPULATE_REPORTER_ERROR,
  SET_ACTIVE_HOST
} from './actions/user-data.action';
import * as userData from './reducers/user-data.reducer';

export interface IUserDataError {
  type: string;
  message: string;
}

export interface IHostMemberships {
  host: IHost;
  hostMember: IHostMember;
}
export interface IUserDataStore {
  user: IUser;
  hostMemberships: IHostMemberships[];
  reporter: IReporter;
  activeHost: IHostMemberships;
  error: IUserDataError;
}

export const USER_DATA_INITIAL_STATE: IUserDataStore = {
  user: null,
  hostMemberships: [],
  reporter: null,
  activeHost: null,
  error: null
}

export function userDataReducer(state: IUserDataStore = USER_DATA_INITIAL_STATE, action): IUserDataStore {
  switch (action.type) {
    case USER_DATA_DESTROY: return userData.userDataDestroy(state);
    case USER_DATA_POPULATE_HOST_SUCCESS: return userData.populateHost(state, action);
    case USER_DATA_POPULATE_USER_SUCCESS: return userData.populateUser(state, action);
    case USER_DATA_POPULATE_REPORTER_SUCCESS: return userData.populateReporter(state, action);
    case USER_DATA_POPULATE_REPORTER_ERROR: return userData.populateReporterError(state, action);
    case SET_ACTIVE_HOST: return userData.setActiveHost(state, action);
  }
  return state;
};
