import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import PriceRecommendation from './components/PriceRecommendation';
import StatisticsDashboard from './components/StatisticsDashboard';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistema de Recomendación de Precios</h1>
        <p>Analiza y optimiza tus precios según peso y tipo de producto</p>
      </header>

      <div className="app-content">
        <div className="form-section">
          <ProductForm onSubmit={addProduct} />
        </div>

        <div className="results-section">
          <PriceRecommendation 
            products={products} 
            onRecommendationsChange={setRecommendations}
          />
        </div>

        <div className="statistics-section">
          <StatisticsDashboard 
            products={products} 
            recommendations={recommendations} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;