import React from 'react';
import './App.css';
import Forms from './Components/Forms';
import Table from './Components/Table';
import PlanetsProvider from './Context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Forms />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
