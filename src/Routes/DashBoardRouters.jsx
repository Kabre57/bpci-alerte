import { Route, Routes } from "react-router"
import DashBoardDenonciationDetails from "../pages/DashBoardDenonciationDetails"
import DashBoardHeaderComponent from "../components/DashBoardHeaderComponent"
import DashBoardSideBar from "../components/DashBoardSideBar"
import AcceptedDenonciations from "../pages/AcceptedDenonciations"
import DashBoardListDenonciations from "../pages/DashBoardListDenonciations"
import DashBoardUsers from "../pages/DashBoardUsers"
import InProgressDenonciations from "../pages/InProgressDenonciations"
import InviteUser from "../pages/InviteUser"
import Page404 from "../pages/Page404"
import RejectedDenonciations from "../pages/RejectedDenonciations"
import LoadDenonciations from "../utilsLoaders/LoadDenonciations"
import ModalsImageViewer from "../components/ModalsImageViewer"
import ModalsPDFViewer from "../components/ModalsPDFViewer"
import DashBoardServices from "../pages/DashBoardServices"
import CreateService from "../pages/CreateServices"
import ModalsConfirm from "../components/modalsConfirm"
import ArchivedDenonciations from "../pages/ArchivedDenonciations"
import ResetCredentials from "../pages/ResetMyCredentials"
import RecapPDF from '../pages/RecapPDF'
import ModalValidateActionWithMessage from "../components/ModalValidateProcess"
import Notification from "../pages/notification"


export const DashBoardContentsRoute = () => {

    return (
        <>
            <LoadDenonciations>
                <div className="relative bg-white">

                    <ModalsImageViewer />
                    <ModalsPDFViewer />
                    <ModalsConfirm />
                    <ModalValidateActionWithMessage />
                    <div className="w-full h-screen flex">

                        {/* DashBoard SideBar component */}
                        <DashBoardSideBar />

                        <div className="w-full bg-white overflow-y-scroll">
                            {/* Header dashboard component */}
                            <DashBoardHeaderComponent />


                            <Routes>
                                <Route path="/" element={<DashBoardListDenonciations />} />
                                <Route path="/utilisateurs" element={<DashBoardUsers />} />
                                <Route path="/services" element={<DashBoardServices />} />
                                <Route path="/notifications" element={<Notification />} />
                                <Route path="/inviteUser" element={<InviteUser />} />
                                <Route path="/resetMyCredentials" element={<ResetCredentials />} />
                                <Route path="recapPDF" element={<RecapPDF />} />
                                <Route path="/createService" element={<CreateService />} />
                                <Route path="/acceptedDenonciations" element={<AcceptedDenonciations />} />
                                <Route path="/rejectedDenonciations" element={<RejectedDenonciations />} />
                                <Route path="/archivedDenonciations" element={<ArchivedDenonciations />} />
                                <Route path="/waitingsDenonciations" element={<InProgressDenonciations />} />
                                <Route path="/denonciation" element={<DashBoardDenonciationDetails />} />
                                <Route path="*" element={<Page404 />} />

                            </Routes>

                        </div>
                    </div>

                </div>
            </LoadDenonciations>
        </>
    )
}