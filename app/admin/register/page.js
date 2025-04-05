"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, AlertCircle } from 'lucide-react';

const Input = ({ label, type, placeholder, value, onChange, error }) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            className={`w-full px-3 sm:px-4 py-2 rounded border ${
                error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);

const Button = ({ children, variant = "primary", onClick, type = "button", disabled = false }) => {
    const baseStyles = "w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded transition-all duration-300 flex items-center justify-center";
    const variants = {
        primary: "bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 text-white hover:opacity-90 disabled:opacity-70 transform hover:scale-105 shadow-lg",
        secondary: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
    };
    
    return (
        <button 
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]}`}
        >
            {children}
        </button>
    );
};

export default function AdminRegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        adminCode: '' // Secret code for admin registration
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        if (!formData.adminCode.trim()) {
            newErrors.adminCode = 'Admin registration code is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    companyName: formData.companyName,
                    password: formData.password,
                    adminCode: formData.adminCode
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            setSuccessMessage('Admin account created successfully. You will be redirected to the login page shortly.');
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                router.push('/admin/login');
            }, 3000);
            
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                submit: error.message || 'Registration failed. Please try again.'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <section className="flex-grow relative py-12 bg-gradient-to-br from-teal-50 via-gray-50 to-white">
                <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
                    <svg className="absolute left-0 top-0 h-full" viewBox="0 0 150 800" fill="none">
                        <path d="M-5 0H50L-5 200V0Z" fill="#0D9488" />
                        <path d="M-5 200H50L-5 400V200Z" fill="#14B8A6" />
                        <path d="M-5 400H50L-5 600V400Z" fill="#2DD4BF" />
                        <path d="M-5 600H50L-5 800V600Z" fill="#5EEAD4" />
                    </svg>
                    <svg className="absolute right-0 bottom-0 h-full" viewBox="0 0 150 800" fill="none">
                        <path d="M155 800H100L155 600V800Z" fill="#0D9488" />
                        <path d="M155 600H100L155 400V600Z" fill="#14B8A6" />
                        <path d="M155 400H100L155 200V400Z" fill="#2DD4BF" />
                        <path d="M155 200H100L155 0V200Z" fill="#5EEAD4" />
                    </svg>
                </div>
                
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-3">
                                    <Shield size={40} className="text-teal-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Registration</h2>
                                <p className="text-gray-600">Create a new administrator account</p>
                            </div>
                            
                            {successMessage && (
                                <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-md">
                                    {successMessage}
                                </div>
                            )}
                            
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Full Name"
                                        type="text"
                                        placeholder="Your Full Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        error={errors.name}
                                    />
                                    
                                    <Input
                                        label="Company Name (Optional)"
                                        type="text"
                                        placeholder="Your Company Name"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                        error={errors.companyName}
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        error={errors.email}
                                    />
                                    
                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        placeholder="Your Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        error={errors.phone}
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Password"
                                        type="password"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        error={errors.password}
                                    />
                                    
                                    <Input
                                        label="Confirm Password"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                        error={errors.confirmPassword}
                                    />
                                </div>
                                
                                <Input
                                    label="Admin Registration Code"
                                    type="password"
                                    placeholder="Enter admin registration code"
                                    value={formData.adminCode}
                                    onChange={(e) => setFormData({...formData, adminCode: e.target.value})}
                                    error={errors.adminCode}
                                />
                                <p className="text-xs text-gray-500 -mt-4">
                                    This code is required to create an admin account and is provided by the system administrator.
                                </p>

                                <div className="flex items-start mt-4">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded mt-1"
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                                        I understand that this account will have administrative privileges and I agree to use them responsibly.
                                    </label>
                                </div>

                                {errors.submit && (
                                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md flex items-start">
                                        <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                                        <span>{errors.submit}</span>
                                    </div>
                                )}

                                <div className="mt-6">
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? 'Creating Account...' : 'Create Admin Account'}
                                    </Button>
                                </div>
                            </form>
                            
                            <p className="mt-6 text-center text-sm text-gray-600">
                                Already have an admin account?{' '}
                                <Link href="/admin/login" className="font-semibold text-teal-600 hover:text-teal-500">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                        
                        <div className="mt-4 text-center">
                            <Link href="/" className="text-sm text-teal-600 hover:underline">
                                ← Back to main site
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}