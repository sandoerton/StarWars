import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import '../CSS/Forms.css';

function Forms() {
  const {
    dataPlanets, setPlanetsFiltereds,
  } = useContext(PlanetsContext);

  const [planetName, setPlanetName] = useState('');

  const handleChangeName = ({ target }) => {
    setPlanetName(target.value);
    console.log(planetName);
  };

  useEffect(() => {
    const filterName = dataPlanets.filter((planet) => planet.name.toLowerCase()
      .includes(planetName.toLowerCase()));
    setPlanetsFiltereds(filterName);
  }, [dataPlanets, planetName, setPlanetsFiltereds]);

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
        <select
          id="column"
          name="column"
          data-testid="column-filter"
          // onChange={ handleChange }
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
          // onChange={ handleChange }
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
          // onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          // onClick={ submitFilter }
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}

export default Forms;
