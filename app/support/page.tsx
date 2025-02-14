'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  HeadphonesIcon,
  MessageCircle,
  Mail,
  Clock,
  CheckCircle2,
  Sparkles,
  Send,
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
  };

  const supportFeatures = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: '24/7 Chat Support',
      description: 'Get instant help anytime, anywhere',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email Support',
      description: 'Detailed assistance for complex issues',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Quick Response',
      description: 'Average response time under 2 hours',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-purple-950">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1"
          >
            <Card className="relative overflow-hidden bg-black/40 border-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-50" />
              <div className="p-8 relative">
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant="outline" 
                    className="bg-purple-500/10 border-purple-500/20 text-purple-300"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Support Form
                  </Badge>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Name</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-black/60 border-purple-500/20 text-white focus:border-purple-500/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-black/60 border-purple-500/20 text-white focus:border-purple-500/50 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Subject</label>
                    <Input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-black/60 border-purple-500/20 text-white focus:border-purple-500/50 transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-black/60 border-purple-500/20 text-white focus:border-purple-500/50 transition-colors min-h-[120px]"
                      placeholder="Tell us more about your issue..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-purple-500/20">
                  <div className="flex items-start gap-4 text-sm text-gray-400">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p>
                      This is an app in development, do not expect a response! Thankyou!
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col gap-6"
          >
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden bg-black/40 border-purple-500/20 hover:border-purple-500/40 transition-all group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}