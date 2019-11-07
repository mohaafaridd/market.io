import React, { useContext, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import moment from 'moment';
import StoreContext from '../../context/store/storeContext';

const Statistics = () => {
  const { getStatistics, statistics, loading } = useContext(StoreContext);

  useEffect(() => {
    getStatistics();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h4>Loading</h4>;
  }

  console.log('statistics', statistics);

  const { bundles, products, profit, graph } = statistics;

  const lineGraphOptions = {
    legend: {
      labels: {
        fontColor: 'white',
        // fontSize: 18,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: 'white',
            // fontSize: 18,
            // stepSize: 1,
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: 'white',
            // fontSize: 14,
            // stepSize: 1,
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const lineGraph = (graph, yaxis, labels = { product: '', bundle: '' }) => {
    const dates = [
      ...graph.product.map(product => product.date),
      ...graph.bundle.map(bundle => bundle.date),
    ].sort();

    const products = graph.product.reduce((acc, current) => {
      const dateIndex = dates.findIndex(date => date === current.date);
      acc[dateIndex] = current[yaxis];
      return acc;
    }, Array(dates.length).fill(0));

    const bundles = graph.bundle.reduce((acc, current) => {
      const dateIndex = dates.findIndex(date => date === current.date);
      acc[dateIndex] = current[yaxis];
      return acc;
    }, Array(dates.length).fill(0));

    const parsedDates = dates.map(date => moment(date).format('DD-MM-YY'));
    return {
      labels: parsedDates,
      datasets: [
        {
          label: labels.product,
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(56,161,105,0.4)',
          borderColor: 'rgba(56,161,105,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(56,161,105,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(56,161,105,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: products,
        },
        {
          label: labels.bundle,
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(213,63,140,0.4)',
          borderColor: 'rgba(213,63,140,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(213,63,140,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(213,63,140,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: bundles,
        },
      ],
    };
  };

  const pieGraph = {
    labels: ['Products', 'Bundles'],
    datasets: [
      {
        data: [profit.products, profit.bundles],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const pieGraphOptions = {
    legend: {
      labels: {
        fontColor: 'white',
        // fontSize: 18,
      },
    },
  };

  return (
    <div className='flex flex-1 flex-col'>
      {/* Sold Units - Start */}
      <section className='flex justify-around p-2'>
        <div className='flex w-2/12 flex-col justify-around'>
          <div className='tile'>
            <p>Total Sold Products</p>
            <p>{products}</p>
          </div>
          <div className='tile'>
            <p>Total Sold Bundles</p>
            <p>{bundles}</p>
          </div>
        </div>

        <div className='tile w-8/12'>
          <Line
            data={lineGraph(graph.amount, 'amount', {
              product: 'Total Sold Products',
              bundle: 'Total Sold Bundles',
            })}
            options={lineGraphOptions}
          />
        </div>
      </section>
      {/* Sold Units - End */}

      {/* Profit Units - Start */}
      <section className='flex justify-around p-2'>
        <div className='flex w-2/12 flex-col justify-around'>
          <div className='tile'>
            <p>Total Sold Product Profit</p>
            <p>{profit.products}</p>
          </div>
          <div className='tile'>
            <p>Total Sold Bundles Profit</p>
            <p>{profit.bundles}</p>
          </div>
        </div>

        <div className='tile w-8/12'>
          <Line
            data={lineGraph(graph.profit, 'profit', {
              product: 'Total Sold Product Profit',
              bundle: 'Total Sold Bundles Profit',
            })}
            options={lineGraphOptions}
          />
        </div>
      </section>
      {/* Profit Units - End */}

      {/* Profit Units - Start */}
      <section className='flex justify-around p-2'>
        <div className='flex w-2/12 flex-col justify-around'>
          <div className='tile'>
            <p>Total Profit</p>
            <p>{profit.total}</p>
          </div>
        </div>

        <div className='tile w-8/12'>
          <Pie data={pieGraph} options={pieGraphOptions} />
        </div>
      </section>
      {/* Profit Units - End */}
    </div>
  );
};

export default Statistics;
