"use client";
import { useState } from 'react';
import { ArrowLeft, MapPin, DollarSign, Clock, Users, Building, Heart, Share2, Flag, CheckCircle } from 'lucide-react';
import { Button } from '../../common/button';
import { useApp } from '@/components/AppContext';
import { Badge } from '../../common/badge';
import { Separator } from '../../common/separator';
import { ImageWithFallback } from '@/lib/ImageWithFallback';
import { Card , CardContent } from '../../common/card';
import { Breadcrumb } from '../../common/breadcrumb';
const JobDetailPage = () => {
  const { state, navigateTo } = useApp();
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const job = state.selectedJob || {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Innovation',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=120&fit=crop&crop=face',
    location: 'Ho Chi Minh City',
    salary: '$2,000 - $3,000',
    type: 'Full-time',
    experience: '3-5 years',
    posted: '2 days ago',
    deadline: 'Jan 15, 2025',
    tags: ['React', 'TypeScript', 'Remote', 'Senior Level'],
    urgent: false,
    views: 1250,
    applicants: 45
  };

  const companyInfo = {
    name: 'TechCorp Innovation',
    size: '500-1000 employees',
    industry: 'Technology',
    website: 'www.techcorp.com',
    description: 'Leading technology company specializing in AI and machine learning solutions for enterprise clients.',
    benefits: ['Health Insurance', 'Remote Work', '13th Month Salary', 'Training Programs', 'Modern Office']
  };

  const jobDescription = {
    overview: 'We are seeking a talented Senior Frontend Developer to join our dynamic engineering team. You will be responsible for building and maintaining high-quality web applications using modern technologies.',
    responsibilities: [
      'Develop and maintain responsive web applications using React and TypeScript',
      'Collaborate with design and backend teams to implement user interfaces',
      'Write clean, maintainable, and well-documented code',
      'Optimize applications for maximum speed and scalability',
      'Participate in code reviews and technical discussions',
      'Mentor junior developers and share best practices'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of experience in frontend development',
      'Strong proficiency in React, TypeScript, and modern JavaScript',
      'Experience with CSS frameworks (Tailwind CSS preferred)',
      'Knowledge of state management libraries (Redux, Zustand)',
      'Familiarity with testing frameworks (Jest, React Testing Library)',
      'Understanding of web performance optimization',
      'Strong problem-solving and communication skills'
    ],
    preferred: [
      'Experience with Next.js or similar frameworks',
      'Knowledge of backend technologies (Node.js, Express)',
      'Experience with cloud platforms (AWS, GCP)',
      'Contributions to open-source projects',
      'Experience in agile development methodologies'
    ]
  };

  const similarJobs = [
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'StartupVN',
      salary: '$1,500 - $2,200',
      location: 'Hanoi',
      type: 'Full-time'
    },
    {
      id: 3,
      title: 'React Developer',
      company: 'DigitalCorp',
      salary: '$1,800 - $2,800',
      location: 'Da Nang',
      type: 'Full-time'
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      company: 'WebSolutions',
      salary: '$2,200 - $3,500',
      location: 'Remote',
      type: 'Full-time'
    }
  ];

  const handleApply = () => {
    if (!state.isLoggedIn) {
      navigateTo('login');
      return;
    }
    setHasApplied(true);
  };

  const breadcrumbItems = [
    { label: 'Jobs', page: 'jobs' },
    { label: job.title }
  ];

    
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigateTo('jobs')}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <ImageWithFallback
                      src={job.logo}
                      alt={job.company}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl text-gray-900">{job.title}</h1>
                        {job.urgent && (
                          <Badge className="bg-red-100 text-red-700">URGENT</Badge>
                        )}
                      </div>
                      <p className="text-lg text-gray-600 mb-1">{job.company}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Posted {job.posted}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSaved(!isSaved)}
                      className={isSaved ? 'bg-orange-50 border-orange-200' : ''}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-orange-500 text-orange-500' : ''}`} />
                      {isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <DollarSign className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="font-medium text-gray-900">{job.salary}</div>
                    <div className="text-xs text-gray-500">Salary</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="font-medium text-gray-900">{job.experience}</div>
                    <div className="text-xs text-gray-500">Experience</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Building className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="font-medium text-gray-900">{job.type}</div>
                    <div className="text-xs text-gray-500">Job Type</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="font-medium text-gray-900">{job.deadline}</div>
                    <div className="text-xs text-gray-500">Deadline</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(job.tags || []).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="bg-orange-100 text-orange-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl mb-4 text-gray-900">Job Description</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{jobDescription.overview}</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3 text-gray-900">Key Responsibilities</h3>
                    <ul className="space-y-2">
                      {jobDescription.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3 text-gray-900">Requirements</h3>
                    <ul className="space-y-2">
                      {jobDescription.requirements.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3 text-gray-900">Preferred Qualifications</h3>
                    <ul className="space-y-2">
                      {jobDescription.preferred.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl mb-4 text-gray-900">About {companyInfo.name}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{companyInfo.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-500">Company Size</div>
                    <div className="font-medium">{companyInfo.size}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Industry</div>
                    <div className="font-medium">{companyInfo.industry}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Website</div>
                    <div className="font-medium text-orange-600">{companyInfo.website}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3 text-gray-900">Benefits & Perks</h3>
                  <div className="flex flex-wrap gap-2">
                    {companyInfo.benefits.map((benefit) => (
                      <Badge key={benefit} variant="outline" className="border-green-200 text-green-700">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-2xl mb-1 text-gray-900">{job.salary}</div>
                  <div className="text-sm text-gray-500">Per month</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Applications:</span>
                    <span className="font-medium">{job.applicants}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Views:</span>
                    <span className="font-medium">{job.views}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Deadline:</span>
                    <span className="font-medium">{job.deadline}</span>
                  </div>
                </div>

                {hasApplied ? (
                  <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Applied Successfully
                  </Button>
                ) : (
                  <Button 
                    className="w-full text-white mb-3"
                    style={{ backgroundColor: '#f26b38' }}
                    onClick={handleApply}
                  >
                    Apply Now
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigateTo('company-detail', { company: companyInfo })}
                >
                  View Company
                </Button>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4 text-gray-900">Similar Jobs</h3>
                <div className="space-y-4">
                  {similarJobs.map((similarJob) => (
                    <div 
                      key={similarJob.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigateTo('job-detail', { job: similarJob })}
                    >
                      <h4 className="font-medium text-sm text-gray-900 mb-1">{similarJob.title}</h4>
                      <p className="text-xs text-gray-500 mb-2">{similarJob.company}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{similarJob.location}</span>
                        <span>{similarJob.salary}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
