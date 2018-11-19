import { tassign } from 'tassign';
import { ISessionStore } from '../session.store';

export function sessionCreateFulfilled (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    user: action.payload.user,
    token: action.payload.token,
    error: null,
    validationError: null
  });
};

export function sessionCreateFailed (state: ISessionStore, action ) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    error: action.payload.error,
    validationError: null
  });
}

export function registrationFailed (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    validationError: action.payload.validationError,
    error: null
  });
}

export function sessionForgotPasswordFulfilled (state: ISessionStore) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    validationError: null,
    error: null
  });
}

export function sessionForgotPasswordFailed (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    error: action.payload.error
  });
}

export function sessionChangePasswordFulfilled (state: ISessionStore) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    validationError: null,
    error: null
  });
}

export function sessionChangePasswordFailed (state: ISessionStore, action) {
  return tassign<ISessionStore, ISessionStore>(state, {
    ...state,
    error: action.payload.error
  });
}
