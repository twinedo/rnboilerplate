import {useMemo, useReducer} from 'react';

const initialState = {
  isLoading: true,
  userName: null,
  userToken: null,
  error: null,
};

const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  RETRIEVE_TOKEN: 'RETRIEVE_TOKEN',
  ERROR: 'ERROR',
};

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...prevState,
        userToken: action.token,
        userName: action.id,
        error: null,
        isLoading: false,
      };
    case ACTIONS.LOGOUT:
      return {
        ...prevState,
        userToken: null,
        userName: null,
        error: null,
        isLoading: false,
      };
    case ACTIONS.RETRIEVE_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
        error: null,
        isLoading: false,
      };
    case ACTIONS.ERROR:
      return {
        ...prevState,
        isLoading: false,
        error: action.error,
      };
    default:
      return prevState;
  }
};

const AuthContext = () => {
  const [authState, dispatch] = useReducer(loginReducer, initialState);

  const authContext = useMemo(
    () => ({
      signIn: (user, pass) => {
        let userToken;
        if (user !== '' && pass !== '') {
          userToken = 'kjawndj';
          dispatch({type: ACTIONS.LOGIN, id: user, token: userToken});
        } else if (user === '' || pass === '') {
          dispatch({type: ACTIONS.ERROR, error: 'DATA TIDAK BOLEH KOSONG'});
        } else {
          dispatch({type: ACTIONS.LOGOUT});
        }
      },
      signOut: () => {
        dispatch({type: ACTIONS.LOGOUT});
      },
    }),
    [],
  );

  return {authState, authContext};
};

export default AuthContext;
