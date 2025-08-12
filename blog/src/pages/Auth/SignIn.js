import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = (props) => {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
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

  const onSignIn = () => {
    console.log(form);

    // api 

    props.onSignIn();
  };

  return (
    <div
      className='auth'
    >
      <h1>Sign in</h1>

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

