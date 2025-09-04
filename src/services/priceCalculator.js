export const calculateRecommendedPrice = (product) => {
  const { type, weight, cost } = product;
  
  // Factores de margen por tipo de producto
  const marginFactors = {
    'electrónico': 1.8,
    'alimenticio': 1.4,
    'textil': 2.2,
    'mueble': 2.0,
    'deporte': 1.9,
    'libro': 1.6,
    'juguete': 2.1
  };

  // Factor por peso (logarítmico)
  const weightFactor = Math.log(weight + 1) * 0.3 + 1;

  const basePrice = cost * marginFactors[type] * weightFactor;
  
  // Redondear a 2 decimales
  return Math.round(basePrice * 100) / 100;
};

export const calculateStatistics = (products) => {
  if (products.length === 0) return null;

  const prices = products.map(p => p.currentPrice || calculateRecommendedPrice(p));
  const costs = products.map(p => p.cost);
  const weights = products.map(p => p.weight);

  return {
    avgPrice: prices.reduce((a, b) => a + b, 0) / prices.length,
    avgCost: costs.reduce((a, b) => a + b, 0) / costs.length,
    avgWeight: weights.reduce((a, b) => a + b, 0) / weights.length,
    maxPrice: Math.max(...prices),
    minPrice: Math.min(...prices),
    totalProducts: products.length
  };
};

export const getPriceRecommendations = (products) => {
  return products.map(product => {
    const recommendedPrice = calculateRecommendedPrice(product);
    const currentPrice = product.currentPrice;
    const difference = currentPrice ? recommendedPrice - currentPrice : 0;
    const percentageDiff = currentPrice ? (difference / currentPrice) * 100 : 0;

    return {
      ...product,
      recommendedPrice,
      difference,
      percentageDiff,
      suggestion: difference > 0 ? 'Aumentar precio' : 'Mantener precio'
    };
  });
};