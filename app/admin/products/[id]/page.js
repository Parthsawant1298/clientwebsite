"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Star,
  ShoppingCart,
  Share,
  ChevronLeft,
  ChevronRight,
  User,
  Heart,
  Check,
  Truck,
  Shield,
  RefreshCw,
  Info,
  Bookmark,
  MessageCircle,
  Edit,
  ArrowLeft
} from "lucide-react"
import { use } from "react"

export default function AdminProductDetailPage({ params }) {
  const router = useRouter()
  // Use React.use() to unwrap params
  const unwrappedParams = use(params)
  const { id } = unwrappedParams

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [reviews, setReviews] = useState([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(true)
  const [reviewsError, setReviewsError] = useState("")
  const [activeTab, setActiveTab] = useState("reviews")
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}/available`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch product")
        }

        setProduct(data.product)
        setIsLoading(false)
      } catch (error) {
        console.error("Fetch product error:", error)
        setError("Failed to load product. Please try again.")
        setIsLoading(false)
      }
    }

    const fetchReviews = async () => {
      try {
        setIsLoadingReviews(true)
        const response = await fetch(`/api/products/${id}/reviews`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch reviews")
        }

        setReviews(data.reviews)
      } catch (error) {
        console.error("Fetch reviews error:", error)
        setReviewsError("Failed to load reviews. Please try again.")
      } finally {
        setIsLoadingReviews(false)
      }
    }

    if (id) {
      fetchProduct()
      fetchReviews()
    }
  }, [id])

  // Toast notification
  const showToast = (message, type = "info") => {
    const toast = document.createElement("div")
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 animate-fade-in-up ${
      type === "success" ? "bg-teal-600" : type === "error" ? "bg-red-600" : "bg-blue-600"
    }`
    toast.textContent = message
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.classList.add("animate-fade-out")
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 3000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out this ${product.name}!`,
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      prompt("Copy this link to share:", window.location.href)
    }
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleImageZoom = (e) => {
    if (!imageRef.current) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomPosition({ x, y })
  }

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 via-gray-50 to-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
          <p className="text-teal-700 animate-pulse">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 via-gray-50 to-white">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <Info size={48} className="mx-auto text-red-500 mb-4" />
          <p className="text-red-500 text-lg font-semibold mb-4">{error || "Product not found"}</p>
          <p className="text-gray-600 mb-6">We couldn&apos;t load the products. Please try again later.</p>
          <button
            onClick={() => router.push("/admin/products")}
            className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors shadow-md"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Admin Actions Bar */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => router.push("/admin/products")}
              className="text-gray-600 hover:text-gray-800 mr-4 flex items-center"
            >
              <ArrowLeft size={18} className="mr-1" />
              <span>Back to Products</span>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Viewing Product</h1>
          </div>
          <div className="flex items-center">
            <button 
              onClick={() => router.push(`/admin/products/${id}/edit`)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md shadow-sm flex items-center"
            >
              <Edit size={18} className="mr-2" />
              Edit Product
            </button>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/admin/products" className="hover:text-teal-600 transition-colors">
              Admin
            </Link>
            <span className="mx-2">/</span>
            <Link href="/admin/products" className="hover:text-teal-600 transition-colors">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium truncate">{product.name}</span>
          </div>
        </div>

        {/* Product Overview */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            {/* Left: Product Images */}
            <div className="md:w-1/2 bg-white border-r border-gray-100">
              <div className="relative h-80 md:h-[500px] bg-gray-50 flex items-center justify-center overflow-hidden">
                {/* Main image with zoom effect */}
                <div
                  className="relative w-full h-full flex items-center justify-center cursor-zoom-in"
                  onMouseMove={handleImageZoom}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  ref={imageRef}
                >
                  <Image
                    src={product.images[selectedImage].url || "/placeholder.svg"}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="max-h-full max-w-full object-contain transition-transform duration-200"
                  />

                  {isZoomed && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <Image
                        src={product.images[selectedImage].url || "/placeholder.svg"}
                        alt={product.name}
                        width={1000}
                        height={1000}
                        className="absolute w-[200%] h-[200%] max-w-none object-contain"
                        style={{
                          transform: `translate(-${zoomPosition.x * 50}%, -${zoomPosition.y * 50}%)`,
                          transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Image navigation arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Discount badge */}
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail images */}
              {product.images.length > 1 && (
                <div className="flex overflow-x-auto p-4 space-x-3 bg-white">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`w-20 h-20 flex-shrink-0 border-2 rounded-md cursor-pointer overflow-hidden ${
                        index === selectedImage
                          ? "border-teal-500 shadow-md"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
              <div className="mb-2 flex items-center">
                <span className="text-sm font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {product.brand && (
                  <span className="ml-2 text-sm text-gray-500">
                    By <span className="font-medium">{product.brand}</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.ratings || 0) ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">{product.ratings?.toFixed(1) || "0.0"}</span>
                <span className="mx-2 text-gray-300">|</span>
                <button onClick={() => setActiveTab("reviews")} className="text-sm text-teal-600 hover:underline">
                  {product.numReviews || 0} {product.numReviews === 1 ? "review" : "reviews"}
                </button>
              </div>

              <div className="flex items-end mb-6">
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="ml-3 flex flex-col">
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      Save ₹{(product.originalPrice - product.price).toLocaleString()} (
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%)
                    </span>
                  </div>
                )}
              </div>

              {/* Short description */}
              <div className="mb-6">
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Availability */}
              <div className="mb-6 flex items-center">
                {product.availableQuantity > 0 ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-600 font-medium">In Stock</span>
                    <span className="text-gray-500 ml-2">({product.availableQuantity} available)</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3 mb-6">
                <button
                  onClick={() => router.push(`/admin/products/${id}/edit`)}
                  className="flex-1 py-3 px-6 rounded-md flex items-center justify-center bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-md"
                >
                  <Edit size={18} className="mr-2" />
                  Edit Product
                </button>

                <button
                  onClick={handleShare}
                  className="py-3 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors shadow-sm"
                >
                  <Share size={18} />
                </button>
              </div>

              {/* Admin info panel */}
              <div className="mt-2 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-blue-800 font-medium mb-2 flex items-center">
                  <Info size={18} className="mr-2" />
                  Admin Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product ID:</span>
                    <span className="font-mono">{product._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created At:</span>
                    <span>{new Date(product.createdAt).toLocaleString()}</span>
                  </div>
                  {product.updatedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span>{new Date(product.updatedAt).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created By:</span>
                    <span>{product.createdBy?.name || "Unknown"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === "reviews"
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews ({product.numReviews || 0})
              </button>
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === "description"
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
              {product.features && product.features.length > 0 && (
                <button
                  onClick={() => setActiveTab("features")}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "features"
                      ? "text-teal-600 border-b-2 border-teal-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Features
                </button>
              )}
              {product.specifications && (
                <button
                  onClick={() => setActiveTab("specifications")}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "specifications"
                      ? "text-teal-600 border-b-2 border-teal-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Specifications
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                {/* Review Summary */}
                <div className="mb-8 bg-gray-50 p-6 rounded-lg">
                  <div className="md:flex items-start">
                    <div className="md:w-1/3 mb-6 md:mb-0">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 mb-2">
                          {product.ratings?.toFixed(1) || "0.0"}
                        </div>
                        <div className="flex justify-center text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              fill={i < Math.floor(product.ratings || 0) ? "currentColor" : "none"}
                              stroke="currentColor"
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">Based on {product.numReviews || 0} reviews</div>
                      </div>
                    </div>

                    <div className="md:w-2/3 md:pl-8 md:border-l border-gray-200">
                      <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = reviews.filter((review) => review.rating === star).length
                        const percentage = product.numReviews ? Math.round((count / product.numReviews) * 100) : 0

                        return (
                          <div key={star} className="flex items-center mb-2">
                            <div className="flex items-center w-16">
                              <span className="text-sm font-medium mr-2">{star}</span>
                              <Star size={14} className="text-yellow-400" fill="currentColor" />
                            </div>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="w-16 text-right text-sm text-gray-500">{percentage}%</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MessageCircle size={18} className="mr-2 text-teal-600" />
                    {reviews.length === 0 ? "No Reviews Yet" : `Customer Reviews (${reviews.length})`}
                  </h3>

                  {isLoadingReviews ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
                    </div>
                  ) : reviewsError ? (
                    <div className="p-4 bg-red-50 text-red-700 text-sm rounded-md">{reviewsError}</div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <Bookmark size={32} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500 mb-4">No reviews yet</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mr-3">
                              {review.user.profilePicture ? (
                                <Image
                                  src={review.user.profilePicture || "/placeholder.svg"}
                                  alt={review.user.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <User size={20} className="text-gray-500" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{review.user.name}</p>
                              <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
                            </div>

                            {review.verifiedPurchase && (
                              <div className="ml-auto bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                                <Check size={12} className="mr-1" />
                                Verified Purchase
                              </div>
                            )}
                          </div>

                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className="text-yellow-400"
                                fill={i < review.rating ? "currentColor" : "none"}
                              />
                            ))}
                          </div>

                          <p className="text-gray-700 whitespace-pre-line">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description Tab */}
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === "features" && product.features && (
              <div>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={18} className="text-teal-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && product.specifications && (
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                          {key}
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
        
        .animate-fade-out {
          animation: fade-out 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}