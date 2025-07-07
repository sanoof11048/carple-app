import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Calendar, Clock, Users, DollarSign, Car, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface RideForm {
  from: string;
  to: string;
  date: string;
  time: string;
  availableSeats: number;
  farePerSeat: number;
  carModel: string;
  carColor: string;
  description: string;
  pickupPoints: string;
  dropoffPoints: string;
}

const PostRide: React.FC = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RideForm>();

  const amenities = [
    { id: 'ac', label: 'Air Conditioning', icon: '❄️' },
    { id: 'music', label: 'Music System', icon: '🎵' },
    { id: 'wifi', label: 'WiFi Available', icon: '📶' },
    { id: 'charging', label: 'Phone Charging', icon: '🔌' },
    { id: 'water', label: 'Water Bottles', icon: '💧' },
    { id: 'snacks', label: 'Snacks', icon: '🍪' }
  ];

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const onSubmit = (data: RideForm) => {
    const rideData = {
      ...data,
      amenities: selectedAmenities,
      status: 'active',
      postedAt: new Date().toISOString()
    };
    
    console.log('Ride posted:', rideData);
    toast.success('Ride posted successfully! Other users can now book your ride.');
  };

  const watchedSeats = watch('availableSeats');
  const watchedFare = watch('farePerSeat');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Your Ride</h1>
          <p className="text-xl text-gray-600">Share your journey and split the costs</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Route Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('from', { required: 'Starting location is required' })}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter starting location"
                  />
                </div>
                {errors.from && <p className="mt-1 text-sm text-red-600">{errors.from.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('to', { required: 'Destination is required' })}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter destination"
                  />
                </div>
                {errors.to && <p className="mt-1 text-sm text-red-600">{errors.to.message}</p>}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('date', { required: 'Date is required' })}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('time', { required: 'Time is required' })}
                    type="time"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>}
              </div>
            </div>

            {/* Seats and Fare */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Seats
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    {...register('availableSeats', { required: 'Number of seats is required' })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select seats</option>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} seat{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                {errors.availableSeats && <p className="mt-1 text-sm text-red-600">{errors.availableSeats.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fare per Seat
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('farePerSeat', { 
                      required: 'Fare per seat is required',
                      min: { value: 1, message: 'Fare must be at least ₹1' }
                    })}
                    type="number"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                {errors.farePerSeat && <p className="mt-1 text-sm text-red-600">{errors.farePerSeat.message}</p>}
              </div>
            </div>

            {/* Car Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car Model
                </label>
                <div className="relative">
                  <Car className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('carModel', { required: 'Car model is required' })}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Toyota Camry"
                  />
                </div>
                {errors.carModel && <p className="mt-1 text-sm text-red-600">{errors.carModel.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car Color
                </label>
                <input
                  {...register('carColor', { required: 'Car color is required' })}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Blue"
                />
                {errors.carColor && <p className="mt-1 text-sm text-red-600">{errors.carColor.message}</p>}
              </div>
            </div>

            {/* Pickup and Drop-off Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Points
                </label>
                <textarea
                  {...register('pickupPoints')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="List specific pickup points along the route"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Drop-off Points
                </label>
                <textarea
                  {...register('dropoffPoints')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="List specific drop-off points along the route"
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Amenities Available
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenities.map((amenity) => (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      selectedAmenities.includes(amenity.id)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{amenity.icon}</div>
                      <div className="text-sm font-medium">{amenity.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Any additional information about your ride (preferences, stops, etc.)"
              />
            </div>

            {/* Summary */}
            {watchedSeats && watchedFare && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ride Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600">{watchedSeats}</div>
                    <div className="text-sm text-gray-600">Available Seats</div>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600">₹{watchedFare}</div>
                    <div className="text-sm text-gray-600">Per Seat</div>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600">₹{(watchedSeats * watchedFare).toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Total Potential Earnings</div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Post Ride</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostRide;