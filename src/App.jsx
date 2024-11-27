import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./components/shared/Sidebar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Jobs from "./components/Jobs";
import Recruitment from "./components/Recruitment";
import Browse from "./components/Browse";
import AppliedJob from "./components/AppliedJob";
import Description from "./components/Description";
import LatestJobs from "./components/LatestJobs";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import JobsAdmin from "./components/admin/JobsAdmin";

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    element: <Sidebar />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/latestjobs",
        element: <LatestJobs />,
      },
      {
        path: "/description/:id",
        element: <Description />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/jobs/recruitment",
        element: <Recruitment />,
      },
      {
        path: "/appliedjobs",
        element: <AppliedJob />,
      },

      //for providers from here..
      {
        path: "/admin/companies",
        element: <Companies />,
      },
      {
        path: "/admin/jobs",
        element: <JobsAdmin />,
      },
      {
        path: "/admin/companies/create",
        element: <CompanyCreate />,
      },
      {
        path: "/admin/companies/:id",
        element: <CompanySetup />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
