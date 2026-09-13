export type UserRole = "student" | "college" | "admin";

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

export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  district: string;
  state: string;
  description: string;
  logo?: string;
  images?: string[];
  courses?: string[];
  website?: string;
  phone?: string;
  email?: string;
  verified: boolean;
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
  | "ngo";

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
  state?: string;
  applicationStart?: string;
  applicationDeadline?: string;
  applicationUrl?: string;
  image?: string;
  published: boolean;
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
  role: string;
  college?: string;
  message: string;
  avatar?: string;
  published: boolean;
  createdAt?: unknown;
}