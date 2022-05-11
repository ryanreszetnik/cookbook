import { API } from "aws-amplify";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Authentication from "./authentication";
import { SET_RECIPES } from "./constants/reducerEvents";
import Header from "./navigation";
import Pages from "./pages";
function App() {
  const dispatch = useDispatch();
  const appLoad = async () => {
    console.log("app load");
    const data = await API.get("GeneralEndpoint", "/");
    console.log(data);
    if (data.hasOwnProperty("recipes")) {
      dispatch({
        type: SET_RECIPES,
        payload: data.recipes.map((r, i) => ({ ...r, id: i })),
      });
    }
  };
  return (
    <Authentication appLoad={appLoad}>
      <BrowserRouter>
        <Header />

        <Pages />
      </BrowserRouter>
    </Authentication>
  );
}

export default App;
