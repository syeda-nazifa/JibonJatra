// ServiceCard.jsx
import React from 'react';
import { getImageUrl } from '../../api/client';

const ServiceCard = ({ service }) => {
  // Add debug logging
  console.log('Service data:', service);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        {/* <img
          src={service.createdBy?.profilePicture || '/default-avatar.png'}
          alt={service.createdBy?.username}
          className="w-10 h-10 rounded-full mr-3"
        /> */}
        <div>
          <h3 className="font-medium text-gray-900">{service.createdBy?.username}</h3>
          <p className="text-gray-500 text-sm">Service Provider</p>
        </div>
      </div>

      {service.servicePicture && (
        <img
          src={getImageUrl(service.servicePicture)}
          alt={service.serviceName}
          className="w-full h-64 object-cover rounded-md mb-4"
          onError={(e) => {
            e.target.style.display = 'none';
            console.log('Failed to load service image:', service.servicePicture);
          }}
        />
      )}

      <h2 className="text-xl font-semibold text-gray-900 mb-2">{service.serviceName}</h2>
      
      <p className="text-gray-700 mb-4">{service.serviceDetail}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600 text-sm">Price</p>
          <p className="text-2xl font-bold text-green-600">৳{service.servicePrice}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Provider</p>
          <p className="font-medium text-gray-900">{service.providerName}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600 text-sm">Contact</p>
          <p className="font-medium text-gray-900">{service.providerContact}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Location</p>
          <p className="font-medium text-gray-900">{service.location}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-yellow-400 text-lg">⭐</span>
          <span className="ml-1 text-gray-700 font-medium">
            {service.ratingAverage?.toFixed(1) || '0.0'} ({service.ratingCount || 0} reviews)
          </span>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Contact Provider
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;