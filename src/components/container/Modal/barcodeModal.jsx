// Import necessary modules
import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { barcodeModalState, sCameraAllowed } from '../../../constants/jotai_state';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import Swal from 'sweetalert2';
import CameraCapture from './cameraCapture';

// Modal Component
function BarcodeModal() {
  const [show, setShow] = useAtom(barcodeModalState);
  const [barcodeData, setBarcodeData] = useState("")
  const [allowedCamera, setAllowedCamera] = useAtom(sCameraAllowed)

  const handleClose = () => {
    setShow(false)
    setAllowedCamera(true)
  };
  const handleShow = () => setShow(true);
 
  return (
    <>
      {/* Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" size='sm'>
        <Modal.Header closeButton>
          <Modal.Title>Scan Barcode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <CameraCapture />
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default BarcodeModal;
