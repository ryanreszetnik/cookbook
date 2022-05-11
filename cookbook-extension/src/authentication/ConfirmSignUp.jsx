import { Auth } from "aws-amplify";
import React, { useState } from "react";
import CommonAuthPage from "./CommonAuthPage";

export default function ConfirmSignUp({ redirect, email }) {
  const [code, setCode] = useState("");
  const submit = async () => {
    await Auth.confirmSignUp(email, code);
    redirect("signin");
  };
  return (
    <div>
      <CommonAuthPage
        redirect={redirect}
        title={`Confirm Email`}
        onSubmit={submit}
        submitName="Submit Code"
        fields={[
          {
            label: "Code",
            onChange: (e) => setCode(e),
            value: code,
            type: "text",
          },
        ]}
      />
    </div>
  );
}
