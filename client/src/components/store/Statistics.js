import React, { useContext, useEffect } from 'react';
import StoreContext from '../../context/store/storeContext';
const Statistics = () => {
  const { getStatistics, statistics, loading } = useContext(StoreContext);

  useEffect(() => {
    getStatistics();
  }, []);

  if (loading) {
    return <h4>Loading</h4>;
  }
  return (
    <div>
      <h1>Stats</h1>
    </div>
  );
};

export default Statistics;
