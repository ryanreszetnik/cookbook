import { Box, Button, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import CommonAuthPage from "./CommonAuthPage";

export default function SignUp({ redirect }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = async () => {
    await Auth.signUp({
      username: email,
      password: password,
      attributes: { name: name },
    });
    redirect("confirmSignUp", { email: email });
  };
  return (
    <div>
      <CommonAuthPage
        redirect={redirect}
        title="Sign Up"
        onSubmit={submit}
        submitName="Sign Up"
        secondaryName="Sign In Instead"
        secondaryLink="signin"
        fields={[
          {
            label: "Name",
            onChange: (e) => setName(e),
            value: name,
            type: "text",
          },
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
    </div>
  );
}
