import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import {AuthView} from "./views/auth";
import {ImageView} from "./views/image";
import {UploadView} from "./views/upload";
import {UserContextProvider} from "./services/userContext";

const App = () => {
  return (
    <Router>
      <UserContextProvider>
        <ToastContainer />
        <Route path={'/auth'}>
          <AuthView/>
        </Route>
        <Route path={'/image/:imageId'}>
          <ImageView/>
        </Route>
        <Route path={'/upload'}>
          <UploadView/>
        </Route>
        <Route exact path="/">
          <Redirect to="/auth" />
        </Route>
      </UserContextProvider>
    </Router>
  );
};

export default App;
