import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { motion } from "framer-motion"
import { useNavigate } from 'react-router';

import NOT_FOUND from "../images/notFound.png"
import ViewTotalDenonByFilter from '../components/ViewTotalDenonByFilter';
import SpinnerWithText from '../components/SpinnerWithText';
import { AiFillEdit } from 'react-icons/ai';
import { IoArchive, IoTrash } from 'react-icons/io5';
import { get, ref, remove, update } from 'firebase/database';
import { db } from '../plugins/firebase';
import { denonciationAsyncThunc } from '../redux/slices/denonciationSlices';
import { toast } from 'react-toastify';
import CustomInput from '../components/CustomInput';
import { RootUserContext } from '../contexts';


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

function ArchivedDenonciations() {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [searchInput, setSearchInput] = useState("")
    const [selectedPlainte, setSelectedPlainte] = useState([])
    const [actionSelectOnPlaintes, setactionSelectOnPlaintes] = useState("")
    const userContext = React.useContext(RootUserContext)

    const { value, loading } = useSelector((state) => state.denonciations)

    const archivedDenonciations = React.useMemo(() => {
        return Object.values(value)
            // .filter(den => den.status)
            .filter(den => den.isArchive)
        .filter(den => den.status === "Clôturé")
    }, [value])

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='p-[2rem]'>

            {/* <div className="mb-5">
                <ViewTotalDenonByFilter
                    title="Total dénonciation archivées"
                    data={archivedDenonciations.length}
                />
            </div> */}
            <div className="mt-[1.5rem]">
                <h3 className="text-[2.2rem] font-PoppinsSemiBold">Tableau des dénonciations archivées</h3>
                <h3 className="text-[.85rem] mt-1">{archivedDenonciations.length} archivées pour le moment.</h3>
            </div>

            <div className="w-full mt-[3rem]">
                <CustomInput
                    stateValue={searchInput}
                    setStateValue={setSearchInput}
                    placeholder="Rechercher une plainte par code de suivi ou email"
                    w />
            </div>

            {/* <div className="mt-[1.5rem]">
                <h3 className="text-[.9rem] font-PoppinsSemiBold">Tableau des dénonciations archivées</h3>
            </div> */}

            <div className="w-full max-lg:overflow-x-scroll max-lg:mx-auto max-lg:pr-5 max-lg:w-[90vw]">


                <table className='w-full mt-[1rem]'>
                    <tr>
                        <th className='w-[10px]'>
                            <input type="checkbox"
                                onChange={e => {
                                    let selectedBox = document.querySelectorAll("#selected-box")
                                    e.target.checked && archivedDenonciations?.map((value) => {
                                        setSelectedPlainte([...selectedPlainte, value?.id])
                                    })

                                    !e.target.checked && setSelectedPlainte([])

                                    for (let i in selectedBox) {
                                        selectedBox[i].checked = e.target?.checked
                                    }
                                }}
                                name="" id="" />
                        </th>
                        <th className='font-PoppinsSemiBold w-[170px] lf'>Code de suivi</th>
                        <th className='font-PoppinsSemiBold '>Date</th>
                        <th className='font-PoppinsSemiBold '>Email</th>
                        <th className='font-PoppinsSemiBold '>Status</th>
                        {/* <th className='w-[250px] flex items-center gap-2'>Actions
                            <div className="w-full">
                                <select
                                    name="Option"
                                    id="Option"
                                    onChange={(e) => {
                                        if (e.target.value !== "noAction") {
                                            setactionSelectOnPlaintes(e.target.value)
                                        } else {
                                            setactionSelectOnPlaintes("")
                                        }
                                    }}
                                    className='noM'>
                                    <option value="noAction" selected>------------------------------</option>
                                    <option value="in_progress">En cours</option>
                                    <option value="rejected">Rejeter</option>
                                    <option value="to_enclose">Clôturer</option>
                                    <option value="to_treat">Traiter</option>
                                </select>
                            </div>
                            {
                                actionSelectOnPlaintes.length > 0 &&
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            toast.error("Vous ne pouvez supprimer ces plaintes avant 6 mois.", { draggable: true })}
                                        className="active:scale-[.85] cursor-pointer  py-1 rounded-sm px-[.5rem] text-white relative flex items-center bg-[var(--color-bpciblue)]">
                                        <p className='text-[.85rem]'>Go</p>
                                    </button>
                                    {
                                        !selectedPlainte.length > 0 && <div className="absolute inset-0 bg-black opacity-30 z-10" />
                                    }
                                </div>
                            }
                        </th> */}
                    </tr>

                    {
                        archivedDenonciations?.
                            filter(pl => ((pl?.codeplainte.includes(searchInput)) ||
                                (pl?.email.includes(searchInput))))?.
                            reverse().map((value) => {
                                return (
                                    <tr
                                        // key={`${key}`}
                                        className={`hover:bg-[var(--color-bpciGray2)] transition-all cursor-pointer `}>
                                        <td>
                                            <input type="checkbox"
                                                onChange={(e) => {
                                                    !selectedPlainte.includes(value?.id)
                                                        && setSelectedPlainte([...selectedPlainte, value?.id])

                                                    selectedPlainte.includes(value?.id)
                                                        && e.target.checked === false
                                                        && setSelectedPlainte(selectedPlainte.filter(i => i !== value.id))
                                                }}
                                                name=""
                                                id="selected-box" />
                                        </td>
                                        <td

                                            onClick={() => navigate("/denonciation", { state: { data: value } })}
                                            className={`lf max-h-[1rem] max-w-[.5rem] truncate ${((!value.openByUsers) || (!value.openByUsers.includes(userContext.user?.email))) && 'font-PoppinsSemiBold'}`}>{value.codeplainte || "Non défini"}</td>
                                        <td className={`${((!value.openByUsers) || (!value.openByUsers.includes(userContext.user?.email))) && 'font-PoppinsSemiBold'}`}
                                            onClick={() => navigate("/denonciation", { state: { data: value } })}
                                        >{value.datePlainte} - {value.heurePlainte}</td>
                                        <td className={`${((!value.openByUsers) || (!value.openByUsers.includes(userContext.user?.email))) && 'font-PoppinsSemiBold'}`}
                                            onClick={() => navigate("/denonciation", { state: { data: value } })}
                                        >{value.email && value.email.trim().length > 0 ? value.email : "Anonyme"}</td>

                                        <td className={""}
                                            onClick={() => navigate("/denonciation", { state: { data: value } })}
                                        ><span className={`inline whitespace-pre ${value.status ? (() => {
                                            switch (value.status) {
                                                case "Clôturé":
                                                    return "bg-slate-400"

                                                case "Traité":
                                                    return "bg-green-400"

                                                case "Rejeté":
                                                    return "bg-red-400"

                                                default:
                                                    return "bg-yellow-400"
                                            }
                                        })() : "bg-slate-400"} rounded-lg text-white py-[.15rem] text-[.9rem] px-4`}>{value.status && value.status.trim().length > 0 ? value.status : "Non défini"}</span></td>
                                        {/* <td className='gap-3 items-center h-full flex w-[250px]'>
                                            <button
                                                onClick={() => {
                                                    remove(ref(db, 'plaintes/' + value?.id))
                                                }}
                                                className=" w-full justify-center
                                                active:scale-[.85] cursor-pointer py-2 px-[.5rem] text-red-500 flex items-center bg-red-100">
                                                <p className='text-[.85rem]'>Clôturer</p>
                                                <IoArchive
                                                    className='ml-2'
                                                    size={15}
                                                />
                                            </button>
                                        </td> */}
                                    </tr>
                                )
                            })
                    }

                </table>

                {
                    searchInput.length > 0 && archivedDenonciations?.filter(pl => ((pl?.codeplainte.includes(searchInput)) || (pl?.email.includes(searchInput)))).length < 1 &&
                    <p className='mt-[2rem] text-slate-600 text-[.8rem] text-center '>Aucune plainte trouvé avec un code ou email correspondant à {`<<${searchInput}>>`}.</p>
                }

                {
                    loading &&
                    <SpinnerWithText text={"Chagement des données. Veuillez patienter"} />
                }

                {
                    !Object.entries(archivedDenonciations).length > 0 &&
                    <div className="flex items-center flex-col justify-center mx-auto mt-[1.5rem]">
                        <div className="max-w-[200px]">
                            <img
                                src={NOT_FOUND}
                                alt="logo"
                            />
                        </div>
                        <p className='text-center'>Aucune dénonciation rejetée n'a été trouvé pour l'instant</p>
                    </div>
                }
            </div>
        </motion.div>
    )
}

export default ArchivedDenonciations