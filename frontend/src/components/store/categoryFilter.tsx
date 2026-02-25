import React from 'react';
import '../../styles/store/categoryFilter.css';

interface Props {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, selected, onSelect }) => {
  return (
    <div className="d-flex flex-wrap gap-2 mb-5 justify-content-center">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`btn-filter ${selected === cat ? 'active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;