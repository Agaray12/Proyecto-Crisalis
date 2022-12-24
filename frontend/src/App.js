import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import SignIn from './components/pages/SignIn';
import Dashboard from './components/pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
      />
      <Route path="/login" element={ <SignIn/> } />
    </Routes>
  );
}

export default App;
