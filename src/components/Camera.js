import React, { useRef, useState, useEffect} from 'react';

const Camera = ({ onCapture, aspectRatio }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraFacingMode, setCameraFacingMode] = useState('environment');

  useEffect(() => {
    const constraints = { video: { facingMode: cameraFacingMode } };

    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    openCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraFacingMode]);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');
    onCapture(imageData);
  };

  return (
    <div className="camera">
      {stream ? (
        <>
          <video ref={videoRef} autoPlay={true} />
          <button onClick={handleCapture}>Capture</button>
        </>
      ) : (
        <p>No camera available</p>
      )}
      <button onClick={() => setCameraFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user')}>
        Toggle Camera
      </button>
      {/* <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
        <option value="16:9">16:9</option>
        <option value="4:3">4:3</option>
        <option value="1:1">1:1</option>
      </select> */}
    </div>
  );
};

export default Camera;
