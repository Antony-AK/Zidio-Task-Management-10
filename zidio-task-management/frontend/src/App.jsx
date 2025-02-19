import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/SideBar/Sidebar'
import { data, Route, Routes, useLocation } from 'react-router-dom'
import Projects from './pages/Projects/Projects'
import { images } from './assets/data'
import Dashboard from './pages/Dashboard/Dashboard'
import Calender from './pages/Calender/Calender'
import Members from './pages/Members/Members'
import Login from './pages/Login/Login'
import { useEffect, useState, } from 'react'
import { fetchProjects, fetchSummary, fetchEvents } from './utils/api'



function App() {


  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState([]);
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        setError("Failed to fetch peojects");
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const summaryData = await fetchSummary();
      const projectData = await fetchProjects();
      setSummary(summaryData || []);
      setProjects(projectData || []);
    };

    getData();
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    getEvents();
  }, []);



  const togglesidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();
  const isAuthpage = location.pathname === "/login";


  if (Loading) return <div>Loading Projects...</div>;
  if (error) return <div>{error}</div>



  return (
    <>
      {isAuthpage ? (<Login />) :
        (<div className="zidio-app w-full h-screen pt-3 pr-3">
          <Navbar toggleSidebar={togglesidebar} />
          <Sidebar projects={projects} isOpen={isSidebarOpen} toggleSidebar={togglesidebar} />
          <div className="homediv lg:w-[calc(100%-18.22%)] w-[99%] ml-3 bg-lightase lg:h-[618px] md:h-[1150px] h-[1900px] border flex flex-col rounded-l-2xl rounded-r-2xl lg:ml-[18.22%] mt-2">
            <Routes>
              <Route path='/projects/:_id' element={<Projects projects={projects} />} />
              <Route path='/dashboard' element={<Dashboard summary={summary} projects={projects} />} />
              <Route path='/calender' element={<Calender events={events} setEvents={setEvents} />} />
              <Route path='/members' element={<Members />} />
              <Route path='/login' element={<Login />} />

            </Routes>
          </div>
        </div>
        )}





    </>
  )
}

export default App
