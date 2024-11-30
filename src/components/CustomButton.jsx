import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const CustomButton = ({ title, w, color, type, icon, py, rounded = "sm", action, loading }) => {
    return (
        <button
            disabled={loading}
            onClick={action}
            type={type}
            className={`p-[1rem] ${color} text-white text-[1rem] ${py} relative overflow-hidden
                rounded-${rounded} ${w} active:scale-[.9] transition-all 
                flex items-center justify-center gap-[.5rem]`}>
            {
                loading && <ThreeCircles
                    height="20"
                    width="20"
                    color="#fff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                />
            }
            {
                loading && <div className="absolute inset-0 bg-black opacity-30 z-10" />
            }
            {icon}
            {title}</button>
    )
}

export default CustomButton