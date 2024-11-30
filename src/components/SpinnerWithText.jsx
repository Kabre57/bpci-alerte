import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const SpinnerWithText = ({ text, ali = "center" }) => {
    return (
        <div className={`flex gap-4 items-center w-full justify-${ali} mt-[1rem]`}>
            <ThreeCircles
                height="20"
                width="20"
                color="#0C0E45"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
            <p className='text-center'>{text}</p>
        </div>
    )
}

export default SpinnerWithText