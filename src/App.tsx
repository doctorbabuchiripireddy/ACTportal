import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IncidentProvider } from "./context/IncidentContext";
import { Layout } from "./components/Layout/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { IncidentsPage } from "./pages/IncidentsPage";
import { IncidentDetailPage } from "./pages/IncidentDetailPage";
import { IncidentTrackerPage } from "./pages/IncidentTrackerPage";
import UploadUsers from "./pages/UploadUsers";
import Login from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import UsersPage from "./pages/UsersPage";

const Unauthorized = () => (
  <div className="p-6">
    <h2 className="text-2xl text-red-500 font-bold">Access Denied</h2>
    <p>You do not have permission to view this page.</p>
  </div>
);

function App() {
  return (
    <IncidentProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              path="/upload-users"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <UploadUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Leader"]}>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold gradient-text">
                      Settings – Coming Soon
                    </h2>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* 🔹 Regular Routes */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/incidents/:id" element={<IncidentDetailPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/tracker" element={<IncidentTrackerPage />} />
            <Route
              path="/reports"
              element={
                <div className="p-6">
                  <h2 className="text-2xl font-bold gradient-text">
                    Reports – Coming Soon
                  </h2>
                </div>
              }
            />
            <Route
              path="/team"
              element={
                <div className="p-6">
                  <h2 className="text-2xl font-bold gradient-text">
                    Team Management – Coming Soon
                  </h2>
                </div>
              }
            />
            <Route
              path="/docs"
              element={
                <div className="p-6">
                  <h2 className="text-2xl font-bold gradient-text">
                    Documentation – Coming Soon
                  </h2>
                </div>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </IncidentProvider>
  );
}

export default App;
