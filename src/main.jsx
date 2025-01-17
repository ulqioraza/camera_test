
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
import { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Routedata } from './components/routing/routingdata.jsx'

createRoot(document.getElementById('root')).render(
<Fragment>
    <BrowserRouter>
      <Routes>
        <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
          {Routedata.map((idx) => (
            <Route key={idx.id} path={idx.path} element={idx.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </Fragment>
)
