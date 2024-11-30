import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { IoSearchOutline } from "react-icons/io5";
const CustomInput = ({ w, placeholder, stateValue, setStateValue }) => {
    return (
        <div className={w ? `custom-input full shadow-sm` : `custom-input shadow-sm`}>
            <IoSearchOutline
                size={25}
            />
            <input
                type="text"
                value={stateValue}
                onChange={(e) => setStateValue(e.target.value)}
                placeholder={placeholder ? placeholder : 'Rechercher'}
                name=""
                id="" />
        </div>
    )
}

export default CustomInput