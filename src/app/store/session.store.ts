import { ISession } from '../interface';
import { IUser } from '../interface';
import {
  SESSION_CREATE_FULFILLED,
  SESSION_CREATE_FAILED,
  SESSION_DESTROY_FULFILLED,
  SESSION_CHECK_FULFILLED,
  SESSION_CHECK_FAILED,
  SESSION_REGISTRATION_FAILED,
  SESSION_REGISTRATION_SUCCESS
} from './actions/session.action';
import * as session from './reducers/session.reducer';
export interface ISessionStore extends ISession {
  user: IUser;
  token: string;
  error: string;
  validationError: string;
}

export const SESSION_INITIAL_STATE: ISessionStore = {
  user: null,
  token: null,
  error: null,
  validationError: null
}

export function sessionReducer(state: ISessionStore = SESSION_INITIAL_STATE, action): ISessionStore {
  switch (action.type) {
    case SESSION_CREATE_FULFILLED: return session.sessionCreateFulfilled(state, action);
    case SESSION_CREATE_FAILED: return session.sessionCreateFailed(state, action);
    case SESSION_REGISTRATION_FAILED: return session.registrationFailed(state, action);
  }
  return state;
};
