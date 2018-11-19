import { ISession } from '../interface';
import { IUser } from '../interface';
import {
  SESSION_CREATE_FULFILLED,
  SESSION_CREATE_FAILED,
  SESSION_DESTROY_FULFILLED,
  SESSION_CHECK_FULFILLED,
  SESSION_CHECK_FAILED,
  SESSION_REGISTRATION_FAILED,
  SESSION_REGISTRATION_SUCCESS,
  SESSION_FORGOT_PASSWORD_ATTEMPT,
  SESSION_FORGOT_PASSWORD_FAILED,
  SESSION_FORGOT_PASSWORD_FULFILLED,
  SESSION_PASSWORD_CHANGE_FULFILLED,
  SESSION_PASSWORD_CHANGE_FAILED
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
    case SESSION_FORGOT_PASSWORD_FULFILLED: return session.sessionForgotPasswordFulfilled(state);
    case SESSION_FORGOT_PASSWORD_FAILED: return session.sessionForgotPasswordFailed(state, action);
    case SESSION_PASSWORD_CHANGE_FULFILLED: return session.sessionChangePasswordFulfilled(state);
    case SESSION_PASSWORD_CHANGE_FAILED: return session.sessionChangePasswordFailed(state, action);
  }
  return state;
};
