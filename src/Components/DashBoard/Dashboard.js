import { Divider, ListItemIcon, MenuItem, Typography } from "@mui/material";
import * as React from "react";
import "./Hamburger.css";
import MenuIcon from "@mui/icons-material/Menu";
import PublicIcon from "@mui/icons-material/Public";
import GroupsIcon from "@mui/icons-material/Groups";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonIcon from "@mui/icons-material/Person";
import Logo from "./Logo.png";
import WorkIcon from "@mui/icons-material/Work";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DashBoard = ({ children }) => {
  const history = useHistory();
  // Hamburger Menu----
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const user = window.localStorage.getItem("user");
  // ---------------------
  function personal() {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("Personal", "Personal");
      history.push("/Personal");
    } else {
      console.error("localStorage is not available in this browser.");
      // Handle the lack of localStorage support in your application
    }
  }

  function work() {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("Work", "Work");
      history.push("/Work");
    } else {
      console.error("localStorage is not available in this browser.");
      // Handle the lack of localStorage support in your application
    }
  }

  return (
    <div>
      <body className="mainBgDashboard">
        <div className="App-heading">
          <div className="Application-title">
          <h1>Capacity planning Tool</h1>
          <h4 className="Descreption">
            A HOUR OF PLANNIG CAN SAVE YOU 10 HOURS OF DOING!
          </h4>
          </div>
          <div>
            <div>
              <img
              className="Logo"
                srcSet={`${Logo}}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${Logo}`}
                alt="money manager Logo"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="hamburger-menu">
          <MenuIcon
            className={`menu-button ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          ></MenuIcon>
          <div className={`menu-items ${menuOpen ? "open" : ""}`}>
            <MenuItem className="menu-item">
              <ListItemIcon sx={{ color: "#2a9df4" }}>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              {user}
            </MenuItem>
            <MenuItem
              className="menu-item"
              onClick={() => history.push("/DashBoard")}
            >
              <ListItemIcon
                sx={{ color: "#2a9df4" }}
                onClick={() => history.push("/DashBoard")}
              >
                <PublicIcon fontSize="small" />
              </ListItemIcon>
              DashBoard
            </MenuItem>
            <Divider />
            <Typography sx={{ color: "#5b5b5b" }}>Team</Typography>
            <MenuItem
              className="menu-item"
              onClick={() => history.push("/Meeting")}
            >
              <ListItemIcon
                sx={{ color: "#2a9df4" }}
                onClick={() => history.push("/Meeting")}
              >
                <GroupsIcon fontSize="small" />
              </ListItemIcon>
              Meeting
            </MenuItem>
            <Divider />
            <Typography sx={{ color: "#5b5b5b" }}>Lists</Typography>
            <MenuItem className="menu-item" onClick={personal}>
              <ListItemIcon sx={{ color: "#2a9df4" }} onClick={personal}>
                <PersonSearchIcon fontSize="small" />
              </ListItemIcon>
              Personal
            </MenuItem>
            <MenuItem className="menu-item" onClick={work}>
              <ListItemIcon sx={{ color: "#2a9df4" }} onClick={work}>
                <WorkIcon fontSize="small" />
              </ListItemIcon>
              Work
            </MenuItem>
            <Divider />
            <Typography sx={{ color: "#5b5b5b" }}>Work Sheet</Typography>
            <MenuItem
              className="menu-item"
              onClick={() => history.push("/TimeSheet")}
            >
              <ListItemIcon
                sx={{ color: "#2a9df4" }}
                onClick={() => history.push("/TimeSheet")}
              >
                <TimelapseIcon fontSize="small" />
              </ListItemIcon>
              Time Sheet
            </MenuItem>
            <Divider />
            <MenuItem className="menu-item" onClick={() => history.push("/")}>
              <ListItemIcon
                sx={{ color: "#2a9df4" }}
                onClick={() => history.push("/")}
              >
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        </div>
        <div>{children}</div>
      </body>
    </div>
  );
};

export default DashBoard;
