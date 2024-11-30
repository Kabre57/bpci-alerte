import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'


import { motion } from "framer-motion"

import { modalsImageAsyncThunc, settingImageURLAsyncThunc } from '../redux/slices/modalsSlice';

const containerVariants = {


    hidden: {
        opacity: 0,
        y: "2.5vh",
    },
    visible: {
        opacity: 1,
        y: "0",
        // transition: { duration: .5 }
    },
};


const ModalsImageViewer = () => {

    const dispatch = useDispatch()
    const modalsRed = useSelector((state) => state.modalsRed.showModalsImage)
    const imageURL = useSelector((state) => state.modalsRed.imgUrl)

    return (
        <>
            {
                modalsRed && <div className="absolute inset-0 bg-[#00000093] 
                                z-[900] w-full h-full overflow-y-scroll flex justify-center py-[2rem] ">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit" className="bg-white rounded-md shadow-md h-[75vh] 
                                    max-[1200px]:w-[60vw] 
                                    max-[900px]:w-[70vw] 
                                    max-[700px]:w-[80vw] 
                                    max-[500px]:w-[90vw] 
                                    w-[50vw] max-w-[600px] relative overflow-hidden">
                        <button
                            onClick={() => {
                                dispatch(modalsImageAsyncThunc(false))
                                dispatch(settingImageURLAsyncThunc(""))
                            }} className="absolute right-[1rem] top-[1rem] rounded-full bg-black p-[.4rem]">
                            <IoClose
                                color="white"
                                size={15}
                            />
                        </button>

                        <img src={imageURL} className="w-full h-full object-center" />
                    </motion.div>
                </div>
            }
        </>
    )
}

export default ModalsImageViewer