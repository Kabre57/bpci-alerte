import React from 'react'

import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { db } from "../plugins/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { servicesAsyncThunc } from '../redux/slices/servicesSlices';
import { NavLink } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import NOT_FOUND from "../images/notFound.png"


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



const DashBoardServices = () => {

    const services = useSelector((state) => state.services.value)
    const dispatch = useDispatch()

    const [data, setData] = useState(services);
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        const dbRef = ref(db, "services/");

        // Écoute les modifications de données de la base de données
        get(dbRef).then((snapshot) => {
            const data = snapshot.val();
            setData(data);
            console.log(data)
        });
    }, []);

    React.useEffect(() => {
        data !== services && dispatch(servicesAsyncThunc(data))
    }, [data])

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='px-[2rem] pt-[.8rem]'>
            <div className="">
                {/* <h3 className="text-[1.2rem]">Utilisateurs (02 utilisateurs)</h3> */}
                {/* <p className="mt-[.5rem] text-[.9rem]">Vous avez <span className="text-[var(--color-bpciblue)]">1 nouvelle notification</span></p> */}
            </div>

            <div className="mt-[1.5rem]">
                <h3 className="text-[2.2rem] font-PoppinsSemiBold">Tableau des service</h3>
            </div>

            <div className="mt-8">
                <CustomInput
                    stateValue={searchInput}
                    setStateValue={setSearchInput}
                    placeholder="Rechercher un service"
                    w />
            </div>

            <div className="mb-[2rem] mt-[3rem]">
                <NavLink
                    to={"/createService"}
                    // onClick={handleLog}
                    className="bg-[var(--color-bpciblue)]
                    transition-all active:scale-[.95]
                        text-sm
                        focus:ring-violet-300
                            py-2 text-white px-5
                            rounded-md">
                    Créer un service
                </NavLink>
            </div>


            <table className='w-full mt-[1rem]'>
                <tr className='border-b-[2px] border-[var(--color-bpciblue)]'>
                    {/* <th className='w-[10px] noM'>
                        <input type="checkbox" name="" id="" onChange={e => {
                            let selectedBox = document.querySelectorAll("#selected-box")

                            for (let i in selectedBox) {
                                selectedBox[i].checked = e.target?.checked
                            }
                        }} />
                    </th> */}
                    <th className='w-[250px]'>Nom de l'organisme</th>
                </tr>

                {
                    Object.entries(data)
                        ?.filter((d) => d[1]?.nom.includes(searchInput))
                        ?.map(([key, value]) => {
                            return (
                                <tr
                                    key={`${key}`}
                                    className='hover:bg-[var(--color-bpciGray2)] transition-all cursor-pointer active:scale-[.99]'>
                                    {/* <td className='w-[1px] noM'>
                                        <input type="checkbox" name="" id="selected-box" />
                                    </td> */}
                                    <td>{value.nom}</td>

                                </tr>
                            )
                        })

                }


            </table>


            {
                searchInput.length > 0 && Object.entries(data)
                    ?.filter((d) => d[1]?.nom.includes(searchInput)).length < 1 &&
                <p className='mt-[2rem] text-slate-600 text-[.8rem] text-center '>Aucun service trouvé avec ce nom {`<<${searchInput}>>`}.</p>
            }
            {
                Object.entries(data).length < 1 &&
                <div className="flex items-center flex-col justify-center mx-auto mt-[1.5rem]">
                    <div className="max-w-[200px]">
                        <img
                            src={NOT_FOUND}
                            alt="logo"
                        />
                    </div>
                    <p className='text-center'>Ouups les données sont vides actuellement.Si les données existent bien dans la base de données elles se chargeront dans un instant.</p>
                </div>
            }
        </motion.div>
    )
}

export default DashBoardServices