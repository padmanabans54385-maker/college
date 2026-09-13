import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Colleges from "./pages/Colleges";
import CollegeDetails from "./pages/CollegeDetails";
import CollegeEnquiry from "./pages/CollegeEnquiry";
import CollegeApplication from "./pages/CollegeApplication";
import ApplicationDetails from "./pages/ApplicationDetails";

import CollegeDashboard from "./pages/CollegeDashboard";
import CollegeApplicationReview from "./pages/CollegeApplicationReview";

import AdminDashboard from "./pages/AdminDashboard";
import PortalRedirect from "./pages/PortalRedirect";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/colleges" element={<Colleges />} />

        <Route
          path="/colleges/:collegeId"
          element={<CollegeDetails />}
        />

        <Route
          path="/colleges/:collegeId/enquiry"
          element={<CollegeEnquiry />}
        />

        <Route
          path="/colleges/:collegeId/apply"
          element={<CollegeApplication />}
        />

        {/* Student */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<PortalRedirect />}
          />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={["student"]} />
          }
        >
          <Route
            path="/dashboard/student"
            element={<Dashboard />}
          />

          <Route
            path="/applications/:applicationId"
            element={<ApplicationDetails />}
          />
        </Route>

        {/* College */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["college"]} />
          }
        >
          <Route
            path="/college"
            element={<CollegeDashboard />}
          />

          <Route
            path="/college/applications/:applicationId"
            element={<CollegeApplicationReview />}
          />
        </Route>

        {/* Admin */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]} />
          }
        >
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;