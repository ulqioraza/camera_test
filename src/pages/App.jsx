import { useEffect, useState } from 'react'
import '../assets/styles/style.scss'
import { Provider } from 'react-redux'
import store from '../states/redux/store'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from '../components/layout-component/header/customNavbar'
import Footer from '../components/layout-component/footer/footer'
import { useAtom } from 'jotai'
import { sUserName } from '../constants/jotai_state'
import { copGetUser } from '../services/api/authen_api'

function App() {
  const [lateLoad, setlateLoad] = useState(false);
  const [cntAutoSignin, setCntAutoSignin] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [usenameDefault, setUsenameDefault] = useAtom(sUserName)
  const [loginOther, setLoginOther] = useState(false)

  useEffect(() => {
    setlateLoad(true);
  });
  
  const copHandleCallAPIGetUser = async () => {
    copGetUser().then((result) => {
      const _username = (result?.result && result?.result.length ? result?.result : '')
      setUsenameDefault(_username)
      setLoginOther(_username ? false : true)
      setIsLoading(false)
      if (_username) {
        setCntAutoSignin(3)
      }
    })
  }

  const copHandleCallAPIGetLogin = async (params) => {
    setLoginOther(true)
    setIsLoading(true)
    copGetLogin(params).then((result) => {
      if (result && result.result && result.statuscode && result.statuscode < 400) {
        SetUserAuthen({ username: result.result.user_id || 'Login Please', isauthen: (result.result.user_id ? true : false), expiredate: new Date(Date.now() +  8 * 60 * 60 * 1000).toISOString(), userpermission: result.result.functions })
      } else if (result.statuscode && result.statuscode >= 400) {
        toast.error(`API - GetLogin`, { autoClose: 3000 })
      }
      setIsLoading(false)
    })
  }

  useEffect(() => {
    copHandleCallAPIGetUser()
  }, [])
  return (
    <Provider store={store}>
      <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
        <div className='page' style={{paddingBottom:"60px"}}>
        <CustomNavbar/>
          <div className='main-content app-content'>
            <div className='container-fluid mt-4 mb-4'>
              <Outlet />
            </div>
          </div>
         
        </div>
        <Footer />
      </div>
    </Provider>
  )
}

export default App
