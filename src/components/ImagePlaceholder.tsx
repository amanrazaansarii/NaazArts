import React from 'react';
import { Package } from 'lucide-react';

interface ImagePlaceholderProps {
  label?: string;
  dimensions?: string;
  aspectRatio?: string;
  className?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label = 'Product Image Space',
  dimensions = '800 x 800',
  aspectRatio,
  className = ''
}) => {
  return (
    <div
      className={`image-placeholder ${className}`}
      style={{ aspectRatio: aspectRatio || 'auto' }}
    >
      <Package className="image-placeholder-icon" />
      <span className="image-placeholder-text">{label}</span>
      <span className="image-placeholder-tag">{dimensions} • Concrete Mold View</span>
    </div>
  );
};
