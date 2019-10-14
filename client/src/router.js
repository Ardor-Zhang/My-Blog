import React, { Fragment } from 'react';
import { Router,  Route, Switch, Redirect } from 'dva/router';

import IndexPage from './routes/IndexPage/IndexPage';
import MomentsPage from './routes/MomentsPage/MomentsPage';
import ArticlePage from './routes/ArticlePage/ArticlePage';
import MessagePage from './routes/MessagePage/MessagePage';
import IntroPage from './routes/IntroPage/IntroPage';
import AdminPage from './routes/AdminPage/AdminPage';
import LifePage from './routes/LifePage/LifePage';
import LuFei from './components/LuFei/LuFei';
import Token from './components/Token/Token'

const RouterConfig = ({ history }) => {
  return (
    <Router history={history}>
    <Fragment>
          <Switch>
            <Route path='/home' component={ IndexPage } />
            <Route path='/moments' component={ MomentsPage } />
            <Route path='/article' component={ ArticlePage } />
            <Route path='/message' component={ MessagePage } />
            <Route path='/intro' component={ IntroPage } />
            <Route path='/admin' component={ AdminPage } />
            <Route path='/life' component={ LifePage } />
            <Redirect from="/*" to="/home" />
          </Switch>
          <LuFei/>
          <Token/>
      </Fragment>
    </Router>
  );

}

export default RouterConfig
