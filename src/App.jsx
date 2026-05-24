import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TryoutForm from './pages/TryoutForm'
import FeedbackForm from './pages/FeedbackForm'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import './styles/globals.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="grain-overlay" />
      <Navbar />
      <Routes>
        <Route path="/freshman" element={<TryoutForm />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
