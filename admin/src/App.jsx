import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import PropertyManagement from "./pages/PropertyManagement";
import PropertyForm from "./pages/PropertyForm";
import LeadManagement from "./pages/LeadManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unprotected Auth Login */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected Dashboard console */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="properties" element={<PropertyManagement />} />
          <Route path="properties/new" element={<PropertyForm />} />
          <Route path="properties/edit/:id" element={<PropertyForm />} />
          <Route path="leads" element={<LeadManagement />} />
        </Route>

        {/* Catch-all redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
