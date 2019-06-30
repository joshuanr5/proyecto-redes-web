import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './views/Login/Login';
import Test from './views/Test/Test';
import Result from './views/Result/Result';
import Signup from './views/Signup/Signup';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';

// const Login = () => <div>Login</div>;
// const Test = () => <div>Test</div>;
// const Result = () => <div>Result</div>;
// const Signup = () => <div>Signup</div>;
const Err = () => <div>Err</div>;

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRouter path="/test" component={Test} />
        <PrivateRouter path="/result" component={Result} />
        <Route path="/signup" component={Signup} />
        <Redirect exac from="/" to="/login" />
        <Route component={Err} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
