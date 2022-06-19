import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import '../CSS/Table.css';

function Table() {
  const { dataPlanets, setFilters, filters } = useContext(PlanetsContext);

  const [planetsByName, setPlanetsByName] = useState([]);

  const [planetsFiltereds, setPlanetsFiltereds] = useState([]);

  const handleChange = ({ target }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [target.id]: target.value,
    }));
    console.log(filters);
  };

  const submitFilter = ({ column, comparison, numb }) => {
    if (comparison === 'maior que') {
      setPlanetsFiltereds(dataPlanets
        .filter((planet) => planet[column] > planet[numb]));
    }
    if (comparison === 'igual a') {
      setPlanetsFiltereds(dataPlanets
        .filter((planet) => planet[column] === planet[numb]));
    }
    if (comparison === 'menor que') {
      setPlanetsFiltereds(dataPlanets
        .filter((planet) => planet[column] < planet[numb]));
    }
  };

  useEffect(() => {
    const filterName = dataPlanets.filter((planet) => planet.name.toLowerCase()
      .includes(filters.name.toLowerCase()));
    setPlanetsByName(filterName);
  }, [dataPlanets, filters.name]);

  return (
    <main>
      <div className="center">
        <h2>Star Wars - Planet Search</h2>
        <input
          id="name"
          type="text"
          className="input"
          data-testid="name-filter"
          placeholder="Planet Name"
          onChange={ handleChange }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          onChange={ handleChange }
          name="column"
          id="column"
        >
          {/* <option selected disabled value="">Select...</option> */}
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ handleChange }
          name="quantity"
          id="comparison"
        >
          {/* <option selected disabled value="">Select...</option> */}
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
        <input
          id="numb"
          type="number"
          data-testid="value-filter"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ submitFilter }
        >
          Filtrar
        </button>
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
