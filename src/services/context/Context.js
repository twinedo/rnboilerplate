import React, {createContext} from 'react';
import Routes from '../../routes/Routes';
import AuthContext from './AuthContext';

export const AppContext = createContext();

const Context = () => {
  const {authState, authContext} = AuthContext();

  const globalState = {authState};
  const globalFunction = {authContext};

  console.log('authState from Context', authState);

  return (
    <AppContext.Provider value={{state: globalState, func: globalFunction}}>
      <Routes />
    </AppContext.Provider>
  );
};

export default Context;
