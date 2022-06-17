import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [dataPlanets, setDataPlanets] = useState([]);

  const [filters, setFilters] = useState({
    filterBy: {
      name: '',
    },
  });

  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets';

  useEffect(() => {
    const getDataPlanets = async () => {
      const response = await fetch(endpoint);
      const dataAPI = await response.json();
      const Planets = dataAPI.results;
      const filteredPlanets = Planets.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setDataPlanets(filteredPlanets);
    };
    getDataPlanets();
  }, []);

  const contextValue = {
    dataPlanets,
    filters,
    setFilters,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
