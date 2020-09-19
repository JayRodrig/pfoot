import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export default function Store(props) {
  const [authUser, setAuthUser] = useState({
    user: null,
    loggedIn: false,
  });

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {props.children}
    </AuthContext.Provider>
  );
}
