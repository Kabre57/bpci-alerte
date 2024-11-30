import React from 'react'

import { motion } from "framer-motion"
import { RootUserContext } from '../contexts';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IoIosNotifications } from 'react-icons/io';
import NOT_FOUND from "../images/notify.png"

const containerVariants = {



    hidden: {
        opacity: 0,
        x: "2.5vh",
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



const Notification = () => {

    const userContext = React.useContext(RootUserContext)
    const { value, } = useSelector((state) => state.denonciations)

    const countNonReadDenonciations = React.useMemo(() => {
        return Object.values(value)
            .filter(den => den.status)
            .filter(den => ((!den.openByUsers) || (!den.openByUsers.includes(userContext.user?.email))) && true)
    }, [value])

    let navigate = useNavigate();

    return (

        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='p-[2rem] py-[1rem]'>

            <div className="mt-[.5rem] mb-6">
                <h3 className="text-[2.2rem] font-PoppinsSemiBold">Page de Notification</h3>
                <h3 className="text-[.85rem] mt-1">{countNonReadDenonciations.length} notifications retrouvée(s)</h3>
            </div>
            {
                countNonReadDenonciations.length > 0 && countNonReadDenonciations.map(den => {
                    return <div
                        onClick={() => navigate("/denonciation", { state: { data: den } })}
                        class="container transition-all cursor-pointer active:scale-95">
                        <div class="notification">
                            <div class={`icon bg-[var(--color-bpciblue)] text-white `}>
                                <IoIosNotifications
                                    size={22}
                                />
                            </div>
                            <div class="complaint-description">
                                <div class="name">{den.codeplainte}</div>
                                <div className='w-[80%] truncate'>{den.descriptionText || "Non défini"}</div>
                            </div>
                            <div class="timestamp">{den.datePlainte}, {den.heurePlainte}</div>
                        </div>
                    </div>
                })
            }
            {
                countNonReadDenonciations.length === 0 &&
                <div className="flex items-center flex-col justify-center mx-auto mt-[1.5rem]">
                    <div className="max-w-[200px]">
                        <img
                            src={NOT_FOUND}
                            alt="logo"
                        />
                    </div>
                    <p className='text-center'>Ouups les notifications sont vides actuellement.Si de nouvelles notifications sont envoyé elles se chargeront dans un instant.</p>
                </div>
            }
        </motion.div>
    )
}

export default Notification