import React from 'react'

import { Link } from 'react-router-dom';

import { motion } from "framer-motion"


const containerVariants = {


    hidden: {
        opacity: 0,
        x: "-2.5vh",
    },
    visible: {
        opacity: 1,
        x: "0",
        // transition: { duration: .5 }
    },
    exit: {
        x: "-2.5vh",
        opacity: 0,
        transition: { ease: 'easeInOut' },
    }
};
const Page404 = () => {

    return (
        <div className="bg-white w-full pt-[1rem]">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed-w h-screen  flex justify-start pt-[2rem] gap-[1rem] flex-col items-center w-full" >

                {/* <figure>
                    <img src={CustomIMG2} alt="user Profile" />
                </figure> */}

                <div className="px-5 flex items-center justify-center flex-col gap-5">
                    < h1 className="text-[var(--color-bpciblue)] text-8xl font-PoppinsSemiBold" > 404.</h1 >
                    <h1 className="text-[var(--color-bpciblue)] text-2xl  text-center font-PoppinsSemiBold">Ouuups ce contenu n'existe pas pour l'instant.</h1>
                    <p className="text-[var(--color-bpciblue)]">Veuillez bien revenir en lieu sûr.</p>
                </div>

                <Link
                    to={"/"}
                    // onClick={handleLog}
                    className="bg-[var(--color-bpciblue)]
                        focus:outline-none 
                        text-sm
                        focus:ring-2
                        focus:ring-violet-300
                            py-2 text-white px-5
                            rounded-md">
                    Revenir en lieu sûr
                </Link>
            </motion.div>
        </div>
    )
}

export default Page404