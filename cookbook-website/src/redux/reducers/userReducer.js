import { SET_AUTHENTICATED } from "../../constants/reducerEvents";

const INITIAL_STATE = {
  authenticated: false,
  accessToken: null,
  idToken: null,
  refreshToken: null,
  userData: null,
};
export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
