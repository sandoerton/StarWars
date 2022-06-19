import React, { useContext } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import '../CSS/Table.css';

function Table() {
  const { planetsFiltereds } = useContext(PlanetsContext);

  // const submitFilter = ({ column, comparison, numb }) => {
  //   if (comparison === 'maior que') {
  //     setPlanetsFiltereds(dataPlanets
  //       .filter((planet) => planet[column] > planet[numb]));
  //   }
  //   if (comparison === 'igual a') {
  //     setPlanetsFiltereds(dataPlanets
  //       .filter((planet) => planet[column] === planet[numb]));
  //   }
  //   if (comparison === 'menor que') {
  //     setPlanetsFiltereds(dataPlanets
  //       .filter((planet) => planet[column] < planet[numb]));
  //   }
  // };

  return (
    <table border={ 1 } className="tabela">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { planetsFiltereds.map((planet, index) => (
          <tr
            className={ index % 2 === 0 ? 'par' : 'impar' }
            key={ index }
          >
            <td data-testid="planet-name">{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films.map((film) => film) }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
