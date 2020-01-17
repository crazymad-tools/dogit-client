import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  RouteComponentProps
} from "react-router-dom";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import IndexPage from "./pages/Index";

interface Props {}

const App: React.FC<Props> = props => {
  return (
    <div className="App">
      <Route path="/" component={IndexPage} exact />
    </div>
  );
};

export default App;
