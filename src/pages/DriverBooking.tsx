import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Calendar, Clock, Star, Shield, Check, Phone, Award, Users, Car, Filter, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface BookingForm {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  carType: string;
  hours: string;
}

interface Driver {
  id: string;
  name: string;
  rating: number;
  totalRides: number;
  experience: string;
  languages: string[];
  photo: string;
  verified: boolean;
  hourlyRate: number;
  carTypes: string[];
  availability: boolean;
  specialties: string[];
  responseTime: string;
  completionRate: number;
}

const DriverBooking: React.FC = () => {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [filterRating, setFilterRating] = useState(0);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<BookingForm>();

  const drivers: Driver[] = [
    {
      id: '1',
      name: 'James Wilson',
      rating: 4.9,
      totalRides: 1247,
      experience: '5+ years',
      languages: ['English', 'Spanish'],
      photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      hourlyRate: 25,
      carTypes: ['Sedan', 'SUV', 'Luxury'],
      availability: true,
      specialties: ['Airport Transfers', 'Business Trips', 'Long Distance'],
      responseTime: '< 2 min',
      completionRate: 99
    },
    {
      id: '2',
      name: 'Maria Garcia',
      rating: 4.8,
      totalRides: 892,
      experience: '3+ years',
      languages: ['English', 'French', 'Portuguese'],
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      hourlyRate: 22,
      carTypes: ['Sedan', 'Compact'],
      availability: true,
      specialties: ['City Tours', 'Shopping Trips', 'Medical Appointments'],
      responseTime: '< 3 min',
      completionRate: 98
    },
    {
      id: '3',
      name: 'David Kim',
      rating: 4.7,
      totalRides: 654,
      experience: '2+ years',
      languages: ['English', 'Korean', 'Mandarin'],
      photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      hourlyRate: 20,
      carTypes: ['Sedan', 'SUV'],
      availability: false,
      specialties: ['Tech Events', 'Corporate Meetings', 'Night Shifts'],
      responseTime: '< 5 min',
      completionRate: 97
    }
  ];

  const onSubmit = (data: BookingForm) => {
    console.log('Booking form submitted:', data);
    toast.success('Searching for available drivers...');
  };

  const handleBookDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    toast.success(`Driver ${driver.name} booked successfully! You'll receive confirmation shortly.`);
  };

  const filteredAndSortedDrivers = drivers
    .filter(driver => filterRating === 0 || driver.rating >= filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.hourlyRate - b.hourlyRate;
        case 'experience':
          return b.totalRides - a.totalRides;
        default:
          return 0;
      }
    });

  const watchedData = watch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Book a <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Professional Driver</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find verified, experienced drivers for your vehicle with real-time availability and instant booking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-28 border border-gray-100">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      {...register('pickup', { required: 'Pickup location is required' })}
                      type="text"
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Enter pickup location"
                    />
                  </div>
                  {errors.pickup && <p className="mt-2 text-sm text-red-600">{errors.pickup.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Drop-off Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      {...register('dropoff', { required: 'Drop-off location is required' })}
                      type="text"
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Enter drop-off location"
                    />
                  </div>
                  {errors.dropoff && <p className="mt-2 text-sm text-red-600">{errors.dropoff.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                      <input
                        {...register('date', { required: 'Date is required' })}
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      />
                    </div>
                    {errors.date && <p className="mt-2 text-sm text-red-600">{errors.date.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                      <input
                        {...register('time', { required: 'Time is required' })}
                        type="time"
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      />
                    </div>
                    {errors.time && <p className="mt-2 text-sm text-red-600">{errors.time.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Car Type
                  </label>
                  <select
                    {...register('carType', { required: 'Car type is required' })}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  >
                    <option value="">Select car type</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="compact">Compact</option>
                  </select>
                  {errors.carType && <p className="mt-2 text-sm text-red-600">{errors.carType.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Duration (Hours)
                  </label>
                  <select
                    {...register('hours', { required: 'Duration is required' })}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  >
                    <option value="">Select duration</option>
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="4">4 hours</option>
                    <option value="8">8 hours</option>
                    <option value="12">12 hours</option>
                  </select>
                  {errors.hours && <p className="mt-2 text-sm text-red-600">{errors.hours.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Find Available Drivers
                </button>
              </form>
            </div>
          </div>

          {/* Available Drivers */}
          <div className="lg:col-span-2">
            {/* Filters and Sort */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-bold text-gray-900">Available Drivers</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {filteredAndSortedDrivers.filter(d => d.availability).length} online
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="rating">Sort by Rating</option>
                    <option value="price">Sort by Price</option>
                    <option value="experience">Sort by Experience</option>
                  </select>
                  
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Rating
                      </label>
                      <select
                        value={filterRating}
                        onChange={(e) => setFilterRating(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value={0}>Any Rating</option>
                        <option value={4.5}>4.5+ Stars</option>
                        <option value={4.7}>4.7+ Stars</option>
                        <option value={4.8}>4.8+ Stars</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              {filteredAndSortedDrivers.map((driver) => (
                <div
                  key={driver.id}
                  className={`bg-white rounded-3xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl border border-gray-100 ${
                    !driver.availability ? 'opacity-60' : 'hover:-translate-y-1'
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <img
                          src={driver.photo}
                          alt={driver.name}
                          className="w-20 h-20 rounded-2xl object-cover ring-4 ring-gray-100"
                        />
                        {driver.verified && (
                          <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                        {driver.availability && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{driver.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-semibold">{driver.rating}</span>
                            <span>({driver.totalRides} rides)</span>
                          </div>
                          <span>•</span>
                          <span>{driver.experience}</span>
                          <span>•</span>
                          <span className="text-green-600 font-medium">{driver.responseTime} response</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Award className="h-4 w-4 text-indigo-500" />
                            <span className="text-sm text-gray-600">{driver.completionRate}% completion rate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-indigo-600">₹{driver.hourlyRate}</div>
                      <div className="text-sm text-gray-600">per hour</div>
                      {!driver.availability && (
                        <div className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Offline
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-indigo-500" />
                        Languages
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {driver.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Star className="h-4 w-4 mr-2 text-indigo-500" />
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {driver.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-gray-600 font-medium">Verified & Insured</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-5 w-5 text-blue-500" />
                        <span className="text-sm text-gray-600 font-medium">24/7 Available</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                        View Profile
                      </button>
                      <button
                        onClick={() => handleBookDriver(driver)}
                        disabled={!driver.availability}
                        className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          driver.availability
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {driver.availability ? 'Book Now' : 'Not Available'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverBooking;