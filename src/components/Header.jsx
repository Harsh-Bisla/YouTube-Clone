import React, { useContext } from 'react';
import Logo from "../assets/youtubeLogo.jpg";
import LogoDark from "../assets/logo-dark.png";
import { FaPlus } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoMic } from "react-icons/io5";
import { store } from '../store/contextStore';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";


function Header() {

  // COLLECTING THE FUNCTIONS AND DATA FROM THE STORE
  const { handleClickMenu, sidebar, searchRef, handleSearch, handleModeClick, mode, startVoiceSearch } = useContext(store);
  
  return (
    <nav className={`navbar ${mode ? "navbar-dark" : "  "}`}>
      <div className='logo'>
        <div onClick={handleClickMenu} className='bar-container'>
          <div className={`${sidebar ? "bar1" : "bar"} ${mode ? "bar-dark" : ""}`}></div>
          <div className={`${sidebar ? "bar2" : "bar"} ${mode ? "bar-dark" : ""}`}></div>
          <div className={`${sidebar ? "bar3" : "bar"} ${mode ? "bar-dark" : ""}`}></div>
        </div>
        {mode ? <img width={83} src={LogoDark} alt="Logo" /> : <img width={90} src={Logo} alt="Logo" />}
      </div>
      <div className={`input ${mode ? "input-dark" : ""}`}>
        <div className="input-box">
          <input ref={searchRef} type="text" placeholder="Search" />
          <button onClick={handleSearch} className={`search-btn ${mode ? "search-btn-dark" : ""}`}><CiSearch />
          </button>
        </div>
        <button onClick={startVoiceSearch} className={`mic-btn ${mode ? "mic-btn-dark" : ""}`}><IoMic />
        </button>
        {mode ? <MdOutlineLightMode onClick={handleModeClick} size={22} /> : <MdDarkMode onClick={handleModeClick} size={22} />}
        <button className="create-btn">
          <FaPlus />
          Create</button>
      </div>
      <div className="account">
        <IoIosNotificationsOutline size={28} />
        <div className="mail-logo">H</div>
      </div>
    </nav>
  )
}

export default Header