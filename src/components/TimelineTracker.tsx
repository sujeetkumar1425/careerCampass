import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Clock, AlertCircle, CheckCircle, Bell, Search, Filter, Plus } from 'lucide-react';
import { UserProfile } from '../App';

interface TimelineTrackerProps {
  userProfile: UserProfile | null;
}

interface TimelineEvent {
  id: string;
  title: string;
  type: 'admission' | 'scholarship' | 'exam' | 'document';
  date: string;
  endDate?: string;
  description: string;
  institution: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'missed';
  priority: 'high' | 'medium' | 'low';
  requirements: string[];
  link?: string;
  reminder: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'JEE Main 2024 Registration',
    type: 'exam',
    date: '2025-12-15',
    endDate: '2026-01-15',
    description: 'Joint Entrance Examination for admission to NITs, IIITs, and other engineering colleges',
    institution: 'National Testing Agency',
    status: 'upcoming',
    priority: 'high',
    requirements: ['Class 12 marksheet', 'Passport size photo', 'Category certificate (if applicable)'],
    link: 'https://yourdomain.com',
    reminder: true
  },
  {
    id: '2',
    title: 'CUET UG Application',
    type: 'admission',
    date: '2024-03-01',
    endDate: '2024-03-31',
    description: 'Common University Entrance Test for admission to central universities',
    institution: 'National Testing Agency',
    status: 'ongoing',
    priority: 'high',
    requirements: ['Class 12 marksheet', 'Passport size photo', 'Signature', 'Category certificate'],
    link: 'https://yourdomain.com',
    reminder: true
  },
  {
    id: '3',
    title: 'National Scholarship Portal',
    type: 'scholarship',
    date: '2024-02-20',
    endDate: '2024-05-31',
    description: 'Various central and state government scholarships for students',
    institution: 'Government of India',
    status: 'ongoing',
    priority: 'medium',
    requirements: ['Income certificate', 'Caste certificate', 'Bank details', 'Academic certificates'],
    link: 'https://yourdomain.com',
    reminder: true
  },
  {
    id: '4',
    title: 'IPU CET Application',
    type: 'exam',
    date: '2024-04-01',
    endDate: '2024-04-30',
    description: 'Guru Gobind Singh Indraprastha University Common Entrance Test',
    institution: 'IPU',
    status: 'upcoming',
    priority: 'medium',
    requirements: ['Class 12 certificate', 'Transfer certificate', 'Category certificate'],
    link: 'https://yourdomain.com',
    reminder: false
  },
  {
    id: '5',
    title: 'NEET UG Registration',
    type: 'exam',
    date: '2024-03-10',
    endDate: '2024-04-10',
    description: 'National Eligibility cum Entrance Test for medical courses',
    institution: 'National Testing Agency',
    status: 'upcoming',
    priority: 'high',
    requirements: ['Class 12 certificate', 'ID proof', 'Category certificate', 'PWD certificate'],
    link: 'https://yourdomain.com',
    reminder: true
  },
  {
    id: '6',
    title: 'Merit Scholarship for Girls',
    type: 'scholarship',
    date: '2024-03-01',
    endDate: '2024-06-30',
    description: 'Special scholarship program for meritorious girl students',
    institution: 'Ministry of Education',
    status: 'ongoing',
    priority: 'medium',
    requirements: ['Class 10/12 marksheet', 'Income certificate', 'Bank account details'],
    reminder: true
  },
  {
    id: '7',
    title: 'Document Verification - DU',
    type: 'document',
    date: '2024-07-15',
    endDate: '2024-07-25',
    description: 'Document verification for Delhi University admissions',
    institution: 'Delhi University',
    status: 'upcoming',
    priority: 'high',
    requirements: ['Original certificates', 'Photocopies', 'Passport photos', 'Fee receipt'],
    reminder: false
  }
];

export function TimelineTracker({ userProfile }: TimelineTrackerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  // Filter events
  let filteredEvents = timelineEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Sort events by date
  filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getStatusColor = (status: string) => {
    if (status === 'upcoming') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (status === 'ongoing') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (status === 'completed') return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'text-red-600';
    if (priority === 'medium') return 'text-yellow-600';
    return 'text-green-600';
  };

  const getTypeIcon = (type: string) => {
    if (type === 'admission') return Calendar;
    if (type === 'scholarship') return Plus;
    if (type === 'exam') return Clock;
    return AlertCircle;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-4">Timeline Tracker</h1>
          <p className="text-muted-foreground mb-6">
            Never miss important admission deadlines and scholarship opportunities. Stay organized with your academic journey.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 text-center">
              <div className="text-2xl mb-2 text-blue-600">
                {filteredEvents.filter(e => e.status === 'upcoming').length}
              </div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl mb-2 text-green-600">
                {filteredEvents.filter(e => e.status === 'ongoing').length}
              </div>
              <div className="text-sm text-muted-foreground">Ongoing</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl mb-2 text-red-600">
                {filteredEvents.filter(e => e.priority === 'high').length}
              </div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl mb-2 text-yellow-600">
                {filteredEvents.filter(e => e.reminder).length}
              </div>
              <div className="text-sm text-muted-foreground">Reminders Set</div>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events, institutions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="all">All Types</option>
                  <option value="admission">Admissions</option>
                  <option value="scholarship">Scholarships</option>
                  <option value="exam">Exams</option>
                  <option value="document">Documents</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="missed">Missed</option>
                </select>
              </div>
            </div>

            {/* Timeline Events */}
            <div className="space-y-4">
              {filteredEvents.map((event) => {
                const TypeIcon = getTypeIcon(event.type);
                const daysUntil = getDaysUntil(event.date);
                
                return (
                  <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <TypeIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg">{event.title}</h3>
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            {event.priority === 'high' && (
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            )}
                            {event.reminder && (
                              <Bell className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2">{event.institution}</p>
                          <p className="text-sm">{event.description}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">
                          {event.endDate ? (
                            <>
                              {formatDate(event.date)} - {formatDate(event.endDate)}
                            </>
                          ) : (
                            formatDate(event.date)
                          )}
                        </div>
                        {daysUntil > 0 && event.status !== 'completed' && (
                          <div className={`text-sm ${getPriorityColor(event.priority)}`}>
                            {daysUntil} days left
                          </div>
                        )}
                        {daysUntil < 0 && event.status !== 'completed' && (
                          <div className="text-sm text-red-600">
                            {Math.abs(daysUntil)} days overdue
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm mb-2">Required Documents/Actions</h4>
                      <div className="space-y-1">
                        {event.requirements.map((req, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground mr-2" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {event.type}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(event.priority)}>
                          {event.priority} priority
                        </Badge>
                      </div>
                      
                      <div className="flex space-x-2">
                        {event.link && (
                          <Button variant="outline" size="sm">
                            Visit Website
                          </Button>
                        )}
                        <Button size="sm">
                          {event.reminder ? (
                            <>
                              <Bell className="h-4 w-4 mr-2" />
                              Reminder Set
                            </>
                          ) : (
                            <>
                              <Bell className="h-4 w-4 mr-2" />
                              Set Reminder
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg mb-2">No events found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg mb-2">Calendar View</h3>
              <p className="text-muted-foreground mb-4">
                Interactive calendar view will be available soon. Use timeline view for now.
              </p>
              <Button variant="outline">Back to Timeline</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
