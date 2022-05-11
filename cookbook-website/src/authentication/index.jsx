import React, { useEffect, useState } from "react";
import Amplify, { Auth } from "aws-amplify";
import { awsConfig } from "../constants/awsConstants";
import SingIn from "./SingIn.jsx";
import ConfirmSignUp from "./ConfirmSignUp.jsx";

import { useDispatch, useSelector } from "react-redux";
import { SET_AUTHENTICATED } from "../constants/reducerEvents";
import SignUp from "./SignUp";
// import { Redirect } from "react-router";
Amplify.configure(awsConfig);
export default function Authentication({ appLoad, ...props }) {
  const [page, setPage] = useState("signin");
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.user.authenticated);
  const [initialState, setInitialState] = useState(null);
  const [email, setEmail] = useState(null);
  const redirect = (to, state = {}) => {
    if (state.hasOwnProperty("email")) {
      setEmail(state.email);
    }
    setPage(to);
  };
  const dispatch = useDispatch();
  const updateUser = async () => {
    try {
      // const user = await Auth.currentAuthenticatedUser();
      const user = await Auth.currentUserInfo();
      if (user === null) {
        throw new Error("Not authenticated");
      }
      const usersession = await Auth.currentSession();
      dispatch({
        type: SET_AUTHENTICATED,
        payload: { authenticated: true, ...usersession, userData: user },
      });
      appLoad();
    } catch (e) {
      dispatch({ type: SET_AUTHENTICATED, payload: { authenticated: false } });
    }
    setLoading(false);
  };
  useEffect(() => {
    console.log("Starting");
    updateUser();
  }, []);
  const signInPages = () => {
    return (
      <div>
        {page === "signin" && <SingIn redirect={redirect} />}
        {page === "signup" && <SignUp redirect={redirect} />}
        {page === "confirmSignUp" && (
          <ConfirmSignUp redirect={redirect} email={email} />
        )}
      </div>
    );
  };
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && !isAuthenticated && signInPages()}
      {!loading && isAuthenticated && props.children}
    </div>
  );
}
