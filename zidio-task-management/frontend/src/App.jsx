import "./App.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/SideBar/Sidebar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Projects from "./pages/Projects/Projects";
import Dashboard from "./pages/Dashboard/Dashboard";
import Calender from "./pages/Calender/Calender";
import Members from "./pages/Members/Members";
import Login from "./pages/Login/Login";
import { useEffect, useState } from "react";
import { fetchProjects, fetchSummary, fetchEvents } from "./utils/api";
import { useAuth } from "./Context/AuthContext";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login";

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [summary, setSummary] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryData, projectData, eventData] = await Promise.all([
          fetchSummary(),
          fetchProjects(),
          fetchEvents(),
        ]);
        setSummary(summaryData || []);
        setProjects(projectData || []);
        setEvents(eventData || []);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    AOS.init(); }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);


  if (loading) return <div className="text-center mt-10 text-red-500">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {isAuthPage ? (
        <Login />
      ) : user?.isAuthenticated ? (
        <div className="zidio-app w-full h-screen pt-3 pr-3">
          <Navbar toggleSidebar={toggleSidebar} user={user} />
          <Sidebar projects={projects} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="homediv lg:w-[calc(100%-18.22%)] w-[99%] ml-3 bg-lightase lg:h-[618px] md:h-[1150px] h-[1900px] border flex flex-col rounded-l-2xl rounded-r-2xl lg:ml-[18.22%] mt-2">
            <Routes>
              <Route path="/" element={<Dashboard summary={summary} projects={projects} />} />
              <Route path="/projects/:_id" element={<PrivateRoute allowedRoles={["manager", "user"]}><Projects projects={projects} /></PrivateRoute>} />
              <Route path="/calender" element={<PrivateRoute allowedRoles={["manager", "user"]}><Calender events={events} setEvents={setEvents} /></PrivateRoute>} />
              <Route path="/members" element={<PrivateRoute allowedRoles={["admin"]}> <Members /></PrivateRoute>} />
              <Route path="/login" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}

export default App;
