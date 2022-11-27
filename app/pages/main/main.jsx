import React from "react";
import Deck from "./deck";
import "./main.css"


const numdecks = [1,2,3,4]


const MainWindow = () => {
  return (
    <React.Fragment>
      <div className="main-container">

      <h1>Main window</h1>
      </div>
      
      <div className="flex-container">
        
        {numdecks.map(() => <Deck />)}
      </div>
    </React.Fragment>
  );
};

export default MainWindow;
