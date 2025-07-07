import React, { useState, useEffect } from 'react';
import { Car, Menu, X, Bell, Wallet, User, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock hooks for demo
const useAuth = () => ({
  isAuthenticated: true,
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    isDriver: false
  },
  logout: () => console.log('Logout')
});

const useWallet = () => ({
  balance: 125.50
});

const Navbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
  const [islandState, setIslandState] = useState<'compact' | 'expanded' | 'full'>('full');
  const [currentPage, setCurrentPage] = useState('/');
  
  const { isAuthenticated, user, logout } = useAuth();
  const { balance } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
    //   setScrolled(scrollY > 20);
      
      // Dynamic island states based on scroll
      if (scrollY > 100) {
        setIslandState('compact');
      } else if (scrollY > 20) {
        setIslandState('expanded');
      } else {
        setIslandState('full');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentPage('/');
    setShowProfile(false);
  };

  const handleNavigation = (path: string) => {
    setCurrentPage(path);
    setIsExpanded(false);
    setShowProfile(false);
  };

  const notifications = [
    { id: 1, title: 'New ride request from Sarah', time: '2 min ago', unread: true, type: 'ride' },
    { id: 2, title: 'Payment of ₹25.50 received', time: '1 hour ago', unread: true, type: 'payment' },
    { id: 3, title: 'Driver verification completed', time: '2 hours ago', unread: false, type: 'verification' }
  ];

  const isActivePage = (path: string) => currentPage === path;

  const navItems = [
    { path: '/book-driver', label: 'Book Driver' },
    { path: '/post-ride', label: 'Post Ride' },
    { path: '/rides', label: 'Find Rides' },
    { path: '/support', label: 'Support' }
  ];

  return (
    <>
      {/* Dynamic Island Container */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div 
          className={`transition-all duration-500 ease-out ${
            islandState === 'compact' 
              ? 'w-64 h-12' 
              : islandState === 'expanded' 
                ? 'w-96 h-16' 
                : 'w-[90vw] max-w-6xl h-20'
          } bg-black/50 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl`}
          onMouseEnter={() => {
            if (islandState === 'compact') {
              setIsExpanded(true);
            }
          }}
          onMouseLeave={() => {
            if (islandState === 'compact') {
              setIsExpanded(false);
            }
          }}
        >
          {/* Compact State */}
          {islandState === 'compact' && (
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-full">
                    <Car className="h-4 w-4 text-white" />
                  </div>
                </div>
                <span className="text-white font-bold text-sm">Carple</span>
              </div>
              
              {isExpanded && (
                <div className="flex items-center space-x-2 animate-in slide-in-from-right duration-200">
                  <button 
                    onClick={() => handleNavigation('/wallet')}
                    className="text-green-400 text-xs font-medium hover:text-green-300 transition-colors"
                  >
                    ₹{balance.toFixed(2)}
                  </button>
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative hover:bg-white/10 p-1 rounded-full transition-colors"
                  >
                    <Bell className="h-4 w-4 text-white" />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                  <button onClick={() => setShowProfile(!showProfile)}>
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="h-6 w-6 rounded-full object-cover hover:ring-2 hover:ring-white/20 transition-all"
                    />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Expanded State */}
          {islandState === 'expanded' && (
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5 rounded-full">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                </div>
                <span className="text-white font-bold text-lg">Carple</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleNavigation('/wallet')}
                  className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full hover:bg-green-500/30 transition-colors"
                >
                  <Wallet className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">₹{balance.toFixed(2)}</span>
                </button>
                
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Bell className="h-4 w-4 text-white" />
                  {notifications.some(n => n.unread) && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">
                        {notifications.filter(n => n.unread).length}
                      </span>
                    </span>
                  )}
                </button>
                
                <button onClick={() => setShowProfile(!showProfile)}>
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-white/20 hover:ring-white/40 transition-all"
                  />
                </button>
              </div>
            </div>
          )}

          {/* Full State */}
          {islandState === 'full' && (
            <div className="flex items-center justify-between h-full px-8">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-full">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-bold text-white">
                  Carple
                </span>
              </Link>

              {/* Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      isActivePage(item.path)
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Auth Section */}
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                   

                    {/* Wallet */}
                    <Link 
                      to="/wallet" 
                      className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Wallet className="h-4 w-4" />
                      <span className="font-semibold">₹{balance.toFixed(2)}</span>
                    </Link>

                    {/* Notifications */}
                    <div className="relative">
                      <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-3 rounded-full hover:bg-white/10 transition-colors group"
                      >
                        <Bell className="h-5 w-5 text-white/80 group-hover:text-white" />
                        {notifications.some(n => n.unread) && (
                          <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">
                              {notifications.filter(n => n.unread).length}
                            </span>
                          </span>
                        )}
                      </button>

                      {showNotifications && (
                        <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                          <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                            <p className="text-sm text-gray-500">You have {notifications.filter(n => n.unread).length} unread notifications</p>
                          </div>
                          <div className="max-h-80 overflow-y-auto">
                            {notifications.map(notification => (
                              <div
                                key={notification.id}
                                className={`px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                                  notification.unread ? 'bg-blue-50/50' : ''
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                  </div>
                                  {notification.unread && (
                                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 ml-3"></div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="px-6 py-3 border-t border-gray-100">
                            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                              View all notifications
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Profile */}
                    <div className="relative">
                      <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center space-x-3 p-2 rounded-full hover:bg-white/10 transition-colors group"
                      >
                        <img
                          src={user?.avatar}
                          alt={user?.name}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20 group-hover:ring-white/40 transition-all"
                        />
                        <div className="text-left hidden xl:block">
                          <span className="text-sm font-medium text-white block">{user?.name}</span>
                          <span className="text-xs text-white/60">
                            {user?.isDriver ? 'Driver' : 'Passenger'}
                          </span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-white/60 hidden xl:block" />
                      </button>

                      {showProfile && (
                        <div
                        
                        className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                              <img
                                src={user?.avatar}
                                alt={user?.name}
                                className="h-12 w-12 rounded-xl object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{user?.name}</p>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                              </div>
                            </div>
                          </div>
                          <div className="py-2">
                            <Link
                              to="/profile"
                              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                              onClick={() => setShowProfile(false)}
                            >
                              <User className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-700">Profile Settings</span>
                            </Link>
                            <Link
                              to="/wallet"
                              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                              onClick={() => setShowProfile(false)}
                            >
                              <Wallet className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-700">Wallet</span>
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left"
                            >
                              <LogOut className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-700">Sign Out</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-white/80 hover:text-white transition-colors font-medium"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button - Only visible when needed */}
      {islandState === 'full' && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden fixed top-8 right-6 z-50 p-3 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white"
        >
          {isExpanded ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      )}

      {/* Mobile Expanded Menu */}
      {isExpanded && islandState === 'full' && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-xl z-40 pt-24">
          <div className="bg-white/95 backdrop-blur-xl mx-4 rounded-2xl p-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-xl transition-colors font-medium ${
                  isActivePage(item.path)
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsExpanded(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/wallet"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                  onClick={() => setIsExpanded(false)}
                >
                  Wallet (₹{balance.toFixed(2)})
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                  onClick={() => setIsExpanded(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                  onClick={() => setIsExpanded(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl transition-colors font-medium text-center"
                  onClick={() => setIsExpanded(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Spacer for content below */}
      <div className="h-28"></div>
    </>
  );
};

export default Navbar;