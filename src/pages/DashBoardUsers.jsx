import React from 'react'
import NOT_FOUND from "../images/notFound.png"

import { motion } from "framer-motion"
import { useNavigate } from 'react-router';
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { db } from "../plugins/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { denonciationAsyncThunc } from '../redux/slices/denonciationSlices';
import { NavLink } from 'react-router-dom';
import CustomInput from '../components/CustomInput';


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



const DashBoardUsers = () => {

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='px-[2rem] pt-[.8rem]'>
            <div className="">
                {/* <h3 className="text-[1.2rem]">Utilisateurs </h3> */}
                {/* <p className="mt-[.5rem] text-[.9rem]">Vous avez <span className="text-[var(--color-bpciblue)]">1 nouvelle notification</span></p> */}
            </div>


            <div className="mt-[1.5rem]">
                <h3 className="text-[2.2rem] font-PoppinsSemiBold">Tableau des utilisateurs</h3>
            </div>
            <div className="mt-8">
                <CustomInput
                    placeholder="Rechercher un utilisateur"
                    w />
            </div>

            <div className="mb-[2rem] mt-[3rem]">
                <NavLink
                    to={"/inviteUser"}
                    // onClick={handleLog}
                    className="bg-[var(--color-bpciblue)]
                    transition-all active:scale-[.95]
                        text-sm
                        focus:ring-violet-300
                            py-2 text-white px-5
                            rounded-md">
                    Inviter un utilisateur
                </NavLink>
            </div>

            <div className="w-full max-lg:overflow-x-scroll max-lg:mx-auto max-lg:pr-5 max-lg:w-[90vw]">
                <table className='w-full mt-[1rem]'>
                    <tr className='border-b-[2px] border-[var(--color-bpciblue)]'>
                        <th className='w-[10px]'>
                            <input type="checkbox" name="" id="" />
                        </th>
                        <th className='w-[220px] lf'>Prénom/Nom</th>
                        <th className='w-[250px]'>Addresse email</th>
                        <th className='w-[250px]'>Organisme</th>
                        <th className='w-[200px]'>Dernier accès</th>
                        <th className='w-[50px]'>Actions</th>
                    </tr>

                    {/* {
                    Object.entries([0, 1, 2, 3, 4, 5]).length > 0 && <>
                        {
                            Object.entries([0, 1, 2, 3, 4, 5]).map((key) => {
                                return (
                                    <tr
                                        key={`${key}`}
                                        className='hover:bg-[var(--color-bpciGray2)] transition-all '
                                        >
                                        <td>
                                            <input type="checkbox" name="" id="" />
                                        </td>
                                        <td className='lf'>George N'CHO</td>
                                        <td>georgen’cho@bqci.ci</td>
                                        <td>Banque populaire...</td>
                                        <td>05 Janvier 2023</td>
                                        <td className='flex gap-[.25rem] items-center'>
                                            <button className=" bg-red-500 rounded-full active:scale-[.85] cursor-pointer p-[.5rem] text-[var(--color-bpciblue)]">
                                                <IoTrash
                                                    color='white'
                                                    size={15}
                                                />
                                            </button>

                                            <button className=" bg-orange-500 rounded-full active:scale-[.85] cursor-pointer p-[.5rem] text-[var(--color-bpciblue)]">
                                                <IoEye
                                                    color='white'
                                                    size={15}
                                                />
                                            </button>

                                            <button className=" bg-blue-500 rounded-full active:scale-[.85] cursor-pointer p-[.5rem] text-[var(--color-bpciblue)]">
                                                <IoSettings
                                                    color='white'
                                                    size={15}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </>
                } */}

                </table>
                {/* {
                !Object.entries(data).length > 0 && <p className='mt-[1rem] text-yellow-600 text-[.8rem]'>Ouups les données sont vides actuellement.Si les données existent bien dans la base de données elles se chargement dans un instant.</p>
            } */}
                <div className="flex items-center flex-col justify-center mx-auto mt-[1.5rem]">
                    <div className="max-w-[200px]">
                        <img
                            src={NOT_FOUND}
                            alt="logo"
                        />
                    </div>
                    <p className='text-center'>Ouups les données sont vides actuellement.Si les données existent bien dans la base de données elles se chargeront dans un instant.</p>
                </div>
            </div>
        </motion.div>
    )
}

export default DashBoardUsers