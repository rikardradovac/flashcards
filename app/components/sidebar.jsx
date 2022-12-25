import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import "./Sidebar.css";
import { GiCardRandom } from "react-icons/gi"
import { BsViewList } from "react-icons/bs"
import { RiLayoutMasonryFill } from "react-icons/ri"
import { IoIosOptions } from "react-icons/io"
import { IoIosApps } from "react-icons/io"


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<RiLayoutMasonryFill/>
        },
        {
            path:"/flashcards",
            name:"Flashcards",
            icon:<GiCardRandom />
        },
        {
            path:"/flashcards-list",
            name:"List",
            icon:<BsViewList/>
        },
        {
            path:"/text-generation",
            name:"Generation",
            icon:<FaIcons.FaRobot/>
        },
        {
            path:"/options",
            name:"Options",
            icon:<IoIosOptions />
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo"><IoIosApps size={30}/></h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       {isOpen ? <AiIcons.AiOutlineClose onClick={toggle}/> :<FaIcons.FaBars onClick={toggle}/>}
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;
