import React, { useContext, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import StoreContext from '../../context/store/storeContext';
const Statistics = () => {
  const { getStatistics, statistics, loading } = useContext(StoreContext);

  useEffect(() => {
    getStatistics();
  }, []);

  if (loading) {
    return <h4>Loading</h4>;
  }
  const { bundles, products, profit, graph } = statistics;

  const createLineGraph = (graphData, type = 'amount', label) => {
    const labels = graphData.map(record => record.date);
    const data = graphData.map(record => record[type]);
    return {
      labels,
      datasets: [
        {
          label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data,
        },
      ],
    };
  };

  const createPieChart = () => {
    const { bundles, products } = profit;
    return {
      labels: ['Products', 'Bundles'],
      datasets: [
        {
          data: [products, bundles],
          backgroundColor: ['#FF6384', '#36A2EB'],
        },
      ],
    };
  };

  return (
    <div>
      <h1>Statistics</h1>

      <div>
        <p>Total Sold Products</p>
        <p>{products}</p>
      </div>

      <div>
        <p>Total Sold Products</p>
        <Line
          data={createLineGraph(
            graph.amount.product,
            'amount',
            'Total Sold Products'
          )}
        />
      </div>

      <div>
        <p>Total Sold Bundles</p>
        <p>{bundles}</p>
      </div>

      <div>
        <p>Total Sold Bundles</p>
        <Line
          data={createLineGraph(
            graph.amount.bundle,
            'amount',
            'Total Sold Bundles'
          )}
        />
      </div>

      <div>
        <p>Total Sold Product Profit</p>
        <p>{profit.products}</p>
      </div>
      <div>
        <p>Total Sold Bundles Profit</p>
        <p>{profit.bundles}</p>
      </div>
      <div>
        <p>Total Profit</p>
        <p>{profit.total}</p>
        <Pie data={createPieChart()} />
      </div>
    </div>
  );
};

export default Statistics;
