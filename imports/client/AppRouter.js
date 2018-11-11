import { createBrowserHistory } from 'history';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

import SignUp from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';
import { Meteor } from 'meteor/meteor';

const BrowserHistory = createBrowserHistory();

class AppRoute {
  constructor({ path, component, authenticationRequired }) {
    this.path = path;
    this.component = component;
    this.authenticationRequired = authenticationRequired;
  }
  authenticationRequired(path) {
    if (path === this.path) {
      return this.authenticationRequired;
    }
  }
}

export const AppRoutes = {
  home: new AppRoute({
    path: '/',
    component: () => <Login />,
    authenticationRequired: false
  }),
  signup: new AppRoute({
    path: '/signup',
    component: () => <SignUp />,
    authenticationRequired: false
  }),
  dashboard: new AppRoute({
    path: '/dashboard',
    component: () => <Dashboard />,
    authenticationRequired: true
  }),
  notFound: new AppRoute({
    path: '*',
    component: () => <NotFound />,
    authenticationRequired: false
  })
};

AppRoutes.authenticationRequired = function(routePath) {
  for (const route of Object.values(this)) {
    if (route.path === routePath) {
      return route.authenticationRequired;
    }
  }

  return false;
};

onEnterPublicPage = originalCompnent =>
  Meteor.userId() ? <Redirect to={AppRoutes.dashboard.path} /> : originalCompnent;

onEnterPrivatePage = originalCompnent =>
  !Meteor.userId() ? <Redirect to={AppRoutes.home.path} /> : originalCompnent;

export default (AppRouter = (
  <Router history={BrowserHistory}>
    <Switch>
      <Route
        exact
        path={AppRoutes.home.path}
        component={() => onEnterPublicPage(AppRoutes.home.component())}
      />
      <Route
        path={AppRoutes.signup.path}
        render={() => onEnterPublicPage(AppRoutes.signup.component())}
      />
      <Route
        path={AppRoutes.dashboard.path}
        component={() => onEnterPrivatePage(AppRoutes.dashboard.component())}
      />
      <Route
        path={AppRoutes.notFound.path}
        component={AppRoutes.notFound.component}
      />
    </Switch>
  </Router>
));

export const onAuthChange = isAuthenticated => {
  const currentLocation = BrowserHistory.location.pathname;
  const authenticationRequired = AppRoutes.authenticationRequired(
    currentLocation
  );

  if (isAuthenticated && !authenticationRequired) {
    BrowserHistory.replace(AppRoutes.dashboard.path);
  } else if (!isAuthenticated && authenticationRequired) {
    BrowserHistory.replace(AppRoutes.home.path);
  }
};
