import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line,  ResponsiveContainer } from 'recharts';
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00', 2),
  createData('01', 2),
  createData('02', 2),
  createData('03', 2.6),
  createData('04', 2),
  createData('05', 2),
  createData('07', 2.4),
  createData('08', 2),
  createData('09', 2),
  createData('10', 2),
 
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      {/* <Title>Today</Title> */}
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 10,
            left: 14,
          }}
        >
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
        
      </ResponsiveContainer>
    </React.Fragment>
  );
}