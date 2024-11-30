import React from "react";
import { Formik, Form, Field } from "formik";
import Footer from "../components/footer";
import { BsMusicNote, BsUpload } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillAudio } from "react-icons/ai";

import { motion } from "framer-motion";
import AboutService from "../components/AboutService";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";

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
    transition: { ease: "easeInOut" },
  },
};

export default function DeposerPlainteStep2() {
  let audioIN = { audio: true };
  let mediaRecorder = null;
  const location = useLocation();
  const [datapage2, setdatapage2] = useState(location.state);
  const [datafile1, setdatafile1] = useState(false);
  const [datafile2, setdatafile2] = useState(false);
  const [simulateLoading, setsimulateLoading] = useState(false);
  const [recordStart, setrecordStart] = useState(false);
  const [recordon, setrecord] = useState(false);

  // const [chance_voiceaudio, setchance_voiceaudio] = useState(false);
  // const [oneclick_voiceaudio, setoneclick_voiceaudio] = useState(false);

  const [fileText1, setfileText1] = useState(false);
  const [fileText2, setfileText2] = useState(false);
  let navigate = useNavigate();
  if (!location.state) {
    navigate("/depotplainte");
  }

  React.useEffect(() => {
    if (recordStart) {
      setrecordStart(false);
      toast.success("Vous pouvez commencer par parler.", { draggable: true });
    }
  }, [recordStart]);

  React.useEffect(() => {
    var chance_voiceaudio = false;
    var oneclick_voiceaudio = false;
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia(audioIN)

        // 'then()' method returns a Promise
        .then(function (mediaStreamObj) {
          // Connect the media stream to the
          // first audio element
          let audio = document.getElementById("recitaudio");

          if ("srcObject" in audio) {
            audio.src = mediaStreamObj;
          } else {
            // Old version
            audio.src = window.URL.createObjectURL(mediaStreamObj);
          }

          // Start record
          let start = document.getElementById("recitaudiobutton");

          // 2nd audio tag for play the audio
          let playAudio = document.getElementById("adioPlay");

          // This is the main thing to recorded
          // the audio 'MediaRecorder' API
          mediaRecorder = new MediaRecorder(mediaStreamObj);
          console.log(mediaRecorder);
          // Pass the audio stream
          start.addEventListener("click", function (ev) {
            chance_voiceaudio === false && setrecordStart(true);
            if (chance_voiceaudio == false) {
              console.log("aaaaaa");
              try {
                mediaRecorder.start();
                chance_voiceaudio = true;
                oneclick_voiceaudio = true;
                setsimulateLoading(true);
              } catch (error) {}
              let paraph = document.getElementById("recitaudioecrit");
            } else {
              console.log("eeeeee");
              try {
                mediaRecorder.stop();
                chance_voiceaudio = false;
                setsimulateLoading(false);
              } catch {}

              let paraph = document.getElementById("recitaudioecrit");
            }

            // console.log(mediaRecorder.state);
          });
          // Start event

          // If audio data available then push
          // it to the chunk array
          mediaRecorder.ondataavailable = function (ev) {
            dataArray.push(ev.data);
          };

          // Chunk array to store the audio data
          let dataArray = [];

          // Convert the audio data in to blob
          // after stopping the recording
          mediaRecorder.onstop = async function (ev) {
            setsimulateLoading(false);

            // blob of type mp3
            let audioData = new Blob(dataArray, { type: "audio/mp3;" });

            // After fill up the chunk
            // array make it empty
            dataArray = [];

            // Creating audio url with reference
            // of created blob named 'audioData'
            let audioSrc = window.URL.createObjectURL(audioData);

            let sendfil = document.getElementById("file1");

            const fichier = new File([audioData], `${Date.now()}.mp3`, {
              type: audioData.type,
              lastModified: new Date().getTime(),
            });

            const dataTransfer = new DataTransfer();

            dataTransfer.items.add(fichier);

            sendfil.files = dataTransfer.files;

            // Pass the audio url to the 2nd video tag
            playAudio.src = audioSrc;
            let datafile1let = await generateDataUrlFromImageUpload(
              sendfil.files[0]
            );
            setdatafile1(datafile1let);
            setfileText1(sendfil.files[0].name);
            if (datapage2.data) {
              let smalldata = datapage2;
              smalldata.data["descriptionAudio"] = datafile1let;
              smalldata.data["descriptionAudiofilename"] =
                sendfil.files[0].name;
              setdatapage2(smalldata);
            }
            setrecord(true);
          };
        })

        // If any error occurs then handles the error
        .catch(function (err) {
          console.log(err.name, err.message);
        });
    }
  }, [navigator.mediaDevices]);

  // else{
  //   if (location.state.data['page2'])
  //   {
  //     console.log("gggggggggggggggggggggggggggggggggggggggg")
  //     setdatafile2(location.state.data['descriptionAudio'])
  //     setfileText2(location.state.data['descriptionAudiofilename']);
  //     setdatafile1(location.state.data['preuve'])
  //     setfileText1(location.state.data['preuvefilename']);

  //   }
  // }
  //  function onoffrecord (ev) {
  //   if (chance_voiceaudio == false)
  //   {
  //     mediaRecorder.start();
  //     let paraph = document.getElementById('recitaudioecrit');
  //     paraph.innerHTML = "Enregistrement en cours"
  //     chance_voiceaudio = true
  //     oneclick_voiceaudio = true

  //   }
  //   else
  //   {
  //     mediaRecorder.stop();
  //     let paraph = document.getElementById('recitaudioecrit');
  //     paraph.innerHTML = "Ou dites les avec vos propres mots . . ."
  //     chance_voiceaudio = false

  //   }

  //   // console.log(mediaRecorder.state);
  // }

  async function generateDataUrlFromImageUpload(inputFile) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = () => {
        reject(new Error("Failed to generate data URL"));
      };

      if (inputFile) {
        console.log("2");
        fileReader.readAsDataURL(inputFile);
      } else {
        reject(new Error("No input file specified"));
      }
    });
  }

  async function handleFileList(e) {
    console.log(e);
    console.log(e.target.id);

    let files = e.target.files;
    if (e.target.id == "file1") {
      let datafile1let = await generateDataUrlFromImageUpload(files[0]);
      setdatafile1(datafile1let);
      console.log(datafile1);
      setfileText1(files[0].name);
      if (datapage2.data) {
        let smalldata = datapage2;
        smalldata.data["descriptionAudio"] = datafile1let;
        smalldata.data["descriptionAudiofilename"] = files[0].name;
        setdatapage2(smalldata);
      }
    } else {
      let multiplefiles = [];
      let multiplefilestext = [];
      for (let i = 0; i < files.length; i++) {
        let datafile2let = await generateDataUrlFromImageUpload(files[i]);
        multiplefiles.push(datafile2let);
        multiplefilestext.push(files[i].name);
      }

      setdatafile2(multiplefiles);
      setfileText2(multiplefilestext.toString());

      if (datapage2.data) {
        let smalldata = datapage2;
        smalldata.data["preuve"] = multiplefiles;
        smalldata.data["preuvefilename"] = multiplefilestext.toString();
        setdatapage2(smalldata);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      e.nativeEvent.submitter.id &&
      e.nativeEvent.submitter.id == "previouspage"
    ) {
      handleSubmitPrevious(e);
    } else if (
      e.nativeEvent.submitter.id &&
      e.nativeEvent.submitter.id == "nextpage"
    ) {
      //if (e.nativeEvent)
      let data = location.state ? location.state.data : {};
      console.log(e.target.file1);
      if (
        (location.state.data.page2 &&
          location.state.data.preuve &&
          datafile2) ||
        (!location.state.data.page2 && datafile2)
      ) {
        data["preuve"] = datafile2;
        data["preuvefilename"] = fileText2;
      }

      if (
        (location.state.data.page2 &&
          location.state.data.descriptionAudio &&
          datafile1) ||
        (!location.state.data.page2 && datafile1)
      ) {
        data["descriptionAudio"] = datafile1;
        data["descriptionAudiofilename"] = fileText1;
      }
      data["page2"] = true;
      data["descriptionText"] = e.target.w3review2.value;

      console.log(
        "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
      );

      //const newPlainteKey = push(child(ref(db), 'plaintes')).key;
      //data['id'] = newPlainteKey

      //set(ref(db, 'plaintes/'), data);

      console.log(data);

      navigate("/resumeform", { state: { data: data } });
    }
  }

  function handleSubmitPrevious(e) {
    console.log("daddddddddddddddddddddddddddta");
    e.preventDefault();
    let data = location.state ? location.state.data : {};
    console.log(e.target.file1);
    data["preuve"] = datafile2 ? datafile2 : null;
    data["preuvefilename"] = fileText2 ? fileText2 : null;
    data["descriptionAudio"] = datafile1 ? datafile1 : null;
    data["descriptionAudiofilename"] = fileText1 ? fileText1 : null;
    data["page2"] = true;
    data["descriptionText"] = e.target.w3review2.value;

    //const newPlainteKey = push(child(ref(db), 'plaintes')).key;
    //data['id'] = newPlainteKey

    //set(ref(db, 'plaintes/'), data);

    navigate("/depotplainte", { state: { data: data } });
  }
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full bg-white "
      >
        <div className="flex fixed-w w-full flex-col">
          <div
            className="flex max-[1024px]:flex-col
           items-start mt-[1rem] gap-[1rem] justify-between"
          >
            <div className="shadow-md rounded-sm flex-grow p-[2rem] max-[1024px]:order-1">
              <div className="flex gap-9 ml-2 flex-wrap content-center">
                <div className="">
                  <p>1. Identité sur le dénonciateur </p>
                </div>

                <div className=" flex gap-1">
                  <p className="text-bpciorange">2.</p>

                  <p className="text-[var(--color-bpciblue)]">
                    {" "}
                    Description de la plainte
                  </p>
                </div>
              </div>

              <div className="flex gap-9  h-20   flex-wrap content-center">
                <p className="pl-2">
                  Les champs en astérisque (*) sont obligatoire
                </p>
              </div>

              {!datapage2 ? (
                <form onSubmit={handleSubmit}>
                  <div className="mt-3 w-full">
                    <label htmlFor="textarea " className="ml-2 ">
                      Description de la plainte avec du texte *
                    </label>
                    <textarea
                      id="w3review2"
                      name="w3review2"
                      rows="1"
                      cols="10"
                      className="w-full ml-2 mt-2"
                    ></textarea>
                  </div>

                  <div className="mt-3  w-full">
                    <p className="ml-2 mb-6 text-bpcidark">
                      Description de la plainte avec un fichier audio *
                    </p>
                    <div className="flex gap-9 flex-wrap">
                      {/* <button
                        id="recitaudiobutton"
                        className='bg-bpciorangeml-2 p-2 w-38 h-10 px-3 flex gap-3 rounded text-bpciwhite'>
                        {
                          !simulateLoading && <BsUpload className="mt-1" />
                        }
                        <input style={{ display: "none" }} id="file1" name="file1" type="file" accept=".mp3,.mp4,.wav" />
                        {
                          simulateLoading && <ThreeCircles
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

                        {
                          !simulateLoading ? "Enrégistrer votre audio" : "Stoper le recording"
                        }</button> */}

                      <div
                        className={`${
                          simulateLoading
                            ? "border-red-500"
                            : "border-[var(--color-bpciblue)]"
                        } p-[.2rem] ml-2 border-2 rounded-full`}
                      >
                        <button
                          id="recitaudiobutton"
                          className={`${
                            simulateLoading
                              ? "bg-red-500"
                              : "bg-[var(--color-bpciblue)]"
                          } h-[35px] w-[35px] flex items-center justify-center active:scale-[.9] transition-all 
                          border-[var(--color-bpciblue)] rounded-full text-white`}
                        >
                          <input
                            style={{ display: "none" }}
                            id="file1"
                            name="file1"
                            type="file"
                            accept=".mp3,.mp4,.wav"
                          />
                          {!simulateLoading && <AiFillAudio size={20} />}
                          {simulateLoading && (
                            <ThreeCircles
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
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-2">
                        {!fileText1 ? (
                          <p className="p-2 w-38 h-10 flex gap-3 rounded text-[var(--color-bpciblue)]">
                            Appuyer pour enregistrer votre plainte
                          </p>
                        ) : (
                          <p className="p-2 w-38 h-10 px-3 flex gap-3 rounded text-[var(--color-bpciblue)]">
                            {fileText1}
                          </p>
                        )}
                      </div>
                      <audio
                        controls="1"
                        style={{ display: !recordon ? "none" : "block" }}
                        id="adioPlay"
                      />

                      <audio
                        style={{ display: !recordon ? "none" : "block" }}
                        id="recitaudio"
                      />
                    </div>
                  </div>
                  <div className="mt-3  w-full">
                    <div className="flex gap-9 flex-wrap">
                      <label
                        type="upload"
                        className="bg-bpciorangeml-2 p-2 w-38 h-10 px-3 flex gap-3 rounded text-bpciwhite"
                      >
                        <BsUpload className="mt-1" />
                        <input
                          onChange={handleFileList}
                          style={{ display: "none" }}
                          id="file2"
                          name="file2"
                          type="file"
                          multiple
                          accept=".jpg,.png,.pdf"
                        />
                        choisissez vos fichiers
                      </label>

                      {!fileText2 ? (
                        <p className="p-2 w-38 h-10 px-3 flex gap-3 rounded text-[var(--color-bpciblue)]">
                          Téléverser votre fichier preuve
                        </p>
                      ) : (
                        <p className="p-2 w-38 h-10 px-3 flex gap-3 rounded text-[var(--color-bpciblue)]">
                          {fileText2}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end align-center content-center w-auto gap-9 mt-4 mb-4 ml-5">
                    <button
                      id="previouspage"
                      type="submit"
                      className="bg-bpciorangep-2 w-38 h-14 px-4  rounded text-bpciwhite"
                    >
                      {" "}
                      Précédent
                    </button>

                    <button
                      id="nextpage"
                      type="submit"
                      className="bg-bpciorangep-2 w-38 h-14 px-4  rounded text-bpciwhite"
                    >
                      {" "}
                      Suivant
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mt-3 w-full">
                    <label htmlFor="textarea " className="ml-2 ">
                      Description de la plainte avec du texte *
                    </label>
                    <textarea
                      id="w3review2"
                      name="w3review2"
                      rows="1"
                      cols="10"
                      className="w-full ml-2 mt-2"
                      defaultValue={datapage2.data["descriptionText"]}
                    ></textarea>
                  </div>

                  <div className="mt-3  w-full">
                    <p className="ml-2 mb-6 text-bpcidark">
                      Description de la plainte avec un fichier audio *
                    </p>
                    <div className="flex gap-9 flex-wrap">
                      {/* <button
                        id="recitaudiobutton"
                        className={`${simulateLoading ? "bg-red-500" : "bg-[var(--color-bpciblue)]"} text-white ml-2 p-2 w-38 h-10 px-3 flex gap-3 rounded text-bpciwhite`}>
                        {
                          !simulateLoading && <BsUpload className="mt-1" />
                        }
                        <input style={{ display: "none" }} id="file1" name="file1" type="file" accept=".mp3,.mp4,.wav" />
                        {
                          simulateLoading && <ThreeCircles
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
                        {
                          !simulateLoading ? "Enrégistrer votre audio" : "Stoper le recording"
                        }</button> */}

                      <div
                        className={`${
                          simulateLoading
                            ? "border-red-500"
                            : "border-[var(--color-bpciblue)]"
                        } p-[.2rem] ml-2 border-2 rounded-full`}
                      >
                        <button
                          id="recitaudiobutton"
                          className={`${
                            simulateLoading
                              ? "bg-red-500"
                              : "bg-[var(--color-bpciblue)]"
                          } h-[35px] w-[35px] flex items-center justify-center active:scale-[.9] transition-all 
                          border-[var(--color-bpciblue)] rounded-full text-white`}
                        >
                          <input
                            style={{ display: "none" }}
                            id="file1"
                            name="file1"
                            type="file"
                            accept=".mp3,.mp4,.wav"
                          />
                          {!simulateLoading && <AiFillAudio size={20} />}
                          {simulateLoading && (
                            <ThreeCircles
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
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-2">
                        {!datapage2.data["descriptionAudiofilename"] ? (
                          <p className="w-38 flex rounded text-[var(--color-bpciblue)]">
                            Appuyer pour enregistrer votre plainte{" "}
                            <audio
                              controls="1"
                              id="adioPlay"
                              style={{ display: !recordon ? "none" : "block" }}
                            />
                          </p>
                        ) : (
                          <p className="p-2 w-38 h-10 px-3 flex items-center rounded text-[var(--color-bpciblue)]">
                            {datapage2.data["descriptionAudiofilename"]}
                            <audio
                              src={datapage2.data["descriptionAudio"]}
                              controls="1"
                              id="adioPlay"
                            />
                          </p>
                        )}
                      </div>

                      <audio
                        style={{ display: !recordon ? "none" : "block" }}
                        id="recitaudio"
                      />
                    </div>
                  </div>
                  <div className="mt-3  w-full">
                    <div className="flex ml-2 gap-9 flex-wrap">
                      <label
                        type="upload"
                        className="bg-[var(--color-bpciblue)] -2 p-2 w-38 h-10 px-3 flex gap-3 rounded text-white"
                      >
                        <BsUpload className="mt-1" />
                        <input
                          onChange={handleFileList}
                          style={{ display: "none" }}
                          id="file2"
                          name="file2"
                          type="file"
                          multiple
                          accept=".jpg,.png,.pdf"
                        />
                        Choisir les fichiers
                      </label>

                      {!datapage2.data["preuvefilename"] ? (
                        <p className="p-2 w-38 h-10 px-3 flex gap-3 rounded text-[var(--color-bpciblue)]">
                          Téléverser votre fichier preuve
                        </p>
                      ) : (
                        <p className="p-2 w-38 h-10 px-3 flex gap-3 rounded text-[var(--color-bpciblue)]">
                          {datapage2.data["preuvefilename"]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end align-center content-center w-auto gap-9  mt-4 mb-4 ml-5">
                    <button
                      id="previouspage"
                      type="submit"
                      className="bg-[var(--color-bpciblue)] w-38 h-14 px-4  rounded text-white"
                    >
                      {" "}
                      Précédent
                    </button>

                    <button
                      id="nextpage"
                      type="submit"
                      className="bg-[var(--color-bpciblue)] w-38 h-14 px-4  rounded text-white"
                    >
                      {" "}
                      Suivant
                    </button>
                  </div>
                </form>
              )}

              {/* <form  onSubmit={handleSubmit}>
             
          

                <div className="mt-3 w-full">
                  <label htmlFor="textarea " className="ml-2 ">Description de la plainte avec du  texte  *</label>
                  <textarea id="w3review2" name="w3review2" rows="1" cols="10"
                  className="w-full ml-2 mt-2"
                  >
                    </textarea>
                </div>

                <div className="mt-3  w-full">
                  <p className="ml-2 mb-6 text-bpcidark">Description de la plainte avec un fichier audio *</p>
                   <div className="flex gap-9">
      
                   <label type="upload" className='bg-bpciorangeml-2 p-2 w-38 h-10 px-3 flex gap-3 rounded text-bpciwhite'> 
                   <BsUpload className="mt-1" />
                   <input onChange={handleFileList} style={{display:"none"}} id="file1" name="file1" type="file" accept=".jpg,.png,.pdf" />
                   Choisir les fichiers</label>

                   
                   { !fileText1 ? <p className='p-2 w-38 h-10 px-3 flex gap-3 rounded text-[var(--color-bpciblue)]'> 
                   Téléverser votre fichier audio</p> :
                   <p className='p-2 w-38 h-10 px-3 flex gap-3 rounded text-[var(--color-bpciblue)]'> 
                   {fileText1}</p>
                     
                     
                   }
                   

                   </div>

                   
                </div>
                <div className="mt-3  w-full">

                <div className="flex gap-9">
      
                  <label type="upload" className='bg-bpciorangeml-2 p-2 w-38 h-10 px-3 flex gap-3 rounded text-bpciwhite'> 
                  <BsUpload className="mt-1" />
                  <input onChange={handleFileList} style={{display:"none"}} id="file2" name="file2" type="file" accept=".jpg,.png,.pdf" />
                  Choisir les fichiers</label>

                  
                  { !fileText2 ? <p className='p-2 w-38 h-10 px-3 flex gap-3 rounded text-[var(--color-bpciblue)]'> 
                  Téléverser votre fichier preuve</p> :
                  <p className='p-2 w-38 h-10 px-3 flex gap-3 rounded text-[var(--color-bpciblue)]'> 
                  {fileText2}</p>
                    
                    
                  }
      

            </div>



                </div>
                


                

                
                <div className="flex flex-wrap justify-end align-center content-center w-auto gap-9  h-20   mt-4 mb-4 ml-5">
                
                <button onClick={handleSubmitPrevious} className='bg-bpciorangep-2 w-38 h-14 px-4  rounded text-bpciwhite'> Précédent</button>
                
                
                
                <button type="submit" className='bg-bpciorangep-2 w-38 h-14 px-4  rounded text-bpciwhite'> Suivant</button>
               
               
              

                </div>

             

              
            </form> */}
            </div>

            <AboutService />
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
