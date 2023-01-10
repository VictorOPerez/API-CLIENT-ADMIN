import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loadin: false,
  error: null,
};
export const AuthConstext = createContext(INITIAL_STATE);
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loadin: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loadin: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loadin: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loadin: false,
        error: null,
      };
    default:
      return state;
  }
};
export const AuthConstextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthConstext.Provider
      value={{
        user: state.user,
        loadin: state.loadin,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthConstext.Provider>
  );
};
