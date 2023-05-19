import { Button } from "@mui/material";
import { logout } from "../services/authenticationApi";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>
      {children}
    </div>
  );
}
