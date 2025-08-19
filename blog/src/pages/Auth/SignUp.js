import React from 'react';
import { useNavigate } from 'react-router-dom';

import { API } from '../../utils';

const SignUp = (props) => {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    name: '',
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

  const onSignUp = async () => {
    // očistimo grešku prethodnog zahteva 
    setError('');

    const result = await API.post('/sign-up', form);

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
      <h1>Sign up</h1>

      {error && (
        <p className='error'>{error}</p>
      )}

      <input
        placeholder='Full name'

        onChange={event => {
          onChange(event, 'name');
        }}
      />

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
        onClick={onSignUp}
      >
        Sign up
      </button>

      <div>
        <p>If you already have an account, sign in</p>

        <button
          onClick={() => {
            navigate('/sign-in');
          }}
        >
          Go to sign in
        </button>
      </div>
    </div>
  );
};

export default SignUp;

