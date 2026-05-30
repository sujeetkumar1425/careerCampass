import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Clock, AlertCircle, Bell, Search, Plus } from 'lucide-react';

// ─── Static event data (no hardcoded status — computed dynamically) ───────────
const timelineEvents = [
  {
    id: '1',
    title: 'JEE Main 2024 Registration',
    type: 'exam',
    date: '2024-03-15',
    endDate: '2024-04-15',
    description: 'Joint Entrance Examination for admission to NITs, IIITs, and other engineering colleges',
    institution: 'National Testing Agency',
    priority: 'high',
    requirements: ['Class 12 marksheet', 'Passport size photo', 'Category certificate (if applicable)'],
    link: 'https://jeemain.nta.ac.in',
    reminder: true,
  },
  {
    id: '2',
    title: 'CUET UG Application',
    type: 'admission',
    date: '2024-03-01',
    endDate: '2024-03-31',
    description: 'Common University Entrance Test for admission to central universities',
    institution: 'National Testing Agency',
    priority: 'high',
    requirements: ['Class 12 marksheet', 'Passport size photo', 'Signature', 'Category certificate'],
    link: 'https://cuet.samarth.ac.in',
    reminder: true,
  },
  {
    id: '3',
    title: 'National Scholarship Portal',
    type: 'scholarship',
    date: '2024-02-20',
    endDate: '2024-05-31',
    description: 'Various central and state government scholarships for students',
    institution: 'Government of India',
    priority: 'medium',
    requirements: ['Income certificate', 'Caste certificate', 'Bank details', 'Academic certificates'],
    link: 'https://scholarships.gov.in',
    reminder: true,
  },
  {
    id: '4',
    title: 'IPU CET Application',
    type: 'exam',
    date: '2024-04-01',
    endDate: '2024-04-30',
    description: 'Guru Gobind Singh Indraprastha University Common Entrance Test',
    institution: 'IPU',
    priority: 'medium',
    requirements: ['Class 12 certificate', 'Transfer certificate', 'Category certificate'],
    link: 'https://ipu.ac.in',
    reminder: false,
  },
  {
    id: '5',
    title: 'NEET UG Registration',
    type: 'exam',
    date: '2024-03-10',
    endDate: '2024-04-10',
    description: 'National Eligibility cum Entrance Test for medical courses',
    institution: 'National Testing Agency',
    priority: 'high',
    requirements: ['Class 12 certificate', 'ID proof', 'Category certificate', 'PWD certificate'],
    link: 'https://neet.nta.nic.in',
    reminder: true,
  },
  {
    id: '6',
    title: 'Merit Scholarship for Girls',
    type: 'scholarship',
    date: '2024-03-01',
    endDate: '2024-06-30',
    description: 'Special scholarship program for meritorious girl students',
    institution: 'Ministry of Education',
    priority: 'medium',
    requirements: ['Class 10/12 marksheet', 'Income certificate', 'Bank account details'],
    link: 'https://scholarships.gov.in',
    reminder: true,
  },
  {
    id: '7',
    title: 'Document Verification - DU',
    type: 'document',
    date: '2024-07-15',
    endDate: '2024-07-25',
    description: 'Document verification for Delhi University admissions',
    institution: 'Delhi University',
    priority: 'high',
    requirements: ['Original certificates', 'Photocopies', 'Passport photos', 'Fee receipt'],
    link: 'https://du.ac.in',
    reminder: false,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Compute live status based on real current time */
function computeStatus(event, now) {
  const start = new Date(event.date);
  const end = event.endDate ? new Date(event.endDate) : start;
  if (now > end) return 'missed';
  if (now >= start && now <= end) return 'ongoing';
  return 'upcoming';
}

/** Days until the END of the event window */
function daysUntilEnd(event, now) {
  const end = event.endDate ? new Date(event.endDate) : new Date(event.date);
  return Math.ceil((end - now) / 86_400_000);
}

/** Days until the START of the event (for upcoming) */
function daysUntilStart(event, now) {
  return Math.ceil((new Date(event.date) - now) / 86_400_000);
}

/** Percentage of the application window elapsed (0-100) */
function progressPercent(event, now) {
  const start = new Date(event.date);
  const end = event.endDate ? new Date(event.endDate) : start;
  const total = end - start;
  if (total <= 0) return 100;
  return Math.min(100, Math.max(0, Math.round(((now - start) / total) * 100)));
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LiveClockBar({ now }) {
  const timeStr = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex items-center justify-between bg-muted/40 border rounded-lg px-5 py-3 mb-6">
      <div className="flex items-center gap-3">
        {/* Pulsing live indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <div>
          <p className="text-xl font-semibold tabular-nums leading-none">{timeStr}</p>
          <p className="text-xs text-muted-foreground mt-1">{dateStr}</p>
        </div>
      </div>
      <div className="text-right hidden sm:block">
        <p className="text-xs text-muted-foreground">Syncing with</p>
        <p className="text-sm font-medium">NTA Official Schedule</p>
      </div>
    </div>
  );
}

function ProgressBar({ percent, status }) {
  if (status !== 'ongoing') return null;
  const fillColor =
    percent > 80 ? 'bg-red-500' : percent > 50 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="mt-3 mb-1">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>Window progress</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${fillColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function CountdownBadge({ event, now, status }) {
  if (status === 'ongoing') {
    const d = daysUntilEnd(event, now);
    return (
      <div className="text-right shrink-0 ml-3">
        <p className={`text-2xl font-semibold tabular-nums leading-none ${d <= 7 ? 'text-yellow-600' : 'text-green-600'}`}>
          {d}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">days left</p>
      </div>
    );
  }
  if (status === 'upcoming') {
    const d = daysUntilStart(event, now);
    return (
      <div className="text-right shrink-0 ml-3">
        <p className={`text-2xl font-semibold tabular-nums leading-none ${d <= 14 ? 'text-yellow-600' : 'text-blue-600'}`}>
          {d}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">days away</p>
      </div>
    );
  }
  if (status === 'missed') {
    const d = Math.abs(daysUntilEnd(event, now));
    return (
      <div className="text-right shrink-0 ml-3">
        <p className="text-2xl font-semibold tabular-nums leading-none text-red-600">{d}</p>
        <p className="text-xs text-muted-foreground mt-0.5">days ago</p>
      </div>
    );
  }
  return null;
}

// ─── Status / priority helpers ────────────────────────────────────────────────

function getStatusColor(status) {
  if (status === 'upcoming') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  if (status === 'ongoing') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  if (status === 'completed') return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
}

function getPriorityColor(priority) {
  if (priority === 'high') return 'text-red-600';
  if (priority === 'medium') return 'text-yellow-600';
  return 'text-green-600';
}

function getPriorityBorderColor(priority) {
  if (priority === 'high') return 'border-l-red-500';
  if (priority === 'medium') return 'border-l-yellow-500';
  return 'border-l-green-500';
}

function getTypeIcon(type) {
  if (type === 'admission') return Calendar;
  if (type === 'scholarship') return Plus;
  if (type === 'exam') return Clock;
  return AlertCircle;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TimelineTracker({ userProfile }) {
  const [now, setNow] = useState(() => new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const intervalRef = useRef(null);

  // Tick every second — drives both the clock display and live status computation
  useEffect(() => {
    intervalRef.current = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  // Attach live-computed status to every event
  const eventsWithStatus = timelineEvents.map((event) => ({
    ...event,
    status: computeStatus(event, now),
  }));

  // Apply filters
  const filteredEvents = eventsWithStatus
    .filter((event) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        event.title.toLowerCase().includes(q) ||
        event.institution.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q);
      const matchesType = selectedType === 'all' || event.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      const order = { ongoing: 0, upcoming: 1, missed: 2, completed: 3 };
      if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
      return new Date(a.date) - new Date(b.date);
    });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl mb-2">Timeline Tracker</h1>
          <p className="text-muted-foreground">
            Never miss important admission deadlines and scholarship opportunities.
          </p>
        </div>

        {/* Live Clock Bar */}
        <LiveClockBar now={now} />

        {/* Quick Stats — based on ALL events, not filtered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1 text-blue-600">
              {eventsWithStatus.filter((e) => e.status === 'upcoming').length}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1 text-green-600">
              {eventsWithStatus.filter((e) => e.status === 'ongoing').length}
            </div>
            <div className="text-sm text-muted-foreground">Ongoing</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1 text-red-600">
              {eventsWithStatus.filter((e) => e.priority === 'high').length}
            </div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1 text-yellow-600">
              {eventsWithStatus.filter((e) => e.reminder).length}
            </div>
            <div className="text-sm text-muted-foreground">Reminders Set</div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          {/* ── Timeline Tab ── */}
          <TabsContent value="timeline">

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events, institutions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background text-sm"
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
                  className="px-3 py-2 border rounded-md bg-background text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="missed">Missed</option>
                </select>
              </div>
            </div>

            {/* Event cards */}
            <div className="space-y-4">
              {filteredEvents.map((event) => {
                const TypeIcon = getTypeIcon(event.type);
                const pct = progressPercent(event, now);

                return (
                  <Card
                    key={event.id}
                    className={`p-6 hover:shadow-lg transition-shadow border-l-4 ${getPriorityBorderColor(event.priority)}`}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                          <TypeIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-lg leading-tight">{event.title}</h3>
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            {event.priority === 'high' && (
                              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                            )}
                            {event.reminder && (
                              <Bell className="h-4 w-4 text-blue-600 shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{event.institution}</p>
                          <p className="text-sm">{event.description}</p>
                        </div>
                      </div>

                      {/* Live countdown */}
                      <CountdownBadge event={event} now={now} status={event.status} />
                    </div>

                    {/* Progress bar (ongoing only) */}
                    <ProgressBar percent={pct} status={event.status} />

                    {/* Date range */}
                    <p className="text-xs text-muted-foreground mt-2 mb-3">
                      {event.endDate
                        ? `${formatDate(event.date)} – ${formatDate(event.endDate)}`
                        : formatDate(event.date)}
                    </p>

                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Required Documents / Actions</h4>
                      <div className="space-y-1">
                        {event.requirements.map((req, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-2 shrink-0" />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-wrap justify-between items-center gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="capitalize">{event.type}</Badge>
                        <Badge variant="outline" className={getPriorityColor(event.priority)}>
                          {event.priority} priority
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {event.link && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(event.link, '_blank')}
                          >
                            Visit Website
                          </Button>
                        )}
                        <Button size="sm">
                          <Bell className="h-4 w-4 mr-2" />
                          {event.reminder ? 'Reminder Set' : 'Set Reminder'}
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

          {/* ── Calendar Tab ── */}
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