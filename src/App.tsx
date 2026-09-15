import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import { LoadingSkeleton } from "./components/ui/States";
import { ErrorBoundary } from "./components/ErrorBoundary";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PortalRedirect from "./pages/PortalRedirect";

const Colleges = lazy(() => import("./pages/Colleges"));
const CollegeDetails = lazy(() => import("./pages/CollegeDetails"));
const CollegeEnquiry = lazy(() => import("./pages/CollegeEnquiry"));
const CollegeApplication = lazy(() => import("./pages/CollegeApplication"));
const ApplicationDetails = lazy(() => import("./pages/ApplicationDetails"));
const CollegeCompare = lazy(() => import("./pages/CollegeCompare"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const Scholarships = lazy(() => import("./pages/Scholarships"));
const ScholarshipDetails = lazy(() => import("./pages/ScholarshipDetails"));
const OnlineCourses = lazy(() => import("./pages/OnlineCourses"));
const OnlineCourseDetails = lazy(() => import("./pages/OnlineCourseDetails"));
const OnlineCourseLearn = lazy(() => import("./pages/OnlineCourseLearn"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const StudentProfile = lazy(() => import("./pages/StudentProfile"));
const CollegeDashboard = lazy(() => import("./pages/CollegeDashboard"));
const CollegeApplicationReview = lazy(() => import("./pages/CollegeApplicationReview"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminColleges = lazy(() => import("./pages/AdminColleges"));
const AdminCourses = lazy(() => import("./pages/AdminCourses"));
const AdminScholarships = lazy(() => import("./pages/AdminScholarships"));
const AdminOnlineCourses = lazy(() => import("./pages/AdminOnlineCourses"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));
const AdminCutoffs = lazy(() => import("./pages/AdminCutoffs"));
const AdminUpdates = lazy(() => import("./pages/AdminUpdates"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));
const AdminFaqs = lazy(() => import("./pages/AdminFaqs"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AdminCounselling = lazy(() => import("./pages/AdminCounselling"));
const AdminTestimonials = lazy(() => import("./pages/AdminTestimonials"));
const Tnea = lazy(() => import("./pages/Tnea"));
const TneaCutoff = lazy(() => import("./pages/TneaCutoff"));
const TneaPredictor = lazy(() => import("./pages/TneaPredictor"));
const TneaChoiceList = lazy(() => import("./pages/TneaChoiceList"));
const Admissions = lazy(() => import("./pages/Admissions"));
const Fees = lazy(() => import("./pages/Fees"));
const Placements = lazy(() => import("./pages/Placements"));
const Updates = lazy(() => import("./pages/Updates"));
const Counselling = lazy(() => import("./pages/Counselling"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const MyColleges = lazy(() => import("./pages/MyColleges"));
const MyComparisons = lazy(() => import("./pages/MyComparisons"));
const MyChoiceList = lazy(() => import("./pages/MyChoiceList"));
const MyApplications = lazy(() => import("./pages/MyApplications"));
const SavedCourses = lazy(() => import("./pages/SavedCourses"));
const CounsellingRequestPage = lazy(() => import("./pages/CounsellingRequestPage"));

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Suspense fallback={<LoadingSkeleton />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/colleges/:collegeId" element={<CollegeDetails />} />
            <Route path="/compare" element={<CollegeCompare />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/scholarships/:scholarshipId" element={<ScholarshipDetails />} />
            <Route path="/tnea" element={<Tnea />} />
            <Route path="/tnea/cutoff" element={<TneaCutoff />} />
            <Route path="/tnea/predictor" element={<TneaPredictor />} />
            <Route path="/tnea/choice-list" element={<TneaChoiceList />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/counselling" element={<Counselling />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/colleges/:collegeId/enquiry" element={<CollegeEnquiry />} />
          <Route path="/colleges/:collegeId/apply" element={<CollegeApplication />} />
          <Route path="/online-courses" element={<OnlineCourses />} />
          <Route path="/online-courses/:courseId" element={<OnlineCourseDetails />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<PortalRedirect />} />
            <Route path="/profile" element={<StudentProfile />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="/dashboard/student" element={<Dashboard />} />
            <Route path="/applications/:applicationId" element={<ApplicationDetails />} />
            <Route path="/my-colleges" element={<MyColleges />} />
            <Route path="/my-comparisons" element={<MyComparisons />} />
            <Route path="/my-choice-list" element={<MyChoiceList />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/saved-courses" element={<SavedCourses />} />
            <Route path="/counselling-request" element={<CounsellingRequestPage />} />
            <Route path="/online-courses/:courseId/learn" element={<OnlineCourseLearn />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["college"]} />}>
            <Route path="/college" element={<CollegeDashboard />} />
            <Route path="/college/applications/:applicationId" element={<CollegeApplicationReview />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/colleges" element={<AdminColleges />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/admin/scholarships" element={<AdminScholarships />} />
            <Route path="/admin/online-courses" element={<AdminOnlineCourses />} />
            <Route path="/admin/cutoffs" element={<AdminCutoffs />} />
            <Route path="/admin/tnea" element={<AdminUpdates />} />
            <Route path="/admin/admissions" element={<AdminUpdates />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/students" element={<AdminUsers />} />
            <Route path="/admin/counselling" element={<AdminCounselling />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/faqs" element={<AdminFaqs />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/applications" element={<AdminDashboard />} />
            <Route path="/admin/enquiries" element={<AdminLeads />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
