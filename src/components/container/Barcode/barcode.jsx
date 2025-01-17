import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import barcode from '../../../assets/images/barcode.png'
import camera from '../../../assets/images/camera.png'
import Webcam from 'react-webcam'
import BarcodeScannerComponent from 'react-qr-barcode-scanner'
import BarcodeModal from '../Modal/barcodeModal'
import { useAtom } from 'jotai'
import { barcodeModalState, cameraModalState, sPartType } from '../../../constants/jotai_state'
import CameraModal from '../Modal/cameraModal'

const Barcode = () => {
    const [barcodeModal, setShowBarcodeModal] = useAtom(barcodeModalState);
    const [cameraModal, setShowCameraModal] = useAtom(cameraModalState);
    const [partType, setPartType] = useAtom(sPartType)

    const  tab_barcode = [{id:1, image:barcode, text:"LAT Test", partType: "SCAN.LAT"},
                            {id:2, image:barcode, text:" ECER16 Test", partType: "SCAN.ECER16"}
                        ]
    const tab_camera = [{id:1, image:camera, text:"New Model", partType: "MANUAL.NEWMODEL"},
                        {id:2, image:camera, text:"ECR", partType: "MANUAL.ECR"},
                        {id:3, image:camera, text:"Special request (Machine repair)", partType:"MANUAL.SPECIAL"}
                        ];

    const showBarcodeModal = (partType) =>{
        setShowBarcodeModal(true);
        setPartType(partType)
    }

    const showCameraModal = (partType) => {
        setShowCameraModal(true);
        setPartType(partType)
    }
  return (
    <div className="d-flex">
        <div className="container-xxl">
            <div className='col-md-4 '>
                <div className='tab-list'>
                    <span className='text'>
                        Barcode
                    </span>
                </div>
            </div>
            <div className="row">
                {tab_barcode.map((item,index) => (
                    <div className="col-md-4 border-row" key={index} onClick={()=>showBarcodeModal(item.partType)}>
                        <div className="mb-3 border-tab-radius shadow ">
                            <div className="card-body text-center menu" id="divLAT">
                                <i className="bi bi-house-door"></i>
                                <div className='d-flex align-items-center gap-3'>
                                    <div className='border-tab-icon'>
                                        <Image
                                            src={item.image}
                                            width={50}
                                            height={25}
                                        />
                                    </div>
                                    <p className="card-text text-tab"> {item.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='col-md-4'>
                <div className='tab-list'>
                    <span className='text'>
                        Camera
                    </span>
                </div>
            </div>
            <div className="row d-flex mb-4">
                {tab_camera.map((item,index) => (
                    <div className="col-md-5 col-lg-4 border-row" key={index} onClick={()=>showCameraModal(item.partType)}>
                        <div className="mb-3 border-tab-radius shadow ">
                            <div className="card-body text-center menu" id="divLAT">
                                <i className="bi bi-house-door"></i>
                                <div className='d-flex align-items-center gap-3'>
                                    <div className='border-tab-icon'>
                                        <Image
                                            src={item.image}
                                            width={50}
                                            height={31}
                                        />
                                    </div>
                                    <p className="card-text text-tab"> {item.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))} 
            </div>
            <BarcodeModal/>
            <CameraModal/>
        </div>
    </div>
  )
}
export default Barcode