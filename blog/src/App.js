import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Main from './pages/Main/Main';
import Home from './pages/Main/Home';
import Create from './pages/Main/Create';

import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';

function App() {
  const [signedIn, setSignedIn] = React.useState(false);

  const onSignIn = () => {
    setSignedIn(true);
  };

  const onSignOut = () => {
    setSignedIn(false);
  };

  return (
    <div className="root">
      <Routes>
        {signedIn && (
          <Route
            element={(
              <Main
                onSignOut={onSignOut}
              />
            )}
          >
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<Create />} />

            <Route path='*' element={<Navigate to='/' />} />
          </Route>
        )}

        {!signedIn && <>
          <Route path='/sign-in' element={<SignIn onSignIn={onSignIn} />} />
          <Route path='/sign-up' element={<SignUp />} />

          <Route path='*' element={<Navigate to='/sign-in' />} />
        </>}
      </Routes>
    </div>
  );
}

export default App;
