import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Search, Star, Users, BookOpen, Phone, Globe, Filter } from 'lucide-react';
import { UserProfile, QuizResult } from '../App';

interface CollegeFinderProps {
  userProfile: UserProfile | null;
  quizResult: QuizResult | null;
}

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: 'Central' | 'State' | 'Deemed';
  rating: number;
  establishedYear: number;
  courses: string[];
  fees: string;
  admissionProcess: string;
  placement: {
    averagePackage: string;
    topRecruiters: string[];
  };
  facilities: string[];
  distance: string;
  contact: {
    phone: string;
    website: string;
  };
  admissionDeadline: string;
}

const colleges: College[] = [
  {
    id: '1',
    name: 'University of Jammu',
    location: 'Jammu, Jammu & Kashmir',
    state: 'Jammu & Kashmir',
    type: 'State',
    rating: 4.2,
    establishedYear: 1969,
    courses: ['Arts', 'Science', 'Commerce', 'Engineering', 'Management', 'Law', 'Education', 'Medicine'],
    fees: '₹25,000-50,000/year',
    admissionProcess: 'Merit Based/Entrance Test',
    placement: {
      averagePackage: '₹4-6 LPA',
      topRecruiters: ['TCS', 'Infosys', 'Wipro', 'J&K Bank', 'State Government']
    },
    facilities: ['Central Library', 'Hostels', 'Computer Labs', 'Sports Complex', 'Medical Center', 'Wi-Fi Campus'],
    distance: '5 km from Jammu city center',
    contact: {
      phone: '+91-191-2454531',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'July 31, 2024'
  },
  {
    id: '2',
    name: 'Government Medical College Jammu',
    location: 'Jammu, Jammu & Kashmir',
    state: 'Jammu & Kashmir',
    type: 'State',
    rating: 4.3,
    establishedYear: 1973,
    courses: ['MBBS', 'MD', 'MS', 'Diploma Courses', 'Nursing', 'Paramedical'],
    fees: '₹1.5-2 Lakhs/year',
    admissionProcess: 'NEET',
    placement: {
      averagePackage: '₹8-12 LPA',
      topRecruiters: ['Government Hospitals', 'Private Hospitals', 'AIIMS', 'PGIMER']
    },
    facilities: ['Modern Hospital', 'Research Labs', 'Library', 'Hostels', 'Ambulance Service', 'Medical Equipment'],
    distance: '3 km from Jammu Railway Station',
    contact: {
      phone: '+91-191-2520982',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'August 15, 2024'
  },
  {
    id: '3',
    name: 'Government College for Women, Parade Jammu',
    location: 'Jammu, Jammu & Kashmir',
    state: 'Jammu & Kashmir',
    type: 'State',
    rating: 4.0,
    establishedYear: 1955,
    courses: ['Arts', 'Science', 'Commerce', 'Computer Applications', 'Home Science'],
    fees: '₹8,000-15,000/year',
    admissionProcess: 'Merit Based',
    placement: {
      averagePackage: '₹3-5 LPA',
      topRecruiters: ['Teaching Sector', 'Banking', 'IT Companies', 'Government Jobs']
    },
    facilities: ['Library', 'Computer Lab', 'Science Labs', 'Auditorium', 'Canteen', 'Sports Ground'],
    distance: '2 km from Jammu city center',
    contact: {
      phone: '+91-191-2544876',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'July 15, 2024'
  },
  {
    id: '4',
    name: 'Government College Jammu',
    location: 'Jammu, Jammu & Kashmir',
    state: 'Jammu & Kashmir',
    type: 'State',
    rating: 4.1,
    establishedYear: 1943,
    courses: ['Arts', 'Science', 'Commerce', 'Mathematics', 'Physics', 'Chemistry', 'History', 'Political Science'],
    fees: '₹10,000-18,000/year',
    admissionProcess: 'Merit Based',
    placement: {
      averagePackage: '₹3-6 LPA',
      topRecruiters: ['Government Sector', 'Banking', 'Insurance', 'Teaching']
    },
    facilities: ['Central Library', 'Computer Center', 'Science Labs', 'Playground', 'Canteen', 'Seminar Halls'],
    distance: '1.5 km from Jammu Bus Stand',
    contact: {
      phone: '+91-191-2547890',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'July 20, 2024'
  },
  {
    id: '5',
    name: 'Government Polytechnic College Jammu',
    location: 'Jammu, Jammu & Kashmir',
    state: 'Jammu & Kashmir',
    type: 'State',
    rating: 3.9,
    establishedYear: 1963,
    courses: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Electronics', 'Computer Science'],
    fees: '₹20,000-35,000/year',
    admissionProcess: 'JET (Joint Entrance Test)',
    placement: {
      averagePackage: '₹3-5 LPA',
      topRecruiters: ['NHPC', 'JKPDC', 'Construction Companies', 'IT Firms']
    },
    facilities: ['Workshops', 'Labs', 'Library', 'Hostels', 'Placement Cell', 'Industrial Training'],
    distance: '8 km from Jammu Airport',
    contact: {
      phone: '+91-191-2432567',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'August 10, 2024'
  },
  {
    id: '6',
    name: 'Govt. MAM College Jammu',
    location: 'Jammu, Jammu & Kashmir',
    state: 'Jammu & Kashmir',
    type: 'State',
    rating: 4.0,
    establishedYear: 1969,
    courses: ['Arts', 'Science', 'Commerce', 'BBA', 'BCA', 'Social Work'],
    fees: '₹12,000-20,000/year',
    admissionProcess: 'Merit Based',
    placement: {
      averagePackage: '₹3-5 LPA',
      topRecruiters: ['Banks', 'Government Sector', 'NGOs', 'Private Companies']
    },
    facilities: ['Library', 'Computer Lab', 'Sports Facilities', 'Canteen', 'Auditorium', 'NCC/NSS'],
    distance: '4 km from Jammu city center',
    contact: {
      phone: '+91-191-2459876',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'July 25, 2024'
  },
  {
    id: '7',
    name: 'SKUAST Jammu (Sher-e-Kashmir University)',
    location: 'Chatha, Jammu & Kashmir',
    state: 'Jammu & Kashmir',
    type: 'State',
    rating: 4.2,
    establishedYear: 1999,
    courses: ['Agriculture', 'Horticulture', 'Animal Husbandry', 'Food Technology', 'Forestry'],
    fees: '₹30,000-50,000/year',
    admissionProcess: 'JEE Main/State Entrance',
    placement: {
      averagePackage: '₹4-7 LPA',
      topRecruiters: ['Agricultural Departments', 'Food Processing Industries', 'Research Institutes']
    },
    facilities: ['Research Farms', 'Modern Labs', 'Library', 'Hostels', 'Veterinary Hospital', 'Greenhouse'],
    distance: '25 km from Jammu',
    contact: {
      phone: '+91-191-2262813',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'August 5, 2024'
  },
  {
    id: '8',
    name: 'Government Degree College Kathua',
    location: 'Kathua, Jammu & Kashmir',
    state: 'Jammu & Kashmir',
    type: 'State',
    rating: 3.8,
    establishedYear: 1961,
    courses: ['Arts', 'Science', 'Commerce', 'Computer Applications'],
    fees: '₹8,000-15,000/year',
    admissionProcess: 'Merit Based',
    placement: {
      averagePackage: '₹2.5-4 LPA',
      topRecruiters: ['Government Jobs', 'Banking', 'Local Industries']
    },
    facilities: ['Library', 'Computer Lab', 'Science Lab', 'Sports Ground', 'Canteen'],
    distance: '90 km from Jammu',
    contact: {
      phone: '+91-191-2272345',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'July 30, 2024'
  },
  {
    id: '9',
    name: 'Government Degree College Udhampur',
    location: 'Udhampur, Jammu & Kashmir',
    state: 'Jammu & Kashmir',
    type: 'State',
    rating: 3.9,
    establishedYear: 1965,
    courses: ['Arts', 'Science', 'Commerce', 'English', 'Mathematics', 'History'],
    fees: '₹9,000-16,000/year',
    admissionProcess: 'Merit Based',
    placement: {
      averagePackage: '₹3-5 LPA',
      topRecruiters: ['Education Sector', 'Government Jobs', 'Banking']
    },
    facilities: ['Central Library', 'Computer Lab', 'Science Labs', 'Playground', 'Seminar Halls'],
    distance: '65 km from Jammu',
    contact: {
      phone: '+91-191-2582234',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'July 28, 2024'
  },
  {
    id: '10',
    name: 'Government Degree College Rajouri',
    location: 'Rajouri, Jammu & Kashmir',
    state: 'Jammu & Kashmir',
    type: 'State',
    rating: 3.7,
    establishedYear: 1969,
    courses: ['Arts', 'Science', 'Commerce', 'Urdu', 'Islamic Studies'],
    fees: '₹7,000-14,000/year',
    admissionProcess: 'Merit Based',
    placement: {
      averagePackage: '₹2.5-4 LPA',
      topRecruiters: ['Government Sector', 'Teaching', 'Local Businesses']
    },
    facilities: ['Library', 'Computer Center', 'Labs', 'Hostel', 'Sports Facilities'],
    distance: '155 km from Jammu',
    contact: {
      phone: '+91-191-2692456',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'August 1, 2024'
  },
  {
    id: '11',
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, Delhi',
    state: 'Delhi',
    type: 'Central',
    rating: 4.8,
    establishedYear: 1961,
    courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Chemical'],
    fees: '₹2.5 Lakhs/year',
    admissionProcess: 'JEE Advanced',
    placement: {
      averagePackage: '₹15-20 LPA',
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs']
    },
    facilities: ['Wi-Fi Campus', 'Library', 'Hostels', 'Sports Complex', 'Labs'],
    distance: '15 km from city center',
    contact: {
      phone: '+91-11-2659-1749',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'June 15, 2024'
  },
  {
    id: '2',
    name: 'Delhi University - Miranda House',
    location: 'Delhi, Delhi',
    state: 'Delhi',
    type: 'Central',
    rating: 4.6,
    establishedYear: 1948,
    courses: ['Psychology', 'English', 'History', 'Political Science', 'Economics'],
    fees: '₹15,000/year',
    admissionProcess: 'CUET',
    placement: {
      averagePackage: '₹6-8 LPA',
      topRecruiters: ['TCS', 'Deloitte', 'EY', 'PWC']
    },
    facilities: ['Library', 'Hostels', 'Canteen', 'Auditorium', 'Sports'],
    distance: '12 km from city center',
    contact: {
      phone: '+91-11-2766-7437',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'July 31, 2024'
  },
  {
    id: '3',
    name: 'Shri Ram College of Commerce',
    location: 'Delhi, Delhi',
    state: 'Delhi',
    type: 'Central',
    rating: 4.7,
    establishedYear: 1926,
    courses: ['Commerce', 'Economics', 'Mathematics', 'Statistics'],
    fees: '₹25,000/year',
    admissionProcess: 'CUET',
    placement: {
      averagePackage: '₹8-12 LPA',
      topRecruiters: ['KPMG', 'McKinsey', 'BCG', 'Goldman Sachs']
    },
    facilities: ['AC Classrooms', 'Library', 'Computer Lab', 'Auditorium'],
    distance: '8 km from city center',
    contact: {
      phone: '+91-11-2766-7691',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'July 31, 2024'
  },
  {
    id: '4',
    name: 'Jamia Millia Islamia',
    location: 'New Delhi, Delhi',
    state: 'Delhi',
    type: 'Central',
    rating: 4.4,
    establishedYear: 1920,
    courses: ['Mass Communication', 'Architecture', 'Fine Arts', 'Engineering', 'Medicine'],
    fees: '₹1.5 Lakhs/year',
    admissionProcess: 'JMI Entrance Test',
    placement: {
      averagePackage: '₹5-8 LPA',
      topRecruiters: ['Infosys', 'TCS', 'Wipro', 'HCL']
    },
    facilities: ['Central Library', 'Hostels', 'Medical Center', 'Sports Complex'],
    distance: '18 km from city center',
    contact: {
      phone: '+91-11-2698-1717',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'June 30, 2024'
  },
  {
    id: '5',
    name: 'Banaras Hindu University',
    location: 'Varanasi, Uttar Pradesh',
    state: 'Uttar Pradesh',
    type: 'Central',
    rating: 4.5,
    establishedYear: 1916,
    courses: ['Arts', 'Science', 'Commerce', 'Engineering', 'Medicine', 'Agriculture'],
    fees: '₹50,000/year',
    admissionProcess: 'BHU UET',
    placement: {
      averagePackage: '₹4-7 LPA',
      topRecruiters: ['L&T', 'BHEL', 'NTPC', 'Indian Railways']
    },
    facilities: ['Massive Campus', 'Multiple Libraries', 'Hostels', 'Hospital', 'Museums'],
    distance: '320 km from Delhi',
    contact: {
      phone: '+91-542-2307621',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'May 31, 2024'
  },
  {
    id: '6',
    name: 'Aligarh Muslim University',
    location: 'Aligarh, Uttar Pradesh',
    state: 'Uttar Pradesh',
    type: 'Central',
    rating: 4.3,
    establishedYear: 1875,
    courses: ['Engineering', 'Medicine', 'Arts', 'Science', 'Commerce', 'Law'],
    fees: '₹40,000/year',
    admissionProcess: 'AMU Entrance',
    placement: {
      averagePackage: '₹3-6 LPA',
      topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Tech Mahindra']
    },
    facilities: ['Residential Campus', 'Central Library', 'Medical College', 'Sports'],
    distance: '130 km from Delhi',
    contact: {
      phone: '+91-571-2700920',
      website: 'yourdomain.com'
    },
    admissionDeadline: 'June 15, 2024'
  }
];

export function CollegeFinder({ userProfile, quizResult }: CollegeFinderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  /*if (!userProfile || !quizResult) {
    return <div>Loading...</div>;
  }*/

  // Filter colleges based on search criteria
  let filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.courses.some(course => 
                           course.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesState = selectedState === 'all' || college.state.toLowerCase() === selectedState.toLowerCase();
    const matchesType = selectedType === 'all' || college.type.toLowerCase() === selectedType.toLowerCase();
    
    return matchesSearch && matchesState && matchesType;
  });

  // Sort colleges
  filteredColleges.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'fees') return parseFloat(a.fees.replace(/[^\d.]/g, '')) - parseFloat(b.fees.replace(/[^\d.]/g, ''));
    if (sortBy === 'established') return b.establishedYear - a.establishedYear;
    return a.name.localeCompare(b.name);
  });

  const getTypeColor = (type: string) => {
    if (type === 'Central') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (type === 'State') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
  };

  const states = ['Jammu & Kashmir', 'Delhi', 'Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'West Bengal'];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-4">Government College Finder</h1>
          <p className="text-muted-foreground mb-6">
            Discover the best government colleges near you with detailed information about courses and facilities.
          </p>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search colleges, locations, or courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="central">Central</SelectItem>
                <SelectItem value="state">State</SelectItem>
                <SelectItem value="deemed">Deemed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Found {filteredColleges.length} colleges
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="fees">Lowest Fees</SelectItem>
                <SelectItem value="established">Oldest First</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* College Cards */}
        <div className="space-y-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl">{college.name}</h3>
                    <div className="flex items-center ml-4">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{college.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{college.location}</span>
                    <span className="mx-2">•</span>
                    <span>Est. {college.establishedYear}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={getTypeColor(college.type)}>
                      {college.type} University
                    </Badge>
                    <Badge variant="outline">{college.fees}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="text-sm mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Popular Courses
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {college.courses.slice(0, 4).map((course, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                    {college.courses.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{college.courses.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm mb-2">Placement Highlights</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    Average Package: {college.placement.averagePackage}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {college.placement.topRecruiters.slice(0, 3).map((company, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm mb-2">Key Information</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Admission: {college.admissionProcess}</p>
                    <p>Distance: {college.distance}</p>
                    <p className="text-red-600">Deadline: {college.admissionDeadline}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm mb-2">Facilities</h4>
                <div className="flex flex-wrap gap-1">
                  {college.facilities.map((facility, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    <span>{college.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>{college.contact.website}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    View Location
                  </Button>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg mb-2">No colleges found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
