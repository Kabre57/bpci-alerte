import React from 'react'
import { IoArrowDown, IoArrowUp } from 'react-icons/io5'

import "../styles/Accordion.css"
import { AiOutlineMinus, AiOutlinePlus, } from "react-icons/ai";



const Accordion = ({ title, description }) => {


    const [isActive, setIsActive] = React.useState(false)

    return (
        <div className="accordion">
            <button onClick={() => setIsActive(!isActive)} className="accordion-title">
                <p className="text-[1.1rem] font-PoppinsSemiBold uppercase ">{title}</p>
                {
                    !isActive ? <AiOutlinePlus
                        color={"#0C0E45"}
                        size={18}
                    /> : <AiOutlineMinus
                        color={"#0C0E45"}
                        size={18}
                    />
                }
            </button>

            {/* <div className="brs"></div> */}

            <div className={isActive ? "accordion-description showM" : "accordion-description"}>
                <p className="text-[1.05rem] font-PoppinsLight leading-[2.1rem]">{description}</p>
            </div>
        </div>
    )
}

export default Accordion