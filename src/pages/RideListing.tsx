import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, Users, DollarSign, Star, Filter } from 'lucide-react';

interface Ride {
  id: string;
  driverName: string;
  driverPhoto: string;
  driverRating: number;
  from: string;
  to: string;
  date: string;
  time: string;
  availableSeats: number;
  farePerSeat: number;
  carModel: string;
  carColor: string;
  amenities: string[];
  estimatedDuration: string;
  pickupPoints: string[];
  type: 'carpool' | 'driver-booking';
}

const RideListings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | 'carpool' | 'driver-booking'>('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

  const rides: Ride[] = [
    {
      id: '1',
      driverName: 'Sarah Johnson',
      driverPhoto: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      driverRating: 4.8,
      from: 'Downtown',
      to: 'Airport',
      date: '2024-01-20',
      time: '10:30',
      availableSeats: 3,
      farePerSeat: 15,
      carModel: 'Toyota Camry',
      carColor: 'Blue',
      amenities: ['ac', 'music', 'charging'],
      estimatedDuration: '45 min',
      pickupPoints: ['City Center', 'Mall Plaza'],
      type: 'carpool'
    },
    {
      id: '2',
      driverName: 'Michael Chen',
      driverPhoto: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      driverRating: 4.9,
      from: 'University District',
      to: 'Business District',
      date: '2024-01-20',
      time: '08:15',
      availableSeats: 2,
      farePerSeat: 12,
      carModel: 'Honda Civic',
      carColor: 'White',
      amenities: ['ac', 'wifi', 'water'],
      estimatedDuration: '35 min',
      pickupPoints: ['Campus Gate', 'Library'],
      type: 'carpool'
    },
    {
      id: '3',
      driverName: 'Emily Rodriguez',
      driverPhoto: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      driverRating: 4.7,
      from: 'Suburb Heights',
      to: 'City Center',
      date: '2024-01-21',
      time: '07:45',
      availableSeats: 4,
      farePerSeat: 18,
      carModel: 'BMW X3',
      carColor: 'Black',
      amenities: ['ac', 'music', 'charging', 'snacks'],
      estimatedDuration: '55 min',
      pickupPoints: ['Metro Station', 'Shopping Center'],
      type: 'carpool'
    }
  ];

  const amenityIcons: { [key: string]: string } = {
    ac: '❄️',
    music: '🎵',
    wifi: '📶',
    charging: '🔌',
    water: '💧',
    snacks: '🍪'
  };

  const filteredRides = rides.filter(ride => {
    const matchesSearch = ride.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ride.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || ride.type === selectedType;
    const matchesPrice = ride.farePerSeat >= priceRange.min && ride.farePerSeat <= priceRange.max;
    
    return matchesSearch && matchesType && matchesPrice;
  });

  const handleJoinRide = (rideId: string) => {
    // Handle ride joining logic
    console.log('Joining ride:', rideId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Ride</h1>
          <p className="text-xl text-gray-600">Discover available rides and join the journey</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ride Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="carpool">Carpool</option>
                  <option value="driver-booking">Driver Booking</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Ride Listings */}
        <div className="space-y-6">
          {filteredRides.map((ride) => (
            <div key={ride.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={ride.driverPhoto}
                    alt={ride.driverName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{ride.driverName}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{ride.driverRating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">₹{ride.farePerSeat}</div>
                  <div className="text-sm text-gray-600">per seat</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{ride.from}</div>
                    <div className="text-sm text-gray-600">to {ride.to}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{ride.date}</div>
                    <div className="text-sm text-gray-600">{ride.time}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{ride.availableSeats} seats</div>
                    <div className="text-sm text-gray-600">available</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{ride.estimatedDuration}</div>
                    <div className="text-sm text-gray-600">duration</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-sm font-medium text-gray-700">Vehicle:</span>
                  <span className="text-sm text-gray-600">{ride.carModel} ({ride.carColor})</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Pickup Points:</span>
                  <div className="flex flex-wrap gap-2">
                    {ride.pickupPoints.map((point, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-sm font-medium text-gray-700 mb-2 block">Amenities:</span>
                <div className="flex flex-wrap gap-2">
                  {ride.amenities.map((amenity) => (
                    <span key={amenity} className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      <span>{amenityIcons[amenity]}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Total for {ride.availableSeats} seats: </span>
                  <span className="text-green-600 font-bold">₹{ride.farePerSeat * ride.availableSeats}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                  <button
                    onClick={() => handleJoinRide(ride.id)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
                  >
                    Join Ride
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRides.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rides found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find more rides.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideListings;