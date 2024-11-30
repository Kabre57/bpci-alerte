import React from 'react'
import CustomButton from '../components/CustomButton'
import Footer from '../components/footer'
import { media } from '../libs/media'
import { db, auth } from '../plugins/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { motion } from "framer-motion"
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { userAsyncThunc } from '../redux/slices/userSlices'
import { toast } from 'react-toastify'


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


const Login = ({ handle_login }) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [simulateLoading, setsimulateLoading] = useState(false);


    // const count = useSelector((state) => state.userInfo.value)
    const dispatch = useDispatch()

    const signIn = (email, password) => {
        setsimulateLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setsimulateLoading(false)

                // console.log("user dd", user)

                setTimeout(() => {
                    // dispatch(userAsyncThunc(user))
                    localStorage.setItem('userAccess', JSON.stringify(user));
                    toast.success(`Bienvenue Mr/Mme ${user?.email}`, { draggable: true })
                    setTimeout(() => {
                        navigate('/')
                        handle_login()
                        document.location.reload()
                    }, 2000)
                }, 1000)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setsimulateLoading(false)
                toast.error(`Une erreur est survenue lors du traitement de votre requête.`, { draggable: true })
                console.error(`Erreur de connexion: ${errorCode} ${errorMessage}`);
            });
    };


    return (
        <div className="">
            <div className='h-[80vh] w-full flex items-center bg-white justify-center bg-bpciwhite'>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit" className="max-w-[500px] text-center">
                    <div className="max-w-[125px] bg-red-500 flex justify-center mx-auto">
                        <img
                            src={media.Logos.logo}
                            alt="logo"
                        />
                    </div>
                    <div className="w-full mt-[1rem]">
                        {/* <label htmlFor="email">Email </label> */}
                        <input id="email" name="email" type="email" placeholder='email'
                            className="border border-bpcidark"
                            style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                            onChange={(event) => setEmail(event.target.value)} />
                    </div>

                    <div className="w-full mt-[.5rem]">
                        {/* <label htmlFor="email">Email </label> */}
                        <input id="password" name="password" type="password" placeholder='Mot de passe'
                            className="border border-bpcidark"
                            style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                            onChange={(event) => setPassword(event.target.value)} />
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-2 mb-[1rem]">
                        <div className="w-4">
                            <input type="checkbox" name="rememberME" id="rememberME" />
                        </div>
                        <p className='ml-2 inline-block'>Se souvenir de moi</p>
                    </div>

                    <CustomButton
                        loading={simulateLoading}
                        rounded='lg'
                        action={() => {
                            signIn(email, password)
                            // navigate('/')
                            //handle_login()
                        }}
                        py={"py-[.5rem]"}
                        color={"bg-[var(--color-bpciblue)]"}
                        w={"w-full"}
                        title="Se connecter"
                    />
                </motion.div>
            </div>
            <Footer />
        </div >
    )
}

export default Login