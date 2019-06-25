import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './views/Login/Login';
import Test from './views/Test/Test';

// const Login = () => <div>Login</div>;
// const Test = () => <div>Test</div>;
const Result = () => <div>Result</div>;
const Err = () => <div>Err</div>;

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/test" component={Test} />
        <Route path="/result" component={Result} />
        <Redirect exac from="/" to="/login" />
        <Route component={Err} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
