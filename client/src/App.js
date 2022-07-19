import * as React from 'react';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

export default function App() {
  const [data, setData] = useState([
    { year: '1950', population: 2.525 },
    { year: '1960', population: 3.018 },
    { year: '1970', population: 3.682 },
    { year: '1980', population: 4.44 },
    { year: '1990', population: 5.31 },
    { year: '2000', population: 6.127 },
    { year: '2010', population: 6.83 },
  ]);
  useEffect(() => {
    const socket = io.connect('http://localhost:4000');

    socket.on('data', (newData) => {
      let population = data;
      population = population.filter((obj, index) => index !== 0);
      setData([...population, newData]);
    });
  }, []);

  return (
    <>
      <Paper>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="population" argumentField="year" />
          <Title text="World population" />
          <Animation />
        </Chart>
      </Paper>
      {data.map((obj) => {
        return (
          <>
            {obj.year},{obj.population}
          </>
        );
      })}
    </>
  );
}
