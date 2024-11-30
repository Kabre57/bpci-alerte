import React from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
// import {  Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import { media } from "../libs/media";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, x: "2.5vh" },
  visible: { opacity: 1, x: "0" },
  exit: { x: "-2.5vh", opacity: 0, transition: { ease: 'easeInOut' } },
};

export default function Navbar() {
  const navLinkStyles = ({ isActive }) => ({
    color: isActive ? "#08871d" : "#FFFFFF", // Texte inactif en blanc pour le menu principal
  });

  const mobileNavLinkStyles = ({ isActive }) => ({
    color: isActive ? "#08871d" : "#e00d17", // Texte actif en vert, inactif en rouge  pour le menu mobile
  });

  const [showMobNavs, setShowMobNavs] = React.useState(false);
  const location = useLocation();
  const [isActiveLocation, setIsActiveLocation] = React.useState(location?.pathname);

  React.useEffect(() => {
    setIsActiveLocation(location?.pathname);
  }, [location]);

  return (
    <>
      <div className="border-b-8 bg-[#001051] border-[var(--color-bpciblue)] w-full sticky top-0 z-10">
        <div className='flex fixed-w max-lg:px-[3vw] h-28 justify-between items-center content-center'>
          <div className='min-w-[90px] flex items-center justify-center'>
            <NavLink to="/">
              <div className="w-full flex items-center justify-center">
                <img
                  src={media.Logos.logo}
                  className="w-[150px] h-[150px] object-contain"
                  alt="logo"
                />
              </div>
            </NavLink>
          </div>

          <div className='h-full flex flex-wrap item-center max-lg:invisible max-lg:hidden'>
            <ul className='flex items-center gap-5'>
              <li>
                <NavLink style={navLinkStyles} to="/">
                  <div className="text-[1.05rem] font-PoppinsRegular">Accueil</div>
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyles} to="/apropos">
                  <div className="text-[1.05rem] font-PoppinsRegular">A propos</div>
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyles} to="/depotplainte">
                  <div className="text-[1.05rem] font-PoppinsRegular">Déposer une plainte</div>
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyles} to="/suivreplainte">
                  <div className="text-[1.05rem] font-PoppinsRegular">Suivre ma plainte</div>
                </NavLink>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setShowMobNavs(!showMobNavs)}
            className='text-white lg:invisible lg:hidden'>
            <IoMenu size={25} />
          </button>
        </div>
      </div>

      {showMobNavs && (
        <div className='fixed inset-0 z-10 bg-[#25242483] flex justify-end lg:hidden'>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className='bg-white max-w-[280px] w-full p-10 flex flex-col relative max-h-full overflow-y-scroll'>
            <div className='absolute top-[1.5rem] left-[1.5rem] z-[2]'>
              <button onClick={() => setShowMobNavs(!showMobNavs)} className='text-red lg:invisible lg:hidden'>
                <IoClose size={25} />
              </button>
            </div>

            <div>
              <div className='min-w-[90px] flex items-center mt-[1rem]'>
                <NavLink onClick={() => setShowMobNavs(!showMobNavs)} to="/">
                  <div className="w-full flex items-center justify-center">
                    <img src={media.Logos.logo} alt="logo" />
                  </div>
                </NavLink>
              </div>

              <ul className='flex flex-col gap-2 mt-5'>
                <li className='py-3'>
                  <NavLink onClick={() => setShowMobNavs(!showMobNavs)} style={mobileNavLinkStyles} to="/">
                    <div className="text-[1.05rem] font-PoppinsRegular">Accueil</div>
                  </NavLink>
                </li>
                <li className="py-3">
                  <NavLink onClick={() => setShowMobNavs(!showMobNavs)} style={mobileNavLinkStyles} to="/apropos">
                    <div className="text-[1.05rem] font-PoppinsRegular">A propos</div>
                  </NavLink>
                </li>
                <li className="py-3">
                  <NavLink onClick={() => setShowMobNavs(!showMobNavs)} style={mobileNavLinkStyles} to="/depotplainte">
                    <div className="text-[1.05rem] font-PoppinsRegular">Déposer une plainte</div>
                  </NavLink>
                </li>
                <li className="py-3">
                  <NavLink onClick={() => setShowMobNavs(!showMobNavs)} style={mobileNavLinkStyles} to="/suivreplainte">
                    <div className="text-[1.05rem] font-PoppinsRegular">Suivre ma plainte</div>
                  </NavLink>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}