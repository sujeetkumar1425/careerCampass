import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { BookOpen, Target, MapPin, Calendar, Users, Brain } from 'lucide-react';

interface LandingPageProps {
  onStartQuiz: () => void;
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  const features = [
    {
      icon: Brain,
      title: "Aptitude Assessment",
      description: "Discover your strengths and interests through comprehensive aptitude and personality assessments.",
      color: "text-blue-600"
    },
    {
      icon: Target,
      title: "Smart Recommendations",
      description: "Get AI-powered course and career suggestions tailored to your unique profile and goals.",
      color: "text-green-600"
    },
    {
      icon: MapPin,
      title: "College Finder",
      description: "Find the best government colleges near you with detailed information about courses and facilities.",
      color: "text-purple-600"
    },
    {
      icon: BookOpen,
      title: "Career Path Mapping",
      description: "Visualize your educational journey and see how different courses lead to exciting career opportunities.",
      color: "text-indigo-600"
    },
    {
      icon: Calendar,
      title: "Timeline Tracking",
      description: "Never miss important admission deadlines and scholarship opportunities with our timeline tracker.",
      color: "text-red-600"
    },
    {
      icon: Users,
      title: "For Students & Parents",
      description: "Designed to help both students and parents make informed decisions about higher education.",
      color: "text-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            CareerCompass
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Your personal guide to higher education and career success. Discover the right courses, 
            colleges, and career paths based on your interests and aptitude.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={onStartQuiz} size="lg" className="text-lg px-8 py-6">
              Start Your Journey
            </Button>
          </motion.div>
        </motion.div>

        {/* Problem Statement */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="p-8 border-2 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
              <motion.h2 
                className="text-2xl mb-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                The Challenge We're Solving
              </motion.h2>
              <motion.p 
                className="text-lg text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Many students and parents lack awareness about the importance of graduation, 
                career opportunities that different degree courses unlock, and how to choose 
                the right subject stream. This leads to declining enrollment in government colleges 
                despite their quality education and affordable fees.
              </motion.p>
            </Card>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.6 + (index * 0.1),
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.8 + (index * 0.1),
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <Icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  </motion.div>
                  <h3 className="text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <motion.h2 
            className="text-3xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            Ready to Discover Your Future?
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.6 }}
          >
            Take our comprehensive aptitude quiz and get personalized recommendations 
            for courses, colleges, and career paths that align with your interests and strengths.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={onStartQuiz} size="lg" className="text-lg px-8 py-6">
              Begin Assessment
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}