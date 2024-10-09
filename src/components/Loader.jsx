import React, { useContext } from 'react';
import "./Loader.css"
import { store } from '../store/contextStore';

function Loader() {

  const {mode} = useContext(store);
  return (
  <div className={`spinner ${mode ? "spinner-dark" : ""}`}></div>
  )
}

export default Loader