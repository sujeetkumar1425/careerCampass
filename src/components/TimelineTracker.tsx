import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Calendar,
  Clock,
  AlertCircle,
  Bell,
  Search,
  Plus,
} from 'lucide-react';
import { UserProfile } from '../App';

interface TimelineTrackerProps {
  userProfile: UserProfile | null;
}

interface TimelineEvent {
  id: string;
  title: string;
  type: 'admission' | 'scholarship' | 'exam' | 'document' | 'job';
  date: string;
  endDate?: string;
  examDate?: string;
  description: string;
  institution: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'missed';
  priority: 'high' | 'medium' | 'low';
  requirements: string[];
  link?: string;
  applicationLink?: string;
  source?: string;
  reminder: boolean;
}

export function TimelineTracker({ userProfile }: TimelineTrackerProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /*
   * Fetch timeline events from your Vercel API
   *
   * IMPORTANT:
   * useEffect is placed BEFORE any conditional return.
   */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('🚀 TimelineTracker mounted');
        console.log('🔵 Fetching timeline events...');

        setLoading(true);
        setError('');

        const response = await fetch('/api/timeline-events', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        console.log('🟢 API response status:', response.status);

        if (!response.ok) {
          throw new Error(
            `Timeline API returned HTTP ${response.status}`
          );
        }

        const data = await response.json();

        console.log('🟢 Timeline data received:', data);

        if (!Array.isArray(data)) {
          throw new Error(
            'Timeline API did not return an array'
          );
        }

        setEvents(data);
      } catch (error) {
        console.error('🔴 Timeline API error:', error);

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unable to load timeline events.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /*
   * Automatically calculate event status from dates.
   *
   * Upcoming  = registration/event hasn't started
   * Ongoing   = current date is between start and end
   * Completed = end date has passed
   */
  const calculateStatus = (
    startDate: string,
    endDate?: string
  ): TimelineEvent['status'] => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      if (now < start) {
        return 'upcoming';
      }

      if (now >= start && now <= end) {
        return 'ongoing';
      }

      return 'completed';
    }

    return now < start ? 'upcoming' : 'completed';
  };

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">
            Loading latest opportunities...
          </div>

          <p className="text-muted-foreground mt-2">
            Fetching current exams, admissions and scholarships
          </p>
        </div>
      </div>
    );
  }

  /*
   * Error state
   */
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-10 w-10 text-red-600 mx-auto mb-3" />

          <h2 className="text-lg font-medium">
            Unable to load events
          </h2>

          <p className="text-muted-foreground mt-2">
            {error}
          </p>

          <Button
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  /*
   * User authentication check
   */
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            Please sign in to view your timeline.
          </p>
        </div>
      </div>
    );
  }

  /*
   * Add automatically calculated status to API events.
   */
  const normalizedEvents: TimelineEvent[] = events.map((event) => ({
    ...event,
    status: calculateStatus(event.date, event.endDate),
  }));

  /*
   * Filter events
   */
  const filteredEvents = normalizedEvents
    .filter((event) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        event.title.toLowerCase().includes(search) ||
        event.institution.toLowerCase().includes(search) ||
        event.description.toLowerCase().includes(search);

      const matchesType =
        selectedType === 'all' ||
        event.type === selectedType;

      const matchesStatus =
        selectedStatus === 'all' ||
        event.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    })
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

  /*
   * Status colors
   */
  const getStatusColor = (status: string) => {
    if (status === 'upcoming') {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }

    if (status === 'ongoing') {
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }

    if (status === 'completed') {
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }

    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  /*
   * Priority colors
   */
  const getPriorityColor = (priority: string) => {
    if (priority === 'high') {
      return 'text-red-600';
    }

    if (priority === 'medium') {
      return 'text-yellow-600';
    }

    return 'text-green-600';
  };

  /*
   * Event type icons
   */
  const getTypeIcon = (type: string) => {
    if (type === 'admission') {
      return Calendar;
    }

    if (type === 'scholarship') {
      return Plus;
    }

    if (type === 'exam') {
      return Clock;
    }

    return AlertCircle;
  };

  /*
   * Format dates for Indian users
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  /*
   * Calculate days until a date
   */
  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventDate = new Date(dateString);
    eventDate.setHours(0, 0, 0, 0);

    const diffTime =
      eventDate.getTime() - today.getTime();

    return Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );
  };

  /*
   * Calculate countdown based on status.
   *
   * For upcoming:
   *   countdown = registration start
   *
   * For ongoing:
   *   countdown = registration deadline
   */
  const getCountdown = (event: TimelineEvent) => {
    if (event.status === 'upcoming') {
      return {
        days: getDaysUntil(event.date),
        label: 'days left',
      };
    }

    if (
      event.status === 'ongoing' &&
      event.endDate
    ) {
      return {
        days: getDaysUntil(event.endDate),
        label: 'days left',
      };
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-4">
            Timeline Tracker
          </h1>

          <p className="text-muted-foreground mb-6">
            Never miss important admission deadlines and
            scholarship opportunities. Stay organized with
            your academic journey.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

            {/* Upcoming */}
            <Card className="p-4 text-center">
              <div className="text-2xl mb-2 text-blue-600">
                {
                  normalizedEvents.filter(
                    (e) => e.status === 'upcoming'
                  ).length
                }
              </div>

              <div className="text-sm text-muted-foreground">
                Upcoming
              </div>
            </Card>

            {/* Ongoing */}
            <Card className="p-4 text-center">
              <div className="text-2xl mb-2 text-green-600">
                {
                  normalizedEvents.filter(
                    (e) => e.status === 'ongoing'
                  ).length
                }
              </div>

              <div className="text-sm text-muted-foreground">
                Ongoing
              </div>
            </Card>

            {/* High Priority */}
            <Card className="p-4 text-center">
              <div className="text-2xl mb-2 text-red-600">
                {
                  normalizedEvents.filter(
                    (e) => e.priority === 'high'
                  ).length
                }
              </div>

              <div className="text-sm text-muted-foreground">
                High Priority
              </div>
            </Card>

            {/* Reminders */}
            <Card className="p-4 text-center">
              <div className="text-2xl mb-2 text-yellow-600">
                {
                  normalizedEvents.filter(
                    (e) => e.reminder
                  ).length
                }
              </div>

              <div className="text-sm text-muted-foreground">
                Reminders Set
              </div>
            </Card>

          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="timeline"
          className="w-full"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="timeline">
              Timeline View
            </TabsTrigger>

            <TabsTrigger value="calendar">
              Calendar View
            </TabsTrigger>
          </TabsList>

          {/* Timeline */}
          <TabsContent value="timeline">

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">

              {/* Search */}
              <div className="flex-1">
                <div className="relative">

                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  />

                  <Input
                    placeholder="Search events, institutions..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    className="pl-9"
                  />

                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-2">

                {/* Type */}
                <select
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(e.target.value)
                  }
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="all">
                    All Types
                  </option>

                  <option value="admission">
                    Admissions
                  </option>

                  <option value="scholarship">
                    Scholarships
                  </option>

                  <option value="exam">
                    Exams
                  </option>

                  <option value="document">
                    Documents
                  </option>

                  <option value="job">
                    Jobs
                  </option>
                </select>

                {/* Status */}
                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(e.target.value)
                  }
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="all">
                    All Status
                  </option>

                  <option value="upcoming">
                    Upcoming
                  </option>

                  <option value="ongoing">
                    Ongoing
                  </option>

                  <option value="completed">
                    Completed
                  </option>

                  <option value="missed">
                    Missed
                  </option>
                </select>

              </div>
            </div>

            {/* Timeline Events */}
            <div className="space-y-4">

              {filteredEvents.map((event) => {
                const TypeIcon =
                  getTypeIcon(event.type);

                const countdown =
                  getCountdown(event);

                return (
                  <Card
                    key={event.id}
                    className="p-6 hover:shadow-lg transition-shadow"
                  >

                    {/* Top section */}
                    <div className="flex items-start justify-between mb-4">

                      <div className="flex items-start space-x-4">

                        {/* Icon */}
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <TypeIcon className="h-5 w-5 text-primary" />
                        </div>

                        {/* Information */}
                        <div className="flex-1">

                          <div className="flex items-center gap-2 mb-2">

                            <h3 className="text-lg">
                              {event.title}
                            </h3>

                            <Badge
                              className={getStatusColor(
                                event.status
                              )}
                            >
                              {event.status}
                            </Badge>

                            {event.priority === 'high' && (
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            )}

                            {event.reminder && (
                              <Bell className="h-4 w-4 text-blue-600" />
                            )}

                          </div>

                          <p className="text-muted-foreground mb-2">
                            {event.institution}
                          </p>

                          <p className="text-sm">
                            {event.description}
                          </p>

                        </div>
                      </div>

                      {/* Dates */}
                      <div className="text-right">

                        <div className="text-sm text-muted-foreground mb-1">

                          {event.endDate ? (
                            <>
                              {formatDate(event.date)} -{' '}
                              {formatDate(event.endDate)}
                            </>
                          ) : (
                            formatDate(event.date)
                          )}

                        </div>

                        {/* Countdown */}
                        {countdown &&
                          countdown.days >= 0 && (
                            <div
                              className={`text-sm ${getPriorityColor(
                                event.priority
                              )}`}
                            >
                              {countdown.days}{' '}
                              {countdown.label}
                            </div>
                          )}

                        {/* Overdue */}
                        {event.status === 'ongoing' &&
                          event.endDate &&
                          countdown &&
                          countdown.days < 0 && (
                            <div className="text-sm text-red-600">
                              Deadline passed
                            </div>
                          )}

                      </div>
                    </div>

                    {/* Requirements */}
                    {event.requirements &&
                      event.requirements.length > 0 && (
                        <div className="mb-4">

                          <h4 className="text-sm mb-2">
                            Required Documents/Actions
                          </h4>

                          <div className="space-y-1">

                            {event.requirements.map(
                              (req, index) => (
                                <div
                                  key={index}
                                  className="flex items-center text-sm"
                                >
                                  <div className="w-2 h-2 rounded-full bg-muted-foreground mr-2" />

                                  <span>
                                    {req}
                                  </span>
                                </div>
                              )
                            )}

                          </div>
                        </div>
                      )}

                    {/* Bottom section */}
                    <div className="flex justify-between items-center">

                      {/* Tags */}
                      <div className="flex items-center space-x-2">

                        <Badge
                          variant="outline"
                          className="capitalize"
                        >
                          {event.type}
                        </Badge>

                        <Badge
                          variant="outline"
                          className={getPriorityColor(
                            event.priority
                          )}
                        >
                          {event.priority} priority
                        </Badge>

                        {event.source && (
                          <Badge
                            variant="outline"
                            className="hidden sm:inline-flex"
                          >
                            {event.source}
                          </Badge>
                        )}

                      </div>

                      {/* Buttons */}
                      <div className="flex space-x-2">

                        {/* Official Website */}
                        {event.link && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              window.open(
                                event.link,
                                '_blank',
                                'noopener,noreferrer'
                              )
                            }
                          >
                            Visit Website
                          </Button>
                        )}

                        {/* Reminder */}
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

            {/* No events */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">

                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

                <h3 className="text-lg mb-2">
                  No events found
                </h3>

                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>

              </div>
            )}

          </TabsContent>

          {/* Calendar */}
          <TabsContent value="calendar">

            <Card className="p-8 text-center">

              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

              <h3 className="text-lg mb-2">
                Calendar View
              </h3>

              <p className="text-muted-foreground mb-4">
                Interactive calendar view will be available
                soon. Use timeline view for now.
              </p>

              <Button variant="outline">
                Back to Timeline
              </Button>

            </Card>

          </TabsContent>

        </Tabs>

      </div>
    </div>
  );
}