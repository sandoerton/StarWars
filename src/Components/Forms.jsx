/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import '../CSS/Forms.css';

function Forms() {
  const {
    dataPlanets, setPlanetsFiltereds,
  } = useContext(PlanetsContext);

  const [planetName, setPlanetName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [addNewFilter, setAddNewFilter] = useState([]);

  const handleChangeName = ({ target }) => {
    setPlanetName(target.value);
    console.log(planetName);
  };

  useEffect(() => {
    const filterName = dataPlanets.filter((planet) => planet.name.toLowerCase()
      .includes(planetName.toLowerCase()));

    console.log(addNewFilter);
    const finalFilter = filterName.reduce((acc, filtro) => acc.filter((planets) => {
      switch (filtro.comparison) {
      case 'maior que':
        return planets[filtro.column] > filtro.value;
      case 'igual a':
        return planets[filtro.column] === filtro.value;
      case 'menor que':
        return planets[filtro.column] < filtro.value;
      default:
        return true;
      }
    }), filterName);

    setPlanetsFiltereds(finalFilter);
  }, [planetName]);

  const submitFilter = () => {
    const filterComparison = {
      column,
      comparison,
      value,
    };
    console.log(filterComparison);
    setAddNewFilter(filterComparison);
  };

  return (
    <form action="">
      <div className="center">
        <h2>Star Wars - Planet Search</h2>
        <input
          id="name"
          type="text"
          className="input"
          data-testid="name-filter"
          placeholder="Planet Name"
          onChange={ handleChangeName }
          value={ planetName }
        />
      </div>
      <div>
        <label htmlFor="column">
          Filter by:
          <select
            id="column"
            name="column"
            data-testid="column-filter"
            onChange={ ({ target }) => setColumn(target.value) }
          >
            {/* <option selected disabled value="">Select...</option> */}
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <select
          id="comparison"
          name="quantity"
          data-testid="comparison-filter"
          onChange={ ({ target }) => setComparison(target.value) }
        >
          {/* <option selected disabled value="">Select...</option> */}
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ value }
          onChange={ ({ target }) => setValue(Number(target.value)) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ submitFilter }
        >
          Filtrar
        </button>
      </div>
      {/* {addNewFilter.map((filter, index) => (
        <p key={ `${index}-${filter.column}` }>
          {`${filter.column} ${filter.comparison} ${filter.value}`}
        </p>
      ))} */}
    </form>
  );
}

export default Forms;
