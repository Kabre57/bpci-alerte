import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"

import { motion } from "framer-motion"

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { modalsConfirmAsyncThunc, modalsImageAsyncThunc, modalsPDFAsyncThunc, settingImageURLAsyncThunc, settingPDFURLAsyncThunc } from '../redux/slices/modalsSlice';
import CustomButton from './CustomButton'
import { ref, remove } from 'firebase/database'
import { db } from '../plugins/firebase'

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


const ModalsConfirm = () => {

    const dispatch = useDispatch()
    const { showModalsConfirm, idForDelete } = useSelector((state) => state.modalsRed)
    const newPlugin = defaultLayoutPlugin()
    const [password, setPassword] = useState('');

    // console.log("pDFUrl", pDFUrl)

    return (
        <>
            {
                showModalsConfirm && <div className="absolute inset-0 bg-[#00000093] 
                                z-[900] w-full h-full overflow-y-scroll flex items-start justify-center py-[2rem] ">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white rounded-md shadow-md p-[2rem] pt-[1.25rem]
                                    w-full max-w-[410px] relative overflow-hidden">

                        <h2 className='font-PoppinsSemiBold mb-[1rem] text-[1.05rem] 
                            text-center w-3/4 mx-auto'>Saisissez votre mot de passe pour confirmer</h2>
                        <p className=''>Saisissez votre mot de passe pour confirmer</p>
                        <div className="w-full mb-[1rem]">
                            {/* <label htmlFor="email">Email </label> */}
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder='Mot de passe'
                                className="border border-bpcidark"
                                style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => {
                                dispatch(modalsConfirmAsyncThunc(false))
                            }} className="absolute z-[9000] right-[1rem] top-[1rem] rounded-full bg-black p-[.4rem]">
                            <IoClose
                                color="white"
                                size={15}
                            />
                        </button>

                        <CustomButton
                            // loading={simulateLoading}
                            rounded='lg'
                            action={() => {
                                console.log(idForDelete)
                                if ((idForDelete.length > 0) && password.length > 0) {
                                    remove(ref(db, 'plaintes/' + idForDelete)).then(() => {
                                        window.history.back()
                                        dispatch(modalsConfirmAsyncThunc(false))
                                        setPassword("")
                                    });
                                    return;
                                }
                                // navigate('/')
                                //handle_login()
                            }}
                            py={"py-[.5rem]"}
                            color={"bg-[var(--color-bpciblue)]"}
                            w={"w-full"}
                            title="Confirmer"
                        />
                    </motion.div>
                </div>
            }
        </>
    )
}

export default ModalsConfirm