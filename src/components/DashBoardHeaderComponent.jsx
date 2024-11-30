import React from 'react'
import { IoIosNotifications } from 'react-icons/io'
import CustomInput from './CustomInput'

import USER from "../images/téléchargement.png"
import { IoLogOut } from 'react-icons/io5'
import { userAsyncThunc, userRemoveAsyncThunc } from '../redux/slices/userSlices'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../plugins/firebase'
import { useNavigate } from 'react-router'
import { RootUserContext } from '../contexts'
const DashBoardHeaderComponent = () => {


    const dispatch = useDispatch()
    let navigate = useNavigate();
    const userContext = React.useContext(RootUserContext)
    const { value, } = useSelector((state) => state.denonciations)

    const countNonReadDenonciations = React.useMemo(() => {
        return Object.values(value)
            .filter(den => den.status)
            .filter(den => ((!den.openByUsers) || (!den.openByUsers.includes(userContext.user?.email))) && true).length
    }, [value])

    return (
        <div className="flex items-center p-[2rem] justify-end flex-wrap">
            {/* <CustomInput /> */}
            <div className="flex gap-[1rem] items-center">
                <button 
                                
                onClick={() =>
                    navigate('/notifications')}

                className="p-[.5rem] cursor-pointer max-lg:hidden relative w-[30px] h-[30px]
                    text-[var(--color-bpciblue)] active:scale-[.9] transition-all">
                    <IoIosNotifications
                        size={25}
                    />
                    <p className="absolute top-0 -right-2 bg-[var(--color-bpciblue)] text-white rounded-full p-[.05rem] px-[.35rem] text-[.7rem]">{countNonReadDenonciations}</p>
                </button>
                <button
                    onClick={() =>
                        navigate('/resetMyCredentials')}
                    className="flex gap-[1rem] items-center active:scale-[.9] transition-all">
                    <img src={USER}
                        alt=""
                        className='w-[40px] h-[40px] max-lg:hidden rounded-full'
                    />
                    <p>{userContext.user?.email}</p>
                </button>

                <button
                    onClick={() => {
                        logOut()
                        dispatch(userRemoveAsyncThunc())
                        // console.log(user.stsTokenManager)
                        navigate('/')
                        localStorage.setItem('userAccess', JSON.stringify({}));
                        document.location.reload()
                    }}

                    className="p-[.5rem] cursor-pointer text-[var(--color-bpciblue)] active:scale-[.9] transition-all ">
                    <IoLogOut
                        size={25}
                    />
                </button>
            </div>
        </div>
    )
}

export default DashBoardHeaderComponent