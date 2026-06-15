import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import OrganizationsList from './pages/Organizations/OrganizationsList';
import OrganizationDetail from './pages/Organizations/OrganizationDetail';
import EmployeesList from './pages/Employees/EmployeesList';
import EmployeeDetail from './pages/Employees/EmployeeDetail';
import AgentsList from './pages/Agents/AgentsList';
import AgentDetail from './pages/Agents/AgentDetail';
import TasksList from './pages/Tasks/TasksList';
import TaskDetail from './pages/Tasks/TaskDetail';
import TicketsList from './pages/Tickets/TicketsList';
import TicketDetail from './pages/Tickets/TicketDetail';
import DocumentsList from './pages/Documents/DocumentsList';
import WorkflowsList from './pages/Workflows/WorkflowsList';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import { useAuthStore } from './store/authStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Layout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Organization Management */}
            <Route path="organizations" element={<OrganizationsList />} />
            <Route path="organizations/:id" element={<OrganizationDetail />} />
            
            {/* Employee Management */}
            <Route path="employees" element={<EmployeesList />} />
            <Route path="employees/:id" element={<EmployeeDetail />} />
            
            {/* Agent Management */}
            <Route path="agents" element={<AgentsList />} />
            <Route path="agents/:id" element={<AgentDetail />} />
            
            {/* Task Management */}
            <Route path="tasks" element={<TasksList />} />
            <Route path="tasks/:id" element={<TaskDetail />} />
            
            {/* Ticketing System */}
            <Route path="tickets" element={<TicketsList />} />
            <Route path="tickets/:id" element={<TicketDetail />} />
            
            {/* Document Management */}
            <Route path="documents" element={<DocumentsList />} />
            
            {/* Workflow Management */}
            <Route path="workflows" element={<WorkflowsList />} />
            
            {/* Reports */}
            <Route path="reports" element={<Reports />} />
            
            {/* Settings */}
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
