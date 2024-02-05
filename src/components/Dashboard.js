import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { getProducers } from '../api/producers';
import { mockProducers } from '../mocks/producers';

function Dashboard() {
  const [producers, setProducers] = useState([]);
  const [totalArableArea, setTotalArableArea] = useState(0);
  const [totalVegetationArea, setTotalVegetationArea] = useState(0);

  useEffect(() => {
    getProducers()
      .then(producers => {
        setProducers(producers);
        setTotalArableArea(producers.reduce((total, producer) => total + producer.arableArea, 0));
        setTotalVegetationArea(producers.reduce((total, producer) => total + producer.vegetationArea, 0));
      })
      .catch(error => {
        setProducers(mockProducers);
        setTotalArableArea(mockProducers.reduce((total, producer) => total + producer.arableArea, 0));
        setTotalVegetationArea(mockProducers.reduce((total, producer) => total + producer.vegetationArea, 0));
      });
  }, []);

  const groupBy = (key) => producers.reduce((result, producer) => {
    (result[producer[key]] = (result[producer[key]] || 0) + 1);
    return result;
  }, {});

  const pieDataByState = Object.entries(groupBy('state')).map(([name, value]) => ({ name, value }));
  const groupByCrop = producers.reduce((acc, producer) => {
    producer.crops.forEach(crop => {
      acc[crop] = (acc[crop] || 0) + 1;
    });
    return acc;
  }, {});
  const pieDataByCrop = Object.entries(groupByCrop).map(([name, value]) => ({ name, value }));

  const totalFarms = producers.length;
  const totalArea = producers.reduce((total, producer) => total + producer.totalArea, 0);

  const pieDataByLandUse = [
    { name: 'Área agricultável', value: totalArableArea },
    { name: 'Área de vegetação', value: totalVegetationArea },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  const cardStyle = {
    backgroundColor: '#f9f9f9',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    flex: '1 1 0',
    margin: '10px',
    textAlign: 'center',
  };

  const chartContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    color: '#333',
  };

  return (
    <div>
      <div style={chartContainerStyle}>
        <div style={cardStyle}>
          <h2>Total de fazendas: {totalFarms}</h2>
          <h2>Total de hectares: {totalArea}</h2>
        </div>

        <div style={cardStyle}>
          <h2>Proporção de fazendas por estado</h2>
          <PieChart width={400} height={400}>
            <Pie dataKey="value" data={pieDataByState} cx={200} cy={200} outerRadius={80} label>
              {
                pieDataByState.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div style={cardStyle}>
          <h2>Proporção de fazendas por cultura</h2>
          <PieChart width={400} height={400}>
            <Pie dataKey="value" data={pieDataByCrop} cx={200} cy={200} outerRadius={80} label>
              {
                pieDataByCrop.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div style={cardStyle}>
          <h2>Proporção de uso da terra</h2>
          <PieChart width={400} height={400}>
            <Pie dataKey="value" data={pieDataByLandUse} cx={200} cy={200} outerRadius={80} label>
              {
                pieDataByLandUse.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;