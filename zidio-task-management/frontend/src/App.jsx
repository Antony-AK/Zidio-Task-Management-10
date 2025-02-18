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
import { useEffect, useState,  } from 'react'
import { fetchProjects } from './utils/api'

// export const data = {
//   "projects": [
//     {
//       "id": 1,
//       "name": "Website Redesign",
//       "deadline": "2025-03-10",
//       "status": "In Progress",
//       "members": [
//         { "name": "Alice", "profile": images.p7 },
//         { "name": "David", "profile": images.p5 },
//         { "name": "Charlie", "profile": images.p6 },
//         { "name": "Eve", "profile": images.p1 }
//       ],
//       "tasks": [
//         { "id": 101, "status": "TODO", "title": "Gather Requirements", "description": "Collect client needs and preferences.", "members": 3, "profilePics": [images.p7, images.p6, images.p5], "discussions": 5, "priority": "High" },
//         { "id": 102, "status": "TODO", "title": "Create Wireframes", "description": "Design wireframes for homepage and dashboard.", "members": 2, "profilePics": [images.p4, images.p1], "discussions": 3, "priority": "Medium" },
//         { "id": 103, "status": "TODO", "title": "Setup Project Repo", "description": "Initialize GitHub repository with basic structure.", "members": 1, "profilePics": [images.p6], "discussions": 2, "priority": "Low" },
//         { "id": 104, "status": "In_Progress", "title": "Develop Login Page", "description": "Implement user authentication UI.", "members": 2, "profilePics": [images.p1, images.p3], "discussions": 6, "priority": "High" },
//         { "id": 105, "status": "In_Progress", "title": "Style Components", "description": "Apply Tailwind CSS to main components.", "members": 2, "profilePics": [images.p2, images.p4], "discussions": 4, "priority": "Medium" },
//         { "id": 106, "status": "In_Progress", "title": "Create API Endpoints", "description": "Set up backend routes for user management.", "members": 3, "profilePics": [images.p2, images.p3], "discussions": 5, "priority": "High" },
//         { "id": 107, "status": "Review", "title": "Test Responsiveness", "description": "Check UI on different screen sizes.", "members": 2, "profilePics": [images.p3, images.p1], "discussions": 4, "priority": "Medium" },
//         { "id": 108, "status": "Review", "title": "Code Review", "description": "Ensure code follows best practices.", "members": 3, "profilePics": [images.p1, images.p2], "discussions": 6, "priority": "High" },
//         { "id": 109, "status": "Done", "title": "Setup Dev Environment", "description": "Install and configure necessary tools.", "members": 1, "profilePics": [images.p2], "discussions": 3, "priority": "Low" },
//         { "id": 110, "status": "Done", "title": "Project Documentation", "description": "Create README with guidelines.", "members": 2, "profilePics": [images.p4, images.p3], "discussions": 2, "priority": "Medium" }
//       ]
//     },
//     {
//       "id": 2,
//       "name": "Mobile App Development",
//       "deadline": "2025-04-15",
//       "status": "In Progress",
//       "members": [
//         { "name": "Alice", "profile": images.p7 },
//         { "name": "Bob", "profile": images.p6 },
//         { "name": "Charlie", "profile": images.p5 },
//         { "name": "Eve", "profile": images.p2 },
//         { "name": "Frank", "profile": images.p1 }
//       ],
//       "tasks": [
//         { "id": 201, "status": "TODO", "title": "Design App UI", "description": "Sketch app screens and user flows.", "members": 2, "profilePics": [images.p1, images.p4], "discussions": 3, "priority": "High" },
//         { "id": 202, "status": "TODO", "title": "Set Up Firebase", "description": "Initialize database and authentication.", "members": 1, "profilePics": [images.p2], "discussions": 4, "priority": "Medium" },
//         { "id": 203, "status": "TODO", "title": "Define User Roles", "description": "Establish access levels for users.", "members": 2, "profilePics": [images.p3, images.p4], "discussions": 2, "priority": "Low" },
//         { "id": 204, "status": "In_Progress", "title": "Implement User Signup", "description": "Develop registration feature.", "members": 3, "profilePics": [images.p3, images.p4, images.p1], "discussions": 5, "priority": "High" },
//         { "id": 205, "status": "Review", "title": "Bug Fixing", "description": "Resolve reported issues.", "members": 2, "profilePics": [images.p1, images.p7], "discussions": 6, "priority": "Medium" },
//         { "id": 206, "status": "Done", "title": "App Prototype", "description": "Develop basic working prototype.", "members": 2, "profilePics": [images.p3, images.p2], "discussions": 2, "priority": "Low" }
//       ]
//     },
//     {
//       "id": 3,
//       "name": "AI Chatbot Integration",
//       "deadline": "2025-05-20",
//       "status": "Pending",
//       "members": [
//         { "name": "Alice", "profile": images.p1 },
//         { "name": "David", "profile": images.p4 },
//         { "name": "Charlie", "profile": images.p3 },
//         { "name": "Eve", "profile": images.p2 }
//       ],
//       "tasks": [
//         { "id": 301, "status": "TODO", "title": "Define Chatbot Scope", "description": "Outline chatbot functionalities.", "members": 3, "profilePics": [images.p2, images.p4, images.p1], "discussions": 4, "priority": "High" },
//         { "id": 302, "status": "TODO", "title": "Select NLP Model", "description": "Choose AI model for chatbot responses.", "members": 2, "profilePics": [images.p1, images.p3], "discussions": 3, "priority": "Medium" },
//         { "id": 303, "status": "In_Progress", "title": "Develop Chat Interface", "description": "Create UI for chatbot interactions.", "members": 3, "profilePics": [images.p2, images.p3], "discussions": 5, "priority": "High" },
//         { "id": 304, "status": "Review", "title": "Train Chatbot Model", "description": "Test and refine chatbot accuracy.", "members": 2, "profilePics": [images.p3, images.p4], "discussions": 6, "priority": "Medium" },
//         { "id": 305, "status": "Done", "title": "Deploy Initial Version", "description": "Launch chatbot for testing.", "members": 2, "profilePics": [images.p1, images.p2], "discussions": 3, "priority": "Low" }
//       ]
//     }
//   ],
//   "summary": {
//     "title": [
//       "Total Projects",
//       "Ended Projects",
//       "Pending Projects",
//       "Running Projects"
//     ],
//     "counts": [
//       { "totalProjects": 3, },
//       { "endedProjects": 1, },
//       { "pendingProjects": 0, },
//       { "runningProjects": 2 }
//     ]

//   }
// };


function App() {



  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect (() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error){
        setError("Failed to fetch peojects");
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [])



  const togglesidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();
  const isAuthpage = location.pathname === "/login";


  if(Loading) return <div>Loading Projects...</div>;
  if(error) return <div>{error}</div>



  return (
    <>
      {isAuthpage ? (<Login />) :
        (<div className="zidio-app w-full h-screen pt-3 pr-3">
          <Navbar toggleSidebar={togglesidebar} />
          <Sidebar projects={projects} isOpen={isSidebarOpen} toggleSidebar={togglesidebar} />
          <div className="homediv lg:w-[calc(100%-18.22%)] w-[99%] ml-3 bg-lightase lg:h-[618px] md:h-[1150px] h-[1900px] border flex flex-col rounded-l-2xl rounded-r-2xl lg:ml-[18.22%] mt-2">
            <Routes>
              <Route path='/projects/:_id' element={<Projects projects={projects} />} />
              <Route path='/dashboard' element={<Dashboard summary={projects.summary} projects={projects} />} />
              <Route path='/calender' element={<Calender />} />
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
