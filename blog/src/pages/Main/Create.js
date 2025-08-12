import React from 'react';

const Create = () => {
  const [form, setForm] = React.useState({
    title: '',
    text: ''
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

  const onCreate = () => {
    console.log(form);
  };

  return (
    <div>
      <h1>Create</h1>

      <div>
        <input
          placeholder='Title'

          onChange={event => {
            onChange(event, 'title');
          }}
        />
      </div>

      <div>
        <textarea
          placeholder='Text'

          onChange={event => {
            onChange(event, 'text');
          }}
        />
      </div>

      <button
        onClick={onCreate}
      >
        Create post
      </button>
    </div>
  );
};

export default Create;

