import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"

import { motion } from "framer-motion"

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { modalsImageAsyncThunc, modalsPDFAsyncThunc, settingImageURLAsyncThunc, settingPDFURLAsyncThunc } from '../redux/slices/modalsSlice';

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


const ModalsPDFViewer = () => {

    const dispatch = useDispatch()
    const { showModalsPDF, pDFUrl } = useSelector((state) => state.modalsRed)
    const newPlugin = defaultLayoutPlugin()

    // console.log("pDFUrl", pDFUrl)

    return (
        <>
            {
                showModalsPDF && <div className="absolute inset-0 bg-[#00000093] 
                                z-[900] w-full h-full overflow-y-scroll flex justify-center py-[2rem] ">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit" className="bg-white rounded-md shadow-md h-[95vh] 
                                    w-[90vw] max-w-[1500px] relative overflow-hidden">
                        <button
                            onClick={() => {
                                dispatch(modalsPDFAsyncThunc(false))
                                dispatch(settingPDFURLAsyncThunc(""))
                            }} className="absolute z-[9000] right-[1rem] top-[1rem] rounded-full bg-black p-[.4rem]">
                            <IoClose
                                color="white"
                                size={15}
                            />
                        </button>

                        {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                            {
                                pDFUrl && <Viewer fileUrl={pDFUrl} plugins={newPlugin} />
                            }
                            {
                                !pDFUrl && <p>No data</p>
                            }
                        </Worker> */}

                        <div className="mt-[3rem]">
                            <DocViewer
                                documents={[{ uri: pDFUrl }]}
                                pluginRenderers={DocViewerRenderers} />
                        </div>
                        {/* <ReactPDF
                            file={{
                                url: 'http://www.example.com/sample.pdf'
                            }}
                        /> */}
                    </motion.div>
                </div>
            }
        </>
    )
}

export default ModalsPDFViewer