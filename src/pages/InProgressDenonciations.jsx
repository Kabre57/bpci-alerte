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

function InProgressDenonciations() {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [searchInput, setSearchInput] = useState("")
    const [selectedPlainte, setSelectedPlainte] = useState([])
    const [actionSelectOnPlaintes, setactionSelectOnPlaintes] = useState("")
    const userContext = React.useContext(RootUserContext)


    const { value, loading } = useSelector((state) => state.denonciations)

    const inProgressDenonciations = React.useMemo(() => {
        return Object.values(value)
            .filter(den => den.status)
            .filter(den => !den.isArchive)
            .filter(den => den.status === "En cours")
    }, [value])

    React.useEffect(() => {
        if (selectedPlainte.length === 0) {
            let rootCheckBox = document.querySelector("#root-selected-box")
            rootCheckBox.checked = false
        }
    }, [selectedPlainte])

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='p-[2rem]'>

            {/* <div className="mb-5">
                <ViewTotalDenonByFilter
                    title="Total dénonciation en cours"
                    data={inProgressDenonciations.length}
                />
            </div> */}

            <div className="mt-[1.5rem]">
                <h3 className="text-[2.2rem] font-PoppinsSemiBold">Total dénonciation en cours</h3>
                <h3 className="text-[.85rem] mt-1">{inProgressDenonciations.length} en cours pour le moment.</h3>
            </div>

            <div className="w-full mt-[3rem]">
                <CustomInput
                    stateValue={searchInput}
                    setStateValue={setSearchInput}
                    placeholder="Rechercher une plainte par code de suivi ou email"
                    w />
            </div>

            {/* <div className="mt-[1.5rem]">
                <h3 className="text-[.9rem] font-PoppinsSemiBold">Tableau des dénonciations en cours</h3>
            </div> */}
            <div className="w-full max-lg:overflow-x-scroll max-lg:mx-auto max-lg:pr-5 max-lg:w-[90vw]">

                <table className='w-full mt-[1rem]'>
                    <tr>
                        <th className='w-[10px]'>
                            <input type="checkbox"
                                onChange={e => {
                                    let selectedBox = document.querySelectorAll("#selected-box")
                                    let sendedValues = []
                                    e.target.checked && inProgressDenonciations?.forEach((value) => {
                                        sendedValues = [...sendedValues, { id: value?.id, status: value.status }]
                                    })

                                    setSelectedPlainte(sendedValues)

                                    selectedBox.forEach((igo) => igo.checked = e.target.checked)

                                }}
                                name="" id="root-selected-box" />
                        </th>
                        <th className='font-PoppinsSemiBold w-[170px] lf'>Code de suivi</th>
                        <th className='font-PoppinsSemiBold '>Date</th>
                        <th className='font-PoppinsSemiBold '>Email</th>
                        <th className='font-PoppinsSemiBold '>Status</th>
                        <th className='font-PoppinsSemiBold w-[250px] flex items-center gap-2'>Actions
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
                                    {/* <option value="En cours">En cours</option> */}
                                    <option value="Rejeter">Rejeter</option>
                                    <option value="Clôturer">Clôturer</option>
                                    <option value="Traiter">Traiter</option>
                                </select>
                            </div>
                            {
                                actionSelectOnPlaintes.length > 0 &&
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            try {
                                                let checkIfPlaintesHasAlreadyBeenValidated = selectedPlainte.filter(ed => ["Rejeté", "Clôturé", "Traité"].includes(ed?.status))
                                                if (checkIfPlaintesHasAlreadyBeenValidated.length === 0) {
                                                    selectedPlainte.map(ed => {
                                                        const actionState = actionSelectOnPlaintes === "Traiter" ?
                                                            "Traité" :
                                                            actionSelectOnPlaintes === "Rejeter" ? "Rejeté" : "Clôturer"

                                                        !["Rejeté", "Clôturé", "Traité"].includes(ed?.status) && actionState !== "Clôturer" && update(ref(db, 'plaintes/' + ed?.id), { status: actionState, isArchive: false, })
                                                            .catch((e) => {
                                                                toast.error("Une erreur est survenue lors du traitement de l'action.", { draggable: true })
                                                            })

                                                        !["Rejeté", "Clôturé", "Traité"].includes(ed?.status) && actionState === "Clôturer" && update(ref(db, 'plaintes/' + ed?.id), { isArchive: true, status: "Clôturé" })
                                                            .then(() => {
                                                            }).catch((e) => {
                                                                toast.error("Une erreur est survenue lors du traitement de l'action.", { draggable: true })
                                                            })

                                                        setSelectedPlainte([])
                                                        let selectedBox = document.querySelectorAll("#selected-box")
                                                        let rootCheckBox = document.querySelector("#root-selected-box")
                                                        rootCheckBox.checked = false
                                                        selectedBox.forEach((igo) => igo.checked = false)
                                                    })
                                                    toast.success("Plaintes modifiées avec succès", { draggable: true })
                                                    return
                                                } else {
                                                    toast.error("Une erreur est survenue lors du traitement de votre requête. Sembleraît-il qu'une ou plusieurs des sélections de plaintes ont déja reçu de validations de traitement.", { draggable: true })
                                                    return
                                                }
                                                console.log("selected", selectedPlainte)
                                            } catch (error) {
                                                console.log(error)
                                                toast.error("Une erreur est survenue lors du traitement de votre requête.", { draggable: true })
                                                return
                                            }

                                        }}
                                        className="active:scale-[.85] cursor-pointer  py-1 rounded-sm px-[.5rem] text-white relative flex items-center bg-[var(--color-bpciblue)]">
                                        <p className='text-[.85rem]'>Go</p>
                                    </button>
                                    {
                                        !selectedPlainte.length > 0 && <div className="absolute inset-0 bg-black opacity-30 z-10" />
                                    }
                                </div>
                            }
                        </th>
                    </tr>

                    {
                        inProgressDenonciations?.filter(pl => ((pl?.codeplainte.includes(searchInput)) ||
                            (pl?.email.includes(searchInput))))?.
                            reverse().map((value) => {
                                return (
                                    <tr
                                        // key={`${key}`}
                                        className={`hover:bg-[var(--color-bpciGray2)] transition-all cursor-pointer`}>
                                        <td>
                                            <input type="checkbox"
                                                onChange={(e) => {
                                                    !selectedPlainte.includes(value?.id)
                                                        && setSelectedPlainte([...selectedPlainte, { id: value?.id, status: value.status }])

                                                    selectedPlainte.includes(value?.id)
                                                        && e.target.checked === false
                                                        && setSelectedPlainte(selectedPlainte.filter(i => i?.id !== value.id))
                                                }}
                                                name="" id="selected-box" />
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


                                        {
                                            !["Rejeté", "Traité", "Clôturé"].includes(value.status) && <td className='gap-3 items-center h-full flex w-[250px]'>
                                                <button
                                                    onClick={() => {
                                                        !value.isArchive && update(ref(db, 'plaintes/' +
                                                            value.id), { isArchive: true, status: "Clôturé" })
                                                            .then(() => {
                                                                toast.success("Plainte archivée avec succès", { draggable: true })
                                                            }).catch((e) => {
                                                                toast.error("Une erreur est survenue lors du traitement de l'action.", { draggable: true })
                                                            })
                                                    }}
                                                    className=" w-full justify-center
                                                active:scale-[.85] cursor-pointer py-2 px-[.5rem] text-[var(--color-bpciblue)] 
                                                flex items-center hover:bg-[var(--color-bpciblue)] hover:text-white transition-all 
                                                border-[1px] border-[var(--color-bpciblue)]">
                                                    <p className='text-[.85rem]'>Clôturer</p>
                                                    <IoArchive
                                                        className='ml-2'
                                                        size={15}
                                                    />
                                                </button>
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                    }

                </table>

                {
                    searchInput.length > 0 && inProgressDenonciations?.filter(pl => ((pl?.codeplainte.includes(searchInput)) || (pl?.email.includes(searchInput)))).length < 1 &&
                    <p className='mt-[2rem] text-slate-600 text-[.8rem] text-center '>Aucune plainte trouvé avec un code ou email correspondant à {`<<${searchInput}>>`}.</p>
                }
                {
                    loading &&
                    <SpinnerWithText text={"Chagement des données. Veuillez patienter"} />
                }
                {
                    !Object.entries(inProgressDenonciations).length > 0 &&
                    <div className="flex items-center flex-col justify-center mx-auto mt-[1.5rem]">
                        <div className="max-w-[200px]">
                            <img
                                src={NOT_FOUND}
                                alt="logo"
                            />
                        </div>
                        <p className='text-center'>Aucune dénonciation en cours n'a été trouvé pour l'instant</p>
                    </div>
                }
            </div>

        </motion.div>
    )
}

export default InProgressDenonciations