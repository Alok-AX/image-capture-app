import React, { useState } from 'react';
import Camera from './components/Camera';
import Gallery from './components/Gallery';

const App = () => {
  const [capturedImages, setCapturedImages] = useState([]);
  const [cameraFacingMode, setCameraFacingMode] = useState('environment');
  const [aspectRatio, setAspectRatio] = useState('16:9');

  const handleCaptureImage = (imageData) => {
    setCapturedImages([...capturedImages, imageData]);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...capturedImages];
    newImages.splice(index, 1);
    setCapturedImages(newImages);
  };

  return (
    <div className="app">
      <Camera
        onCapture={handleCaptureImage}
        cameraFacingMode={cameraFacingMode}
        setCameraFacingMode={setCameraFacingMode} // Pass the function as prop
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio} // Pass the function as prop
      />
      <Gallery images={capturedImages} onDelete={handleDeleteImage} />
    </div>
  );
};

export default App;


