import React, { useEffect } from "react";
import "./App.css";
import { DOMMessage, DOMMessageResponse } from "./types";
import axios from "axios";
import recipeDataScraper from "recipe-data-scraper";
import Recipe from "./components/Recipe";
import Amplify, { API, Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { SET_AUTHENTICATED } from "./constants/reducerEvents";

function App() {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("");
  const [headlines, setHeadlines] = React.useState<string[]>([]);
  const [url, setUrl] = React.useState("");
  const [recipe, setRecipe] = React.useState({});
  const [hasRecipe, setHasRecipe] = React.useState(false);

  const scrapeRecipe = async (path = url) => {
    // let recipe = await axios.put(
    //   "https://yk9vteslyc.execute-api.ca-central-1.amazonaws.com/dev",
    //   { url: url }
    // );
    console.log("getting recipe");
    try {
      let recipe = await recipeDataScraper(path);
      console.log(recipe);
      setRecipe(recipe);
      setHasRecipe(true);
    } catch (e) {
      setHasRecipe(false);
    }
  };
  useEffect(() => {
    scrapeRecipe(url);
  }, [url]);
  const signOut = async () => {
    await Auth.signOut();
    dispatch({
      type: SET_AUTHENTICATED,
      payload: {
        authenticated: false,
        accessToken: null,
        idToken: null,
        refreshToken: null,
        userData: null,
      },
    });
  };

  React.useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          /**
           * Sends a single message to the content script(s) in the specified tab,
           * with an optional callback to run when a response is sent back.
           *
           * The runtime.onMessage event is fired in each content script running
           * in the specified tab for the current extension.
           */
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: "GET_DOM" } as DOMMessage,
            (response: DOMMessageResponse) => {
              setTitle(response.title);
              setHeadlines(response.headlines);
              if (url !== response.url) {
                setUrl(response.url);
              }
            }
          );
        }
      );
  });

  return (
    <div className="App">
      <h1>Recipe Collector</h1>
      <button onClick={signOut}>Sign Out</button>
      {!hasRecipe && <div>No Recipe Found</div>}
      {hasRecipe && <Recipe recipe={recipe} />}
    </div>
  );
}

export default App;
