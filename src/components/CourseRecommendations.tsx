import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BookOpen, Clock, DollarSign, TrendingUp, Search, Filter } from 'lucide-react';
import { UserProfile, QuizResult } from '../App';

interface CourseRecommendationsProps {
  userProfile: UserProfile | null;
  quizResult: QuizResult | null;
}

interface Course {
  id: string;
  name: string;
  stream: string;
  duration: string;
  averageFees: string;
  careerProspects: string[];
  description: string;
  matchPercentage: number;
  eligibility: string;
  topColleges: string[];
}

const allCourses: Course[] = [
  {
    id: '1',
    name: 'Computer Science Engineering',
    stream: 'Engineering',
    duration: '4 years',
    averageFees: '₹2-8 Lakhs',
    careerProspects: ['Software Developer', 'Data Scientist', 'System Analyst', 'AI Engineer'],
    description: 'Study of computational systems, algorithms, and software design.',
    matchPercentage: 95,
    eligibility: 'Class 12 with PCM, JEE Main/Advanced',
    topColleges: ['IIT Delhi', 'NIT Trichy', 'IIIT Hyderabad']
  },
  {
    id: '2',
    name: 'Bachelor of Arts (Psychology)',
    stream: 'Arts',
    duration: '3 years',
    averageFees: '₹1-3 Lakhs',
    careerProspects: ['Clinical Psychologist', 'Counselor', 'HR Specialist', 'Research Analyst'],
    description: 'Study of human behavior, mental processes, and psychological theories.',
    matchPercentage: 88,
    eligibility: 'Class 12 in any stream',
    topColleges: ['Delhi University', 'JNU', 'BHU']
  },
  {
    id: '3',
    name: 'Bachelor of Commerce',
    stream: 'Commerce',
    duration: '3 years',
    averageFees: '₹1-4 Lakhs',
    careerProspects: ['Chartered Accountant', 'Financial Analyst', 'Investment Banker', 'Auditor'],
    description: 'Comprehensive study of commerce, accounting, and business principles.',
    matchPercentage: 82,
    eligibility: 'Class 12 with Commerce/Mathematics',
    topColleges: ['SRCC Delhi', 'LSR Delhi', 'Christ University']
  },
  {
    id: '4',
    name: 'Bachelor of Science (Mathematics)',
    stream: 'Science',
    duration: '3 years',
    averageFees: '₹1-3 Lakhs',
    careerProspects: ['Data Analyst', 'Statistician', 'Research Scientist', 'Actuary'],
    description: 'Advanced study of mathematical concepts and their applications.',
    matchPercentage: 90,
    eligibility: 'Class 12 with PCM',
    topColleges: ['St. Stephens', 'Hindu College', 'Presidency College']
  },
  {
    id: '5',
    name: 'Bachelor of Fine Arts',
    stream: 'Arts',
    duration: '4 years',
    averageFees: '₹2-5 Lakhs',
    careerProspects: ['Graphic Designer', 'Art Director', 'Illustrator', 'Art Teacher'],
    description: 'Creative exploration of visual arts, design, and artistic expression.',
    matchPercentage: 85,
    eligibility: 'Class 12 in any stream + Portfolio',
    topColleges: ['JJ School of Art', 'BHU', 'Jamia Millia']
  },
  {
    id: '6',
    name: 'Agricultural Engineering',
    stream: 'Engineering',
    duration: '4 years',
    averageFees: '₹2-6 Lakhs',
    careerProspects: ['Agricultural Engineer', 'Farm Manager', 'Food Technologist', 'Rural Developer'],
    description: 'Application of engineering principles to agricultural production and processing.',
    matchPercentage: 78,
    eligibility: 'Class 12 with PCM/PCB',
    topColleges: ['IARI Delhi', 'ANGRAU', 'PAU']
  }
];

export function CourseRecommendations({ userProfile, quizResult }: CourseRecommendationsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('match');

  /*if (!userProfile || !quizResult) {
    return <div></div>;
  }*/

  // Filter and sort courses based on user preferences
  let filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStream = selectedStream === 'all' || course.stream.toLowerCase() === selectedStream.toLowerCase();
    return matchesSearch && matchesStream;
  });

  // Sort courses
  filteredCourses.sort((a, b) => {
    if (sortBy === 'match') return b.matchPercentage - a.matchPercentage;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    return 0;
  });

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-4">Course Recommendations</h1>
          <p className="text-muted-foreground mb-6">
            Personalized course suggestions based on your aptitude profile and interests.
          </p>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Select value={selectedStream} onValueChange={setSelectedStream}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by stream" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Streams</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Course Cards */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * index,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
            <Card className="p-6 hover:shadow-lg transition-shadow h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl mb-2">{course.name}</h3>
                  <Badge variant="outline" className="mb-2">{course.stream}</Badge>
                </div>
                <Badge className={getMatchColor(course.matchPercentage)}>
                  {course.matchPercentage}% Match
                </Badge>
              </div>

              <p className="text-muted-foreground mb-4">{course.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">{course.averageFees}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Career Opportunities
                </h4>
                <div className="flex flex-wrap gap-1">
                  {course.careerProspects.slice(0, 3).map((career, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {career}
                    </Badge>
                  ))}
                  {course.careerProspects.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{course.careerProspects.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm mb-2">Eligibility</h4>
                <p className="text-sm text-muted-foreground">{course.eligibility}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm mb-2">Top Government Colleges</h4>
                <div className="flex flex-wrap gap-1">
                  {course.topColleges.map((college, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {college}
                    </Badge>
                  ))}
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Details & Apply
                </Button>
              </motion.div>
            </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
