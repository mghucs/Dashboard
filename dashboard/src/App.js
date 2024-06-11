import './App.css';
import React, { useState, useEffect } from 'react';
import {Chart} from './components/Chart.js';
import {Grid} from './components/Grid.js';

function App() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  const [gridData, setGridData] = useState({});

  const USD = "USD";
  const CAD = "CAD";
  const EUR = "EUR";
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/app/');
        const currencies = await response.json();
        
        setLoading(false);
        const dates = Object.keys(currencies);
        setChartData(
          {
          labels: dates,
          datasets: [
            {
              label: CAD,
              data: dates.map((date) => currencies[date][CAD]),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: USD,
              data: dates.map((date) => currencies[date][USD]),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: EUR,
              data: dates.map(() => 1),
              borderColor: 'rgb(0, 232, 116)',
              backgroundColor: 'rgba(0, 232, 116, 0.8)',
            },
          ],
        }
      );

      setGridData( 
        Object.entries(currencies).map(([date, conversion]) => ({
          Date: date,
          USD: conversion.USD,
          CAD: conversion.CAD
        }))
      );
     
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchCurrencies();
  }, []);

  return (
    !loading ? (
      <>
        <Chart chartData={chartData} />
        <Grid gridData={gridData} />
      </>
    ) : <></>
  );
}

export default App