import React from 'react';
import { useNavigate } from 'react-router-dom';

import { API } from '../../utils';

const SignIn = (props) => {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    email: '',
    password: ''
  });
  const [error, setError] = React.useState('');

  const onChange = (event, type) => {
    const input = event.target;
    const text = input.value;

    setForm(previous => {
      const newObject = { ...previous };

      newObject[type] = text;

      return newObject;
    });
  };

  const onSignIn = async () => {
    // očistimo grešku prethodnog zahteva 
    setError('');

    const result = await API.post('/sign-in', form);

    if (result.status >= 400) {
      setError(result.message);
    } else {
      // Save jwt in the locale storage 
      if (result.jwt) {
        window.localStorage.setItem('token', result.jwt);
      }

      props.onSignIn();
    }
  };

  return (
    <div
      className='auth'
    >
      <h1>Sign in</h1>

      {error && (
        <p className='error'>{error}</p>
      )}

      <input
        type='email'

        placeholder='Email'

        onChange={event => {
          onChange(event, 'email');
        }}
      />

      <input
        type='password'

        placeholder='Password'

        onChange={event => {
          onChange(event, 'password');
        }}
      />

      <button
        onClick={onSignIn}
      >
        Sign in
      </button>

      <div>
        <p>If you need an account, sign up</p>

        <button
          onClick={() => {
            navigate('/sign-up');
          }}
        >
          Go to sign up
        </button>
      </div>
    </div>
  );
};

export default SignIn;

