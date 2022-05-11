import { Auth } from "aws-amplify";

export const socketURL =
  "wss://4a3ca8swml.execute-api.us-east-1.amazonaws.com/production";
export const apiURL =
  "https://92n0w9opri.execute-api.ca-central-1.amazonaws.com/dev";
export const awsConfig = {
  Auth: {
    identityPoolId: "ca-central-1:25160961-3824-4b05-beb7-06d55531cab4",
    region: "ca-central-1",
    userPoolId: "ca-central-1_gbqeHLzxP",
    userPoolWebClientId: "2c0sd9bqfvltt7emcl5bpnoiou",
  },
  endpoints: [
    {
      name: "GeneralEndpoint",
      endpoint: "https://92n0w9opri.execute-api.ca-central-1.amazonaws.com/dev",
      custom_header: async () => {
        return {
          Authorization: `Bearer ${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`,
        };
      },
    },
  ],
};
