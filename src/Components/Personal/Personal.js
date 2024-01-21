import React, { useEffect, useState } from "react";
import DashBoard from "../DashBoard/Dashboard.js";
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import axios from "axios";
import Swal from "sweetalert2";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import Paper from "@mui/material/Paper";

const Personal = () => {
  const [todolist, setTodolist] = useState([]);
  const [type, setType] = useState("");
  const [month, setMonth] = useState("");
  const [noteHead, setNoteHead] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [datas, setDatas] = useState({});
  // For  nav add new------
  const [anchorE, setAnchorE] = React.useState();
  const opens = Boolean(anchorE);
  const handleClicks = (event) => {
    setAnchorE(event.currentTarget);
  };
  const handleCloses = () => {
    setAnchorE();
  };
  // --------------------
  // for alert----------
  //  alert Function
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  // for getting the todolist from specificUser
  const getTodolist = async () => {
    try {
      let y = window.localStorage.getItem("id");
      // console.log(y);
      let req = await axios.get(
        `https://capacity-planning-tool-backened.vercel.app/toDoListdata/specificUser/${y}`,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      const { message, statusCode, alltoDoListData } = data;
      // console.log(data);
      if (statusCode === 200) {
        setTodolist(alltoDoListData);
        // console.log(alltoDoListData);
      } else {
        setDatas({ message });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodolist();
  }, []);
  // for delete ToDoliSt
  const delToDoliSt = async (id) => {
    // console.log(id)
    try {
      let req = await axios.delete(
        `https://capacity-planning-tool-backened.vercel.app/toDoListdata/deleteToDoListData/${id}`,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      const { message, statusCode } = data.data;
      if (statusCode === 200) {
        getTodolist();
        Toast.fire({ icon: "success", title: message });
      } else {
        Toast.fire({ icon: "error", title: "Can't delete Transaction Data" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // to add the ToDoList data
  const addToDoList = async (e) => {
    // console.log(window.localStorage.getItem("id"));
    e.preventDefault();
    try {
      let req = await axios.post(
        `https://capacity-planning-tool-backened.vercel.app/toDoListdata/`,
        {
          userid: window.localStorage.getItem("id"),
          type,
          month,
          noteHead,
          date,
          notes,
        },
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      // console.log(data);
      const { message, statusCode } = data;
      // console.log(data);
      if (statusCode === 200) {
        setType("");
        getTodolist();
        Toast.fire({ icon: "success", title: message });
      } else {
        Toast.fire({
          icon: "error",
          title: "Error in adding To Do List Data",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  setTimeout(() => {
    handleFilterChange();
  }, 5000);

  const handleFilterChange = async () => {
    try {
      const userId = window.localStorage.getItem("id");
      const types = window.localStorage.getItem("Personal");
      // console.log(userId);
      const response = await axios.post(
        `https://capacity-planning-tool-backened.vercel.app/toDoListdata/categoryForSpecificUser/${userId}/${types}`,
        // Request body data should be passed as the second argument
        null,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      // console.log(response);

      const { ToDoListData } = response.data;
      // console.log(response.data);
      // console.log(ToDoListData);

      const lowercaseTypeData = ToDoListData.map((ToDoListData) => ({
        ...ToDoListData,
        type: ToDoListData.type.toLowerCase(),
      }));
      // console.log(lowercaseTypeData);

      const selectedAccountLowercase = types.toLowerCase();
      // console.log(selectedAccountLowercase);

      const filteredData = lowercaseTypeData.filter(
        (ToDoListData) => ToDoListData.type === selectedAccountLowercase
      );
      // console.log("filteredData Personal:", filteredData);

      if (filteredData.length > 0) {
        setTodolist(filteredData.reverse());
        // Toast.fire({ icon: "success", title: "Wait Few Seconds To Retrive To Do List " });
      } else {
        setTodolist([]);
        Toast.fire({
          icon: "info",
          title: "No To Do List Found For This Account",
        });
      }
    } catch (error) {
      console.error(error);
      //   Toast.fire({
      //     icon: "error",
      //     title: "Error occurred while fetching To Do List.",
      //   });
    }
  };
 


  return (
    <div>
      <DashBoard>
        <div className="addnew">
          <h1 className="Heading">Sticky Wall </h1>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                ml: 2,
                mt: 3.7,
                width: 8,
                height: 8,
              },
            }}
          >
            <Tooltip title="ADD REMINDER">
              <IconButton
                onClick={handleClicks}
                size="small"
                aria-controls={opens ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={opens ? "true" : undefined}
              >
                <AddCircleOutlineOutlinedIcon size="small"></AddCircleOutlineOutlinedIcon>
              </IconButton>
            </Tooltip>
          </Box>
          {/* for pop-up add new  */}
          <Menu
            anchorEl={anchorE}
            id="account-menu"
            open={opens}
            onClose={handleCloses}
          >
            <div>
              <form onSubmit={addToDoList}>
                <MenuItem>
                  <Typography>Type: </Typography>{" "}
                  <TextField
                    className="fields"
                    id="standard-basic"
                    variant="standard"
                    name="type"
                    value={type}
                    type="text"
                    required
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                </MenuItem>

                <MenuItem>
                  <Typography>Topic : </Typography>{" "}
                  <TextField
                    className="fields"
                    id="standard-basic"
                    variant="standard"
                    value={noteHead}
                    type="text"
                    name="noteHead"
                    required
                    onChange={(e) => {
                      setNoteHead(e.target.value);
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <Typography>Date : </Typography>{" "}
                  <TextField
                    className="fields"
                    id="standard-basic"
                    variant="standard"
                    value={date}
                    type="text"
                    name="date"
                    required
                    label="00th"
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <Typography>Month : </Typography>{" "}
                  <TextField
                    className="fields"
                    id="standard-basic"
                    variant="standard"
                    type="text"
                    value={month}
                    required
                    name="month"
                    onChange={(e) => {
                      setMonth(e.target.value);
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <TextField
                    className="fields"
                    id="outlined-multiline-static"
                    label="Notes"
                    multiline
                    rows={7}
                    type="text"
                    name="Notes"
                    required
                    onChange={(e) => {
                      setNotes(e.target.value);
                    }}
                  />
                </MenuItem>

                <Button className="fields" variant="text" type="submit">
                  Submit
                </Button>
              </form>
            </div>
          </Menu>
        </div>
        <p className="note">Please Wait Few Seconds to retrive <i>personal</i> notes... </p>
        <div className="StickyWall-container">
          {todolist.map((todolist, idx) => (
            <div
              className="card"
              key={idx}
             
            >
              <div className="control">
                <ListItemIcon
                  sx={{ color: "black" }}
                  onClick={() => delToDoliSt(todolist._id)}
                >
                  <DeleteOutlineIcon />
                </ListItemIcon>
              </div>
              <div className="content">
                <h3 style={{ color: "black" }}>{todolist.noteHead}</h3>
                <div className="value">
                  <h5>{todolist.date}</h5>
                  <h3>{todolist.month}</h3>
                </div>
                <p style={{ color: "black" }}>{todolist.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </DashBoard>
    </div>
  );
};

export default Personal;
