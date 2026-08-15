import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { GraduationCap, Briefcase, TrendingUp, ArrowRight, Star, Clock } from 'lucide-react';
import { UserProfile, QuizResult } from '../App';

interface CareerPathMappingProps {
  userProfile: UserProfile | null;
  quizResult: QuizResult | null;
}

interface CareerPath {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToStart: string;
  averageSalary: string;
  growthPotential: 'High' | 'Medium' | 'Low';
  steps: {
    phase: string;
    title: string;
    duration: string;
    description: string;
    requirements: string[];
  }[];
  skills: string[];
  matchPercentage: number;
}

const careerPaths: CareerPath[] = [
  {
    id: '1',
    title: 'Software Engineer',
    category: 'Technology',
    difficulty: 'Medium',
    timeToStart: '4-5 years',
    averageSalary: '₹6-15 LPA',
    growthPotential: 'High',
    matchPercentage: 95,
    skills: ['Programming', 'Problem Solving', 'Algorithms', 'System Design'],
    steps: [
      {
        phase: 'Education',
        title: 'Bachelor\'s in Computer Science',
        duration: '4 years',
        description: 'Complete B.Tech/B.E in Computer Science or related field',
        requirements: ['Class 12 with PCM', 'JEE Main/Advanced', 'State Engineering Entrance']
      },
      {
        phase: 'Skills',
        title: 'Technical Skills Development',
        duration: '1-2 years',
        description: 'Master programming languages and development frameworks',
        requirements: ['Learn 2-3 programming languages', 'Build projects', 'Practice DSA']
      },
      {
        phase: 'Experience',
        title: 'Entry Level Position',
        duration: '2-3 years',
        description: 'Start as Junior Software Developer',
        requirements: ['Technical interviews', 'Portfolio projects', 'Internship experience']
      },
      {
        phase: 'Growth',
        title: 'Senior Software Engineer',
        duration: '3-5 years',
        description: 'Lead projects and mentor junior developers',
        requirements: ['Advanced technical skills', 'Leadership experience', 'System design knowledge']
      }
    ]
  },
  {
    id: '2',
    title: 'Clinical Psychologist',
    category: 'Healthcare',
    difficulty: 'Hard',
    timeToStart: '7-8 years',
    averageSalary: '₹4-12 LPA',
    growthPotential: 'High',
    matchPercentage: 88,
    skills: ['Counseling', 'Research', 'Empathy', 'Communication'],
    steps: [
      {
        phase: 'Education',
        title: 'Bachelor\'s in Psychology',
        duration: '3 years',
        description: 'Complete B.A/B.Sc in Psychology',
        requirements: ['Class 12 in any stream', 'Psychology entrance exams', 'Good communication skills']
      },
      {
        phase: 'Advanced Education',
        title: 'Master\'s in Clinical Psychology',
        duration: '2 years',
        description: 'Specialize in clinical psychology',
        requirements: ['Bachelor\'s degree', 'Entrance exam', 'Interview']
      },
      {
        phase: 'Training',
        title: 'Clinical Internship',
        duration: '1 year',
        description: 'Gain practical experience in clinical settings',
        requirements: ['Master\'s degree', 'Supervised practice', 'Case studies']
      },
      {
        phase: 'Certification',
        title: 'Licensed Clinical Psychologist',
        duration: '1-2 years',
        description: 'Obtain license and start independent practice',
        requirements: ['RCI Registration', 'Supervised hours', 'Continuing education']
      }
    ]
  },
  {
    id: '3',
    title: 'Financial Analyst',
    category: 'Finance',
    difficulty: 'Medium',
    timeToStart: '4-5 years',
    averageSalary: '₹5-12 LPA',
    growthPotential: 'High',
    matchPercentage: 82,
    skills: ['Financial Modeling', 'Data Analysis', 'Excel', 'Market Research'],
    steps: [
      {
        phase: 'Education',
        title: 'Bachelor\'s in Commerce/Finance',
        duration: '3 years',
        description: 'Complete B.Com or BBA with finance specialization',
        requirements: ['Class 12 with Commerce/Maths', 'Good analytical skills', 'Basic computer knowledge']
      },
      {
        phase: 'Certification',
        title: 'Professional Certifications',
        duration: '1-2 years',
        description: 'Pursue CFA, FRM, or similar certifications',
        requirements: ['Bachelor\'s degree', 'Exam preparation', 'Work experience (for some certifications)']
      },
      {
        phase: 'Experience',
        title: 'Junior Financial Analyst',
        duration: '2-3 years',
        description: 'Start in entry-level analyst position',
        requirements: ['Relevant education', 'Financial modeling skills', 'Industry knowledge']
      },
      {
        phase: 'Growth',
        title: 'Senior Financial Analyst',
        duration: '3-5 years',
        description: 'Lead financial analysis and strategic planning',
        requirements: ['Advanced certifications', 'Leadership skills', 'Industry expertise']
      }
    ]
  }
];

export function CareerPathMapping({ userProfile, quizResult }: CareerPathMappingProps) {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

 /* if (!userProfile || !quizResult) {
    return <div>Loading...</div>;
  }*/

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Easy') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  const getGrowthColor = (growth: string) => {
    if (growth === 'High') return 'text-green-600';
    if (growth === 'Medium') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-4">Career Path Mapping</h1>
          <p className="text-muted-foreground mb-6">
            Visualize your journey from education to career success with detailed roadmaps.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Career Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Roadmap</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <motion.div 
              className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {careerPaths.map((path, index) => (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full"
                      onClick={() => setSelectedPath(path)}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl mb-2">{path.title}</h3>
                      <Badge variant="outline" className="mb-2">{path.category}</Badge>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{path.matchPercentage}%</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Difficulty</span>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Time to Start</span>
                      <span className="text-sm">{path.timeToStart}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Average Salary</span>
                      <span className="text-sm">{path.averageSalary}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Growth Potential</span>
                      <span className={`text-sm ${getGrowthColor(path.growthPotential)}`}>
                        {path.growthPotential}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm mb-2">Key Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {path.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {path.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">+{path.skills.length - 3}</Badge>
                      )}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" className="w-full">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Roadmap
                    </Button>
                  </motion.div>
                </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="detailed">
            {selectedPath ? (
              <div className="space-y-6">
                {/* Career Path Header */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl">{selectedPath.title} Roadmap</h2>
                    <Button onClick={() => setSelectedPath(null)} variant="outline">
                      Back to Overview
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Complete step-by-step guide to becoming a {selectedPath.title.toLowerCase()}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm text-muted-foreground">Timeline</p>
                      <p className="font-medium">{selectedPath.timeToStart}</p>
                    </div>
                    <div className="text-center">
                      <Badge className={getDifficultyColor(selectedPath.difficulty)} />
                      <p className="text-sm text-muted-foreground mt-2">Difficulty</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-green-600">{selectedPath.averageSalary}</p>
                      <p className="text-sm text-muted-foreground">Avg Salary</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className={`h-6 w-6 mx-auto mb-2 ${getGrowthColor(selectedPath.growthPotential)}`} />
                      <p className="text-sm text-muted-foreground">Growth</p>
                      <p className="font-medium">{selectedPath.growthPotential}</p>
                    </div>
                  </div>
                </Card>

                {/* Career Path Steps */}
                <div className="space-y-6">
                  {selectedPath.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                        {index < selectedPath.steps.length - 1 && (
                          <div className="w-0.5 h-16 bg-border mt-2"></div>
                        )}
                      </div>
                      
                      <Card className="flex-1 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <Badge variant="outline" className="mb-2">{step.phase}</Badge>
                            <h3 className="text-lg">{step.title}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-medium">{step.duration}</p>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        
                        <div>
                          <h4 className="text-sm mb-2">Requirements</h4>
                          <ul className="space-y-1">
                            {step.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="text-sm text-muted-foreground flex items-center">
                                <ArrowRight className="h-3 w-3 mr-2 text-blue-600" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Skills Section */}
                <Card className="p-6">
                  <h3 className="text-lg mb-4">Essential Skills to Develop</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPath.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg mb-2">Select a Career Path</h3>
                <p className="text-muted-foreground">
                  Click on a career card above to view the detailed roadmap
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
