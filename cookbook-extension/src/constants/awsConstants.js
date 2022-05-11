import { Auth } from "aws-amplify";

export const awsConfig = {
  Auth: {
    // identityPoolId: "ca-central-1:25160961-3824-4b05-beb7-06d55531cab4",
    region: "ca-central-1",
    userPoolId: "ca-central-1_xe2VB777P",
    userPoolWebClientId: "48n7g1n733k7a0sa9od9pvr3on",
  },
  endpoints: [
    {
      name: "GeneralEndpoint",
      endpoint: "https://yk9vteslyc.execute-api.ca-central-1.amazonaws.com/dev",
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
