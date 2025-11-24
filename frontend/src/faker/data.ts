import { Job, JobCategory } from '@/types/job.type';
import { Company } from '@/types/company.type';
import jobImage from "@/assets/images/job1.png";
import MainImage from "@/assets/images/main.png";
import job2Image from "@/assets/images/job2.png";
import job3Image from "@/assets/images/job3.png";
import job4Image from "@/assets/images/job4.png";
import { StaticImageData } from 'next/image';

export const mockCompanies: Company[] = [
  {
    id: 'comp1',
    name: 'TechVision Inc.',
    logo: 'https://images.unsplash.com/photo-1746046936818-8d432ebd3d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGxvZ28lMjBtb2Rlcm58ZW58MXx8fHwxNzU4MzczMTM0fDA&ixlib=rb-4.1.0&q=80&w=200',
    description: 'Pioneering technology solutions for tomorrow\'s challenges',
    industry: 'Technology',
    size: '500-1000 employees',
    website: 'techvision.com',
    location: 'San Francisco, CA',
    founded: 2018,
    rating: 4.8,
    reviewCount: 324
  },
  {
    id: 'comp2',
    name: 'Creative Studio Pro',
    logo: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFnZW5jeSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTgzODgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=200',
    description: 'Award-winning design agency creating exceptional digital experiences',
    industry: 'Design & Creative',
    size: '50-100 employees',
    website: 'creativestudiopro.com',
    location: 'New York, NY',
    founded: 2015,
    rating: 4.6,
    reviewCount: 189
  },
  {
    id: 'comp3',
    name: 'Growth Marketing Co.',
    logo: 'https://images.unsplash.com/photo-1603202662706-62ead3176b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4NDAyNjU3fDA&ixlib=rb-4.1.0&q=80&w=200',
    description: 'Driving exponential growth through data-driven marketing strategies',
    industry: 'Marketing & Advertising',
    size: '100-500 employees',
    website: 'growthmarketingco.com',
    location: 'Los Angeles, CA',
    founded: 2016,
    rating: 4.4,
    reviewCount: 267
  },
  {
    id: 'comp4',
    name: 'CloudScale Systems',
    logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwb2ZmaWNlJTIwbW9kZXJufGVufDF8fHx8MTc1ODQzNDQzOXww&ixlib=rb-4.1.0&q=80&w=200',
    description: 'Scalable cloud infrastructure solutions for modern businesses',
    industry: 'Cloud Computing',
    size: '200-500 employees',
    website: 'cloudscalesystems.com',
    location: 'Austin, TX',
    founded: 2019,
    rating: 4.7,
    reviewCount: 145
  },
  {
    id: 'comp5',
    name: 'InnovateLabs',
    logo: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4MzczNDEzfDA&ixlib=rb-4.1.0&q=80&w=200',
    description: 'Transforming ideas into market-leading products',
    industry: 'Product Development',
    size: '100-200 employees',
    website: 'innovatelabs.com',
    location: 'Seattle, WA',
    founded: 2017,
    rating: 4.9,
    reviewCount: 298
  },
  {
    id: 'comp6',
    name: 'Global Sales Partners',
    logo: 'https://images.unsplash.com/photo-1738566061688-47e66a008254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwb2ZmaWNlJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1ODQ1ODIzNnww&ixlib=rb-4.1.0&q=80&w=200',
    description: 'Connecting businesses worldwide through strategic partnerships',
    industry: 'Sales & Business Development',
    size: '300-500 employees',
    website: 'globalsalespartners.com',
    location: 'Chicago, IL',
    founded: 2014,
    rating: 4.3,
    reviewCount: 412
  }
];

export const mockCategories: JobCategory[] = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Design' },
  { id: '3', name: 'Marketing' },
  { id: '4', name: 'Sales' },
  { id: '5', name: 'Finance' },
];

export const mockJobs: Job[] = [
  {
    id: '1',
    companyId: 'comp1',
    postedByUserId: 'user1',
    title: 'Senior Frontend Developer',
    slug: 'senior-frontend-developer',
    shortDescription: 'Join our team to build amazing user experiences with React and TypeScript.',
    description: 'We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for developing high-quality web applications using modern technologies.',
    requirements: 'Experience with React, TypeScript, Node.js. Strong problem-solving skills.',
    benefits: 'Competitive salary, health insurance, flexible working hours, remote work options.',
    salaryMin: 80000,
    salaryMax: 120000,
    currency: 'USD',
    jobType: 'Full-time',
    location: 'San Francisco, CA',
    categoryId: '1',
    status: 'Open',
    viewsCount: 234,
    postedAt: '2024-01-15T08:00:00Z',
    expiresAt: '2024-03-15T23:59:59Z',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
    category: { id: '1', name: 'Technology' },
    skills: [
      { id: 's1', jobId: '1', name: 'React' },
      { id: 's2', jobId: '1', name: 'TypeScript' },
      { id: 's3', jobId: '1', name: 'JavaScript' },
    ],
    tags: [
      { id: 't1', jobId: '1', name: 'Remote' },
      { id: 't2', jobId: '1', name: 'Tech' },
    ],
    company: {
      id: 'comp1',
      name: 'TechVision Inc.',
      logo: 'https://images.unsplash.com/photo-1746046936818-8d432ebd3d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGxvZ28lMjBtb2Rlcm58ZW58MXx8fHwxNzU4MzczMTM0fDA&ixlib=rb-4.1.0&q=80&w=200',
      rating: 4.8,
      reviewCount: 324
    }
  },
  {
    id: '2',
    companyId: 'comp2',
    postedByUserId: 'user2',
    title: 'UX/UI Designer',
    slug: 'ux-ui-designer',
    shortDescription: 'Create beautiful and intuitive user interfaces for our digital products.',
    description: 'We are seeking a talented UX/UI Designer to create exceptional user experiences across our digital products.',
    requirements: 'Experience with Figma, Adobe Creative Suite, user research, prototyping.',
    benefits: 'Creative environment, design budget, conference attendance, flexible schedule.',
    salaryMin: 65000,
    salaryMax: 95000,
    currency: 'USD',
    jobType: 'Full-time',
    location: 'New York, NY',
    categoryId: '2',
    status: 'Open',
    viewsCount: 187,
    postedAt: '2024-01-18T10:30:00Z',
    expiresAt: '2024-03-18T23:59:59Z',
    createdAt: '2024-01-18T10:30:00Z',
    updatedAt: '2024-01-18T10:30:00Z',
    category: { id: '2', name: 'Design' },
    skills: [
      { id: 's4', jobId: '2', name: 'Figma' },
      { id: 's5', jobId: '2', name: 'Adobe XD' },
      { id: 's6', jobId: '2', name: 'Prototyping' },
    ],
    tags: [
      { id: 't3', jobId: '2', name: 'Creative' },
      { id: 't4', jobId: '2', name: 'Design' },
    ],
    company: {
      id: 'comp2',
      name: 'Creative Studio Pro',
      logo: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFnZW5jeSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTgzODgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=200',
      rating: 4.6,
      reviewCount: 189
    }
  },
  {
    id: '3',
    companyId: 'comp3',
    postedByUserId: 'user3',
    title: 'Marketing Manager',
    slug: 'marketing-manager',
    shortDescription: 'Lead our marketing initiatives and drive brand growth across multiple channels.',
    description: 'We are looking for an experienced Marketing Manager to develop and execute marketing strategies.',
    requirements: 'Digital marketing experience, SEO/SEM knowledge, content creation skills.',
    benefits: 'Marketing budget, team leadership opportunities, performance bonuses.',
    salaryMin: 70000,
    salaryMax: 100000,
    currency: 'USD',
    jobType: 'Full-time',
    location: 'Los Angeles, CA',
    categoryId: '3',
    status: 'Open',
    viewsCount: 156,
    postedAt: '2024-01-20T14:00:00Z',
    expiresAt: '2024-03-20T23:59:59Z',
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-01-20T14:00:00Z',
    category: { id: '3', name: 'Marketing' },
    skills: [
      { id: 's7', jobId: '3', name: 'Digital Marketing' },
      { id: 's8', jobId: '3', name: 'SEO' },
      { id: 's9', jobId: '3', name: 'Content Creation' },
    ],
    tags: [
      { id: 't5', jobId: '3', name: 'Marketing' },
      { id: 't6', jobId: '3', name: 'Growth' },
    ],
    company: {
      id: 'comp3',
      name: 'Growth Marketing Co.',
      logo: 'https://images.unsplash.com/photo-1603202662706-62ead3176b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4NDAyNjU3fDA&ixlib=rb-4.1.0&q=80&w=200',
      rating: 4.4,
      reviewCount: 267
    }
  },
  {
    id: '4',
    companyId: 'comp4',
    postedByUserId: 'user4',
    title: 'Backend Developer',
    slug: 'backend-developer',
    shortDescription: 'Build scalable backend systems using Node.js and cloud technologies.',
    description: 'Join our backend team to develop robust APIs and microservices architecture.',
    requirements: 'Node.js, MongoDB, AWS, Docker experience required.',
    benefits: 'Cloud certifications, technical conferences, flexible remote work.',
    salaryMin: 75000,
    salaryMax: 110000,
    currency: 'USD',
    jobType: 'Full-time',
    location: 'Austin, TX',
    categoryId: '1',
    status: 'Open',
    viewsCount: 203,
    postedAt: '2024-01-22T09:15:00Z',
    expiresAt: '2024-03-22T23:59:59Z',
    createdAt: '2024-01-22T09:15:00Z',
    updatedAt: '2024-01-22T09:15:00Z',
    category: { id: '1', name: 'Technology' },
    skills: [
      { id: 's10', jobId: '4', name: 'Node.js' },
      { id: 's11', jobId: '4', name: 'MongoDB' },
      { id: 's12', jobId: '4', name: 'AWS' },
    ],
    tags: [
      { id: 't7', jobId: '4', name: 'Backend' },
      { id: 't8', jobId: '4', name: 'Cloud' },
    ],
    company: {
      id: 'comp4',
      name: 'CloudScale Systems',
      logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwb2ZmaWNlJTIwbW9kZXJufGVufDF8fHx8MTc1ODQzNDQzOXww&ixlib=rb-4.1.0&q=80&w=200',
      rating: 4.7,
      reviewCount: 145
    }
  },
  {
    id: '5',
    companyId: 'comp5',
    postedByUserId: 'user5',
    title: 'Product Manager',
    slug: 'product-manager',
    shortDescription: 'Drive product strategy and work closely with engineering and design teams.',
    description: 'We are seeking a Product Manager to lead product development from conception to launch.',
    requirements: 'Product management experience, agile methodologies, stakeholder management.',
    benefits: 'Equity options, product conference budget, cross-functional collaboration.',
    salaryMin: 90000,
    salaryMax: 130000,
    currency: 'USD',
    jobType: 'Full-time',
    location: 'Seattle, WA',
    categoryId: '1',
    status: 'Open',
    viewsCount: 178,
    postedAt: '2024-01-25T11:45:00Z',
    expiresAt: '2024-03-25T23:59:59Z',
    createdAt: '2024-01-25T11:45:00Z',
    updatedAt: '2024-01-25T11:45:00Z',
    category: { id: '1', name: 'Technology' },
    skills: [
      { id: 's13', jobId: '5', name: 'Product Strategy' },
      { id: 's14', jobId: '5', name: 'Agile' },
      { id: 's15', jobId: '5', name: 'Analytics' },
    ],
    tags: [
      { id: 't9', jobId: '5', name: 'Product' },
      { id: 't10', jobId: '5', name: 'Strategy' },
    ],
    company: {
      id: 'comp5',
      name: 'InnovateLabs',
      logo: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4MzczNDEzfDA&ixlib=rb-4.1.0&q=80&w=200',
      rating: 4.9,
      reviewCount: 298
    }
  },
  {
    id: '6',
    companyId: 'comp6',
    postedByUserId: 'user6',
    title: 'Sales Representative',
    slug: 'sales-representative',
    shortDescription: 'Drive revenue growth by building relationships with new and existing clients.',
    description: 'Join our sales team to expand our customer base and drive business growth.',
    requirements: 'Sales experience, CRM knowledge, excellent communication skills.',
    benefits: 'Commission structure, sales incentives, team events.',
    salaryMin: 50000,
    salaryMax: 80000,
    currency: 'USD',
    jobType: 'Full-time',
    location: 'Chicago, IL',
    categoryId: '4',
    status: 'Open',
    viewsCount: 145,
    postedAt: '2024-01-28T16:20:00Z',
    expiresAt: '2024-03-28T23:59:59Z',
    createdAt: '2024-01-28T16:20:00Z',
    updatedAt: '2024-01-28T16:20:00Z',
    category: { id: '4', name: 'Sales' },
    skills: [
      { id: 's16', jobId: '6', name: 'Sales' },
      { id: 's17', jobId: '6', name: 'CRM' },
      { id: 's18', jobId: '6', name: 'Negotiation' },
    ],
    tags: [
      { id: 't11', jobId: '6', name: 'Sales' },
      { id: 't12', jobId: '6', name: 'B2B' },
    ],
    company: {
      id: 'comp6',
      name: 'Global Sales Partners',
      logo: 'https://images.unsplash.com/photo-1738566061688-47e66a008254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwb2ZmaWNlJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1ODQ1ODIzNnww&ixlib=rb-4.1.0&q=80&w=200',
      rating: 4.3,
      reviewCount: 412
    }
  },
];

export type BlogArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishDate: string;  // ISO "YYYY-MM-DD"
  views?: number;
  comments?: number;
  featured?: boolean;
  image: StaticImageData | string;
};

export const blogArticles: BlogArticle[] = [
  {
    id: "a1",
    title: "Nhân viên bán hàng là gì? Từ A-Z về nghề Sales",
    excerpt:
      "Tổng quan vai trò, kỹ năng cốt lõi và lộ trình phát triển để theo đuổi nghề Sales một cách bền vững.",
    category: "KIẾN THỨC CHUYÊN NGÀNH",
    tags: ["sales", "kỹ năng", "lộ trình"],
    publishDate: "2025-07-04",
    views: 1234,
    comments: 18,
    featured: true,
    image: MainImage,
  },
  {
    id: "a2",
    title: "Checklist 10 bước chuẩn bị phỏng vấn",
    excerpt:
      "Từ nghiên cứu công ty, luyện câu trả lời đến đặt câu hỏi ngược thật tinh tế.",
    category: "BÍ KÍP TÌM VIỆC",
    tags: ["phỏng vấn", "tips"],
    publishDate: "2025-07-03",
    views: 860,
    comments: 7,
    featured: true,
    image: job2Image,
  },
  {
    id: "a3",
    title: "Cách viết CV nổi bật cho vị trí Sales",
    excerpt:
      "Tập trung vào thành tích đo lường được, cấu trúc rõ ràng và nhấn mạnh kỹ năng phù hợp JD.",
    category: "BÍ KÍP TÌM VIỆC",
    tags: ["cv", "sales"],
    publishDate: "2025-06-28",
    views: 640,
    comments: 2,
    featured: true,            // ✅ thêm cờ featured để đủ 3 card
    image: job3Image,
  },
  {
    id: "a4",
    title: "Chế độ lương thưởng trong ngành bán lẻ",
    excerpt:
      "Mức lương cơ bản, KPI doanh số, thưởng nóng và phúc lợi theo từng cấp bậc.",
    category: "CHẾ ĐỘ LƯƠNG THƯỞNG",
    tags: ["lương", "thưởng", "bán lẻ"],
    publishDate: "2025-07-10",
    views: 980,
    comments: 11,
    image: job4Image,
  },
  {
    id: "a5",
    title: "Xu hướng thị trường việc làm 2025",
    excerpt:
      "Kỹ năng dữ liệu, tự động hoá và thương mại số tiếp tục dẫn dắt nhu cầu tuyển dụng.",
    category: "THỊ TRƯỜNG & XU HƯỚNG",
    tags: ["xu hướng", "2025"],
    publishDate: "2025-07-15",
    views: 1500,
    comments: 23,
    image: jobImage,
  },
];