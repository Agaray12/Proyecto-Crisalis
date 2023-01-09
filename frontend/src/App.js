import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';
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

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
    <Routes>
      <Route path="/login" element={ <SignIn/> } />
      <Route path='/register' element={ <Register/> } />
    </Routes>
    
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
              <Route 
                path='/clients'
                element={
                  <PrivateRoute>
                    <Clients />
                  </PrivateRoute>
                }
              />
              <Route 
                path='/goods'
                element={
                  <PrivateRoute>
                    <Goods />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </>
  );
}

export default App;
