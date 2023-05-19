import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import CreateSquadPage from "./pages/Squad/Create";
import ViewSquadPage from "./pages/Squad/View";
import ViewLineupPage from "./pages/Lineup/View";
import CreateLineupPage from "./pages/Lineup/Create";
import Layout from "./layout/Layout";
import "./App.css";

const WithLayout = (PageComponent: React.FunctionComponent) => (
  <Layout>
    <PageComponent />
  </Layout>
);

const routes = [
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/dashboard/:userId", element: WithLayout(DashboardPage) },
  { path: "/squads/create", element: WithLayout(CreateSquadPage) },
  { path: "/squads/:squadId", element: WithLayout(ViewSquadPage) },
  {
    path: "/squads/:squadId/lineups/create",
    element: WithLayout(CreateLineupPage),
  },
  {
    path: "/squads/:squadId/lineups/:lineupId",
    element: WithLayout(ViewLineupPage),
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
