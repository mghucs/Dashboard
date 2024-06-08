import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Conversions',
      },
    },
  };
  
  const labels = ['2022-01-01', '2022-04-04'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'CAD',
        data: labels.map(() => 1.5),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'USD',
        data: labels.map(() => 2.5),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
function Chart() {
    return (
        <Line
            options={options}
            data={data}
        />
    );
}

export { Chart }