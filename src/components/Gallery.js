import React from 'react';

const Gallery = ({ images, onDelete }) => {
  const handleZoom = (event, image) => {
    // Add zoom functionality here
  };

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <img src={image} alt={`Captured ${index}`} onMouseOver={(e) => handleZoom(e, image)} />
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
