import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaIcons.FaTh/>
        },
        {
            path:"/flashcards",
            name:"Flashcards",
            icon:<FaIcons.FaUserAlt/>
        },
        {
            path:"/flashcards-list",
            name:"Analytics",
            icon:<FaIcons.FaRegChartBar/>
        },
        {
            path:"/comment",
            name:"Comment",
            icon:<FaIcons.FaCommentAlt/>
        },
        {
            path:"/product",
            name:"Product",
            icon:<FaIcons.FaShoppingBag/>
        },
        {
            path:"/productList",
            name:"Product",
            icon:<FaIcons.FaThList/>
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
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
