import './styles/GlobalStyle.jsx'
import './styles/ResetStyle.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import MyCatsPage from './pages/MyCatsPage.jsx';
import CatPage from './pages/CatPage.jsx';

export default function App() {

  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/my-models" element={<MyCatsPage />} />
            <Route path="/available-cats/:id" element={<CatPage />} /> 
          </Routes>
        </BrowserRouter>
  )
}

