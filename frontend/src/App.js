import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import SignIn from './components/pages/SignIn';
import Dashboard from './components/pages/Dashboard';
import Clients from './components/pages/Clients/index';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/pages/Register';
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Goods from './components/pages/Goods/index';
import { useLocalState } from './util/useLocalStorage';
import axios from 'axios';
import ClientCreate from './components/pages/Clients/Forms/createClient';
import GoodCreate from './components/pages/Goods/Forms/createGood';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(()=> {
    if(jwt){
      axios.get("/api/auth/validate", {params:{token: `${jwt}`}}).then((res) => {
        setIsLoggedIn(res.data);
        console.log(res.data);
      });
    }else{
      setIsLoggedIn(false);
    }
  }, [jwt]);

  return (
    <>
    <Routes>
      <Route path="/login" element={ <SignIn/> } />
      <Route path='/register' element={ <Register/> } />
    </Routes>
    
    <div style={ isLoggedIn ? { display: ""} : {display: "none"}}>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard/>
                  </PrivateRoute>
                }
              />
              <Route path='/clients'>
                  <Route 
                    index
                    element={
                      <PrivateRoute>
                        <Clients />
                      </PrivateRoute>
                    }
                  />
                <Route
                  path='create'
                  element={
                    <PrivateRoute>
                      <ClientCreate />
                    </PrivateRoute>
                  }
              />
              </Route>
              <Route 
                path='/goods'
              >
                <Route index 
                element={
                  <PrivateRoute>
                    <Goods />
                  </PrivateRoute>
                }/>
                <Route 
                path='create'
                element={
                  <PrivateRoute>
                    <GoodCreate />
                  </PrivateRoute>
                }/>
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </div>
    </>
  );
}

export default App;
