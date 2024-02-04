"use client";

import { useReducer, createContext, useEffect } from "react";
import { auth } from "../config/firebase";
import { getIdTokenResult, onAuthStateChanged } from "firebase/auth";

//Types
type payloadType = {
  email: string;
  token: string;
};

type userType = {
  email: string;
  token: string;
};

type stateType = {
  user: userType | null;
  isAuthenticating: boolean;
};

type dispatchType = {
  type: string;
  payload: payloadType | null;
};

//Reducer
const firebaseReducer = (state: stateType, action: dispatchType) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: action.payload, isAuthenticating: false };
    case "LOGGED_OUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

//State
const initialState = {
  user: null,
  isAuthenticating: true,
};

//Create context
const AuthContext = createContext<{
  state: stateType;
  dispatch: React.Dispatch<dispatchType>;
}>({
  state: initialState,
  dispatch: () => null,
});

//Context provider
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await getIdTokenResult(user);
        console.log(user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: String(user.email),
            token: idTokenResult.token,
          }, // Access the 'token' property
        });
      } else {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: null, // Allow null as a valid value
        });
      }
    });

    //cleanup
    return () => unsubscribe();
  }, []);

  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
