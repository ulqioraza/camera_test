import { useAtom } from 'jotai';
import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';
import { barcodeModalState, cameraModalState, sBarcode, sCameraAllowed } from '../../../constants/jotai_state';

const CameraCapture = () => {
  const videoElementRef = useRef(null);
  const [barcode, setBarcode] = useAtom(sBarcode);
  const [barcodeModal, setShowBarcodeModal] = useAtom(barcodeModalState);
  const [cameraModal, setShowCameraModal] = useAtom(cameraModalState);

 useEffect(() => {
      const video = videoElementRef.current;
      
      const qrScanner = new QrScanner(
        video,
        (result) => {
          console.log('decoded qr code:', result);
          setBarcode(result.data);
          setShowBarcodeModal(false)
          setShowCameraModal(true)
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      qrScanner.start();
      console.log('start');

      return () => {
        console.log(qrScanner);
        qrScanner.stop();
        qrScanner.destroy();
      };
  }, []);

  return (
    <div>
      <div className="videoWrapper position-relative" style={{ width: '270px', height: '300px' }}>
        <video className="qrVideo" 
                ref={videoElementRef} 
                style={{ objectFit: 'cover',  // video covers the area
                    width: '100%',       // full width
                    height: '100%',  }}/>
      </div>
    </div>
  );
};

export default CameraCapture;
