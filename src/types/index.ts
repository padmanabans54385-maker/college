export type UserRole = "student" | "college" | "admin";

export type VerificationStatus =
  | "official"
  | "verified"
  | "historical"
  | "estimated"
  | "user-generated";

export type LeadStatus =
  | "new"
  | "contacted"
  | "follow-up"
  | "converted"
  | "closed";

export type CounsellingStatus = "new" | "scheduled" | "completed" | "closed";

export type DataSourceFields = {
  source?: string;
  sourceUrl?: string;
  lastUpdated?: unknown;
  verificationStatus?: VerificationStatus;
};

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  collegeId?: string;
  profileImage?: string;

  preferredState?: string;
  preferredDistrict?: string;
  preferredCourseIds?: string[];
  preferredCourse?: string;
  preferredLocations?: string[];
  budget?: string;
  academicLevel?: string;
  tneaRank?: string;
  cutoff?: string;
  community?: string;

  dateOfBirth?: string;
  gender?: string;

  address?: string;
  city?: string;
  pincode?: string;

  schoolName?: string;
  board?: string;
  passingYear?: string;
  percentage?: string;

  createdAt: unknown;
  updatedAt?: unknown;
}

export interface CollegeFees {
  tuition?: string;
  hostel?: string;
  transport?: string;
  other?: string;
  estimatedAnnual?: string;
}

export interface CollegeHostel {
  available?: boolean;
  details?: string;
  fees?: string;
}

export interface CollegePlacements {
  rate?: string;
  averagePackage?: string;
  highestPackage?: string;
  medianPackage?: string;
  internships?: string;
  year?: string;
  source?: string;
  sourceUrl?: string;
}

export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  district: string;
  state: string;
  city?: string;
  description: string;
  logo?: string;
  images?: string[];
  courses?: string[];
  website?: string;
  phone?: string;
  email?: string;
  verified: boolean;
  university?: string;
  collegeType?: string;
  autonomous?: boolean;
  accreditation?: string;
  naacGrade?: string;
  nirfRank?: string;
  tneaCode?: string;
  tneaParticipant?: boolean;
  hostelAvailable?: boolean;
  scholarshipAvailable?: boolean;
  feeRange?: string;
  fees?: CollegeFees;
  hostel?: CollegeHostel;
  facilities?: string[];
  placements?: CollegePlacements;
  recruiters?: string[];
  cutoffIndicator?: string;
  contact?: {
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
  faqs?: { question: string; answer: string }[];
  eligibility?: string;
  admissionNotes?: string;
  source?: string;
  sourceUrl?: string;
  verificationStatus?: VerificationStatus;
  createdAt: unknown;
  updatedAt?: unknown;
}

export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  createdAt: unknown;
  updatedAt?: unknown;
}

export interface Course {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  description: string;
  duration: string;
  eligibility: string;
  collegeIds: string[];
  published: boolean;
  createdAt: unknown;
  updatedAt?: unknown;
}

export interface Enquiry {
  id: string;
  userId?: string;
  collegeId: string;
  collegeName: string;
  name: string;
  email: string;
  phone: string;
  course?: string;
  message?: string;
  status: "new" | "contacted" | "closed";
  createdAt: unknown;
  updatedAt?: unknown;
}

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "reviewing"
  | "accepted"
  | "rejected";

export interface ApplicationDocument {
  url: string;
  name: string;
  type: string;
  uploadedAt?: unknown;
}

export interface ApplicationDocuments {
  photo?: ApplicationDocument | string;
  marksheet?: ApplicationDocument | string;
  idProof?: ApplicationDocument | string;
}

export interface ApplicationStatusHistory {
  status: ApplicationStatus;
  message?: string;
  changedBy?: string;
  changedAt: unknown;
}

export interface Application {
  id: string;
  userId: string;
  collegeId: string;
  collegeName: string;
  courseId?: string;
  courseName: string;
  status: ApplicationStatus;

  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  academicDetails: {
    schoolName: string;
    board: string;
    passingYear: string;
    percentage: string;
    entranceExam?: string;
    entranceScore?: string;
  };

  documents?: ApplicationDocuments;
  collegeRemarks?: string;
  statusHistory?: ApplicationStatusHistory[];

  createdAt: unknown;
  updatedAt?: unknown;
}

export type ScholarshipType =
  | "government"
  | "private"
  | "college"
  | "ngo"
  | "merit"
  | "need-based"
  | "community"
  | "course-specific";

export interface Scholarship {
  id: string;
  name: string;
  slug: string;
  provider: string;
  type: ScholarshipType;
  description: string;
  amount: string;
  eligibility: string;
  incomeLimit?: string;
  educationLevel?: string;
  category?: string;
  course?: string;
  state?: string;
  applicationStart?: string;
  applicationDeadline?: string;
  applicationUrl?: string;
  officialWebsite?: string;
  requiredDocuments?: string;
  image?: string;
  published: boolean;
  source?: string;
  sourceUrl?: string;
  createdAt: unknown;
  updatedAt?: unknown;
}

export interface OnlineCourse {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  instructor: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  image?: string;
  lessons: number;
  published: boolean;
  createdAt: unknown;
  updatedAt?: unknown;
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  status: "active" | "completed";
  progress: number;
  enrolledAt: unknown;
  updatedAt?: unknown;
}

export interface SavedCollege {
  id: string;
  userId: string;
  collegeId: string;
  collegeName: string;
  collegeLogo?: string;
  location?: string;
  district?: string;
  createdAt: unknown;
}

export interface SavedScholarship {
  id: string;
  userId: string;
  scholarshipId: string;
  scholarshipName: string;
  provider?: string;
  amount?: string;
  createdAt: unknown;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  college?: string;
  course?: string;
  year?: string;
  message: string;
  testimonial?: string;
  avatar?: string;
  photo?: string;
  permissionStatus?: boolean;
  published: boolean;
  createdAt?: unknown;
}

export interface CutoffRecord extends DataSourceFields {
  id: string;
  year: number | string;
  collegeId: string;
  collegeName?: string;
  branch: string;
  community: string;
  cutoff: number;
  rank?: number;
  district?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface AdmissionUpdate extends DataSourceFields {
  id: string;
  title: string;
  slug?: string;
  category: string;
  summary: string;
  content?: string;
  thumbnail?: string;
  importantDate?: string;
  officialLink?: string;
  tags?: string[];
  published: boolean;
  publishedAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface BlogPost extends DataSourceFields {
  id: string;
  title: string;
  slug: string;
  seoTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  author?: string;
  category: string;
  tags?: string[];
  faqs?: { question: string; answer: string }[];
  published: boolean;
  publishedAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  interest?: string;
  course?: string;
  college?: string;
  rank?: string;
  cutoff?: string;
  message?: string;
  status: LeadStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface CounsellingRequest {
  id: string;
  userId?: string;
  name?: string;
  studentName: string;
  parentName?: string;
  phone: string;
  email?: string;
  academicQualification?: string;
  cutoff?: string;
  rank?: string;
  preferredCourse?: string;
  preferredLocation?: string;
  preferredCollege?: string;
  message?: string;
  counsellingMode?: string;
  preferredDateTime?: string;
  status: CounsellingStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface ChoiceListItem {
  collegeId?: string;
  collegeName: string;
  branch: string;
  location?: string;
  historicalCutoff?: number;
  competitiveness?: "dream" | "target" | "safe";
  estimatedCompetitiveness?: string;
  fees?: string;
  placement?: string;
  reason: string;
}

export interface ChoiceList {
  id: string;
  userId: string;
  studentName: string;
  tneaRank?: string;
  community?: string;
  cutoff?: string;
  preferredBranches?: string[];
  preferredCities?: string[];
  budget?: string;
  hostelRequired?: boolean;
  collegeTypePreference?: string;
  placementPreference?: string;
  dream: ChoiceListItem[];
  target: ChoiceListItem[];
  safe: ChoiceListItem[];
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface SavedComparison {
  id: string;
  userId: string;
  collegeIds: string[];
  createdAt?: unknown;
}

export interface SiteContactSettings {
  phone?: string;
  phoneSecondary?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  mapsUrl?: string;
  workingHours?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface SiteSettings {
  contact: SiteContactSettings;
}
