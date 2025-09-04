import React, { useState } from 'react';
import { Save, Scale, Tag } from 'lucide-react';

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'electrónico',
    weight: '',
    cost: '',
    currentPrice: ''
  });

  const productTypes = [
    'electrónico', 'alimenticio', 'textil', 
    'mueble', 'deporte', 'libro', 'juguete'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.weight && formData.cost) {
      onSubmit({
        ...formData,
        weight: parseFloat(formData.weight),
        cost: parseFloat(formData.cost),
        currentPrice: formData.currentPrice ? parseFloat(formData.currentPrice) : null
      });
      setFormData({
        name: '',
        type: 'electrónico',
        weight: '',
        cost: '',
        currentPrice: ''
      });
    }
  };

  return (
    <div className="product-form">
      <h2><Tag size={20} /> Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Producto:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo de Producto:</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            {productTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label><Scale size={16} /> Peso (kg):</label>
          <input
            type="number"
            step="0.01"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Costo ($):</label>
          <input
            type="number"
            step="0.01"
            value={formData.cost}
            onChange={(e) => setFormData({...formData, cost: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Precio Actual ($) (opcional):</label>
          <input
            type="number"
            step="0.01"
            value={formData.currentPrice}
            onChange={(e) => setFormData({...formData, currentPrice: e.target.value})}
          />
        </div>

        <button type="submit" className="submit-btn">
          <Save size={16} /> Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;