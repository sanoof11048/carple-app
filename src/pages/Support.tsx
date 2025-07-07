import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageCircle, Phone, Mail, Search, Plus, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  lastUpdate: string;
}

interface TicketForm {
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
}

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TicketForm>();

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TK001',
      subject: 'Payment not processed',
      description: 'My payment for the ride was deducted but the trip is still showing as unpaid.',
      category: 'Payment Issues',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2024-01-15',
      lastUpdate: '2024-01-16'
    },
    {
      id: 'TK002',
      subject: 'Driver verification status',
      description: 'I uploaded my documents but verification is still pending.',
      category: 'Account',
      priority: 'medium',
      status: 'open',
      createdAt: '2024-01-14',
      lastUpdate: '2024-01-14'
    },
    {
      id: 'TK003',
      subject: 'App crashes on startup',
      description: 'The mobile app crashes every time I try to open it.',
      category: 'Technical Issues',
      priority: 'high',
      status: 'resolved',
      createdAt: '2024-01-13',
      lastUpdate: '2024-01-15'
    }
  ]);

  const onSubmit = (data: TicketForm) => {
    const newTicket: SupportTicket = {
      id: `TK${String(tickets.length + 1).padStart(3, '0')}`,
      subject: data.subject,
      description: data.description,
      category: data.category,
      priority: data.priority,
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0]
    };

    setTickets([newTicket, ...tickets]);
    setShowNewTicket(false);
    reset();
    toast.success('Support ticket created successfully!');
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const faqItems = [
    {
      question: 'How do I book a driver for my car?',
      answer: 'Go to the "Book Driver" section, enter your pickup and drop-off locations, select your preferred time, and browse available drivers. You can view their profiles, ratings, and hourly rates before making your selection.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards, debit cards, PayPal, and you can also use your Carple wallet balance. All transactions are secure and encrypted.'
    },
    {
      question: 'How does the driver verification process work?',
      answer: 'All drivers undergo a comprehensive verification process including background checks, license verification, insurance validation, and vehicle inspection. This typically takes 2-3 business days.'
    },
    {
      question: 'Can I cancel a ride after booking?',
      answer: 'Yes, you can cancel a ride up to 1 hour before the scheduled time without any cancellation fee. Cancellations within 1 hour may incur a small fee.'
    },
    {
      question: 'How do I add money to my wallet?',
      answer: 'Navigate to the Wallet section in your account, click "Add Money", select your preferred payment method, and enter the amount. Funds are added instantly to your wallet.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-xl text-gray-600">We're here to help you with any questions or issues</p>
        </div>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <Phone className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Available 24/7 for urgent matters</p>
            <a href="tel:+1234567890" className="text-indigo-600 hover:text-indigo-700 font-medium">
              +1 (234) 567-8900
            </a>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Get response within 24 hours</p>
            <a href="mailto:support@carple.com" className="text-green-600 hover:text-green-700 font-medium">
              support@carple.com
            </a>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with our support team</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Start Chat
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'tickets', label: 'My Tickets' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'tickets' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tickets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNewTicket(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    <span>New Ticket</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {filteredTickets.map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                          <span className="text-sm text-gray-500">#{ticket.id}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{ticket.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>Category: {ticket.category}</span>
                          <span>Created: {ticket.createdAt}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Last update: {ticket.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                  <p className="text-gray-600">Find answers to common questions about Carple</p>
                </div>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">{item.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                  <p className="text-gray-600">Have a question? We'd love to help you out.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Office Hours</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span>10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span>Closed</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        For urgent safety concerns or emergencies during rides:
                      </p>
                      <a href="tel:+1234567890" className="text-red-600 hover:text-red-700 font-medium">
                        +1 (234) 567-8900
                      </a>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Send us a Message</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="How can we help you?"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Create Support Ticket</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  {...register('subject', { required: 'Subject is required' })}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Brief description of your issue"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="Account">Account</option>
                    <option value="Payment Issues">Payment Issues</option>
                    <option value="Technical Issues">Technical Issues</option>
                    <option value="Driver Issues">Driver Issues</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    {...register('priority', { required: 'Priority is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  {errors.priority && <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Please provide detailed information about your issue"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewTicket(false)}
                  className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;