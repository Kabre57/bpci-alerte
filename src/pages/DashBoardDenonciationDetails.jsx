import React from 'react'
import { BsDownload, BsPause, BsPlay } from 'react-icons/bs'
import { AiOutlineDownload, AiTwotoneAudio } from "react-icons/ai";
import { IoArrowBack, IoDocument, IoImages, IoMusicalNotes, IoPlay, IoEye, IoChatbox, IoSend, IoChatbubble, IoDownload } from 'react-icons/io5';

import { useState } from "react";
import { ref, onValue, update, get, child, } from "firebase/database";
import { db } from "../plugins/firebase";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TiCancel, TiCancelOutline } from "react-icons/ti";
import NOT_FOUND from "../images/no_Message.png"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';
import {
    modalsImageAsyncThunc, modalsPDFAsyncThunc,
    modalsValidateActionWithMessageAsyncThunc,
    settingdataForValidationAction,
    settingImageURLAsyncThunc, settingPDFURLAsyncThunc
} from '../redux/slices/modalsSlice';
import { toast } from 'react-toastify';

import USER from "../images/téléchargement.png"
import BoxChatter from '../components/BoxChatter';
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



const DashBoardDenonciationDetails = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const [customChecherID, setCustomCheckerId] = useState("");
    const [dataplainte, setdataplainte] = useState();
    const [showActions, setShowActions] = React.useState(false)
    const [audioDuree, setaudioDuree] = React.useState(0)
    const [activeComment, setActiveComment] = useState(false);
    const [commentaire, setcommentaire] = React.useState("")
    const [audioPlayed, setaudioPlayed] = React.useState(false)
    const [audio, setaudio] = React.useState()
    const { value, } = useSelector((state) => state.denonciations)
    // const userContext.user = useSelector((state) => state.userInfo.value)
    const userContext = React.useContext(RootUserContext)

    const totalsDenonciationsWhereIDIn = React.useMemo(() => {
        return Object
            .values(value)
            .map(it => it.id)
            .includes(dataplainte?.data?.id)
    }, [value, dataplainte])

    const dispatch = useDispatch()

    // React.useEffect(() => {
    //     setcommentaire(dataplainte?.data?.commentaire)
    // }, [dataplainte?.data?.commentaire])

    const singlePDF = (data) => {

        const pdfData = data; // Example PDF data
        const binaryData = window.atob(pdfData.split(",")[1]); // Decode base64 data
        const sizeInBytes = binaryData.length; // Get size of binary data
        const sizeInKb = (sizeInBytes / 1024).toFixed(2);
        return (
            <div className="flex items-center w-full bg-[var(--color-bpciv2Graye)] gap-[.5rem] p-[1rem] rounded-sm mt-3">
                <div className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white">
                    <div className="bg-[#D9D9D9] text-black rounded-full p-2">
                        <IoDocument
                            size={15}
                        />
                    </div>
                </div>
                <div className="flex-grow">
                    <h3 className="text-[.9rem] font-PoppinsSemiBold leading-[2rem]">Fichier PDF </h3>
                    <p className=' text-[.92rem] leading-[1rem] font-PoppinsRegular'>Taille du fichier  : {`${sizeInKb || 0}KB`}</p>
                </div>
                <div className="flex gap-[.5rem] itmes-center">
                    <div className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white active:scale-[.9] transition-all ">
                        <IoEye
                            size={15}
                        />
                    </div>
                    <div
                        onClick={() => {
                            var link = document.createElement('a');
                            link.href = data;
                            link.download = `${Date.now()}.pdf`;
                            link.dispatchEvent(new MouseEvent('click'));
                        }}
                        className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white active:scale-[.9] transition-all ">
                        <BsDownload
                            size={15}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const singleIMG = (data) => {
        const pdfData = data; // Example PDF data
        const binaryData = window.atob(pdfData.split(",")[1]); // Decode base64 data
        const sizeInBytes = binaryData.length; // Get size of binary data
        const sizeInKb = (sizeInBytes / 1024).toFixed(2);

        return (
            <div className="flex items-center w-full bg-[var(--color-bpciv2Graye)] gap-[.5rem] p-[1rem] rounded-sm mt-3">
                <div className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white">
                    <div className="bg-[#D9D9D9] text-black rounded-full p-2">
                        <IoImages
                            size={15}
                        />
                    </div>
                </div>
                <div className="flex-grow">
                    <h3 className="text-[.9rem] font-PoppinsSemiBold leading-[2rem] ">Fichier image</h3>
                    <p className=' text-[.92rem] leading-[1rem] font-PoppinsRegular'>Taille du fichier  :  {`${sizeInKb || 0}KB`}</p>
                </div>
                <div className="flex gap-[.5rem] itmes-center">
                    <button
                        onClick={() => {
                            dispatch(modalsImageAsyncThunc(true))
                            dispatch(settingImageURLAsyncThunc(data))
                        }}
                        className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white active:scale-[.9] transition-all ">
                        <IoEye
                            size={15}
                        />
                    </button>
                    <div

                        onClick={() => {
                            var link = document.createElement('a');
                            link.href = data;
                            link.download = data.startsWith("data:image/jpeg") ? `${Date.now()}.jpeg` : data.startsWith("data:image/jpg") ? `${Date.now()}.jpg` : `${Date.now()}.png`;
                            link.dispatchEvent(new MouseEvent('click'));
                        }}
                        className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white active:scale-[.9] transition-all ">
                        <BsDownload
                            size={15}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const descriptionAudio = (data) => {
        const pdfData = data; // Example PDF data
        const binaryData = window.atob(pdfData.split(",")[1]); // Decode base64 data
        const sizeInBytes = binaryData.length; // Get size of binary data
        const sizeInKb = (sizeInBytes / 1024).toFixed(2);


        return (
            <div className="flex items-center w-full bg-[var(--color-bpciv2Graye)] gap-[.5rem] p-[1rem] rounded-sm">
                <div className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white">
                    <div className="bg-[#D9D9D9] text-black rounded-full p-2">
                        <AiTwotoneAudio
                            size={15}
                        />
                    </div>
                </div>

                <div className="flex-grow">
                    <h3 className="text-[.9rem] font-PoppinsSemiBold leading-[2rem] ">Audio</h3>
                    <p className=' text-[.92rem] leading-[1rem] font-PoppinsRegular'>Temps: {`${parseFloat((audioDuree || 0).toFixed(2)) !== Infinity ? (audioDuree || 0).toFixed(2) : 0}s`}</p>
                </div>
                <div className="flex gap-[.5rem] itmes-center">
                    <button
                        onClick={() => {
                            if (!audioPlayed) {
                                audio.play()
                                setaudioPlayed(!audioPlayed)
                            }
                            else {
                                audio.pause()
                                setaudioPlayed(!audioPlayed)
                            }
                        }}
                        className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white active:scale-[.9] transition-all ">
                        {
                            audioPlayed ? <BsPause
                                size={15}
                            /> : <BsPlay
                                size={15}
                            />
                        }
                    </button>
                    <div
                        onClick={() => {
                            var link = document.createElement('a');
                            link.href = data;
                            link.download = `plainte${Date.now()}.mp3`;
                            link.dispatchEvent(new MouseEvent('click'));
                        }}
                        className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white active:scale-[.9] transition-all ">
                        <BsDownload
                            size={15}
                        />
                    </div>
                </div>
            </div>
        )
    }

    React.useEffect(() => {
        let checkUserHasNotReadItForTheMoment = dataplainte?.data?.openByUsers ?
            !dataplainte?.data?.openByUsers.includes(userContext.user?.email) : true

        totalsDenonciationsWhereIDIn && Object
            .values(value).length > 0 && checkUserHasNotReadItForTheMoment && update(ref(db, 'plaintes/' +
                dataplainte?.data?.id), {
                openByUsers: dataplainte?.data?.openByUsers ?
                    [...dataplainte?.data?.openByUsers, userContext.user?.email] : [userContext.user?.email],
            }).catch((er) =>
                toast.error("Une erreur est survenue", { draggable: true }))
    }, [location.state, totalsDenonciationsWhereIDIn, dataplainte])

    React.useEffect(() => {
        let audioFile = new Audio(dataplainte?.data?.descriptionAudio)
        !audio && setaudio(audioFile)

        if (!audio) {
            audioFile.addEventListener('loadedmetadata', () => {
                setaudioDuree(audioFile.duration);
            });
        }
    }, [dataplainte?.data?.descriptionAudio])

    React.useEffect(() => {
        setShowActions(false);
    }, [])

    React.useEffect(() => {
        if (audio) {
            audio.onended = () => {
                setaudioPlayed(false)
            }
        }
    }, [audio])

    React.useEffect(() => {
        if (location.state?.data) {
            const dbRefee = ref(db)
            get(child(dbRefee, `plaintes/${location.state?.data?.id}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.val() && setdataplainte({ data: snapshot.val() })
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }

        if (!location.state?.data) navigate("/")

    }, [location])

    React.useEffect(() => {
        if (location.state?.data?.id) {
            const starCountRef = ref(db, 'plaintes/' + location.state?.data?.id);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                data && setdataplainte({ data: data })
            });
        }
    }, [])


    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className="">
            <div className="bg-[var(--color-bpciblue)] min-h-[50px] flex justify-between content-center 
                h-fit max-[550px]:justify-start max-[550px]:flex-wrap">
                <p className="font-PoppinsBold text-[1.2rem] text-white py-[.25rem] h-fit my-auto 
                px-[1.5rem] ">Dénonciation n° : {dataplainte?.data?.codeplainte}</p>
                <div className="flex items-center justify-end px-[1rem]">

                    <span className={`inline whitespace-pre mr-2 ${dataplainte?.data?.status ? (() => {
                        switch (dataplainte?.data?.status) {
                            case "Clôturé":
                                return "bg-slate-400"

                            case "Traité":
                                return "bg-green-400"

                            case "Rejeté":
                                return "bg-red-400"

                            default:
                                return "bg-yellow-400"
                        }
                    })() : "bg-slate-400"} rounded-lg text-white py-[.15rem] text-[.9rem] px-4`}>{dataplainte?.data?.status && dataplainte?.data?.status.trim().length > 0 ? dataplainte?.data?.status : "Non défini"}</span>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center h-full active:scale-[.85] cursor-pointer max-lg:hidden
                        px-[1.5rem] hover:text-[var(--color-bpciblue)] transition-all hover:bg-white text-white gap-[.5rem]">
                        <IoArrowBack
                            size={15}

                        />
                        <p>Retour</p>
                    </button>

                    {
                        dataplainte?.data && (
                            <button
                                onClick={() => {

                                    navigate('/recapPDF', { state: { data: dataplainte.data } });
                                }}
                                className="flex items-center justify-center h-full active:scale-[.85] cursor-pointer max-lg:hidden
                        px-[1.5rem] hover:text-[var(--color-bpciblue)] transition-all hover:bg-white text-white gap-[.5rem]">
                                <AiOutlineDownload
                                    size={15}

                                />
                                <p>Télécharger</p>
                            </button>
                        )
                    }

                    {
                        (!["Rejeté", "Clôturé", "Traité"].includes(dataplainte?.data?.status)) && dataplainte?.data &&
                        <>
                            <div className="dropdown">
                                <button
                                    onClick={() => setShowActions(!showActions)}
                                    className="dropbtn">Actions <ion-icon name="caret-down-outline" style={{ fontSize: "1.1rem" }}></ion-icon></button>
                                <div
                                    id="myDropdown"
                                    className={showActions ? "dropdown-content show" : "dropdown-content"}>
                                    <div className="min-[500px]:hidden">
                                        <button
                                            className="flex items-center justify-center h-full active:scale-[.85] cursor-pointer min-[1000px]:hidden
                                    px-[1.5rem] hover:text-[var(--color-bpciblue)] transition-all hover:bg-white gap-[.5rem]"
                                            onClick={() => window.history.back()}
                                        > Retour</button>
                                    </div>

                                    <hr className="w-full my-[.25rem] min-[500px]:hidden" />
                                    <div className="min-[1000px]:hidden">
                                        <button

                                            onClick={() => {
                                                navigate('/recapPDF', { state: { data: dataplainte.data } });
                                            }}

                                            className="flex items-center justify-center h-full active:scale-[.85] cursor-pointer 
                                        px-[1.5rem] hover:text-[var(--color-bpciblue)] transition-all hover:bg-white gap-[.5rem]">

                                            <span className='flex-grow'>Télécharger</span>
                                        </button>
                                    </div>

                                    <hr className="w-full my-[.25rem] min-[500px]:hidden" />
                                    {
                                        !["Rejeté", "Clôturé", "Traité"].includes(dataplainte?.data?.status) && <button className="text-[.95rem]"
                                            onClick={() => {
                                                // if (dataplainte?.data?.commentaire === undefined) {
                                                //     toast.error("Vous devez ajouter un commentaire avant de valider la dénonciation.", { draggable: true })
                                                //     setShowActions(!showActions)
                                                //     return
                                                // }

                                                // dataplainte?.data?.commentaire.length > 0 && update(ref(db, 'plaintes/' + dataplainte?.data?.id),
                                                //     {
                                                //         isArchive: false, status: "Traité",
                                                //     }).then(() => {
                                                //         toast.success("Requête validée", { draggable: true })
                                                //     });

                                                // return;


                                                dispatch(modalsValidateActionWithMessageAsyncThunc(true))
                                                dispatch(settingdataForValidationAction({ id: dataplainte?.data?.id, status: "Traité" }))
                                            }}
                                        >Traiter</button>
                                    }

                                    {/* <hr className="w-full my-[.25rem]" />

                                    <button className="text-[.95rem]"
                                        onClick={() => {

                                            if (dataplainte?.data?.status !== "En cours") {
                                                update(ref(db, 'plaintes/' + dataplainte?.data?.id),
                                                    { status: "En cours", isArchive: false }).then(() => {
                                                        toast.success("Requête validée", { draggable: true })
                                                    });
                                                setShowActions(!showActions)
                                                return;
                                            }
                                        }}
                                    >En cours</button> */}


                                    <hr className="w-full my-[.25rem]" />
                                    <button className="text-[.95rem]"
                                        onClick={() => {

                                            if (dataplainte?.data?.status !== "Rejeté") {
                                                // dataplainte?.data?.commentaire.length > 0 && update(ref(db, 'plaintes/' + dataplainte?.data?.id),
                                                //     { status: "Rejeté", commentaire: commentaire, isArchive: false }).then(() => {
                                                //         toast.success("Requête validée", { draggable: true })
                                                //     });
                                                // !dataplainte?.data?.commentaire.length > 0 &&
                                                dispatch(modalsValidateActionWithMessageAsyncThunc(true))
                                                dispatch(settingdataForValidationAction({ id: dataplainte?.data?.id, status: "Rejeté" }))
                                                setShowActions(!showActions)
                                                return;
                                            }
                                        }}
                                    >Rejeter</button>

                                    {
                                        !dataplainte?.data?.isArchive && <>
                                            <hr className="w-full my-[.25rem]" />

                                            <button
                                                className="text-[.95rem] flex gap-2 flex-row items-center justify-center"
                                                onClick={() => {
                                                    if (!dataplainte?.data?.isArchive) {
                                                        dispatch(modalsValidateActionWithMessageAsyncThunc(true))
                                                        dispatch(settingdataForValidationAction({ id: dataplainte?.data?.id, status: "Clôturé" }))
                                                    }
                                                    // update(ref(db, 'plaintes/' +
                                                    //     dataplainte?.data?.id), { isArchive: true, status: "Clôturé" })
                                                    //     .then(() => {
                                                    //         toast.success("Plainte archivée avec succès", { draggable: true })
                                                    //     });
                                                }}

                                            >
                                                Clôturer</button>
                                        </>
                                    }
                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>
            <div className="flex max-[600px]:flex-col">
                <div className="w-full max-w-[400px] max-[600px]:max-w-full p-[1.5rem]">
                    <div className="">
                        <h3 className="text-[.9rem] font-PoppinsSemiBold">Information sur la dénonciation</h3>
                        <div className="flex items-center gap-[1rem]">
                            <p className='mt-[1rem] font-PoppinsLight'>Date sur la dénonciation :</p>
                            <p className='mt-[1rem]'>{dataplainte?.data?.datePlainte}</p>
                        </div>
                        <div className="flex items-center gap-[1rem]">
                            <p className='mt-[1rem] font-PoppinsLight'>Heure de la dénonciation :</p>
                            <p className='mt-[1rem]'>{dataplainte?.data?.heurePlainte}</p>
                        </div>
                    </div>

                    <hr className="w-full my-[1.5rem]" />

                    <div className="">
                        <h3 className="text-[.9rem] font-PoppinsSemiBold">Profile du dénonciateur</h3>
                        {dataplainte?.data?.email.trim().length > 0 &&
                            <>
                                <div className="flex items-center gap-[1rem]">
                                    <p className='mt-[1rem] font-PoppinsLight'>Nom :</p>
                                    <p className='mt-[1rem]'>{dataplainte?.data?.nom && dataplainte?.data?.nom.trim().length > 0 ? dataplainte?.data?.nom : "Anonyme"}</p>
                                </div>
                                <div className="flex items-center gap-[1rem]">
                                    <p className='mt-[1rem] font-PoppinsLight'>Prénom :</p>
                                    <p className='mt-[1rem]'>{dataplainte?.data?.prenom && dataplainte?.data?.prenom.trim().length > 0 ? dataplainte?.data?.prenom : "Anonyme"}</p>
                                </div>
                                <div className="flex items-center gap-[1rem]">
                                    <p className='mt-[1rem] font-PoppinsLight'>Adresse email :</p>
                                    <p className='mt-[1rem]'>{dataplainte?.data?.email && dataplainte?.data?.email.trim().length > 0 ? dataplainte?.data?.email : "Anonyme"}</p>
                                </div>
                                <div className="flex items-center gap-[1rem]">
                                    <p className='mt-[1rem] font-PoppinsLight'>Contact téléphonique :</p>
                                    <p className='mt-[1rem]'>{dataplainte?.data?.phone && dataplainte?.data?.phone.trim().length > 0 ? dataplainte?.data?.phone : "Anonyme"}</p>
                                </div>
                            </>
                        }
                        {
                            !dataplainte?.data?.email.trim().length > 0 &&
                            <div className=" w-fit flex items-center justify-center gap-[1rem] mt-[1rem] relative">
                                <input
                                    // onChange={(e) => changeAnonyme(e)} 
                                    defaultChecked
                                    id="isAnonyme" name="isAnonyme" type="checkbox" className='noM'
                                    style={{ borderWidth: "1px", borderColor: "#CED4DA", display: "inline" }} />
                                <p htmlFor="isAnonyme" className="inline">Profil anonyme</p>
                                <div className="absolute inset-0 w-full h-full z-2" />
                            </div>
                        }


                    </div>

                    <div className="mt-[3rem]">
                        <h3 className="text-[.9rem] font-PoppinsSemiBold">Organisme concerné</h3>
                        <p className="font-PoppinsLight mt-[1rem]">
                            {dataplainte?.data?.organisation || "Non défini"}
                        </p>
                    </div>

                    <hr className="w-full my-[1.5rem]" />

                    <div className="mt-[3rem]">
                        <h3 className="text-[.9rem] font-PoppinsSemiBold">Personnes impliquées </h3>

                        {
                            dataplainte?.data?.personneimplique ? <ul className='leading-[2rem] to-default-ul pl-[1rem]'>{
                                dataplainte?.data?.personneimplique.split(",").map(it => {
                                    return (

                                        <li className='font-PoppinsLight text-[.92rem]'>
                                            <p className="text-[var(--color-bpciblue)]">{it}</p>
                                        </li>
                                    )
                                })
                            } </ul> : <p className="font-PoppinsLight mt-[1rem]">Non défini</p>
                        }
                    </div>

                    <hr className="w-full my-[1.5rem]" />

                    <h3 className="text-[.9rem] font-PoppinsSemiBold mt-[1rem]">Commentaire après traitement de la plainte.</h3>

                    <ul className='to-default-ul ml-4'>
                        <li className=''>{dataplainte?.data?.statusMessage || "Vide."}</li>
                    </ul>
                </div>

                <div className="w-full border-l-2 border-[var(--color-bpciGray)] p-[1.5rem] max-[600px]:border-t-2 max-[600px]:border-l-0 max-[600px]:mt-6">
                    <h3 className="text-[.9rem] font-PoppinsSemiBold mt-[1rem]">Description de la plainte</h3>
                    <div className="mt-[1rem] leading-[2rem]">
                        {dataplainte?.data?.descriptionText}

                        <h3 className="text-[.9rem] font-PoppinsSemiBold mt-[1rem] mb-[.8rem]">Description de la plainte en fichier audio</h3>

                        {
                            dataplainte?.data?.descriptionAudio && !((dataplainte?.data?.descriptionAudio.startsWith("data:image/jpeg")) ||
                                (dataplainte?.data?.descriptionAudio.startsWith("data:image/jpg")) ||
                                dataplainte?.data?.descriptionAudio.startsWith("data:image/png")) &&
                            descriptionAudio(dataplainte?.data?.descriptionAudio)
                        }

                        {
                            (!dataplainte?.data?.descriptionAudio)
                            && <p className="text-[.9rem] mt-[1rem]">Aucun fichier audio n'a été joint à cette plainte</p>
                        }


                        <h3 className="text-[.9rem] font-PoppinsSemiBold mt-[1rem]">Fichiers joints comme preuve </h3>

                        <div className="mt-5">
                            {
                                dataplainte?.data?.preuve && !(typeof dataplainte?.data?.preuve === "string") && dataplainte?.data?.preuve?.map(item => {
                                    if (item.startsWith("data:application/pdf")) {
                                        const pdfData = item; // Example PDF data
                                        const binaryData = window.atob(pdfData.split(",")[1]); // Decode base64 data
                                        const sizeInBytes = binaryData.length; // Get size of binary data
                                        const sizeInKb = (sizeInBytes / 1024).toFixed(2);
                                        return (

                                            <div className="flex items-center w-full bg-[var(--color-bpciv2Graye)] gap-[.5rem] p-[1rem] rounded-sm mt-3">
                                                <div className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white">
                                                    <div className="bg-[#D9D9D9] text-black rounded-full p-2">
                                                        <IoDocument
                                                            size={15}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="text-[.9rem] font-PoppinsSemiBold leading-[2rem]">Fichier PDF </h3>
                                                    <p className=' text-[.92rem] leading-[1rem] font-PoppinsRegular'>Taille du fichier  : {`${sizeInKb || 0}KB`}</p>
                                                </div>
                                                <div className="flex gap-[.5rem] itmes-center">
                                                    <button
                                                        onClick={() => {
                                                            dispatch(modalsPDFAsyncThunc(true))
                                                            // dispatch(settingPDFURLAsyncThunc(item))
                                                            dispatch(settingPDFURLAsyncThunc(item))
                                                        }}
                                                        className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white active:scale-[.9] transition-all ">
                                                        <IoEye
                                                            size={15}
                                                        />
                                                    </button>
                                                    <div
                                                        onClick={() => {
                                                            var link = document.createElement('a');
                                                            link.href = item;
                                                            link.download = `${Date.now()}.pdf`;
                                                            link.dispatchEvent(new MouseEvent('click'));
                                                        }}
                                                        className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white active:scale-[.9] transition-all ">
                                                        <BsDownload
                                                            size={15}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if ((item.startsWith("data:image/jpeg")) || (item.startsWith("data:image/jpg")) || item.startsWith("data:image/png")) {
                                        const pdfData = item; // Example PDF data
                                        const binaryData = window.atob(pdfData.split(",")[1]); // Decode base64 data
                                        const sizeInBytes = binaryData.length; // Get size of binary data
                                        const sizeInKb = (sizeInBytes / 1024).toFixed(2);
                                        return (
                                            <div className="flex items-center w-full bg-[var(--color-bpciv2Graye)] gap-[.5rem] p-[1rem] rounded-sm mt-3">
                                                <div className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white">
                                                    <div className="bg-[#D9D9D9] text-black rounded-full p-2">
                                                        <IoImages
                                                            size={15}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="text-[.9rem] font-PoppinsSemiBold leading-[2rem] ">Fichier image</h3>
                                                    <p className=' text-[.92rem] leading-[1rem] font-PoppinsRegular'>Taille du fichier  : {`${sizeInKb || 0}KB`}</p>
                                                </div>
                                                <div className="flex gap-[.5rem] itmes-center">
                                                    <button
                                                        onClick={() => {
                                                            dispatch(modalsImageAsyncThunc(true))
                                                            dispatch(settingImageURLAsyncThunc(item))
                                                        }}
                                                        className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white active:scale-[.9] transition-all ">
                                                        <IoEye
                                                            size={15}
                                                        />
                                                    </button>
                                                    <div
                                                        onClick={() => {
                                                            var link = document.createElement('a');
                                                            link.href = item;
                                                            // link.download = 
                                                            link.download = item.startsWith("data:image/jpeg") ? `${Date.now()}.jpeg` : item.startsWith("data:image/jpg") ? `${Date.now()}.jpg` : `${Date.now()}.png`;
                                                            link.dispatchEvent(new MouseEvent('click'));
                                                        }}
                                                        className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white active:scale-[.9] transition-all ">
                                                        <BsDownload
                                                            size={15}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    else {
                                        const pdfData = item; // Example PDF data
                                        const binaryData = window.atob(pdfData.split(",")[1]); // Decode base64 data
                                        const sizeInBytes = binaryData.length; // Get size of binary data
                                        const sizeInKb = (sizeInBytes / 1024).toFixed(2);
                                        return (
                                            <>
                                                <div className="flex items-center w-full bg-[var(--color-bpciv2Graye)] gap-[.5rem] p-[1rem] rounded-sm mt-3">
                                                    <div className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white">
                                                        <div className="bg-[#D9D9D9] text-black rounded-full p-2">
                                                            <IoMusicalNotes
                                                                size={15}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h3 className="text-[.9rem] font-PoppinsSemiBold leading-[2rem] ">Fichier audio</h3>
                                                        <p className=' text-[.92rem] leading-[1rem] font-PoppinsRegular'>Taille du fichier  : {`${sizeInKb || 0}KB`}</p>
                                                    </div>
                                                    <div className="flex gap-[.5rem] itmes-center">
                                                        <div className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white active:scale-[.9] transition-all ">
                                                            <IoPlay
                                                                size={15}
                                                            />
                                                        </div>
                                                        <div className="p-[.5rem] rounded-md bg-[var(--color-bpciblue)] text-white active:scale-[.9] transition-all ">
                                                            <BsDownload
                                                                size={15}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                })
                            }
                            {
                                (typeof dataplainte?.data?.preuve === "string") && dataplainte?.data?.preuve && <>
                                    {
                                        dataplainte?.data?.preuve.startsWith("data:application/pdf") &&
                                        (
                                            singlePDF(dataplainte?.data?.preuve)
                                        )
                                    }

                                    {
                                        ((dataplainte?.data?.preuve.startsWith("data:image/jpeg")) ||
                                            (dataplainte?.data?.preuve.startsWith("data:image/jpg")) ||
                                            dataplainte?.data?.preuve.startsWith("data:image/png")) &&
                                        (
                                            singleIMG(dataplainte?.data?.preuve)
                                        )

                                    }

                                </>
                            }

                            {
                                !dataplainte?.data?.preuve && <p className="text-[.9rem] mt-[1rem]">Aucun fichier n'a été joint à cette plainte</p>
                            }

                            <hr className='mt-[4rem] mb-[2rem]' />

                            {
                                dataplainte?.data && <div className="flex items-center justify-start w-full">
                                    <button
                                        onClick={() => {
                                            setActiveComment(true)
                                        }}
                                        className="justify-center
                                   active:scale-[.85] cursor-pointer py-1 px-[.5rem] text-[var(--color-bpciblue)]
                                   flex items-center transition-all 
                                   border-b-[1px] border-[var(--color-bpciblue)]">
                                        <p className='text-[.85rem]'>Envoyer un message</p>
                                        <IoChatbox
                                            className='ml-2'
                                            size={15}
                                        />
                                    </button>
                                </div>
                            }

                            {
                                activeComment && <div className="">
                                    <div className="mt-5 w-full">
                                        <label htmlFor="textarea " className="">Laissez un message</label>
                                        <textarea
                                            id="w3review2"
                                            value={commentaire}
                                            onChange={(e) => setcommentaire(e.target.value)}
                                            name="w3review2"
                                            rows="1"
                                            cols="10"
                                            className="w-full mt-2"
                                        >
                                        </textarea>
                                        <div className="flex justify-end gap-[1rem]">
                                            <button
                                                onClick={() => {
                                                    setActiveComment(false)
                                                    setcommentaire("")
                                                }}
                                                className="justify-center 
                                                    active:scale-[.85] cursor-pointer py-1  px-[.5rem] text-[var(--color-bpciblue)]
                                                    flex items-center transition-all 
                                                    border-[1px] border-[var(--color-bpciblue)]">
                                                <p className='text-[.85rem]'>Annuler</p>
                                                {/* <TiCancelOutline
                                                    className='ml-1'
                                                    size={20}
                                                /> */}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    // alert(dataplainte?.data?.id)
                                                    update(ref(db, 'plaintes/' + dataplainte?.data?.id),
                                                        {
                                                            commentaire: dataplainte?.data?.commentaire ?
                                                                [...dataplainte?.data?.commentaire, { user: userContext.user?.email, commentaire }] :
                                                                [{ user: userContext.user?.email, commentaire }]
                                                        })
                                                        .then(() => {
                                                            toast.success("Message envoyé avec succès", { draggable: true })
                                                            setActiveComment(false)
                                                            setcommentaire("")
                                                        })
                                                        .catch((er) => {
                                                            toast.error("Une erreur est survenue lors de l'envoie de votre message", { draggable: true })
                                                        })

                                                }}
                                                className="justify-center 
                                                    active:scale-[.85] cursor-pointer py-1 bg-[var(--color-bpciblue)] px-[.5rem] text-white
                                                    flex items-center hover:bg-transparent hover:text-[var(--color-bpciblue)] transition-all 
                                                    border-b-[1px] border-[var(--color-bpciblue)]">
                                                <p className='text-[.85rem]'>Envoyer</p>
                                                <IoSend
                                                    className='ml-2'
                                                    size={13}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                dataplainte?.data && !dataplainte?.data?.commentaire &&
                                <BoxChatter />
                            }

                            {
                                dataplainte?.data?.commentaire &&
                                <>
                                    <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)] text-[1.1rem] text-center mt-[2rem] gap-2 flex items-center">Liste des messages
                                        <IoChatbubble
                                            className='ml-2'
                                            size={15}
                                        /></p>
                                    <hr className='mt-[1rem] mb-[2em]' />
                                    <ul className='leading-[2rem] to-default-ul mt-[.5rem]'>
                                        {
                                            dataplainte?.data?.commentaire?.reverse().map((it) => {
                                                return (
                                                    <div className='shadow-lg rounded-md p-3 px-5 mb-[1.5rem]'>
                                                        <li className='flex gap-5 items-center'>
                                                            <img src={USER}
                                                                alt=""
                                                                className='w-[40px] h-[40px] max-lg:hidden rounded-full shadow-lg'
                                                            />
                                                            <div className="flex flex-col justify-center w-full ">
                                                                <p className='font-PoppinsSemiBold text-[var(--color-bpciblue)] mr-[.5rem]'>{it?.user || "Non défini"}</p>
                                                                <div className="">
                                                                    <p>{it?.commentaire || "Non défini"}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </div>
                                                )
                                            })
                                        }
                                    </ul>
                                </>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default DashBoardDenonciationDetails