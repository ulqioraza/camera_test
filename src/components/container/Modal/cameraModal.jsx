// Import necessary modules
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { cameraModalState, sBarcode, sPartType, sUserName } from '../../../constants/jotai_state';
import Webcam from 'react-webcam';
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

  const handleClose = async () => {
    setShow(false)
    setBarcode("")
    setCameraToggle(true)
    imageSrc.push([])
    await setImageSrc([])
  };
  const handleShow = () => setShow(true);


  const videoConstraints = {
            facingMode: "user"
    };
  const webcamRef = React.useRef(null);

  const capture = () => {
          const screenshot = webcamRef.current.getScreenshot();
          const pngScreenshot = screenshot.replace(/^data:image\/jpeg/, 'data:image/png');
          imageSrc.push(pngScreenshot)
          
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

  const copSaveImages = async() => {
    copSetSaveImages({ userId: usenameDefault, partType: partType, barcode: barcode, imgPath:imageSrc})
          .then((result) => { 
            if(result.result == false){Swal.fire('Error', result.msg, 'error')}
            else{ Swal.fire('Success', result.msg, 'success');}
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
              <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  style={{ width: "100%", height: "78vh",  objectFit: "cover",}}
                  videoConstraints={videoConstraints}
              />
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
            <Button variant="primary" onClick={copSaveImages}>
              Save Changes
            </Button>
          </div>
        </Modal.Footer>
        
      </Modal>
    </>
  );
}

export default CameraModal;
