import React from 'react';
import {connect} from 'frontity';

export const AuthContext = React.createContext(null);

const AuthProvider = ({children}) => {
  const user = {};
  return <AuthContext.Provider value={user} children={children}/>;
};

export default connect(AuthProvider);