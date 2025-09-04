import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const PriceChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar</p>;
  }

  const chartData = data.map((product, index) => ({
    name: product.name.substring(0, 15) + '...',
    precioActual: product.currentPrice || 0,
    precioRecomendado: product.recommendedPrice || 0,
    costo: product.cost
  }));

  return (
    <div className="chart-container">
      <h3>Comparación de Precios</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="costo" fill="#8884d8" name="Costo" />
          <Bar dataKey="precioActual" fill="#82ca9d" name="Precio Actual" />
          <Bar dataKey="precioRecomendado" fill="#ff7300" name="Precio Recomendado" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;