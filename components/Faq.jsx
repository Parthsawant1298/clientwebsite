"use client";
import { ChevronDown, ChevronUp, Mail, MessageSquare, Phone, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function HelpAndSupport() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'ordering', name: 'Ordering Process' },
    { id: 'delivery', name: 'Delivery' },
    { id: 'products', name: 'Our Products' },
    { id: 'payments', name: 'Payments & Billing' }
  ];

  const faqs = [
    {
      category: 'ordering',
      question: "How does your online ordering process work?",
      answer: "Our ordering process is simple and efficient. You can place your order by logging in to our e-commerce website konceptservices.in, which is specially designed for institutional and corporate clients. Browse through our product categories, select the items you need, add them to your cart, and proceed to checkout. Each client is assigned a dedicated relationship manager who will confirm your order and keep you updated throughout the process."
    },
    {
      category: 'delivery',
      question: "What is your delivery timeframe?",
      answer: "At Koncept Services, we pride ourselves on our next-day delivery service. Our team is always ready to fulfill your requirements within 24 working hours across Delhi NCR and Pan India. For bulk orders or specialized products, delivery times may vary slightly, but your dedicated relationship manager will provide you with accurate delivery estimates for each order."
    },
    {
      category: 'products',
      question: "What product categories do you offer?",
      answer: "We supply more than 90% of office requirements under one roof. Our product verticals include: Housekeeping materials (Broom, Phenyl, Hand wash, Floor duster and others), Office stationeries (Pen, Pencil, Diary, File, Folder, Envelop/Marker and others), Pantry/Grocery Materials (Tea, Coffee, Sugar, Dairy whitener and others), IT Accessories (Mouse, Keyboard, Hard disk, Pen drive and others), Packaging materials (Brown Tape, Strip Roll, Shrink Roll and others), and COVID Safety Items (Sanitizer, Disinfectant, Gloves, Mask, Hypochlorite, etc)."
    },
    {
      category: 'payments',
      question: "What are your payment terms and options?",
      answer: "We offer flexible payment options for our corporate clients. You can pay via bank transfer, cheque, or online payment methods. For regular clients, we also offer credit terms with payment cycles of 15-30 days depending on the agreement. Our competitive and reasonable pricing is possible because we procure our products directly from manufacturers, allowing us to offer you industry-best rates tailored to your requirements."
    },
    {
      category: 'ordering',
      question: "Do you have minimum order requirements?",
      answer: "We cater to businesses of all sizes and have flexible ordering policies. While there is no strict minimum order value, we recommend consolidating your orders to optimize delivery efficiency. For regular corporate clients, we can also set up scheduled deliveries based on your consumption patterns, ensuring you never run out of essential supplies while maintaining optimal inventory levels."
    },
    {
      category: 'delivery',
      question: "Do you deliver outside Delhi/NCR?",
      answer: "Yes! While we are based in Delhi/NCR, we provide our services Pan India. We have an extensive logistics network that allows us to deliver your office supplies across the country. Delivery timelines for locations outside Delhi/NCR may vary, but we strive to provide the fastest possible service regardless of your location. Your relationship manager will provide specific delivery timelines based on your location."
    },
    {
      category: 'products',
      question: "Which brands do you partner with?",
      answer: "We are proud distributors and partners of many renowned brands such as Sarya Mystair Hygiene Pvt Ltd for tissue papers and hygiene products, Roots Multiichem Pvt Ltd for cleaning machines and tools, Divesey India Pvt Ltd for cleaning chemicals, Hindustan Unilever for housekeeping items like Domex and Lifebuoy, Kent for household items, and Borosil for office utensils. We carefully select premium brands to ensure you receive only the highest quality products."
    },
    {
      category: 'payments',
      question: "Do you offer any discounts for bulk orders?",
      answer: "Yes, we offer competitive volume-based discounts for bulk orders. Since we procure directly from manufacturers, we can provide attractive price points for larger quantities. Additionally, for long-term clients with regular ordering patterns, we offer special pricing structures. Please consult with your relationship manager who can provide tailored quotations based on your specific requirements and ordering volume."
    },
    {
      category: 'products',
      question: "What COVID safety items do you supply?",
      answer: "In response to the pandemic, we have added a comprehensive range of COVID safety items to our product verticals. These include sanitizers, disinfectants, face masks, gloves, face shields, PPE kits, hypochlorite solutions, sanitizing stations, UV sterilizers, and temperature screening devices. We ensure all our COVID safety products meet the required quality standards to provide effective protection for your workplace."
    },
    {
      category: 'delivery',
      question: "How do you ensure timely delivery of urgent orders?",
      answer: "For urgent requirements, we have a dedicated expedited delivery process. Simply mark your order as 'Urgent' or communicate with your relationship manager about the priority level. Our logistics team will prioritize your order in the delivery queue. For critical supplies, we can arrange same-day delivery within Delhi/NCR, subject to order confirmation before noon. Additional delivery charges may apply for urgent deliveries outside standard service hours."
    },
    {
      category: 'products',
      question: "Can you supply customized or branded office supplies?",
      answer: "Yes, we offer customization services for various office supplies including stationery, promotional items, and corporate gifts. We can incorporate your company logo, corporate colors, and custom messaging on items such as pens, notebooks, calendars, mugs, and more. For customized orders, we require a minimum quantity and advance notice to allow for production and quality checks. Your relationship manager can provide details on lead times and pricing for customized items."
    },
    {
      category: 'ordering',
      question: "How can I track my orders?",
      answer: "Once your order is confirmed and dispatched, you'll receive a confirmation email with tracking information. You can also log in to your account on konceptservices.in to view real-time order status. Additionally, your dedicated relationship manager provides regular updates throughout the fulfillment process. For large or multi-part orders, we offer detailed tracking for each component of your shipment to ensure transparency and peace of mind."
    },
    {
      category: 'payments',
      question: "Do you provide detailed invoices for accounting purposes?",
      answer: "Yes, we provide comprehensive invoices that include itemized listings of all products, applicable taxes, delivery charges, and any discounts applied. Our invoices comply with all GST requirements and include our GST identification number. For corporate clients with specific accounting needs, we can customize invoice formats and provide consolidated billing for multiple orders. Electronic invoices are sent immediately upon order confirmation, with physical copies included with the delivery."
    },
    {
      category: 'delivery',
      question: "What is your policy for damaged or incorrect items?",
      answer: "Customer satisfaction is our priority. If you receive damaged or incorrect items, please notify us within 48 hours of delivery. Your relationship manager will arrange for the items to be replaced with the next delivery or immediately, depending on urgency. We handle all return logistics at no additional cost to you. Our quality assurance team thoroughly investigates each issue to prevent recurrence and continuously improve our services."
    },
    {
      category: 'products',
      question: "Can you help with office setup for new locations?",
      answer: "Absolutely! We specialize in providing comprehensive office setup solutions for new locations. Our team can help create a tailored inventory list based on your office size, employee count, and specific requirements. We coordinate deliveries to align with your setup timeline and can provide bulk discounts for complete office setups. Our relationship managers work closely with your administration team to ensure all essential supplies are available from day one of operations."
    }
  ];

  useEffect(() => {
    const filtered = faqs.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredFaqs(filtered);
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[35rem] overflow-hidden bg-gradient-to-r from-teal-50 to-teal-100">
        <div className="container mx-auto px-4 relative z-20 h-full">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black text-center mb-2 md:mb-4">
              HELP AND 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700"> SUPPORT</span>
            </h1>
          </div>
        </div>
      </section>

    

      {/* Search Section */}
      <section className="relative py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions about Koncept Services..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700"> Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Koncept Services and how we support your business
            </p>
          </div>

          <div className="grid gap-8 max-w-3xl mx-auto">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-teal-400/30 shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-6 w-6 text-teal-400" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-teal-400" />
                  )}
                </button>
                <div
                  className={`px-6 transition-all duration-300 ${
                    openIndex === index ? 'pb-6 opacity-100' : 'h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Need More
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700"> Information?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our team is here to help your business thrive
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:border-teal-400/30 transition-all shadow-sm">
              <Mail className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600">support@konceptservices.in</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:border-teal-400/30 transition-all shadow-sm">
              <MessageSquare className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat Support</h3>
              <p className="text-gray-600">Available during business hours</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:border-teal-400/30 transition-all shadow-sm">
              <Phone className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Request a Call</h3>
              <p className="text-gray-600">Speak with your relationship manager</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}