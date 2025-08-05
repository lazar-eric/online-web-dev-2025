import React from 'react';

function App() {
  const [tasks, setTasks] = React.useState([]);

  const refs = {
    input: React.useRef()
  };

  console.log('Tasks', tasks);

  const createTask = () => {
    const input = refs.input.current;

    const text = input.value;

    if (!text.length) {
      return;
    }

    console.log('Create task', text);

    // Kreiraj novi task
    const task = {
      name: text,
      completed: false
    };

    setTasks(previous => {

      return [
        ...previous,

        task
      ];
    });

    // Obrisi iz inputa trenutnu vrednost 
    input.value = '';
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      createTask();
    }
  };

  const onButtonClick = () => {
    createTask();
  };

  return (
    <div>
      <h1 className="naslov">Todo app</h1>

      <section className="todo">
        <div className="zaglavlje">
          <input
            ref={refs.input}

            type="text"
            placeholder="Šta planiraš da radiš?"
            id="unos"

            onKeyDown={onKeyDown}
          />

          <button
            id="dodaj-dugme"

            onClick={onButtonClick}
          >
            Dodaj
          </button>
        </div>

        <ul id="taskovi" className="taskovi">

        </ul>
      </section>
    </div>
  );
}

export default App;
