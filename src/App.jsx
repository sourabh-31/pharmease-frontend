import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { MedicineProvider } from "./context/MedicineContext";
import { InvoiceProvider } from "./context/InvoiceContext";

import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Invoice from "./pages/Invoice";
import Customers from "./pages/Customers";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import MedicineTable from "./pages/MedicineTable";
import GroupsTable from "./pages/GroupsTable";
import ExpiredTable from "./pages/ExpiredTable";
import GroupDetail from "./pages/GroupDetail";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import ProtectedRoute from "./ui/ProtectedRoute";
import { useAuthContext } from "./context/AuthContext";
import { useReportContext } from "./context/ReportContext";
import LiveStat from "./features/live-stat/LiveStat";
import Notification from "./features/notifications/Notification";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const { isAuthenticated } = useAuthContext();

  const { isStatVisible, isNotificationVisible } = useReportContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MedicineProvider>
        <InvoiceProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LandingPage />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Register />
                  )
                }
              />
              <Route
                path="/forgot-password"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <ForgotPasswordPage />
                  )
                }
              />
              <Route
                path="/reset-password/:resetId"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <ResetPasswordPage />
                  )
                }
              />
              {isAuthenticated && (
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />}>
                    <Route path="medicines" element={<MedicineTable />} />
                    <Route path="groups" element={<GroupsTable />} />
                    <Route path="groups/:group" element={<GroupDetail />} />
                    <Route path="expired" element={<ExpiredTable />} />
                  </Route>
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/invoice" element={<Invoice />} />
                  <Route path="/manage-customer" element={<Customers />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              )}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </InvoiceProvider>
      </MedicineProvider>

      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
      {isStatVisible && (
        <div className="fixed bottom-2 right-4">
          <LiveStat />
        </div>
      )}

      {isNotificationVisible && (
        <div className="absolute top-20 left-[25rem]">
          <Notification />
        </div>
      )}
    </QueryClientProvider>
  );
}

export default App;
