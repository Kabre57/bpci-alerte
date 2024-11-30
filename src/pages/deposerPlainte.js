import React from "react";
import { Formik, Form, Field } from "formik";
import Footer from "../components/footer";
import { NavLink } from "react-router-dom";
import { db } from '../plugins/firebase'
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import Select from 'react-select';


import { motion } from "framer-motion"
import AboutService from "../components/AboutService";


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


export default function DeposerPlainte() {
  let navigate = useNavigate();
  const location = useLocation();
  const [datapage1, setdatapage1] = useState(location.state);
  const [isAnonyme, setAnonyme] = useState(location.state ? location.state.data['isAnonyme'] : false);

  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // fonction pour récupérer les options de l'API
  const getOptions = async () => {

    const dbRef = ref(db, "services/");

    // Écoute les modifications de données de la base de données
    get(dbRef).then((snapshot) => {
      const data = snapshot.val();

      const optionsArray = Object.entries(data).map(([key, value]) => ({ value: value.nom, label: value.nom }));

      setOptions(optionsArray);
    });
    // transformez vos données en un tableau d'options

  };

  // appel de la fonction getOptions au chargement du composant
  useEffect(() => {
    getOptions();
  }, []);

  // fonction pour gérer la sélection des options
  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  console.log("sfvergvergtverg", datapage1)
  function changeAnonyme(e) {

    console.log("sfvergvergtverg")
    console.log(location.state)
    let smalldata = datapage1
    smalldata.data['isAnonyme'] = e.target.checked
    console.log(smalldata.data['isAnonyme'])
    console.log(smalldata.data)
    setAnonyme(e.target.checked)

    setdatapage1(smalldata)


  }

  function handleSubmit(e) {

    e.preventDefault();
    // console.log(e.target.Nom.value)
    if (!location.state) {
      let data = {
        nom: e.target.Nom ? e.target.Nom.value : " ",
        prenom: e.target.prenom ? e.target.prenom.value : " ",
        phone: e.target.phone ? e.target.phone.value : " ",
        email: e.target.email ? e.target.email.value : " ",
        organisation: e.target.Option ? e.target.Option.value : " ",
        personneimplique: e.target.w3review ? e.target.w3review.value : " ",
        page1: true,
        isAnonyme: isAnonyme

      }
      console.log(data)


      //set(ref(db, 'plaintes/'), data);

      navigate('/depotplainteStep2', { state: { data: data } });
    }
    else {
      console.log("Il est là")
      let data = location.state.data
      data['nom'] = e.target.Nom ? e.target.Nom.value : " "
      data['prenom'] = e.target.prenom ? e.target.prenom.value : " "
      data['phone'] = e.target.phone ? e.target.phone.value : " "
      data['email'] = e.target.email ? e.target.email.value : " "
      data['organisation'] = e.target.Option ? e.target.Option.value : " "
      data['personneimplique'] = e.target.w3review ? e.target.w3review.value : "bla bla"

      navigate('/depotplainteStep2', { state: { data: data } });

    }

  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit" className="w-full bg-white">
      <div
        className="flex fixed-w w-full flex-col "
      >
        <div className="flex max-[1024px]:flex-col
           items-start mt-[1rem] gap-[1rem] justify-between">
          <div className="shadow-md rounded-sm flex-grow p-[2rem] max-[1024px]:order-1">
            <div className="flex gap-9 ml-2 flex-wrap content-center">
              <div className=" flex gap-1">
                <p className="">1.</p>

                <p className="text-[var(--color-bpcirouge)]">
                  {" "}
                  Identité sur le dénonciateur
                </p>
              </div>

              <div className="">
                <p>2. Description de la plainte</p>
              </div>
            </div>

            <div className="flex gap-9  h-20   flex-wrap content-center">
              <p className="pl-2">Les champs en astérisque (*) sont obligatoire</p>
            </div>

            {!datapage1 ? <form onSubmit={handleSubmit}>

              <div className=" w-fit flex items-center justify-center gap-[1rem] mb-8 ml-2">
                <input
                  onClick={(e) => setAnonyme(e.target.checked)}
                  className="noM"
                  id="isAnonyme" name="isAnonyme" type="checkbox"
                  style={{ borderWidth: "1px", borderColor: "#CED4DA" }} />
                <label htmlFor="isAnonyme" className="">Rester anonyme</label>
              </div>

              {
                !isAnonyme && (
                  <>
                    <div className="flex gap-9 m-2 w-full">
                      <div className=" w-full">
                        <label htmlFor="Nom">Nom</label>
                        <input id="Nom" name="Nom" type="text"
                          style={{ borderWidth: "1px", borderColor: "#CED4DA" }} />
                      </div>

                      <div className=" w-full">
                        <label htmlFor="prenom">Prénoms</label>
                        <input id="prenom" name="prenom" type="text"
                          style={{ borderWidth: "1px", borderColor: "#CED4DA" }} />
                      </div>
                    </div>
                  </>
                )
              }

              {
                !isAnonyme && (
                  <>
                    <div className="flex gap-9 m-2 w-full">
                      <div className="w-full">
                        <label htmlFor="phone">Contact téléphonique</label>
                        <input id="phone" name="phone" type="text"

                          style={{ borderWidth: "1px", borderColor: "#CED4DA" }} />
                      </div>

                      <div className="w-full">
                        <label htmlFor="email">Email </label>
                        <input id="email" name="email" type="email"
                          className="border border-bpcidark"
                          style={{ borderWidth: "1px", borderColor: "#CED3DA" }}
                        />
                      </div>
                    </div>
                  </>
                )
              }

              <div className="w-full m-2">
                <label htmlFor="select">Organisme concernée * </label>

                {/* <select name="Option" id="Option">
                  <option value="Option 01">Option 01</option>
                  <option value="Option 02">Option 02</option>
                  <option value="Option 03">Option 03</option>
                  <option value="Option 01">Option 01</option>
                </select> */}

                <Select
                  name="Option" id="Option"
                  options={options}
                  value={selectedOptions}
                  className="mt-2"
                  onChange={handleSelectChange}

                  required
                  isSearchable
                />
              </div>

              <div className="mt-5 w-full ml-2">
                <label htmlFor="textarea " className="">Personnes impliquées *</label>
                <p className="mt-2 text-[.7rem] leading-1 text-zinc-500">Vous devez indiquer les personnes impliquées en les séparants par des virgules.</p>
                <p className=" text-[.7rem] leading-1 text-zinc-500">Exemple: "Mr Jean-François, Mr Damien, Mme KAKPO"</p>
                <textarea required id="w3review" name="w3review" rows="1" cols="10"
                  className="w-full  mt-2"
                >
                </textarea>
              </div>


              <div className="flex  gap-[1rem] items-center justify-end mt-[2rem]">
                {/* <CustomButton
                  type="button"
                  color={"bg-[var(--color-bpciorange)]"}
                  w={"w-fit"}
                  py={"py-[.6rem]"}
                  title="Rester Anonyme"
                /> */}

                <CustomButton
                  type="submit"
                  color={"bg-[var(--color-bpcivert)]"}
                  w={"w-fit"}
                  py={"py-[.6rem]"}
                  title="Suivant"
                />

              </div>




            </form> :
              <form onSubmit={handleSubmit}>

                <div className=" w-fit flex items-center justify-center gap-[1rem] ml-2 mb-0">
                  <input

                    onChange={(e) => changeAnonyme(e)}
                    id="isAnonyme" name="isAnonyme" type="checkbox"
                    style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                    className="noM"
                    defaultChecked={datapage1.data['isAnonyme']} />
                  <label htmlFor="isAnonyme" className="inline-block">Rester anonyme</label>
                </div>
                {
                  !isAnonyme ?
                    <div className="flex gap-9 m-2 w-full">
                      <div className=" w-full">
                        <label htmlFor="Nom">Nom</label>
                        <input id="Nom" name="Nom" type="text"
                          style={{ borderWidth: "1px", borderColor: "#CED4DA" }} defaultValue={datapage1.data['nom']} />
                      </div>

                      <div className=" w-full">
                        <label htmlFor="prenom">Prénoms</label>
                        <input id="prenom" name="prenom" type="text"
                          style={{ borderWidth: "1px", borderColor: "#CED4DA" }} defaultValue={datapage1.data['prenom']} />
                      </div>
                    </div> : null}


                {
                  !isAnonyme ?
                    <div className="flex gap-9 m-2 w-full">
                      <div className="w-full">
                        <label htmlFor="phone">Contact téléphonique</label>
                        <input id="phone" name="phone" type="text"

                          style={{ borderWidth: "1px", borderColor: "#CED4DA" }} defaultValue={datapage1.data['phone']} />
                      </div>

                      <div className="w-full">
                        <label htmlFor="email">Email </label>
                        <input id="email" name="email" type="email"
                          className="border border-bpcidark"
                          style={{ borderWidth: "1px", borderColor: "#CED4DA" }}

                          defaultValue={datapage1.data['email']} />
                      </div>
                    </div>
                    :
                    null

                }

                <div className="w-full m-2">
                  <label htmlFor="select">Organisme concernée * </label>

                  {/* <select name="Option" id="Option" defaultValue={datapage1.data['organisation']} >
                     <option value={datapage1.data['organisation']} disabled selected hidden>{datapage1.data['organisation']}</option> 
                    <option value="Option 01">Option 01</option>
                    <option value="Option 02">Option 02</option>
                    <option value="Option 03">Option 03</option>
                    <option value="Option 04">Option 01</option>
                  </select> */}

                  <Select
                    name="Option" id="Option"
                    options={options}
                    required
                    className="mt-2"

                    defaultValue={{ value: datapage1.data['organisation'], label: datapage1.data['organisation'] }}
                    onChange={handleSelectChange}


                    isSearchable
                  />
                </div>
                {/* 
                <div className="mt-3 w-full">
                  <label htmlFor="textarea " className="ml-2">Personnes impliquées *</label>
                  <textarea id="w3review" name="w3review" rows="1" cols="10"
                    className="w-full ml-2 mt-2"
                    defaultValue={datapage1.data['personneimplique']}
                  >
                  </textarea>
                </div> */}
                <div className="mt-5 w-full ml-2">
                  <label htmlFor="textarea " className="">Personnes impliquées *</label>
                  <p className="mt-2 text-[.7rem] leading-1 text-zinc-500 font-PoppinsSemiBold">Vous devez indiquer les personnes impliquées en les séparants par des virgules.</p>
                  <p className="mt-1 text-[.7rem] leading-1 text-zinc-500 font-PoppinsSemiBold">Exemple: "Mr Jean-François, Mr Damien, Mme KAKPO"</p>
                  <textarea required

                    id="w3review" name="w3review" rows="1" cols="10"
                    className="w-full  mt-2"
                    defaultValue={datapage1.data['personneimplique']}
                  >
                  </textarea>
                </div>


                <div className="flex flex-wrap justify-end align-center content-center w-auto  h-20   mt-4 mb-4 ml-5">






                  <div className="h-full w- md:w-20 lg:w-20">
                    <button type="submit" className='bg-[var(--color-bpcivert)] w-38 h-14 px-4  rounded text-white'> Suivant</button>
                  </div>





                </div>




              </form>


            }

            {/* <form onSubmit={handleSubmit}>
              <div className="flex gap-9 m-2 w-full">
                <div className=" w-full">
                  <label htmlFor="Nom">Nom</label>
                  <input id="Nom" name="Nom" type="text" 
                  style={{ borderWidth:"1px", borderColor:"#CED4DA"  }}/>
                </div>

                <div className=" w-full">
                  <label htmlFor="prenom">Prénoms</label>
                  <input id="prenom" name="prenom" type="text" 
                  style={{ borderWidth:"1px", borderColor:"#CED4DA"  }}/>
                </div>
              </div>

              <div className="flex gap-9 m-2 w-full">
                <div className="w-full">
                  <label htmlFor="phone">Contact téléphonique</label>
                  <input id="phone" name="phone" type="number"
                  
                  style={{ borderWidth:"1px", borderColor:"#CED4DA"  }}/>
                </div>

                <div className="w-full">
                  <label htmlFor="email">Email </label>
                  <input id="email" name="email" type="email" 
                  className="border border-bpcidark"
                  style={{ borderWidth:"1px", borderColor:"#CED4DA"  }}
                  />
                </div>
              </div>

              <div className="w-full m-2">
                  <label htmlFor="select">Organisme concernée * </label>
                 
                  <select name="Option" id="Option">
                    <option value="Option 01">Option 01</option>
                    <option value="Option 01">Option 02</option>
                    <option value="Option 01">Option 03</option>
                    <option value="Option 01">Option 01</option>
                    </select>
                </div>

                <div className="mt-3 w-full">
                  <label htmlFor="textarea " className="ml-2">Personnes impliquées *</label>
                  <textarea id="w3review" name="w3review" rows="1" cols="10"
                  className="w-full ml-2 mt-2"
                  >
                    </textarea>
                </div>

                
                <div className="flex flex-wrap justify-end align-center content-center w-auto  h-20   mt-4 mb-4 ml-5">

                  
                 
       
      
      
                    <div className="h-full w- md:w-20 lg:w-20">
                    <button type="submit" className='bg-bpciorangep-2 w-38 h-14 px-4  rounded text-bpciwhite'> Suivant</button>
                    </div>
                    
               
               
               

                </div>

             

              
            </form> */}
          </div>

          <AboutService />
        </div>


      </div>
      <Footer />
    </motion.div>
  );
}
