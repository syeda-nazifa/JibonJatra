import React, { useState } from 'react';
import { homeApi } from '../api/homes';
import ImageCarousel from './ImageCarousel';
import { Edit3, Trash2, Phone, MapPin, DollarSign } from 'lucide-react';

const HomeRentalCard = ({ home, onUpdate, onEdit, user }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isOwner = user?.id === home.user?._id;
  const isAdmin = user?.role === 'admin';
  const canEdit = isOwner || isAdmin;
  const canDelete = isOwner || isAdmin;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this rental?')) return;
    
    setIsDeleting(true);
    try {
      await homeApi.delete(home._id);
      onUpdate?.(); // Refresh the list
    } catch (error) {
      console.error('Error deleting home:', error);
      alert('Failed to delete rental');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleContact = () => {
    alert(`Contact ${home.user?.name} at ${home.user?.email} about this rental`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Carousel */}
      {home.images && home.images.length > 0 && (
        <ImageCarousel images={home.images} />
      )}
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {home.title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            home.status === 'available' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {home.status}
          </span>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-3">
          {home.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            <span className="font-semibold">৳{home.rent?.toLocaleString()}</span>
            <span className="text-sm ml-1">/month</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{home.location}</span>
          </div>
          
          {home.user && (
            <div className="flex items-center text-sm text-gray-500">
              <span>Posted by: {home.user.name}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={handleContact}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Phone className="h-4 w-4 mr-1" />
            Contact
          </button>

          {(canEdit || canDelete) && (
            <div className="flex space-x-2">
              {canEdit && (
                <button
                  onClick={() => onEdit(home)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              )}
              
              {canDelete && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeRentalCard;