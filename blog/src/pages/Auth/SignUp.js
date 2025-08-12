import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const onChange = (event, type) => {
    const input = event.target;
    const text = input.value;

    setForm(previous => {
      const newObject = { ...previous };

      newObject[type] = text;

      return newObject;
    });
  };

  const onSignUp = () => {
    console.log(form);
    // api 

    navigate('/sign-in');
  };

  return (
    <div
      className='auth'
    >
      <h1>Sign up</h1>

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

export default SignIn;

