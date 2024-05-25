// import './index.css'
import './App.css'
import { Provider } from 'react-redux'
import store from './store/store'
import AppRoutes from './routes/routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import { setItemToLocalStorage } from './utils/localStorage';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    setItemToLocalStorage('userId', '664de740835b08b634646081')
  }, [])
  return (
    <>
      <Provider store={store}>
        <AppRoutes />
        <Toaster></Toaster>
      </Provider>
    </>
  )
}

export default App
