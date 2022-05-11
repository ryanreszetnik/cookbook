import { Box, Button, TextField } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import CommonAuthPage from "./CommonAuthPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { SET_AUTHENTICATED } from "../constants/reducerEvents";

export default function SingIn({ redirect }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submit = async () => {
    console.log("submit");
    try {
      await Auth.signIn(email, password);
      const usersession = await Auth.currentSession();
      const user = await Auth.currentUserInfo();
      dispatch({
        type: SET_AUTHENTICATED,
        payload: { authenticated: true, ...usersession, userData: user },
      });
      console.log(usersession);

      console.log("success");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <CommonAuthPage
      redirect={redirect}
      title="Sign In"
      onSubmit={submit}
      submitName="Sign In"
      secondaryName="Create Account"
      secondaryLink="signup"
      fields={[
        {
          label: "Email",
          onChange: (e) => setEmail(e),
          value: email,
          type: "email",
        },
        {
          label: "Password",
          onChange: (e) => setPassword(e),
          value: password,
          type: "password",
        },
      ]}
    />
  );
}
