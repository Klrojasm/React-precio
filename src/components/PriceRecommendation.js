import React from 'react';
import { getPriceRecommendations } from '../services/priceCalculator';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const PriceRecommendation = ({ products, onRecommendationsChange }) => {
  const recommendations = getPriceRecommendations(products);

  React.useEffect(() => {
    onRecommendationsChange(recommendations);
  }, [products, onRecommendationsChange]);

  if (products.length === 0) {
    return (
      <div className="price-recommendation">
        <h2>Recomendaciones de Precio</h2>
        <p>Agrega productos para ver recomendaciones</p>
      </div>
    );
  }

  return (
    <div className="price-recommendation">
      <h2>Recomendaciones de Precio</h2>
      <div className="recommendations-grid">
        {recommendations.map((product, index) => (
          <div key={product.id || index} className="recommendation-card">
            <h3>{product.name}</h3>
            <div className="price-details">
              <div className="price-row">
                <span>Costo: ${product.cost}</span>
              </div>
              <div className="price-row">
                <span>Peso: {product.weight}kg</span>
              </div>
              {product.currentPrice && (
                <div className="price-row">
                  <span>Precio Actual: ${product.currentPrice}</span>
                </div>
              )}
              <div className="price-row recommended">
                <strong>Recomendado: ${product.recommendedPrice}</strong>
              </div>
              {product.currentPrice && (
                <div className={`price-row difference ${product.difference > 0 ? 'positive' : 'neutral'}`}>
                  {product.difference > 0 ? (
                    <TrendingUp size={16} />
                  ) : (
                    <Minus size={16} />
                  )}
                  <span>${Math.abs(product.difference).toFixed(2)} ({Math.abs(product.percentageDiff).toFixed(1)}%)</span>
                </div>
              )}
            </div>
            <div className="suggestion">
              <strong>{product.suggestion}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceRecommendation;