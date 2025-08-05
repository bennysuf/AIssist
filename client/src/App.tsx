import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { useUserStore } from "./util/stores/userStore";
import NavBar from "./components/NavBar";
import { useLocation } from "react-router-dom";

function App() {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const location = useLocation();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div>
      {!location.pathname.includes("login") && (
        <div style={{ display: "flex", height: "100vh" }}>
          <NavBar />
        </div>
      )}
      {/* <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}> */}
      <AppRoutes />
      {/* </div> */}
    </div>
  );
}

export default App;
