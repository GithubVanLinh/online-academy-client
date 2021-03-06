import React, { Suspense, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { administratorRoute, publicRoute } from './pages/routes';
import Login from './pages/loginv2';
import SignUp from './pages/SignUp';
import UserPage from './pages/Account';
import AppContext from './Context/AppContext';
import reducer from './Reducer/AppReducer';
import AuthProvider from './provider/authProvider';
import jwt_decode from 'jwt-decode';
import LecturerPage from './pages/Lecturer/LecturerPage';
import LessonProvider from './provider/lessonProvider';

export default function App() {
  const initialState = {
    query: '',
    item: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthProvider>
      <LessonProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <AppContext.Provider value={{ state, dispatch }}>
              <Switch>
                <UnAuthRoute path='/login' exact={true}>
                  <Login />
                </UnAuthRoute>

                <UnAuthRoute path='/signup' exact={true}>
                  <SignUp />
                </UnAuthRoute>

                <PrivateRoute path='/user'>
                  <UserPage />
                </PrivateRoute>

                <LecturerRoute path='/lecturer'>
                  <LecturerPage />
                </LecturerRoute>

                {publicRoute.map((ro, i) => {
                  return (
                    <PublicRoute
                      key={i}
                      path={ro.path}
                      component={ro.component}
                      exact={true}
                    />
                  );
                })}
                {administratorRoute.map((ro, i) => {
                  return (
                    <AdminRoute
                      key={i}
                      path={ro.path}
                      component={ro.component}
                      exact={true}
                    />
                  );
                })}

                <Route path='*'>
                  <NoMatch />
                </Route>
              </Switch>
            </AppContext.Provider>
          </Suspense>
        </Router>
      </LessonProvider>
    </AuthProvider>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  const token = localStorage.getItem(
    process.env.REACT_APP_STORAGE_ACCESS_TOKEN
  );

  if (token) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return (
      <Route
        {...rest}
        children={
          <Redirect
            to={{
              pathname: '/login'
              // state: { from: location }
            }}
          />
        }
      />
    );
  }
}

function LecturerRoute({ children, ...rest }) {
  const token = localStorage.getItem(
    process.env.REACT_APP_STORAGE_ACCESS_TOKEN
  );
  const decoded = token ? jwt_decode(token) : null;

  if (!token) {
    return (
      <Route
        {...rest}
        children={
          <Redirect
            to={{
              pathname: '/login'
              // state: { from: location }
            }}
          />
        }
      />
    );
  } else if (decoded.type === 'lecturer') {
    return <Route {...rest}>{children}</Route>;
  } else {
    return (
      <Route
        {...rest}
        children={
          <Redirect
            to={{
              pathname: '/'
              // state: { from: location }
            }}
          />
        }
      />
    );
  }
}

function UnAuthRoute({ children, ...rest }) {
  const token = localStorage.getItem(
    process.env.REACT_APP_STORAGE_ACCESS_TOKEN
  );
  return (
    <Route
      {...rest}
      children={
        !token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/'
              // state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ ...rest }) {
  return <Route {...rest} />;
}

function AdminRoute({ children, ...rest }) {
  const token = localStorage.getItem(
    process.env.REACT_APP_STORAGE_ACCESS_TOKEN
  );
  const decoded = jwt_decode(token);

  if (!token) {
    return (
      <Route
        {...rest}
        children={
          <Redirect
            to={{
              pathname: '/login'
              // state: { from: location }
            }}
          />
        }
      />
    );
  } else if (decoded.type === 'admin') {
    return <Route {...rest}>{children}</Route>;
  } else {
    return (
      <Route
        {...rest}
        children={
          <Redirect
            to={{
              pathname: '/'
              // state: { from: location }
            }}
          />
        }
      />
    );
  }
}
