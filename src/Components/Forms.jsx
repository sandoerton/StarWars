import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import '../CSS/Forms.css';

function Forms() {
  const { dataPlanets, setPlanetsFiltereds } = useContext(PlanetsContext);

  const [planetName, setPlanetName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [quant, setQuant] = useState(0);
  const [numericFilter, setNumericFilter] = useState([]);

  const handleChangeName = ({ target }) => {
    setPlanetName(target.value);
  };

  const submitFilter = () => {
    const newFilterComparison = {
      column,
      comparison,
      quant,
    };
    setNumericFilter([...numericFilter, newFilterComparison]);

    console.log(numericFilter);
  };

  useEffect(() => {
    const filterName = dataPlanets.filter((planet) => planet.name.toLowerCase()
      .includes(planetName.toLowerCase()));

    const finalFilter = numericFilter.reduce(
      (acc, filtro) => acc.filter((planets) => {
        console.log('filtroreduce: ', filtro);
        switch (filtro.comparison) {
        case 'maior que':
          return planets[filtro.column] > filtro.quant;
        case 'igual a':
          return Number(planets[filtro.column]) === filtro.quant;
        case 'menor que':
          return planets[filtro.column] < filtro.quant;
        default:
          return true;
        }
      }),
      filterName,
    );

    setPlanetsFiltereds(finalFilter);
  }, [dataPlanets, numericFilter, planetName, setPlanetsFiltereds]);

  const handleDelete = (index) => {
    const newFiters = numericFilter.filter((_filtro, itemIndex) => itemIndex !== index);
    setNumericFilter(newFiters);
  };

  const handleDeleteAll = () => {
    setNumericFilter([]);
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
      <div className="line">
        <label className="lab" htmlFor="column">
          { 'Filter by: ' }
          <select
            id="column"
            name="column"
            className="selec"
            data-testid="column-filter"
            value={ column }
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
          className="selec"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ ({ target }) => setComparison(target.value) }
        >
          {/* <option selected disabled value="">Select...</option> */}
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
        <input
          type="number"
          className="numb"
          data-testid="value-filter"
          value={ quant }
          onChange={ ({ target }) => setQuant(Number(target.value)) }
        />
        <button
          type="button"
          className="btn-filt"
          data-testid="button-filter"
          onClick={ submitFilter }
        >
          Filtrar
        </button>
        <button
          type="button"
          className="btn-del-all-filt"
          data-testid="button-remove-filters"
          onClick={ handleDeleteAll }
        >
          REMOVER FILTROS
        </button>
      </div>
      <ul>
        Filtros:
        {numericFilter.map((filter, index) => (
          <li
            className="li-filt"
            data-testid="filter"
            key={ `${index}-${filter.column}` }
          >
            {`${filter.column} ${filter.comparison} ${filter.quant}`}
            <button
              className="btn-del-filt"
              type="button"
              onClick={ () => handleDelete(index) }
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Forms;
