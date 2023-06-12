import React from 'react';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images, onItemClick }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem
          image={image}
          key={image.id}
          onItemClick={onItemClick}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;
