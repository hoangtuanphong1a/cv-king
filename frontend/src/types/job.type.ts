import { Company } from "./company.type";

  // types/job.type.ts
  export type JobStatus = "active" | "draft" | "expired";
  export type Currency = "USD" | "VND";

  // export interface Job {
  //   id?: number;
  //   slug?: string;
  //   title: string;
  //   logo: string;
  //   company: string;
  //   location: string;
  //   type: string; // Toàn thời gian | Bán thời gian | Hợp đồng
  //   mode?: string; // Remote | Hybrid | Văn phòng
  //   level?: string; // Junior | Mid | Senior
  //   salaryMin: string;
  //   salaryMax: string;
  //   salaryCurrency: Currency;
  //   description: string;
  //   requirements?: string;
  //   benefits?: string;
  //   deadline?: string; // yyyy-mm-dd
  //   email?: string;
  //   urgent: boolean;
  //   featured: boolean;
  //   posted?: string; // yyyy-mm-dd
  //   expires: string; // yyyy-mm-dd
  //   status?: JobStatus;
  //   applications?: number;
  //   views?: number;
  //   skills: string[];
  // }
export interface JobView {
  id: string;
  jobId: string;
  viewerUserId: string;
  sessionId: string;
  viewedAt: string; // ISO Date string
}

export interface Job {
  id: string;
  companyId: string;
  postedByUserId: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  requirements: string;
  benefits: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  jobType: string; // E.g., "Full-time", "Part-time"
  location: string;
  categoryId: string;
  status: string; // E.g., "Open", "Closed"
  viewsCount: number;
  postedAt: string; // ISO Date string
  expiresAt: string; // ISO Date string
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  category: JobCategory;
  skills: JobSkill[];
  tags: JobTag[];
  company?: Company;
}

export interface JobCategory {
  id: string;
  name: string;
}

export interface JobSkill {
  id: string;
  jobId: string;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface JobTag {
  id: string;
  jobId: string;
  name: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobSeekerProfileId: string;
  cvId: string;
  coverLetter: string;
  status: string; // E.g., "Pending", "Reviewed", "Accepted", "Rejected"
  appliedAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  isDeleted: boolean;
}

export interface ApplicationEvent {
  id: string;
  jobApplicationId: string;
  eventType: string; // E.g., "StatusChanged", "InterviewScheduled"
  eventData: string; // JSON or text data related to the event
  createdAt: string; // ISO Date string
}

export interface SavedJob {
  id: string;
  jobSeekerProfileId: string;
  jobId: string;
  savedAt: string; // ISO Date string
}

export interface JobFilters {
  type: string[];
  location: string[];
  experience: string[];
  salaryRange: string[];
  category: JobCategory[];
}