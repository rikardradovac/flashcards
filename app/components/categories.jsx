import React, { useState } from "react";
import "./categories.css"
import { MdOutlineClose } from "react-icons/md";


const Categories = (props) => {

    
    const [categories, setCategories] = store.has("categories") ? useState(store.get("categories")) : useState([]) 
    const [category, setCategory] = useState("")  // used for adding a new category

    const handleCategoriesSubmit = (event) =>  {    
        event.preventDefault;
        if (category == "" || category === " ") {
            return
        }
        let temp = [...categories]

        temp.push(category)
        setCategories(temp)
        store.set("categories", temp)
        
    }


    return props.trigger ? (
        <div className="category-popup">
            <div id="exit-button" onClick={() => props.onClickClose()}><MdOutlineClose size={30}/></div>
            <div className="add-category">
                <form onSubmit={(event) => handleCategoriesSubmit(event)} id="category-form">
                <label htmlFor="add-catetgory">Add new category</label>
                <input value={category} id="add-category" name="add-category" type="text" onChange={(event) => setCategory(event.target.value)}></input>
                <input type="submit" />
                </form>
                <h1>{category}</h1>
            </div>
            <div className="category-content">
                <ul className="categories-list">
                    {categories.map((cat, index) => 
    <li className="category" key={index} onClick={() => props.onClickHandler(cat)}>{cat}</li>)}
                </ul>
            </div>
        </div>
    ) : null;
};

export default Categories;
