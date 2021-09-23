import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Login = lazy(() => import('./auth/Login'));
const Register = lazy(() => import('./auth/Register'));

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Category = lazy(() => import('./videos/Category'));
const FormulirCategory = lazy(() => import('./formulir/Category'));
const List = lazy(() => import('./videos/List'));
const FormulirList = lazy(() => import('./formulir/List'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route path="/auth/login" component={ Login } />
          <Route path="/auth/register" component={ Register } />

          <Route exact path="/dashboard" component={ Dashboard } />

          <Route path="/videos/category" component={ Category } />
          <Route path="/formulir/category" component={ FormulirCategory } />

          <Route path="/videos/list" component={ List } />
          <Route path="/formulir/list" component={ FormulirList } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />


          <Redirect to="/auth/login" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;