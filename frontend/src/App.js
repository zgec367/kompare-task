import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TableList from "./features/TableList";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={TableList} />
            <Route path="**" component={TableList} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
