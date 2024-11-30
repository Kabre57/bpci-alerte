import React from "react";
import { Formik, Form, Field } from "formik";
import Footer from "../components/footer";
import { BsUpload } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { db } from '../plugins/firebase'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getDatabase, ref, child, push, set, update } from "firebase/database";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import { add_user, userAsyncThunc } from "../redux/slices/userSlices";


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



export default function Recapitulatif() {

  let navigate = useNavigate();
  const location = useLocation();
  const [datapage, setdatapage] = useState(location.state);

  if (!location.state) {
    navigate('/');
  }

  // Importer Moment.js
  const moment = require('moment');
  // Définir la fonction qui retourne la date d'aujourd'hui au format "20 Janvier 2023" avec le locale français
  function getDateAujourdhui() {
    // Définir le locale français pour Moment.js
    moment.locale('fr');

    // Obtenir la date d'aujourd'hui avec Moment.js
    const aujourdhui = moment();

    // Formater la date en utilisant le format "D MMMM YYYY" (ex: "20 Janvier 2023")
    const dateFormatee = aujourdhui.format('D MMMM YYYY');

    // Retourner la date formatée
    return dateFormatee;
  }

  // Utiliser la fonction pour afficher la date d'aujourd'hui au format "20 Janvier 2023"
  console.log(getDateAujourdhui());

  function generatePDF() {
    // Récupérer l'élément HTML à exporter
    const elementHTML = document.getElementById('recapitulatif');

    // // Créer un canvas à partir de l'élément HTML
    // html2canvas(elementHTML).then((canvas) => {
    //   // Créer un objet jsPDF
    //   const pdfDoc = new jsPDF('l', 'mm', 'a4');

    //   // Ajouter le canvas sous forme d'image
    //   const imgData = canvas.toDataURL('image/png');
    //   pdfDoc.addImage(imgData, 'PNG', 0, 0, 297, 100);

    //   // Télécharger le fichier PDF
    //   pdfDoc.save(`Recap-${Date.now()}-${datapage.data['codeplainte']}.pdf`);
    // });
    const pdfDoc = new jsPDF('l', 'px', 'a4');

    // Convertir l'élément HTML en une chaîne de caractères


    // Ajouter le contenu HTML au document PDF
    //pdfDoc.fromHTML(htmlString, 15, 15);
    pdfDoc.html(elementHTML, {
      callback: function () {
        // Télécharger le fichier PDF
        pdfDoc.save(`Recap-${Date.now()}-${datapage.data['codeplainte']}.pdf`);
      },
      margin: [1, 1],
      x: 1,
      y: 1,


    });

    // Télécharger le fichier PDF

  }



  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex bg-white flex-col 
    
    justify-around item-center content-center min-h-screen"
    >
      <div className="flex justify-around fixed-w w-full item-center content-center ">
        <div className=" h-fit p-2 w-full justify-end item-center content-center ">
          <div className="rounded overflow-hidden bg-bpciwhite shadow-lg   ">

            <div id="recapitulatif" className="rounded overflow-hidden  px-9 w-11/12 ">
              <div className="flex gap-9 px-5 h-20   flex-wrap content-center">


                <div className="">
                  <p className="font-PoppinsSemiBold text-bpcidark pl-2">Récapitulatif remontée d’alerte</p>
                </div>
              </div>

              <div className="flex flex-wrap clear-both">
                <div className="w-3/4">
                  <div className="flex justify-between max-[500px]:flex-wrap gap-1 m-7 mt-4 w-full">
                    <div className="gap-2 w-1/2 max-[500px]:w-full ">
                      <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)] text-bpcidark">Nom </p>

                      <p className="font-PoppinsSemiBold mt-3 ">{datapage.data['nom'] && datapage.data['nom'].trim().length > 0 ? datapage.data['nom'] : "Anonyme"} </p>
                    </div>
                    <div className="gap-2 justifty-start  w-1/2 max-[500px]:w-full">
                      <p className="gap-2 font-PoppinsSemiBold text-[var(--color-bpciblue)]">Date de la plainte </p>

                      <p className="font-PoppinsSemiBold mt-3 ">{datapage.data['datePlainte']}</p>
                    </div>

                  </div>

                  <div className="flex justify-between max-[500px]:flex-wrap gap-1 m-7 mt-4 w-full">
                    <div className="gap-2 w-1/2 max-[500px]:w-full">
                      <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)] text-bpcidark">Prénom </p>

                      <p className="font-PoppinsSemiBold mt-3 ">{datapage.data['prenom'] && datapage.data['prenom'].trim().length > 0 ? datapage.data['prenom'] : "Anonyme"} </p>
                    </div>

                    <div className="gap-2 justifty-start  w-1/2 max-[500px]:w-full">
                      <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)] text-bpcidark">Heure </p>

                      <p className="font-PoppinsSemiBold mt-3 ">{datapage.data['heurePlainte']}</p>
                    </div>

                  </div>

                  <div className="flex justify-between gap-1 m-7 mt-4 w-full">

                    <div className="gap-2 justifty-start  w-1/2 max-[500px]:w-full">
                      <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)] text-bpcidark">Personnes impliquées </p>

                      {/* <p className="font-PoppinsSemiBold mt-3 ">{datapage.data['heurePlainte']}</p> */}

                      <div className="mt-4">
                        {
                          datapage.data['personneimplique'].split(",").map(it => {
                            return (
                              <p className="text-[var(--color-bpciblue)] font-PoppinsSemiBold ">. {it}</p>
                            )
                          })
                        }
                      </div>
                    </div>

                  </div>


                  <div className="flex justify-between gap-1 m-7 mt-4 w-1/2 max-[500px]:w-full">
                    <div className="gap-2 w-1/2 max-[500px]:w-full">
                      <p className="font-PoppinsSemiBold text-[var(--color-bpciblue)]">Code de suivi de plainte </p>

                      <p className="font-PoppinsSemiBold mt-3 ">{datapage.data['codeplainte']}</p>
                    </div>
                  </div>

                </div>
                <div className="">
                  {/* <p className="text-[var(--color-bpciblue)] text-center pt-4">QR CODE</p> */}
                  <img alt="qr code" src={datapage.data['codeQrImagePlainte']} />

                </div>
              </div>

            </div>

            <div className="flex justify-between pl-8 gap-1 m-7 mt-4 w-1/2 max-[500px]:w-full">
              <div className=" ">
                <p className="font-PoppinsSemiBold text-red-500 ">*Un mail a été envoyé à xyz@entreprise.groupe.ci </p>

              </div>
            </div>

            <div className="flex flex-wrap pl-11  max-[500px]:items-center justify-start align-center content-center w-auto gap-9  h-20   mt-4 mb-4 ml-5">


              <button
                // onClick={generatePDF}
                onClick={() => {
                  datapage.data && navigate('/recapPDF', { state: { data: datapage.data } });
                }}
                // onClick={() => dispatch(userAsyncThunc({ id: 1, mail: "avodagbejean@gmail.com" }))}
                className='bg-[var(--color-bpciblue)] w-38 h-14 px-4 active:scale-[.9] 
                  transition-all rounded text-white'>Télécharger le récapitulatif de la plainte</button>

            </div>

          </div>

        </div>

      </div>
      <Footer />
    </motion.div>
  );
}
