import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { modalsValidateActionWithMessageAsyncThunc } from '../redux/slices/modalsSlice'
import { ref, update } from 'firebase/database'
import { toast } from 'react-toastify'
import { db } from '../plugins/firebase'
import { useNavigate } from 'react-router'

const ModalValidateActionWithMessage = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const { showModalsValidateActionWithMessage, dataForValidationAction } = useSelector((state) => state.modalsRed)
    return (
        <>
            {
                showModalsValidateActionWithMessage &&
                <div id="mvScrollBar" className="absolute inset-0 bg-[#00000093] 
                    z-[900] w-full h-full overflow-y-scroll flex justify-center py-[2rem] ">
                    <div id="mvScrollBar" className="w-full rounded-sm shadow-lg m-auto bg-white flex flex-col max-h-[500px] overflow-y-scroll max-w-[500px]">
                        <div className="px-6 py-3 border-b-[1px] border-gray-400/40 flex items-center justify-between">
                            <p className="text-[1.1rem] text-black font-PoppinsMedium">Formulaire de validation d'une plainte</p>
                            <button
                                onClick={() => {
                                    dispatch(modalsValidateActionWithMessageAsyncThunc(false))
                                }}
                                className="rounded-full text-black p-[.4rem] active:scale-90 transition-all">
                                <IoClose
                                    size={22}
                                />
                            </button>
                        </div>
                        <div className="flex-grow px-6 py-5">
                            <div className="text-[1rem] text-black font-[400]">
                                <p>Pourquoi voulez-vous clôturer cette plainte.</p>
                                <div className="mt-3">
                                    <div className="flex items-center gap-4 mb-[.5rem]" >
                                        <input type="radio" name="idio" id="ratio" className='m-0' />
                                        <p>La plainte à été traiter avec succès </p>
                                    </div>
                                    <div className="flex items-center gap-4 mb-[.5rem]" >
                                        <input type="radio" name="idio" id="ratio" className='m-0' />
                                        <p>Les preuves sont manquantes </p>
                                    </div>
                                    <div className="flex items-center gap-4 mb-[.5rem]" >
                                        <input type="radio" name="idio" id="ratio" className='m-0' />
                                        <p>Les preuves fournies sont inllisibles </p>
                                    </div>
                                    <div className="flex items-center gap-4 mb-[.5rem]" >
                                        <input type="radio" name="idio" id="ratio" className='m-0' />
                                        <p>La plainte n’est pas fondé </p>
                                    </div>
                                </div>
                            </div>

                            <label htmlFor="textarea " className="text-[1rem] text-black font-[400]">Autre:</label>
                            <textarea
                                id="w3review2"
                                // value={commentaire}
                                // onChange={(e) => setcommentaire(e.target.value)}
                                name="w3review2"
                                // rows="1"
                                cols="10"
                                className="w-full mt-2 h-[62px] rounded-[4px]"
                            >
                            </textarea>
                        </div>
                        <div className="p-4 border-t-[1px] border-gray-400/40 flex gap-2 justify-end items-center flex-wrap">
                            <button
                                onClick={() => {
                                    dispatch(modalsValidateActionWithMessageAsyncThunc(false))
                                }}
                                className="rounded-md shadow-md px-4 py-[.35rem] bg-[#6C757D] text-white transition-all active:scale-90">Annuler</button>
                            <button
                                onClick={() => {

                                    let recupInputState = document.querySelector("#ratio:checked")
                                    let textAreaMessageCustom = document.querySelector("#w3review2")
                                    if (recupInputState) {
                                        dataForValidationAction?.id.length > 0 && update(ref(db, 'plaintes/' +
                                            dataForValidationAction?.id), dataForValidationAction?.status === "Clôturé" ?
                                            { isArchive: true, status: "Clôturé", statusMessage: `${recupInputState.nextElementSibling.textContent}` }
                                            : dataForValidationAction?.status !== "Rejeté" ? { status: dataForValidationAction?.status, statusMessage: `${recupInputState.nextElementSibling.textContent}` }
                                                : { status: "Rejeté", statusMessage: `${recupInputState.nextElementSibling.textContent}` })
                                            .then(() => {
                                                toast.success("Action effectuée avec succès", { draggable: true })
                                                dispatch(modalsValidateActionWithMessageAsyncThunc(false))
                                                navigate('/');
                                            });
                                    }

                                    if (textAreaMessageCustom.value.length > 0) {
                                        dataForValidationAction?.id.length > 0 && update(ref(db, 'plaintes/' +
                                            dataForValidationAction?.id), dataForValidationAction?.status === "Clôturé" ?
                                            { isArchive: true, status: "Clôturé", statusMessage: `${textAreaMessageCustom.value}` }
                                            : { status: "Rejeté", statusMessage: `${textAreaMessageCustom.value}` })
                                            .then(() => {
                                                toast.success("Action effectuée avec succès", { draggable: true })
                                                dispatch(modalsValidateActionWithMessageAsyncThunc(false))
                                                navigate('/');
                                                //     });
                                            })
                                    }
                                }
                                }
                                className="rounded-md shadow-md px-4 py-[.35rem] bg-[#0D6EFD] text-white transition-all active:scale-90">Sauvegarder</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalValidateActionWithMessage