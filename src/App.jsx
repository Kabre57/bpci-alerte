
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import DefaultRoutes from './Routes/DefaultRoutes';
import { DashBoardContentsRoute } from './Routes/DashBoardRouters';
import React, { useReducer } from 'react';
import { RootUserContext } from './contexts';
import { useDispatch, useSelector } from 'react-redux'


const initialTodos = [
  {
    is_active: false,
  }
];

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_IS_ACTIVE":
      return [{ is_active: true }]
    default:
      return state;
  }
};

function App() {

  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const userContext = React.useContext(RootUserContext)
  const dispatch2 = useDispatch()
  let navigate = useNavigate();

  const user_info = useSelector((state) => state.userInfo.value)


  const handle_Is_Active = () => {
    dispatch({ type: "TOGGLE_IS_ACTIVE" });
  };

  const loadTokens = () => {
    let resultToken = () => (localStorage.getItem("userAccess"));
    let getted = (resultToken())
    if (getted) {
      userContext.setUser(JSON.parse(getted))
    }
  }

  React.useEffect(() => {
    loadTokens()
  }, [])

  return (
    <>

      {
        userContext.user?.email ?
          <DashBoardContentsRoute /> :
          <DefaultRoutes handle_login={handle_Is_Active} />
      }
    </>

  );
}

export default App;