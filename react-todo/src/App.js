import React from 'react';

function App() {
  const [tasks, setTasks] = React.useState([]);

  const refs = {
    input: React.useRef()
  };

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

  const onCheckboxChange = (event, index) => {
    const inputCheckbox = event.target;

    console.log('onCheckboxChange', index, inputCheckbox.checked);

    setTasks(previous => {
      previous[index].completed = inputCheckbox.checked;

      return [
        ...previous
      ];
    });
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
          {tasks.map((task, index) => {

            return (
              <li
                key={index}

                className={task.completed ? "task completed" : "task"}
              >
                <input
                  type="checkbox"

                  onChange={event => {
                    onCheckboxChange(event, index);
                  }}
                />

                <p>{task.name}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default App;
