import React from 'react';
import { calculateStatistics } from '../services/priceCalculator';
import PriceChart from './Charts/PriceChart';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,  // ← Añade esta importación
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { DollarSign, Scale, Package, TrendingUp } from 'lucide-react';

const StatisticsDashboard = ({ products, recommendations }) => {
  const stats = calculateStatistics(products);

  if (!stats) {
    return (
      <div className="statistics-dashboard">
        <h2>Estadísticas y Gráficos</h2>
        <p>Agrega productos para ver estadísticas</p>
      </div>
    );
  }

  const typeDistribution = products.reduce((acc, product) => {
    acc[product.type] = (acc[product.type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(typeDistribution).map(([name, value], index) => ({
    name,
    value,
    color: `hsl(${index * 45}, 70%, 50%)`
  }));

  return (
    <div className="statistics-dashboard">
      <h2>Estadísticas y Gráficos</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <DollarSign size={24} />
          <h3>Precio Promedio</h3>
          <p>${stats.avgPrice.toFixed(2)}</p>
        </div>
        
        <div className="stat-card">
          <Scale size={24} />
          <h3>Peso Promedio</h3>
          <p>{stats.avgWeight.toFixed(2)}kg</p>
        </div>
        
        <div className="stat-card">
          <Package size={24} />
          <h3>Total Productos</h3>
          <p>{stats.totalProducts}</p>
        </div>
        
        <div className="stat-card">
          <TrendingUp size={24} />
          <h3>Margen Promedio</h3>
          <p>{((stats.avgPrice / stats.avgCost - 1) * 100).toFixed(1)}%</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-item">
          <PriceChart data={recommendations} />
        </div>
        
        <div className="chart-item">
          <h3>Distribución por Tipo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;