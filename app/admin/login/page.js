"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
    const baseStyles = "w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded transition-colors duration-200 flex items-center justify-center";
    const variants = {
        primary: "bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 text-white hover:opacity-90 disabled:opacity-70",
        google: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
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

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            router.push('/admin/dashboard');
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                submit: error.message || 'Login failed. Please try again.'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <section className="flex-grow relative py-12 md:py-20 bg-gradient-to-br from-teal-50 via-gray-50 to-white">
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
                    <div className="max-w-md mx-auto">
                        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-3">
                                    <Shield size={40} className="text-teal-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
                                <p className="text-gray-600">Sign in to access admin dashboard</p>
                            </div>
                            
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    error={errors.email}
                                />
                                
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    error={errors.password}
                                />
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input 
                                            id="remember-me" 
                                            name="remember-me" 
                                            type="checkbox"
                                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </Button>

                                {errors.submit && (
                                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md flex items-start">
                                        <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                                        <span>{errors.submit}</span>
                                    </div>
                                )}
                            </form>
                            
                            <p className="mt-8 text-center text-gray-600 text-sm">
                                Don't have an admin account?{' '}
                                <Link href="/admin/register" className="font-semibold text-teal-600 hover:text-teal-500">
                                    Request access
                                </Link>
                            </p>
                        </div>
                        
                        <div className="mt-8 text-center">
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