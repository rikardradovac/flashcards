import React from "react";
import "./categories.css"


const Categories = (props) => {

    const categories =  "categories" in localStorage ? JSON.parse(localStorage.getItem("categories")) : null
    const cats = ["cat1", "cat2", "cat3"]
    const listCars = cats.map((category, index) => 
    <li className="category" key={index} onClick={() => props.onClickHandler(category)}>{category}</li>)


    return props.trigger ? (
        <div className="category-popup">
            <div className="category-content">

                <ul className="categories-list">
                    {listCars}
                </ul>
            </div>
        </div>
    ) : null;
};

export default Categories;
