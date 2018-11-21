import { IUser } from 'app/interface';
import { IHostMember } from './../../interface/host/host-member.interface';
import { IHost } from './../../interface/host/host.interface';
import { tassign } from 'tassign';
import { IUserDataStore } from './../user-data.store';
import * as _ from 'lodash';

export function populateHost (state: IUserDataStore, action) {
  const host: IHost = action.payload.host;
  const hostMember: IHostMember = action.payload.hostMember;
  const hostToAdd = _.find(state.hostMemberships, hm => {
    return hm.hostMember._id === host._id;
  });
  const index = _.findIndex(state.hostMemberships, hm => {
    return hm.host._id === host._id;
  });
  let newHostMemberships;
  if (hostToAdd) {
    newHostMemberships = state.hostMemberships.slice();
    newHostMemberships.splice(index, 1, {
      host: host,
      hostMember: hostMember
    });
  } else if (host && hostMember && !hostToAdd) {
    newHostMemberships = state.hostMemberships.concat([
      {host, hostMember}
    ]);
  } else {
    newHostMemberships = state.hostMemberships;
  }
  return tassign<IUserDataStore, IUserDataStore>(state, {
    ...state,
    hostMemberships: newHostMemberships,
    error: null
  });
};

export function populateReporter (state: IUserDataStore, action) {
  return tassign<IUserDataStore, IUserDataStore>(state, {
    ...state,
    reporter: action.payload.reporter,
    error: null
  });
}

export function populateReporterError (state: IUserDataStore, action ) {
  return tassign<IUserDataStore, IUserDataStore>(state, {
    ...state,
    error: action.payload.error
  });
}

export function populateUser (state: IUserDataStore, action) {
  return tassign<IUserDataStore, IUserDataStore>(state, {
    ...state,
    user: action.payload.user,
    error: null
  });
}

export function userDataDestroy (state: IUserDataStore) {
  return tassign<IUserDataStore, IUserDataStore>(state, {
    user: null,
    hostMemberships: [],
    reporter: null,
    activeHost: null,
    error: null
  });
}

export function setActiveHost (state: IUserDataStore, action) {
  return tassign<IUserDataStore, IUserDataStore>(state, {
    ...state,
    activeHost: action.payload.activeHost
  });
}

export function updateUserSuccess (state: IUserDataStore, action) {
  return tassign<IUserDataStore, IUserDataStore>(state, {
    ...state,
    user: action.payload.user,
    error: null
  });
}

export function updateUserFailed (state: IUserDataStore, action) {
  return tassign<IUserDataStore, IUserDataStore>(state, {
    ...state,
    error: action.payload.error
  });
}
