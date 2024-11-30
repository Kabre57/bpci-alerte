import React, { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Navbar from '../components/navbar'
import Apropos from '../pages/apropos'
import Contacts from '../pages/contacts'
import DeposerPlainte from '../pages/deposerPlainte'
import DeposerPlainteStep2 from '../pages/deposerPlainteStep2'
import Faq from '../pages/faq'
import Home from '../pages/home'
import Login from '../pages/Login'
import Page404 from '../pages/Page404'
import Recapitulatif from '../pages/recapitulatif'
import ResumeFormulaire from '../pages/resumeFormulaire'
import SuivrePlainte from '../pages/suivrePlainte'

import Footer from '../components/footer'
import TopNavigationInfo from '../components/TopNavigationInfo'
import RecapPDF from '../pages/RecapPDF'

const DefaultRoutes = ({ handle_login }) => {

    const [isInRecapPDF, setisInRecapPDF] = useState(false)
    let location = useLocation()?.pathname
    React.useEffect(() => {
        console.log(location)
        setisInRecapPDF(location === "/recapPDF")
    }, [location])
    return (
        <div className='relative'>
             <Navbar />
            {!((location === "/") || (location === "/login")) && <TopNavigationInfo />}
            <div className="bg-white">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Page404 />} />
                    <Route path="faq" element={<Faq />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="suivreplainte" element={<SuivrePlainte />} />
                    <Route path="login" element={<Login handle_login={handle_login} />} />

                    <Route path="depotplainte" element={<DeposerPlainte />} />
                    <Route path="resumeform" element={<ResumeFormulaire />} />
                    <Route path="depotplainteStep2" element={<DeposerPlainteStep2 />} />
                    <Route path="recapitilatif" element={<Recapitulatif />} />
                    <Route path="apropos" element={<Apropos />} />
                    <Route path="recapPDF" element={<RecapPDF />} />
                </Routes>
            </div>
        </div>
    )
}

export default DefaultRoutes