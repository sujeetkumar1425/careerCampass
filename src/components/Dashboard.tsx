import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { BookOpen, MapPin, Calendar, TrendingUp, User, Target, BrainCircuit, ArrowRight } from 'lucide-react';
import { UserProfile, QuizResult, User as UserType } from '../App';

interface DashboardProps {
  userProfile: UserProfile | null;
  quizResult: QuizResult | null;
  onNavigate: (page: 'courses' | 'career-path' | 'colleges' | 'timeline' | 'quiz' | 'profile-form') => void;
}

export function Dashboard({ userProfile, quizResult, onNavigate }: DashboardProps) {
  // If no quiz results, show welcome screen with assessment prompt
  if (!quizResult) {
    const welcomeName = userProfile?.name || 'to CareerCompass!';
    return (
      <div className="min-h-screen bg-background">
        {/* Welcome Header */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto">
            <motion.h1 
              className="text-3xl mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Welcome{userProfile?.name ? `, ${userProfile.name}` : ' to CareerCompass'}!
            </motion.h1>
            <motion.p 
              className="text-blue-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {userProfile?.name 
                ? "Thanks for completing your profile! Now let's discover your career path with our aptitude assessment."
                : "Your journey to discovering the perfect career path starts here"
              }
            </motion.p>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-8">
          {/* Incomplete Profile Notice */}
          {userProfile?.isProfileIncomplete && (
            <motion.div 
              className="max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="p-6 border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <User className="h-6 w-6 text-orange-600" />
                    <div>
                      <h3 className="text-lg text-orange-800 dark:text-orange-200">Complete Your Profile</h3>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        Get personalized recommendations by completing your detailed profile
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => onNavigate('profile-form')}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Complete Profile
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Profile Summary */}
          {userProfile && !userProfile.isProfileIncomplete && (
            <motion.div 
              className="max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="text-lg mb-4">Your Profile Summary</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  {userProfile.collegeName && (
                    <div>
                      <span className="text-muted-foreground">College:</span>
                      <p className="font-medium">{userProfile.collegeName}</p>
                    </div>
                  )}
                  {userProfile.degreeType && (
                    <div>
                      <span className="text-muted-foreground">Degree:</span>
                      <p className="font-medium">{userProfile.degreeType}</p>
                    </div>
                  )}
                  {userProfile.intendedCareerDomain && (
                    <div>
                      <span className="text-muted-foreground">Career Domain:</span>
                      <p className="font-medium">{userProfile.intendedCareerDomain}</p>
                    </div>
                  )}
                  {userProfile.expectedGraduationYear && (
                    <div>
                      <span className="text-muted-foreground">Expected Graduation:</span>
                      <p className="font-medium">{userProfile.expectedGraduationYear}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Assessment CTA */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="p-8 text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <BrainCircuit className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl mb-4">Begin Your Aptitude Assessment</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Take our quick 6-question assessment to discover your strengths and get personalized 
                  course recommendations tailored to your unique aptitudes and interests.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" onClick={() => onNavigate('quiz')} className="px-8">
                    Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Feature Preview */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: userProfile ? 1.2 : 1.0 }}
          >
            {[
              { 
                icon: BookOpen, 
                title: "Course Recommendations", 
                description: "Get personalized course suggestions based on your aptitude",
                color: "text-blue-600" 
              },
              { 
                icon: TrendingUp, 
                title: "Career Path Mapping", 
                description: "Visualize your journey from education to career goals",
                color: "text-green-600" 
              },
              { 
                icon: MapPin, 
                title: "College Finder", 
                description: "Locate government colleges and programs near you",
                color: "text-purple-600" 
              },
              { 
                icon: Calendar, 
                title: "Timeline Tracker", 
                description: "Never miss important admission deadlines",
                color: "text-red-600" 
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (userProfile ? 1.4 : 1.2) + (index * 0.1) }}
                >
                  <Card className="p-6 h-full">
                    <Icon className={`h-8 w-8 ${feature.color} mb-4`} />
                    <h3 className="mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: userProfile ? 1.8 : 1.6 }}
          >
            <p className="text-sm text-muted-foreground">
              Take the assessment to unlock all features and get your personalized dashboard
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  const topStrength = Object.entries(quizResult.scores)
    .sort(([,a], [,b]) => b - a)[0];

  const getStrengthName = (key: string) => {
    const names = {
      analytical: 'Analytical Thinking',
      creative: 'Creative Expression',
      technical: 'Technical Skills',
      social: 'Social Impact',
      practical: 'Practical Skills'
    };
    return names[key as keyof typeof names];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.h1 
            className="text-3xl mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome, {userProfile.name}!
          </motion.h1>
          <motion.p 
            className="text-blue-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Your personalized education and career guidance dashboard
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { icon: Target, title: "Top Strength", value: getStrengthName(topStrength[0]), subtitle: `${topStrength[1]}% match`, color: "text-blue-600" },
            { icon: BookOpen, title: "Recommended Courses", value: quizResult.recommendations.length.toString(), subtitle: "Tailored for you", color: "text-green-600" },
            { icon: User, title: "Profile", value: `Class ${userProfile.class}`, subtitle: userProfile.location, color: "text-purple-600" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-6">
                  <div className="flex items-center mb-4">
                    <Icon className={`h-8 w-8 ${stat.color} mr-3`} />
                    <h3 className="text-lg">{stat.title}</h3>
                  </div>
                  <p className="text-2xl mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.subtitle}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Aptitude Scores */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl mb-6">Your Aptitude Profile</h2>
          <div className="space-y-4">
            {Object.entries(quizResult.scores).map(([key, score]) => (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <span className="capitalize">{getStrengthName(key)}</span>
                  <span>{score}%</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('courses')}>
            <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg mb-2">Course Recommendations</h3>
            <p className="text-muted-foreground text-sm">Discover courses that match your aptitude and interests</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('career-path')}>
            <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-lg mb-2">Career Paths</h3>
            <p className="text-muted-foreground text-sm">Visualize your journey from education to career</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('colleges')}>
            <MapPin className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-lg mb-2">Find Colleges</h3>
            <p className="text-muted-foreground text-sm">Locate government colleges near you</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('timeline')}>
            <Calendar className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-lg mb-2">Timeline Tracker</h3>
            <p className="text-muted-foreground text-sm">Track admission deadlines and important dates</p>
          </Card>
        </div>

        {/* Top Recommendations Preview */}
        <Card className="p-6">
          <h2 className="text-xl mb-4">Your Top Course Recommendations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quizResult.recommendations.map((course, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">{course}</h4>
                <p className="text-sm text-muted-foreground">
                  Based on your {getStrengthName(topStrength[0]).toLowerCase()} strength
                </p>
              </div>
            ))}
          </div>
          <Button onClick={() => onNavigate('courses')} className="mt-6">
            View All Recommendations
          </Button>
        </Card>
      </div>
    </div>
  );
}