import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Authentication from './pages/Authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet';
import History from './pages/history';
import HomeComponent from './pages/home';

function App() {
  return (
    <>
    <Router>
    <AuthProvider>
      <Routes>
      <Route path="/" element={<LandingPage/>}/> 
      <Route path="/auth" element={<Authentication/>}/>
      <Route path='/home's element={<HomeComponent />} />
            <Route path='/history' element={<History />} /> 
      <Route path='/:url' element={<VideoMeetComponent/>} />
      </Routes>
      </AuthProvider>
      </Router>
    </>
  );
}

export default App;
