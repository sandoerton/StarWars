import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import '../CSS/Table.css';

function Table() {
  const { dataPlanets, setFilters, filters } = useContext(PlanetsContext);

  const [planetsByName, setPlanetsByName] = useState([]);

  const handleChange = ({ target }) => {
    setFilters({
      ...filters,
      filterBy: {
        name: target.value,
      } });
  };

  useEffect(() => {
    const filterName = dataPlanets.filter((planet) => planet.name.toLowerCase()
      .includes(filters.filterBy.name.toLowerCase()));
    setPlanetsByName(filterName);
  }, [dataPlanets, filters]);

  return (
    <main>

      <div className="center">
        <h2>Star Wars - Planet Search</h2>
        <input
          type="text"
          className="input"
          data-testid="name-filter"
          placeholder="Planet Name"
          onChange={ handleChange }
        />
      </div>
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
          { planetsByName.map((planet, index) => (
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
    </main>
  );
}

export default Table;
