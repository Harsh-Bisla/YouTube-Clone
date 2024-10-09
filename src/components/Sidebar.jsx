import React, { useContext } from 'react';
import "./Sidebar.css"
import { FaFilm } from "react-icons/fa";
import { FaCarCrash } from "react-icons/fa";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { GoTrophy } from "react-icons/go";
import { MdOutlineLocalMovies } from "react-icons/md";
import { MdTravelExplore } from "react-icons/md";
import { MdVideoCall } from "react-icons/md";
import { FaPeopleRobbery } from "react-icons/fa6";
import { MdOutlineTheaterComedy } from "react-icons/md";
import { IoMdHappy } from "react-icons/io";
import { GiNewspaper } from "react-icons/gi";
import { SiStyleshare } from "react-icons/si";
import { MdCastForEducation } from "react-icons/md";
import { MdOutlineScience } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
import { store } from '../store/contextStore';

function Sidebar() {
    const { changecategory, mode } = useContext(store);


    // CREATING THE ARRAY FOR THE SIDEBAR ITEMS
    const sidebarItems1 = [
        { name: "Film & Animation", id: 1, icon: <FaFilm size={22} /> },
        { name: "Autos & Vechiles", id: 2, icon: <FaCarCrash size={22} /> },
        { name: "Music", id: 10, icon: <IoMusicalNotesOutline size={22} /> },
        { name: "Pets & Animals", id: 15, icon: <MdOutlinePets size={22} /> },
        { name: "Sports", id: 17, icon: <GoTrophy /> },
        { name: "Short Movies", id: 18, icon: <MdOutlineLocalMovies size={22} /> },
        { name: "Travel & Events", id: 19, icon: <MdTravelExplore size={22} /> },
        { name: "Video Blogging", id: 21, icon: <MdVideoCall size={22} /> },
        { name: "People & Blogs", id: 22, icon: <FaPeopleRobbery size={22} /> },
        { name: "Comedy", id: 23, icon: <MdOutlineTheaterComedy size={22} /> },
        { name: "Entertainment", id: 24, icon: <IoMdHappy size={22} /> },
        { name: "News & Politics", id: 25, icon: <GiNewspaper size={22} /> },
        { name: "Howto & Style", id: 26, icon: <SiStyleshare size={22} /> },
        { name: "Education", id: 27, icon: <MdCastForEducation size={22} /> },
        { name: "Science & Technology", id: 28, icon: <MdOutlineScience size={22} /> },
        { name: "Nonprofits & Activism", id: 29, icon: <GiProfit size={22} /> },
    ]

    return (
        <section className={`sidebar ${mode ? "sidebar-dark" : ""}`}>
            {sidebarItems1.map((item, index) => {
                return (
                    <div onClick={() => changecategory(item.id)} key={index} className="tab">
                        {item.icon}
                        <p>{item.name}</p>
                    </div>
                )
            })}
            <div className='seperator'></div>

            <div className='seperator'></div>
            <div className='sidebar-bottom'>
                <p>About Press Copyright Contact us Creators Advertise Developers</p>
                <p>TermsPrivacyPolicy & SafetyHow YouTube worksTest new features</p>
                <p id='copyright'>&#169;
                    2024 Google LLC</p>
            </div>
        </section>
    )
}

export default Sidebar