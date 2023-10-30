import React from "react";
import "./App.css";
import CounterRow from "./components/CounterRow";

function App() {
  const people = [
    {
      id: 0,
      name: 'Creola Katherine Johnson',
      profession: 'mathematician',
    },
    {
      id: 1,
      name: 'Mario José Molina-Pasquel Henríquez',
      profession: 'chemist',
    },
    {
      id: 2,
      name: 'Mohammad Abdus Salam',
      profession: 'physicist',
    },
    {
      id: 3,
      name: 'Percy Lavon Julian',
      profession: 'chemist',
    },
    {
      id: 4,
      name: 'Subrahmanyan Chandrasekhar',
      profession: 'astrophysicist',
    },
  ];
  let counterRows = [];
  for (let i = 0; i < 5; i++) {
    counterRows.push(<CounterRow key={i} id={i + 1} />);
  }
  const listItems = people.map((person) => <li key={person.id}> {person.name}</li>);


  let guest = 0;
function TeaSet() {
    return (
      <>
        <Cup />
        <Cup />
        <Cup />
      </>
    );
  }

function Cup(props) {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{props.guest}</h2>;
}





  return (
    <>
      <header>
        <h1>Counter application</h1>
      </header>
      <div id='counterContainer'>{counterRows}</div>
      <ul>{listItems}</ul>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}

export default App;
