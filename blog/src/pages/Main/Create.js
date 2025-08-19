import React from 'react';
import { useNavigate } from 'react-router-dom';

import { API } from '../../utils';

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    name: '',
    description: ''
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

  const onCreate = async () => {
    // očistimo grešku prethodnog zahteva 
    setError('');

    const result = await API.post('/posts', form);

    if (result.status >= 400) {
      setError(result.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Create</h1>

      {error && (
        <p className='error'>{error}</p>
      )}

      <input
        placeholder='Name'

        onChange={event => {
          onChange(event, 'name');
        }}
      />

      <textarea
        placeholder='Description'

        onChange={event => {
          onChange(event, 'description');
        }}

        rows={15}
      />

      <button
        onClick={onCreate}
      >
        Create post
      </button>
    </div>
  );
};

export default Create;

