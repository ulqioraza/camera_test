// Import necessary modules
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { cameraModalState, sBarcode, sPartType, sUserName } from '../../../constants/jotai_state';
import Webcam from 'react-webcam';
import {Camera} from 'react-camera-pro';
import { BsX } from 'react-icons/bs';
import { copSetSaveImages} from '../../../services/api/api'
import Swal from 'sweetalert2';
// Modal Component
function CameraModal() {
  const [show, setShow] = useAtom(cameraModalState);
  const [partType, setPartType] = useAtom(sPartType)
  const [imageSrc, setImageSrc] = useState([]);
  const [barcode, setBarcode] = useAtom(sBarcode)
  const [usenameDefault, setUsenameDefault] = useAtom(sUserName)
  const [cameraToggle, setCameraToggle] = useState(true)
  const [loading, setLoading] = useState(false);

  const handleClose = async () => {
    setShow(false)
    setBarcode("")
    setCameraToggle(true)
    imageSrc.push([])
    await setImageSrc([])
  };
  const handleShow = () => setShow(true);


  const videoConstraints = {
            //width: 1080,
            //height: 800,
            facingMode: "environment",
            screenshotQuality: 1
    };
  const webcamRef = React.useRef(null);

  const capture = () => {
          const screenshot = webcamRef.current.takePhoto();
          //const pngScreenshot = screenshot.replace(/^data:image\/jpeg/, 'data:image/png');
          imageSrc.push(screenshot)
          
          setImageSrc([...imageSrc])
          console.log(imageSrc)
  }

  const startCamera = () => {
    setCameraToggle(true);
  };

  const stopCamera = () => {
    if (webcamRef.current && webcamRef.current.video.srcObject) {
      const tracks = webcamRef.current.video.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setCameraToggle(false);
  };

  const removeImage = async(index) =>{
      imageSrc.splice(index,1);
      await setImageSrc([...imageSrc])
      console.log(imageSrc)
  }
  useEffect(() => {
      if (webcamRef.current) {
          const videoTrack = webcamRef.current.getVideoTracks?.()[0];
          if (videoTrack && videoTrack.getCapabilities) {
              const capabilities = videoTrack.getCapabilities();
              if (capabilities.focusMode) {
                  videoTrack.applyConstraints({
                      advanced: [{ focusMode: "continuous" }]
                  });
              }
          }
      }
  }, []);

  const copSaveImages = async() => {
    setLoading(true);
    copSetSaveImages({ userId: usenameDefault, partType: partType, barcode: barcode, imgPath:imageSrc})
          .then((result) => { 
            setLoading(false);
            if(result.result == false){
                Swal.fire({
                  title: 'Error',
                  text: result.msg,
                  icon: 'error',
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Close'
                  }).then((result) => {
                      if (result.isConfirmed) {
                          handleClose()
                          document.getElementById("EditForm").submit();
                      }
                  })
              }
            else{ 
              Swal.fire({
                title: 'Success',
                text: result.msg,
                icon: 'success',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleClose()
                        document.getElementById("EditForm").submit();
                    }
                })
              }
            })
  }
  
  return (
    <>
      {/* Modal */}
      <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className='d-flex gap-2'>
              Camera Snapshot ({partType}) 
              {partType == "SCAN.LAT" || partType== "SCAN.ECER16" ? `Barcode: (${barcode})` : ""}
              <div className="form-check form-switch align-content-center" onClick={cameraToggle ? stopCamera : startCamera}>
                {cameraToggle ?
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked/>
                  :
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                }
              </div>
              Show Camera
            </div>
          </Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex flex-wrap row align-items-start'>
            <div className='col-12 col-md-8'>
            {cameraToggle && (
              <div style={{ width: "100%", height: "300px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Camera 
                    ref={webcamRef} 
                    aspectRatio={16 / 10}
                    screenshotFormat="image/png"
                    style={{ width: "640px", height: "480px", objectFit: "contain" }}
                    facingMode='environment' 
                    />
              </div>
              /*<Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  style={{ width: "100%", height: "78vh",  objectFit: "contain",}}
                  videoConstraints={videoConstraints}
              />*/
            )}
            </div>
            <div className="col-12 col-md-4">
              <div className="row">
                {/* Scrollable Container */}
                <div className="col-12 col-md-12 border overflow-scroll pt-3" style={{ height: "78vh",maxHeight: "78vh" }}>
                  {/* Flex Container for Images */}
                  <div className="h-25 col-12 d-flex flex-wrap gap-2">        
                    {imageSrc.map((item, key) => (
                        <div key={key} className="d-flex position-relative" style={{ width: "48%" }}>
                          <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1 close-button"
                            onClick={()=>removeImage(key)}>
                            <BsX width={15} height={15}/>
                          </span>
                        <img
                          src={item}
                          alt={`Captured ${key}`}
                          style={{ width: "100%", marginBottom: "10px", objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex gap-2'>
            <div className='position-absolute start-0 px-3'>
              <Button variant="info" onClick={capture}>
                Take Snapshot
              </Button>
            </div>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
             {loading ?
                <Button variant="primary" onClick={copSaveImages} disabled>
                  <div className='d-flex gap-2'>
                    <div className="spinner"></div> Loading
                  </div> 
                </Button>
                :
                <Button variant="primary" onClick={copSaveImages}>
                  Save Changes
                </Button>
              }
          </div>
        </Modal.Footer>
        
      </Modal>
    </>
  );
}

export default CameraModal;
