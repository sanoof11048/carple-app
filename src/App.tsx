import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DriverBooking from './pages/DriverBooking';
import PostRide from './pages/PostRide';
import RideListings from './pages/RideListing';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Support from './pages/Support';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book-driver" element={<DriverBooking />} />
                <Route path="/post-ride" element={<PostRide />} />
                <Route path="/rides" element={<RideListings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/support" element={<Support />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </main>
            <Toaster position="top-right" />
          </div>
        </Router>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;