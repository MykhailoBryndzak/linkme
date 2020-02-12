import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import {LinksPage} from "./pages/LinksPage";
import {CreateLinkPage} from "./pages/CreateLinkPage";
import {DetailLinkPage} from "./pages/DetailLinkPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
  if(isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exect>
          <LinksPage/>
        </Route>
        <Route path="/create" exect>
          <CreateLinkPage/>
        </Route>
        <Route path="/detail/:id">
          <DetailLinkPage/>
        </Route>
        <Redirect to="/create"/>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exect>
        <AuthPage/>
      </Route>
      <Redirect to="/" />
    </Switch>
  )

};
