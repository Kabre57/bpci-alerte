import React from "react";
import { media } from "../libs/media";
import { Link } from "react-router-dom";
// import img from "../images/backgrounds/carte.png";
import Footer from "../components/footer";

import ISOTOP from "../images/backgrounds/woman_b_removed.png";
import CustomButton from "../components/CustomButton";

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


export default function Home() {
  return (
    // <div
    //   className="flex bg-bpcired-500 flex-col bg-bpciwhite

    //   justify-around item-center content-center"
    // >
    //   <div
    //     className="flex bg-bpciwhite "
    //     style={{
    //       backgroundImage: `url(${img})`,
    //       backgroundRepeat: "no-repeat",
    //       backgroundPosition: "right",
    //     }}
    //   >
    //     <div className="grid w-2/4 h-auto justify-center item-center content-center ">
    //       <div className="w-100 h-100 mb-20">
    //         <p
    //           className="text-left text-bpcidark"
    //           style={{ fontSize: "50px", fontWeight: "600" }}
    //         >
    //           Plateforme de <br />
    //           remonté d’allerte de la <br />
    //           banque populaire de <br />
    //           Côte- d’Ivoire{" "}
    //         </p>
    //       </div>

    //       <div className="flex w-100 justify-left gap-8 ">
    //       <Link to="/depotplainte">
    //       <button className="bg-bpciorangep-2 w-60 h-16 rounded text-bpciwhite">
    //           Déposer une plainte{" "}
    //         </button>

    //       </Link>
    //       <Link to="/suivreplainte">
    //       <button className="bg-bpcidark p-2 w-60 h-16 rounded text-bpciwhite">
    //      Suivre une plainte
    //         </button>

    //       </Link>

    //       </div>
    //     </div>

    //     <div className="flex flex-row w-2/4  h-screen  ">
    //       <div className="">
    //         <img
    //           src={media.Logos.woman}
    //           className="h-screen bg-bpciwhite'"
    //           alt="logo"
    //           // style={{ width: "1400px" }}
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <Footer />
    // </div>
    <>

      <div className="">
        <div className="w-full h-screen 
            max-[1400px]:px-[3rem] 
            max-[1250px]:px-[4rem] 
            max-[860px]:px-[2rem] bg-white">
          <div className="w-full h-full flex gap-[1rem] 
           fixed-w 
            max-h-[1000px] 
            max-[1250px]:max-h-[1000px]">
            <div className="h-full w-1/2 flex justify-center items-center
                  max-[1000px]:w-full 
                  max-[1000px]:max-w-[600px]
                  max-[520px]:max-h-[520px]
                  max-[1000px]:max-h-[880px]
                  max-[880px]:max-h-[780px]
                  max-[1000px]:mx-auto
                  max-[1000px]:bg-[url('./images/backgrounds/carte.png')] 
                  max-[1000px]:bg-no-repeat 
                  max-[1000px]:bg-bottom  
                  max-[1000px]:h-[100vh] 
                  max-[1000px]:items-start 
                  max-[1000px]:pt-[2rem]">
              <div className="">
                <p className="text-[3.2rem] font-PoppinsSemiBold 
                 max-[1200px]:text-[2.8rem] 
                 max-[1100px]:text-[2.5rem] 
                 max-[980px]:text-[2.5rem] 
                 max-[650px]:text-[2.2rem] 
                 max-[450px]:text-[1.8rem]
                  max-[1000px]:text-center">Plateforme de remontés
                  et alertes de la banque populaire de Côte- d’Ivoire  </p>
                <div className="flex items-center w-3/4 max-lg:w-full mt-[2.5rem] gap-[1rem] max-[1000px]:flex-col">
                  <Link className="w-full" to="/depotplainte">
                    <CustomButton
                      color={"bg-[var(--color-bpcirouge)]"}
                      w={"w-full"}
                      rounded="md"
                      px="px-[4rem]"
                      title="Déposer un plainte"
                    />
                  </Link>
                  <Link className="w-full" to="/suivreplainte">
                    <CustomButton
                      color={"bg-[var(--color-bpcivert)]"}
                      w={"w-full"}
                      rounded="md"
                      px="px-[4rem]"
                      title="Suivre une plainte"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full full-blast max-[1000px]:hidden ">
              <motion.figure
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit" className="w-full h-full max-[1000px]:hidden">
                <img
                  src={ISOTOP}
                  alt=""
                  className='w-[380px] h-full mx-auto'
                />
              </motion.figure>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
