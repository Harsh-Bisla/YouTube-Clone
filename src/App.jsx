import './App.css'
import Header from './components/Header'
import ContextProvider from './store/contextStore';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <ContextProvider>
        <Header />
        <Outlet />
      </ContextProvider>
    </>
  )
}

export default App
