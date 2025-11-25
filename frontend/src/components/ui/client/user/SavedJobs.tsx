"use client";
import { Card, CardContent } from '../../common/card/card';
import {
    MapPin,
    DollarSign,
   Search,
    Clock,
    Trash2,
    Building2,
    Bookmark,
} from 'lucide-react';
import { Button } from '../../common/button/button';
import { useRouter } from 'next/navigation';
import { useApp } from '@/components/AppContext';
// Badge replaced with span for better styling control

const SavedJobs = () => {
    const router = useRouter();
    const { navigateTo } = useApp();
    const mockSavedJobs = [
        {
            id: 1,
            title: 'UI/UX Designer',
            company: 'DesignHub',
            location: 'Ho Chi Minh City',
            salary: '$1200 - $2000',
            postedDate: '2024-01-20',
            tags: ['UI/UX', 'Figma', 'Adobe XD'],
            description: 'Creative design role focusing on user experience...',
            urgent: false
        },
        {
            id: 2,
            title: 'Backend Developer',
            company: 'DataTech',
            location: 'Hanoi',
            salary: '$2000 - $3500',
            postedDate: '2024-01-18',
            tags: ['Node.js', 'MongoDB', 'AWS'],
            description: 'Backend development for scalable applications...',
            urgent: true
        }
    ];

    const handleApplyToJob = () => {
        // Navigate to job detail
        router.push('/user/a/job-detail');
    };

    const handleRemoveSavedJob = (jobId: number) => {
        // TODO: Implement remove saved job functionality
        console.log('Remove job:', jobId);
    };

                return (
                    <div className="space-y-6 ">
                        <div className="flex items-center justify-between">
                            <h1>Việc đã lưu ({mockSavedJobs.length})</h1>
                            <Button variant="outline" onClick={() => navigateTo('jobs')}>
                                <Search className="w-4 h-4 mr-2" />
                                Tìm việc                             </Button>
                        </div>

                        <div className="space-y-4 mb-8">
                            {mockSavedJobs.map((job) => (
                                <Card key={job.id} className="hover:shadow-md transition-shadow mt-8">
                                    <CardContent className="p-6 mt-8">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h3 className="cursor-pointer hover:text-primary" onClick={handleApplyToJob}>
                                                        {job.title}
                                                    </h3>
                                                    {job.urgent && <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">URGENT</span>}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                                                    <div className="flex items-center">
                                                        <Building2 className="w-4 h-4 mr-1" />
                                                        {job.company}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <MapPin className="w-4 h-4 mr-1" />
                                                        {job.location}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <DollarSign className="w-4 h-4 mr-1" />
                                                        {job.salary}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {job.postedDate}
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {job.tags.map((tag) => (
                                                        <span key={tag} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{tag}</span>
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-600 mb-4">{job.description}</p>
                                            </div>
                                            <div className="flex flex-col space-y-2 ml-4">
                                                <Button size="sm" onClick={handleApplyToJob} className="bg-primary hover:bg-primary/90">
                                                 Ứng tuyển ngay
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleRemoveSavedJob(job.id)}>
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Loại bỏ 
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {mockSavedJobs.length === 0 && (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="mb-2">No saved jobs yet</h3>
                                    <p className="text-gray-600 mb-4">
                                        Start saving jobs you&apos;re interested in to keep track of opportunities.
                                    </p>
                                    <Button variant="outline" onClick={() => navigateTo('jobs')}>
                                        Browse Jobs
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                );

};
export default SavedJobs;
