import React from 'react'
import { IoArchive, IoArrowForward, IoCheckmarkCircle, IoClose, IoCloseCircle, IoExtensionPuzzleSharp, IoMenu, IoNotifications, IoOptionsOutline, IoPeopleCircle, IoPersonCircle, IoPersonCircleOutline, IoSettings } from 'react-icons/io5'
import { NavLink, useLocation } from 'react-router-dom'
import { media } from '../libs/media'
import { ImClock } from "react-icons/im";

import { motion } from "framer-motion"


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
const DashBoardSideBar = () => {

    const location = useLocation();
    const [showMobNavs, setShowMobNavs] = React.useState(false)
    const [isActive, setIsActive] = React.useState(`${location?.pathname}`)

    React.useEffect(() => {
        setIsActive(`${location?.pathname}`)
    }, [location])

    return (
        <>
            <div id="dashB" className="max-w-[322.5px] max-lg:invisible max-lg:hidden w-full bg-[var(--color-bpciv2Graye)] px-[2rem] overflow-y-scroll bg-[background: #F5F7F9]">
                <img src={media.Logos.logo}
                    alt=""
                    className='w-[150px] h-[150px] object-contain'
                />
                <div className="mt-[.5rem]">
                    <NavLink
                        to={"/"}
                        className={isActive === "/" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                            "hover:bg-[var(--color-bpciblue)] hover:text-white rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                        <IoOptionsOutline
                            size={20} />
                        <p className="font-PoppinsLight text-[1rem]">Tableau de bord</p>
                    </NavLink>

                    <div className="mt-1">
                        <NavLink
                            to={"/waitingsDenonciations"}
                            className={(
                                (isActive === "/waitingsDenonciations") ||
                                (isActive === "/rejectedDenonciations") ||
                                (isActive === "/archivedDenonciations") ||
                                (isActive === "/acceptedDenonciations")) ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                "hover:bg-[var(--color-bpciblue)] hover:text-white rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                            {/* <IoNotifications
                                size={20} /> */}
                            <ion-icon name="megaphone" style={{ fontSize: "1.1rem" }}></ion-icon>
                            <p className="font-PoppinsLight text-[1rem]">Dénonciations</p>
                        </NavLink>
                    </div>

                    <div className='ml-[1.1rem]'>
                        <div className="mt-1">
                            <NavLink to={"/waitingsDenonciations"}
                                className={isActive === "/waitingsDenonciations" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                    "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                <ion-icon name="arrow-forward-outline" style={{ fontSize: ".65rem" }}></ion-icon>
                                <p className="font-PoppinsLight text-[.8rem]">Dénonciations en cours</p>
                            </NavLink>
                        </div>
                        <div className="mt-1">
                            <NavLink to={"/acceptedDenonciations"}
                                className={isActive === "/acceptedDenonciations" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                    "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                <ion-icon name="arrow-forward-outline" style={{ fontSize: ".65rem" }}></ion-icon>
                                <p className="font-PoppinsLight text-[.8rem]">Dénonciations acceptées</p>
                            </NavLink>
                        </div>

                        <div className="mt-1">
                            <NavLink to={"/rejectedDenonciations"}
                                className={isActive === "/rejectedDenonciations" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                    "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                <ion-icon name="arrow-forward-outline" style={{ fontSize: ".65rem" }}></ion-icon>
                                <p className="font-PoppinsLight text-[.8rem]">Dénonciations rejetées</p>
                            </NavLink>
                        </div>

                        <div className="mt-1">
                            <NavLink to={"/archivedDenonciations"}
                                className={isActive === "/archivedDenonciations" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                    "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                <ion-icon name="arrow-forward-outline" style={{ fontSize: ".65rem" }}></ion-icon>
                                <p className="font-PoppinsLight text-[.8rem]">Dénonciations archivées</p>
                            </NavLink>
                        </div>
                    </div>

                    <div className="mt-1">
                        <NavLink to={"/utilisateurs"}
                            className={(
                                (isActive === "/utilisateurs") ||
                                (isActive === "/resetMyCredentials")) ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                "hover:bg-[var(--color-bpciblue)] hover:text-white rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                            <ion-icon name="person-circle-outline" style={{ fontSize: "1.1rem" }}></ion-icon>
                            <p className="font-PoppinsLight text-[1rem]">Utilisateurs</p>
                        </NavLink>
                    </div>
                    <div className='ml-[1.1rem]'>
                        <div className="mt-1">
                            <NavLink to={"/utilisateurs"}
                                className={isActive === "/utilisateurs" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                    "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                <ion-icon name="arrow-forward-outline" style={{ fontSize: ".65rem" }}></ion-icon>
                                <p className="font-PoppinsLight text-[.8rem]">Liste des utilisateurs</p>
                            </NavLink>
                        </div>

                        <div className="mt-1">
                            <NavLink to={"/resetMyCredentials"}
                                className={isActive === "/resetMyCredentials" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                    "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                <ion-icon name="arrow-forward-outline" style={{ fontSize: ".65rem" }}></ion-icon>
                                <p className="font-PoppinsLight text-[.8rem]">Modifier mon compte</p>
                            </NavLink>
                        </div>
                    </div>

                    <div className="mt-1">
                        <NavLink to={"/services"}
                            className={isActive === "/services" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                            <IoExtensionPuzzleSharp
                                // color={isActive}
                                size={20} />
                            <p className="font-PoppinsLight text-[1rem]">Organismes de la Banque</p>
                        </NavLink>
                    </div>

                    {/* <div className="mt-1 mb-5">
                        <NavLink to={"/settings"}
                            className={isActive === "/settings" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                            <ion-icon name="settings-outline" style={{ fontSize: "1.1rem" }}></ion-icon>
                            <p className="font-PoppinsLight text-[1rem]">Paramètres</p>
                        </NavLink>
                    </div> */}

                    {/* <div className="hover:bg-[var(--color-bpciblue)] cursor-pointer active:scale-[.9] transition-all mt-[.15rem] hover:text-white rounded-md flex items-center gap-[.5rem] text-[var(--color-bpcibluei2)] p-[1rem] py-[.38rem] relative">
                    <IoSettings
                        size={20} />
                    <p className="font-PoppinsLight text-[1rem]">Paramètres</p>
                </div> */}
                </div>
            </div>

            <div className="fixed z-10 lg:hidden top-[2rem] left-[1rem]">
                <button
                    onClick={() => setShowMobNavs(!showMobNavs)}
                    className='text-red lg:invisible lg:hidden bg-white rounded-full p-2 shadow-lg'>
                    <IoMenu
                        size={25}
                    />
                </button>
            </div>


            {
                showMobNavs &&
                <div className='fixed inset-0 z-10 bg-[#25242483] flex justify-start lg:hidden'>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit" className='bg-[#F5F7F9] max-w-[280px] w-full p-10 px-3 flex flex-col relative max-h-full overflow-y-scroll'>

                        <div className='absolute top-[1.5rem] left-[1.5rem] z-[2]'>
                            <button
                                onClick={() => setShowMobNavs(!showMobNavs)}
                                className='text-red lg:invisible lg:hidden'>
                                <IoClose
                                    size={25}
                                />
                            </button>
                        </div>

                        <img src={media.Logos.logo}
                            alt=""
                            className='w-[150px] h-[150px] object-contain mt-6'
                        />

                        <div className="mt-[.5rem]">
                            <NavLink
                                onClick={() => setShowMobNavs(!showMobNavs)}
                                to={"/"}
                                className={isActive === "/" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                    "hover:bg-[var(--color-bpciblue)] hover:text-white rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                <IoOptionsOutline
                                    size={20} />
                                <p className="font-PoppinsLight text-[1rem]">Tableau de bord</p>
                            </NavLink>

                            <div className="mt-1">
                                <NavLink
                                    onClick={() => setShowMobNavs(!showMobNavs)}
                                    to={"/waitingsDenonciations"}
                                    className={(
                                        (isActive === "/waitingsDenonciations") ||
                                        (isActive === "/rejectedDenonciations") ||
                                        (isActive === "/archivedDenonciations") ||
                                        (isActive === "/acceptedDenonciations")) ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                        "hover:bg-[var(--color-bpciblue)] hover:text-white rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                    {/* <IoNotifications
                                size={20} /> */}
                                    <ion-icon name="megaphone" style={{ fontSize: "1.1rem" }}></ion-icon>
                                    <p className="font-PoppinsLight text-[1rem]">Dénonciations</p>
                                </NavLink>
                            </div>

                            <div className='ml-[1.1rem]'>
                                <div className="mt-1">
                                    <NavLink to={"/waitingsDenonciations"}
                                        onClick={() => setShowMobNavs(!showMobNavs)}
                                        className={isActive === "/waitingsDenonciations" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                            "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                        <ion-icon name="arrow-forward-outline" style={{ fontSize: ".65rem" }}></ion-icon>
                                        <p className="font-PoppinsLight text-[.8rem]">Dénonciations en cours</p>
                                    </NavLink>
                                </div>
                                <div className="mt-1">
                                    <NavLink to={"/acceptedDenonciations"}
                                        onClick={() => setShowMobNavs(!showMobNavs)}
                                        className={isActive === "/acceptedDenonciations" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                            "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                        <ion-icon name="arrow-forward-outline" style={{ fontSize: ".65rem" }}></ion-icon>
                                        <p className="font-PoppinsLight text-[.8rem]">Dénonciations acceptées</p>
                                    </NavLink>
                                </div>

                                <div className="mt-1">
                                    <NavLink to={"/rejectedDenonciations"}
                                        onClick={() => setShowMobNavs(!showMobNavs)}
                                        className={isActive === "/rejectedDenonciations" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                            "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                        <ion-icon name="arrow-forward-outline" style={{ fontSize: ".65rem" }}></ion-icon>
                                        <p className="font-PoppinsLight text-[.8rem]">Dénonciations rejetées</p>
                                    </NavLink>
                                </div>

                                <div className="mt-1">
                                    <NavLink to={"/archivedDenonciations"}
                                        onClick={() => setShowMobNavs(!showMobNavs)}
                                        className={isActive === "/archivedDenonciations" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                            "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                        <ion-icon name="arrow-forward-outline" style={{ fontSize: ".65rem" }}></ion-icon>
                                        <p className="font-PoppinsLight text-[.8rem]">Dénonciations archivées</p>
                                    </NavLink>
                                </div>
                            </div>

                            <div className="mt-1">
                                <NavLink to={"/utilisateurs"}
                                    onClick={() => setShowMobNavs(!showMobNavs)}
                                    className={(
                                        (isActive === "/utilisateurs") ||
                                        (isActive === "/resetMyCredentials")) ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                        "hover:bg-[var(--color-bpciblue)] hover:text-white rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                    <ion-icon name="person-circle-outline" style={{ fontSize: "1.1rem" }}></ion-icon>
                                    <p className="font-PoppinsLight text-[1rem]">Utilisateurs</p>
                                </NavLink>
                            </div>
                            <div className='ml-[1.1rem]'>
                                <div className="mt-1">
                                    <NavLink to={"/utilisateurs"}
                                        onClick={() => setShowMobNavs(!showMobNavs)}
                                        className={isActive === "/utilisateurs" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                            "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                        <ion-icon name="arrow-forward-outline" style={{ fontSize: ".65rem" }}></ion-icon>
                                        <p className="font-PoppinsLight text-[.8rem]">Liste des utilisateurs</p>
                                    </NavLink>
                                </div>

                                <div className="mt-1">
                                    <NavLink to={"/resetMyCredentials"}
                                        onClick={() => setShowMobNavs(!showMobNavs)}
                                        className={isActive === "/resetMyCredentials" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                            "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                        <ion-icon name="arrow-forward-outline" style={{ fontSize: ".65rem" }}></ion-icon>
                                        <p className="font-PoppinsLight text-[.8rem]">Modifier mon compte</p>
                                    </NavLink>
                                </div>
                            </div>

                            <div className="mt-1">
                                <NavLink to={"/services"}
                                    onClick={() => setShowMobNavs(!showMobNavs)}
                                    className={isActive === "/services" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                        "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                    <IoExtensionPuzzleSharp
                                        // color={isActive}
                                        size={20} />
                                    <p className="font-PoppinsLight text-[1rem]">Organismes de la Banque</p>
                                </NavLink>
                            </div>

                            {/* <div className="mt-1 mb-5">
                                <NavLink to={"/settings"}
                                    onClick={() => setShowMobNavs(!showMobNavs)}
                                    className={isActive === "/settings" ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem] py-[.38rem] " :
                                        "hover:bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] hover:text-white active:scale-[.9] transition-all text-[var(--color-bpciblue)] p-[1rem] py-[.38rem] "}>
                                    <ion-icon name="settings-outline" style={{ fontSize: "1.1rem" }}></ion-icon>
                                    <p className="font-PoppinsLight text-[1rem]">Paramètres</p>
                                </NavLink>
                            </div> */}

                            {/* <div className="hover:bg-[var(--color-bpciblue)] cursor-pointer active:scale-[.9] transition-all mt-[.15rem] hover:text-white rounded-md flex items-center gap-[.5rem] text-[var(--color-bpcibluei2)] p-[1rem] py-[.38rem] relative">
                    <IoSettings
                        size={20} />
                    <p className="font-PoppinsLight text-[1rem]">Paramètres</p>
                </div> */}
                        </div>

                    </motion.div>
                </div>
            }
        </>
    )
}

export default DashBoardSideBar