import React from 'react'

import { motion } from "framer-motion"
import { useNavigate } from 'react-router';
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, get, remove, update } from "firebase/database";
import { db } from "../plugins/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { denonciationAsyncThunc, selectDenonciation } from '../redux/slices/denonciationSlices';
import NOT_FOUND from "../images/notFound.png"
import ViewTotalDenonByFilter from '../components/ViewTotalDenonByFilter';
import { ThreeCircles } from 'react-loader-spinner';
import SpinnerWithText from '../components/SpinnerWithText';
import { IoMdMedkit } from 'react-icons/io';
import { IoArchive, IoTrash } from 'react-icons/io5';
import { AiFillEdit } from "react-icons/ai";
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



const DashBoardListDenonciations = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [searchInput, setSearchInput] = useState("")
    const [actionSelectOnPlaintes, setactionSelectOnPlaintes] = useState("")
    const [selectedPlainte, setSelectedPlainte] = useState([])
    const userContext = React.useContext(RootUserContext)

    const { value, loading } = useSelector((state) => state.denonciations)

    const countNonReadDenonciations = React.useMemo(() => {
        return Object.values(value)
            .filter(den => den.status)
            .filter(den => ((!den.openByUsers) || (!den.openByUsers.includes(userContext.user?.email))) && true).length
    }, [value])

    const waitingDenonciations = React.useMemo(() => {
        return Object.values(value)
            .filter(den => den.status)
            .filter(den => !den.isArchive)
            .filter(den => den.status === "En cours").length
    }, [value])

    const totalsDenonciations = React.useMemo(() => {
        return Object.values(value)
            .length
    }, [value])

    const rejectedDenonciations = React.useMemo(() => {
        return Object.values(value)
            .filter(den => den.status)
            // .filter(den => !den.isArchive)
            .filter(den => den.status === "Rejeté").length
    }, [value])

    const archivedDenonciations = React.useMemo(() => {
        return Object.values(value)
            // .filter(den => den.status)
            .filter(den => den.status === "Clôturé")
            .filter(den => den.isArchive).length
        // .filter(den => den.status === "Rejeté")
    }, [value])

    const [data, setData] = useState(value);

    React.useEffect(() => {
        setData(value);
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

            <div className="mb-[4rem]">
                <h3 className="text-[3rem] font-PoppinsSemiBold">Bonjour, John</h3>
                <p className="mt-[.25rem] text-[.9rem]">Nous vous notifions l'ajout de <span className="text-[var(--color-bpciblue)] font-PoppinsSemiBold">{countNonReadDenonciations} nouvelle(s) plainte(s)</span></p>
            </div>

            <div className="my-[2rem] max-[1000px]:flex-wrap 
                flex justify-between gap-[1.5rem] pt-[.25rem] pb-[1.5rem]">

                <ViewTotalDenonByFilter
                    title="Total de dénonciation"
                    data={totalsDenonciations}
                />

                <ViewTotalDenonByFilter
                    title="Dénonciation en cours"
                    data={waitingDenonciations}
                />

                <ViewTotalDenonByFilter
                    title="Dénonciation rejetées"
                    data={rejectedDenonciations}
                />

                <ViewTotalDenonByFilter
                    title="Dénonciation clôturées"
                    data={archivedDenonciations}
                />
            </div>

            <div className="w-full mt-[1rem]">
                <CustomInput
                    stateValue={searchInput}
                    setStateValue={setSearchInput}
                    placeholder="Rechercher une plainte par code de suivi ou email"
                    w />
            </div>

            <div className="mt-[1.5rem]">
                <h3 className="text-[.9rem] font-PoppinsSemiBold">Tableau des dénonciations</h3>
            </div>

            <div className="w-full max-lg:overflow-x-scroll max-lg:mx-auto max-lg:pr-5 max-lg:w-[90vw]">
                <table className='w-full mt-[1rem]'>
                    <tr>
                        <th className='w-[10px]'>
                            <input type="checkbox"
                                onChange={e => {
                                    let selectedBox = document.querySelectorAll("#selected-box")
                                    let sendedValues = []
                                    e.target.checked && Object.entries(data)?.map(([key, value]) => {
                                        sendedValues = [...sendedValues, { id: key, status: value.status }]
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
                        Object.entries(data)?.
                            filter(pl => ((pl[1]?.codeplainte.includes(searchInput)) ||
                                (pl[1]?.email.includes(searchInput))))?.
                            reverse().
                            map(([key, value]) => {
                                return (
                                    <tr
                                        key={`${key}`}
                                        className={`hover:bg-[var(--color-bpciGray2)] transition-all cursor-pointer}`}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                name=""
                                                onChange={(e) => {
                                                    !selectedPlainte.includes(value?.id)
                                                        && setSelectedPlainte([...selectedPlainte, { id: value?.id, status: value?.status }])

                                                    selectedPlainte.map(it => it.id).includes(value?.id)
                                                        && e.target.checked === false
                                                        && setSelectedPlainte(selectedPlainte.filter(i => i.id !== value.id))
                                                }}
                                                id="selected-box" />
                                        </td>
                                        <td
                                            onClick={() => navigate("/denonciation", { state: { data: data[key] } })}
                                            className={`cursor-pointer lf max-h-[1rem] max-w-[.5rem] truncate ${((!value.openByUsers) || (!value.openByUsers.includes(userContext.user?.email))) && 'font-PoppinsSemiBold'}`}>{value.codeplainte || "Non défini"}</td>
                                        <td className={`cursor-pointer ${((!value.openByUsers) || (!value.openByUsers.includes(userContext.user?.email))) && 'font-PoppinsSemiBold'}`}
                                            onClick={() => navigate("/denonciation", { state: { data: data[key] } })}
                                        >{value.datePlainte} - {value.heurePlainte}</td>
                                        <td className={`cursor-pointer ${((!value.openByUsers) || (!value.openByUsers.includes(userContext.user?.email))) && 'font-PoppinsSemiBold'}`}
                                            onClick={() => navigate("/denonciation", { state: { data: data[key] } })}
                                        >{value.email && value.email.trim().length > 0 ? value.email : "Anonyme"}</td>
                                        <td className={"cursor-pointer"}
                                            onClick={() => navigate("/denonciation", { state: { data: data[key] } })}
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
                    searchInput.length > 0 && Object.entries(data)?.filter(pl => ((pl[1].codeplainte.includes(searchInput)) || (pl[1].email.includes(searchInput)))).length < 1 &&
                    <p className='mt-[2rem] text-slate-600 text-[.8rem] text-center '>Aucune plainte trouvé avec un code ou email correspondant à {`<<${searchInput}>>`}.</p>
                }

                {
                    loading &&
                    <SpinnerWithText text={"Chagement des données. Veuillez patienter"} />
                }

                {
                    !Object.entries(data).length > 0 &&
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
            </div>


        </motion.div>
    )
}

export default DashBoardListDenonciations