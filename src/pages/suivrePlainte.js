import React from "react";
import Footer from "../components/footer";

import USER from "../images/téléchargement.png"

import { motion } from "framer-motion"
import { useState } from "react";
import { ref, equalTo, orderByChild, query, onValue, update } from "firebase/database";
import { db } from "../plugins/firebase";
import SpinnerWithText from "../components/SpinnerWithText";
import { ThreeCircles } from "react-loader-spinner";
import { IoChatbox, IoChatbubble, IoSend } from "react-icons/io5";
import { TiCancelOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import BoxChatter from "../components/BoxChatter";

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


export default function SuivrePlainte() {
  const [data, setdata] = useState(false);
  const [dataAll, setdataAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const dbRef = ref(db, 'plaintes')

  const [activeComment, setActiveComment] = useState(false);
  const [commentaire, setcommentaire] = React.useState("")

  function searchplainte(e) {

    document.getElementById("searchinput").value.length > 0 && setLoading(true)

    const topUserPostsRef = query(dbRef, orderByChild('codeplainte'));
    onValue(topUserPostsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        if (childData.codeplainte == document.getElementById("searchinput").value) {
          setdata(childData.status)
          setdataAll(childData)
          setLoading(false)
        }
        // ...
      });
    }, {
      onlyOnce: true
    });

    console.log(document.getElementById("searchinput").value)
    const topUserPostsRef2 = query(dbRef, equalTo(document.getElementById("searchinput").value, 'codeplainte'));
    onValue(topUserPostsRef2, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(childData)
        console.log(childKey)
        // ...
      });
    }, {
      onlyOnce: true
    });

  }

  React.useEffect(() => {
    const starCountRef = ref(db, 'plaintes/' + dataAll?.id);
    dataAll?.id && onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setdataAll(data)
    });
  }, [dataAll?.id])



  return (
    <div className="min-h-screen bg-white pt-[1rem]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col justify-start item-center min-h-screen"
      >
        <div className="flex bg-bpciwhite justify-around item-center  mb-60">
          <div className=" h-auto justify-end item-center w-full fixed-w ">
            <div className="rounded overflow-hidden shadow-lg bg-bpciwhite px-9 w-full py-[2rem]">
              <div className="flex gap-9 flex-wrap">
                <div className="mb-[2rem]">
                  <p
                    className="font-PoppinsBold text-[1.1rem] uppercase text-bpcidark"
                  >
                    Suivre ma plainte
                  </p>
                </div>
              </div>

              <div>
                <p>Pour suivre votre demande, veuillez renseigner le numéro de suivi et votre code secret à .... Caractères présent dans votre fiche de dépôt de plainte.</p>

                <div className="w-full flex justify-center gap-4 align-center items-center mt-[1rem]">
                  <div className="w-full">
                    <label htmlFor="email">
                      Entrer le code de suivi de plainte{" "}
                    </label>
                    <div className="flex items-center gap-[1rem]">
                      <input
                        id="searchinput"
                        name="searchinput"
                        type="text"
                        className="border border-bpcidark"
                        style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                      />


                      <div className="relative">
                        {
                          loading && <div className="absolute inset-0 z-3 "></div>
                        }
                        <button
                          className={`${loading ? "bg-[var(--color-bpciblue-opacity-70)]" : "bg-[var(--color-bpciblue)]"} w-38 py-[.7rem] px-4 active:scale-[.8] transition-all rounded text-white flex gap-3`}
                          onClick={searchplainte}
                        >

                          {
                            loading && <ThreeCircles
                              height="20"
                              width="20"
                              color="#fff"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                              ariaLabel="three-circles-rotating"
                              outerCircleColor=""
                              innerCircleColor=""
                              middleCircleColor=""
                            />
                          }
                          Vérifier
                        </button>
                      </div>

                    </div>
                  </div>
                </div>

                {
                  loading &&
                  <SpinnerWithText
                    ali="start"
                    text={"Chagement de votre requête. Veuillez patienter"} />
                }

                {!loading && data &&
                  <div className="flex items-center justify-end align-center w-auto gap-5  h-20 flex-wrap  mt-4 ml-5"> Votre requête est
                    <p className={`${data === "En cours" ? "bg-[var(--color-bpciblue)]" : data === "Traité" ? "bg-green-700" : "bg-red-600"} px-[1rem] py-1 shadow-md rounded-full text-white text-[.8rem]`}>{data}</p>
                  </div>
                }


                {
                  Object.keys(dataAll).length > 0 && !loading &&
                  <>
                    <hr className="w-full my-[1.5rem] mt-0" />

                    <div>
                      <div className="flex justify-between gap-2 mt-4 flex-wrap">
                        <div className=" ">
                          <p className="text-bold text-[var(--color-bpciblue)]">Nom du plaignant: </p>
                        </div>

                        <div className=" ">
                          <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)]">{dataAll?.nom && dataAll?.nom.trim().length > 0 ? dataAll?.nom : "Anonyme"}</p>
                        </div>
                      </div>


                      <div className="flex justify-between gap-2 mt-4 flex-wrap ">
                        <div className=" ">
                          <p className="text-bold text-[var(--color-bpciblue)]">Prénom du plaignant: </p>
                        </div>

                        <div className=" ">
                          <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)]">{dataAll?.prenom && dataAll?.prenom.trim().length > 0 ? dataAll?.prenom : "Anonyme"}</p>
                        </div>
                      </div>

                      <div className="flex justify-between gap-2 mt-4 flex-wrap ">
                        <div className=" ">
                          <p className="text-bold text-[var(--color-bpciblue)]">Description de plainte : </p>
                        </div>

                        <div className="w-2/4">
                          <p className="font-PoppinsSemiBold text-right  text-[var(--color-bpciblue)]">{dataAll?.descriptionText || "-"}</p>
                        </div>
                      </div>

                      {/* <div className="flex justify-between gap-2 mt-4 flex-wrap ">
                        <div className=" ">
                          <p className="text-bold text-[var(--color-bpciblue)]">Commentaire sur la plainte : </p>
                        </div>

                        <div className="max-w-[400px] w-full">
                          <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)] text-end">{dataAll?.commentaire || "-"}</p>
                        </div>
                      </div> */}


                      <div className="flex justify-between gap-2 mt-4 flex-wrap ">
                        <div className=" ">
                          <p className="text-bold text-[var(--color-bpciblue)]">Date de plainte : </p>
                        </div>

                        <div className=" ">
                          <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)]">{dataAll?.datePlainte}</p>
                        </div>
                      </div>


                      <div className="flex justify-between gap-2 mt-4 flex-wrap ">
                        <div className=" ">
                          <p className="text-bold text-[var(--color-bpciblue)]">Heure de plainte : </p>
                        </div>

                        <div className=" ">
                          <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)]">{dataAll?.heurePlainte}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-start gap-9 mt-4 ">
                        <div className=" ">
                          <p className="text-bold text-[var(--color-bpciblue)]">Organisme concerné : </p>
                        </div>

                        <div className=" ">
                          <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)]">{dataAll?.organisation}</p>
                        </div>
                      </div>

                      <div className="flex justify-between gap-2 mt-4 flex-wrap ">
                        <div className=" ">
                          <p className="text-bold text-[var(--color-bpciblue)]">Personnes impliquées : </p>
                        </div>

                        <div className=" ">
                          {/* <p className="text-bold text-[var(--color-bpciblue)]">{datapage3.data['personneimplique']}</p> */}
                          {
                            dataAll?.personneimplique.split(",").map(it => {
                              return (
                                <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)] text-end">{it} -</p>
                              )
                            })
                          }
                        </div>
                      </div>

                      <hr className='mt-[4rem] mb-[2rem]' />

                      <div className="flex items-center justify-start w-full">
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
                                  // alert(dataplainte.data?.id)
                                  update(ref(db, 'plaintes/' + dataAll?.id),
                                    {
                                      commentaire: dataAll?.commentaire ?
                                        [...dataAll?.commentaire, { user: "Anonyme User", commentaire }] :
                                        [{ user: "Anonyme User", commentaire }]
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
                        !dataAll?.commentaire &&
                        <BoxChatter />
                      }

                      {
                        dataAll?.commentaire &&
                        <>
                          <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)] text-[1.1rem] 
                            text-center mt-[2rem] gap-2 flex items-center">Liste des messages
                            <IoChatbubble
                              className='ml-2'
                              size={15}
                            /></p>
                          <hr className='mt-[1rem] mb-[2em]' />
                          <ul className='leading-[2rem] to-default-ul mt-[.5rem]'>
                            {
                              dataAll?.commentaire?.reverse().map((it) => {
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
                  </>
                }

              </div>
            </div>
          </div>
        </div>
      </motion.div >
      <Footer />
    </div>
  );
}
