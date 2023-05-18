import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import CreateSquadPage from "./pages/Squad/Create";
import ViewSquadPage from "./pages/Squad/View";
import ViewLineupPage from "./pages/Lineup/View";
import CreateLineupPage from "./pages/Lineup/Create";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard/:userId",
    element: <DashboardPage />,
  },
  {
    path: "/squads/create",
    element: <CreateSquadPage />,
  },
  {
    path: "/squads/:squadId",
    element: <ViewSquadPage />,
  },
  {
    path: "/squads/:squadId/lineups/create",
    element: <CreateLineupPage />,
  },
  {
    path: "/squads/:squadId/lineups/:lineupId",
    element: <ViewLineupPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
