import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import Videos from './Videos';
import { store } from '../store/contextStore';

function Home() {
  const { sidebar, loading } = useContext(store)

  return (
    <section className='home-section'>
      <div style={{ left: sidebar == false ? "-80%" : "0%" }} className='sidebar-wrapper'><Sidebar /></div>
      <div className='videos-home'><Videos />
      </div>
    </section>
  )
}

export default Home