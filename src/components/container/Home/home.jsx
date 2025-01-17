import React from 'react'
import Imagesdata from '../../../constants/imagesdata'

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <img src={Imagesdata("autolivlogo")} alt="logo" className="desktop-logo" />
    </div>
  )
}
export default Home