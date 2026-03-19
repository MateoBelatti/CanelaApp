import React from 'react';
import '../../styles/store/categoryFilter.css';
import type { ICategoria } from '../../types/interfaces';

interface Props {
  categories: ICategoria[];
  selected: number;
  onSelect: (cat: number ) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, selected, onSelect }) => {
  return (
    <div className="d-flex flex-wrap gap-2 mb-5 justify-content-center">
      <button
      className={`btn-filter ${selected === 0 ? 'active' : ''}`}
        onClick={() => onSelect(0)}>
        TODOS
      </button>
      {categories.map((cat) => (
        <button
          key={cat.nombre}
          className={`btn-filter ${selected === cat.id_categoria ? 'active' : ''}`}
          onClick={() => onSelect(cat.id_categoria ?? 0)}
        >
          {cat.nombre}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;