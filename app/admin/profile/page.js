"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Camera, ArrowLeft, Shield, Calendar, Mail, Phone, Building } from 'lucide-react';
import AdminNavbar from '@/components/AdminNavbar';

const AdminProfilePage = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if admin is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/user');
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Not authenticated');
        }

        // Verify user has admin role
        if (data.user.role !== 'admin') {
          throw new Error('Not authorized');
        }

        setAdmin(data.user);
        if (data.user.profilePicture) {
          setImagePreview(data.user.profilePicture);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        // Redirect to login page if not authenticated
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should not exceed 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return;
      }
      
      setError(''); // Clear previous errors
      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!profileImage) return;
    
    setUploading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('profileImage', profileImage);
      
      const response = await fetch('/api/admin/update-profile-picture', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.details || 'Failed to upload image');
      }
      
      const data = await response.json();
      
      // Update admin data with new profile picture
      setAdmin(prev => ({
        ...prev,
        profilePicture: data.profilePicture
      }));
      
      // Also update image preview with the Cloudinary URL
      setImagePreview(data.profilePicture);
      
      // Clear the selected file
      setProfileImage(null);
      
      alert('Profile picture updated successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
      });
      
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminNavbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 via-gray-50 to-white">
      <AdminNavbar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <button 
              onClick={() => router.push('/admin/dashboard')}
              className="mb-6 flex items-center text-teal-600 hover:text-teal-800 transition-colors"
            >
              <ArrowLeft size={18} className="mr-1" />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 text-teal-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center">
                  <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-teal-500">
                    {imagePreview ? (
                      <Image
                        src={imagePreview} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-20 w-20 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="mt-4 flex flex-col items-center">
                    <label htmlFor="profile-upload" className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center gap-2">
                      <Camera size={18} />
                      <span>Change Photo</span>
                    </label>
                    <input 
                      type="file" 
                      id="profile-upload" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange} 
                    />
                    
                    {profileImage && (
                      <button 
                        className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
                        onClick={handleUpload}
                        disabled={uploading}
                      >
                        {uploading ? 'Uploading...' : 'Save Photo'}
                      </button>
                    )}
                    
                    {error && (
                      <p className="mt-2 text-red-500 text-sm">{error}</p>
                    )}
                  </div>
                </div>
                
                {/* Admin Info Section */}
                <div className="flex-grow">
                  <div className="space-y-5">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-teal-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                        <p className="text-lg font-medium text-gray-900">{admin?.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-teal-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                        <p className="text-lg font-medium text-gray-900">{admin?.email}</p>
                      </div>
                    </div>
                    
                    {admin?.phone && (
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-teal-600 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                          <p className="text-lg font-medium text-gray-900">{admin.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    {admin?.companyName && (
                      <div className="flex items-start">
                        <Building className="h-5 w-5 text-teal-600 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Company</h3>
                          <p className="text-lg font-medium text-gray-900">{admin.companyName}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-teal-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Role</h3>
                        <p className="text-lg font-medium uppercase text-teal-700">Administrator</p>
                      </div>
                    </div>
                    
                    {admin?.lastLogin && (
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-teal-600 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Last Login</h3>
                          <p className="text-lg font-medium text-gray-900">
                            {new Date(admin.lastLogin).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProfilePage;