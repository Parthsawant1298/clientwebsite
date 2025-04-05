"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Package, Shield, Truck } from 'lucide-react';

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

const FeatureCard = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-5">
        <div className="bg-teal-100 p-3 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-gray-900 font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/register', {
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
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            router.push('/Login');
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
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-5 gap-8">
                            {/* Left side - Benefits */}
                            <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200 hidden md:block">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Koncept Services</h2>
                                    <p className="text-gray-600">
                                        Create an account to access complete office supply solutions with:
                                    </p>
                                </div>
                                
                                <div className="space-y-6">
                                    <FeatureCard 
                                        icon={<Truck className="h-6 w-6 text-teal-600" />}
                                        title="Next Day Delivery"
                                        description="Get your office supplies delivered within 24 working hours across Delhi NCR and Pan India."
                                    />
                                    <FeatureCard 
                                        icon={<Shield className="h-6 w-6 text-teal-600" />}
                                        title="Quality Assurance"
                                        description="All products meet the highest quality standards sourced from renowned brands."
                                    />
                                    <FeatureCard 
                                        icon={<Package className="h-6 w-6 text-teal-600" />}
                                        title="One-Stop Solution"
                                        description="More than 90% of office requirements under one roof with competitive pricing."
                                    />
                                </div>
                                
                                <div className="mt-8 p-4 bg-teal-50 rounded-lg">
                                    <p className="text-teal-800 text-sm italic">
                                        "We've been using Koncept Services for all our office supplies for the past 2 years. Their service and quality are exceptional!"
                                    </p>
                                    <p className="text-right text-teal-600 font-semibold text-sm mt-2">
                                        — A Satisfied Customer
                                    </p>
                                </div>
                            </div>
                            
                            {/* Right side - Registration form */}
                            <div className="md:col-span-3 bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                                    <p className="text-gray-600">Get started with Koncept Services</p>
                                </div>
                                
                                <form className="space-y-4" onSubmit={handleSubmit}>
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
                                            placeholder="your.email@company.com"
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

                                    <div className="flex items-start mt-4">
                                        <input
                                            id="terms"
                                            name="terms"
                                            type="checkbox"
                                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded mt-1"
                                        />
                                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                                            I agree to the{' '}
                                            <a href="#" className="text-teal-600 hover:underline">
                                                Terms of Service
                                            </a>{' '}
                                            and{' '}
                                            <a href="#" className="text-teal-600 hover:underline">
                                                Privacy Policy
                                            </a>
                                        </label>
                                    </div>

                                    {errors.submit && (
                                        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">
                                            {errors.submit}
                                        </div>
                                    )}

                                    <div className="mt-6">
                                        <Button type="submit" disabled={isLoading}>
                                            {isLoading ? 'Creating Account...' : 'Create Account'}
                                        </Button>
                                    </div>
                                </form>
                                
                                <p className="mt-6 text-center text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link href="/Login" className="font-semibold text-teal-600 hover:text-teal-500">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
           
        </div>
    );
}