import React from "react";
import { Formik, Form, Field } from "formik";
import Footer from "../components/footer";
import { NavLink } from "react-router-dom";
import { db } from '../plugins/firebase'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getDatabase, ref, child, push, set, update } from "firebase/database";
import moment from 'moment';
import 'moment/locale/fr';

import { motion } from "framer-motion"
const { v4: uuidv4 } = require('uuid');

const QRCode = require('qrcode');
const { createCanvas } = require('canvas');


function generateShortUUID() {
  const fullUUID = uuidv4();
  const shortUUID = fullUUID.slice(0, 8);
  return shortUUID;
}




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




export default function ResumeFormulaire() {

  console.log("zzzzzzzzzzzzzzzzzzzzzzzzzz")


  const location = useLocation();
  console.log(location.state)
  console.log(location.state)
  const [datapage3, setdatapage3] = useState(location.state);
  let navigate = useNavigate();
  if (!location.state) {
    console.log("ddddddddddddddddddddddddddddddddddddddd")
    navigate('/depotplainte');

  }

  async function generateQRCode(data, width, height) {
    // Créer un nouveau code QR avec les données fournies
    const qrCode = await QRCode.toDataURL(data, { width, height });
    console.log(qrCode)

    return qrCode;
  }

  function handleSubmitPrevious(e) {

    e.preventDefault();
    let data = location.state ? location.state.data : {}



    console.log(data)

    //const newPlainteKey = push(child(ref(db), 'plaintes')).key;
    //data['id'] = newPlainteKey



    //set(ref(db, 'plaintes/'), data);


    navigate('/depotplainteStep2', { state: { data: data } })

  }
  async function handleSubmit(e) {

    e.preventDefault();
    if (e.nativeEvent.submitter.id && e.nativeEvent.submitter.id == 'previouspage') {
      handleSubmitPrevious(e)
    }
    else {
      let data = location.state ? location.state.data : {}

      const newPlainteKey = push(child(ref(db), 'plaintes')).key;
      data['id'] = newPlainteKey


      data['codeplainte'] = generateShortUUID();

      await generateQRCode(data['codeplainte'], 200, 200).then((dataUrl) => {
        data['codeQrImagePlainte'] = dataUrl
      });


      let newDate = moment();
      console.log(newDate)

      data['datePlainte'] = newDate.format('DD MMMM YYYY');
      data['heurePlainte'] = newDate.format('HH:mm');
      data['status'] = 'En cours';
      data['isArchive'] = false;
      // data['commentaire'] = "";
      console.log(data['datePlainte'])
      console.log(data['heurePlainte'])

      delete data.page1
      delete data.page2
      delete data.descriptionAudiofilename
      delete data.preuvefilename



      set(ref(db, 'plaintes/' + newPlainteKey), data);


      navigate('/recapitilatif', { state: { data: data } });
    }
  }

  // useEffect(() => {
  //   navigate = useNavigate();
  // }, [userId]);

  if (!datapage3) {
    return <div>Loading...</div>;
  }
  else {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col bg-white
        justify-around item-center content-center min-h-screen"
      >
        <div className="flex bg-bpciwhite justify-around item-center content-center ">
          <div className=" fixed-w h-auto justify-end item-center content-center  w-full ">
            <div className="rounded overflow-hidden shadow-lg my-6 bg-bpciwhite px-9 ">
              <div className="py-8">
                <p className=" ml-2 text-[var(--color-bpciblue)]">Résumé de la demande</p>
              </div>
              <form onSubmit={handleSubmit}>
                <table className="w-full">
                  <tr>
                    <td>
                      <p className="font-PoppinsSemiBold text-[.9rem] text-[var(--color-bpciblue)]">Nom: </p>
                    </td>
                    <td className="text-end">
                      <p className="text-bold text-[var(--color-bpciblue)]">{datapage3.data['nom']}</p>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p className="font-PoppinsSemiBold text-[.9rem] text-[var(--color-bpciblue)]">Prénom: </p>
                    </td>
                    <td className="text-end">
                      <p className="text-[var(--color-bpciblue)]">{datapage3.data['prenom']}</p>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p className="font-PoppinsSemiBold text-[.9rem] text-[var(--color-bpciblue)]">Contact téléphonique: </p>
                    </td>
                    <td className="text-end">
                      <p className="text-[var(--color-bpciblue)]">{datapage3.data['phone']}</p>
                    </td>
                  </tr>


                  <tr>
                    <td>
                      <p className="font-PoppinsSemiBold text-[.9rem] text-[var(--color-bpciblue)]">Adresse email: </p>
                    </td>
                    <td className="text-end">
                      <p className="text-[var(--color-bpciblue)]">{datapage3.data['email']}</p>
                    </td>
                  </tr>


                  <tr>
                    <td>
                      <p className="font-PoppinsSemiBold text-[.9rem] text-[var(--color-bpciblue)]">Organisme concerné: </p>
                    </td>
                    <td className="text-end">
                      <p className="text-[var(--color-bpciblue)]">{datapage3.data['organisation'].split(",")}</p>
                    </td>
                  </tr>


                  <tr>
                    <td>
                      <p className="font-PoppinsSemiBold text-[.9rem] text-[var(--color-bpciblue)]">Description de la plainte: </p>
                    </td>
                    <td className="text-end">
                      <p className="text-[var(--color-bpciblue)]">{datapage3.data['descriptionText']}</p>
                    </td>
                  </tr>


                  <tr>
                    <td>
                      <p className="font-PoppinsSemiBold text-[.9rem] text-[var(--color-bpciblue)]">Description de la plainte avec un fichier audio: </p>
                    </td>
                    <td className="text-end">
                      <p className="text-[var(--color-bpciblue)]">{datapage3.data['descriptionAudiofilename']}</p>
                    </td>
                  </tr>


                  <tr>
                    <td className="">
                      <p className="font-PoppinsSemiBold text-[.9rem] text-[var(--color-bpciblue)]">Personnes impliquées: </p>
                    </td>
                    <td className="text-end">
                      {
                        datapage3.data['personneimplique'].split(",").map(it => {
                          return (
                            <p className="font-PoppinsSemiBold text-[.9rem] text-[var(--color-bpciblue)] text-end">{it} .</p>
                          )
                        })
                      }
                    </td>
                  </tr>


                  <tr>
                    <td>
                      <p className="font-PoppinsSemiBold text-[.9rem] text-[var(--color-bpciblue)]">Preuve de la plainte: </p>
                    </td>
                    <td className="text-end">
                      <p className="text-[var(--color-bpciblue)]">{datapage3.data['preuvefilename']}</p>
                    </td>
                  </tr>

                </table>





                <div className="flex flex-wrap justify-end align-center content-center w-auto gap-9 mt-[4rem] mb-4 ml-5">

                  <button onClick={handleSubmitPrevious} className='bg-[var(--color-bpciblue)] w-38 h-14 px-4  rounded text-white'> Précédent</button>



                  <button type="submit" className='bg-[var(--color-bpciblue)] w-38 h-14 px-4  rounded text-white'> Envoyer ma plainte</button>





                </div>




              </form>
            </div>
          </div>




        </div>
        <Footer />
      </motion.div>
    )
  };
}
