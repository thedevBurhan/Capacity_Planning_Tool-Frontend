import React, { useEffect, useState } from "react";
import DashBoard from "../DashBoard/Dashboard.js";
import {
  Button,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import Swal from "sweetalert2";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const TimeSheet = () => {
  const [timeSheet, setTimeSheet] = useState([]);
  const [sheet, setSheet] = useState("");
  const [MTimeIn, setMTimeIn] = useState("");
  const [MTimeOut, setMTimeOut] = useState("");
  const [ATimeIn, setATimeIn] = useState("");
  const [ATimeOut, setATimeOut] = useState("");
  const [datas, setDatas] = useState({});
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
  // for getting the Time Sheet from specificUser
  const getTimeSheet = async () => {
    try {
      let y = window.localStorage.getItem("id");
      // console.log(y);
      let req = await axios.get(
        `https://capacity-planning-tool-backend.vercel.app/timeSheet/specificUser/${y}`,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      const { message, statusCode, allTimeSheetData } = data;
      // console.log(data);
      if (statusCode === 200) {
        setTimeSheet(allTimeSheetData);
        // console.log(allTimeSheetData);
      } else {
        setDatas({ message });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTimeSheet();
  }, []);
  // for delete Time Sheet
  const delTimeSheet = async (id) => {
    // console.log(id)
    try {
      let req = await axios.delete(
        `https://capacity-planning-tool-backend.vercel.app/timeSheet/deleteTimeSheetData/${id}`,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      const { message, statusCode } = data.data;
      if (statusCode === 200) {
        getTimeSheet();
        Toast.fire({ icon: "success", title: message });
      } else {
        Toast.fire({ icon: "error", title: "Can't delete Time Sheet Data" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // to add the Time Sheet data
  const addTimeSheet = async (e) => {
    // console.log(window.localStorage.getItem("id"));
    e.preventDefault();
    try {
      let req = await axios.post(
        `https://capacity-planning-tool-backend.vercel.app/timeSheet/`,
        {
          userid: window.localStorage.getItem("id"),
          MTimeIn,
          MTimeOut,
          ATimeIn,
          ATimeOut,
        },
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      console.log(data);
      const { message, statusCode } = data;
      console.log(data);
      if (statusCode === 200) {
        setSheet("");
        getTimeSheet();
        Toast.fire({ icon: "success", title: message });
      } else {
        Toast.fire({
          icon: "error",
          title: "Error in adding Time Sheet Data",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DashBoard>
        <div className="addnew">
          <div className="table">
          
              <form onSubmit={addTimeSheet}>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={2}>
                          Morning
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                          Afternoon
                        </TableCell>
                        <TableCell align="center">Submit</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">In</TableCell>
                        <TableCell align="center">Out</TableCell>
                        <TableCell align="center">In</TableCell>
                        <TableCell align="center">Out</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          <TextField
                       
                            label="00:00"
                            variant="standard"
                            name="MTimeIn"
                            value={MTimeIn}
                            required
                            onChange={(e) => {
                              setMTimeIn(e.target.value);
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                           
                            label="00:00"
                            variant="standard"
                            name="MTimeOut"
                            value={MTimeOut}
                            required
                            onChange={(e) => {
                              setMTimeOut(e.target.value);
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                         
                            label="00:00"
                            variant="standard"
                            name="ATimeIn"
                            value={ATimeIn}
                            required
                            onChange={(e) => {
                              setATimeIn(e.target.value);
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                           
                            label="00:00"
                            variant="standard"
                            name="ATimeOut"
                            required
                            value={ATimeOut}
                            onChange={(e) => {
                              setATimeOut(e.target.value);
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button type="submit">
                            <CheckCircleOutlineIcon
                              sx={{ color: "#c90076" }}
                            ></CheckCircleOutlineIcon>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </form>
          </div>
        </div>
        <div className="TimeSheet-container">
      
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Morning In</TableCell>
                    <TableCell align="center">Morning Out</TableCell>
                    <TableCell align="center">Afternoon In</TableCell>
                    <TableCell align="center">Afternoon Out</TableCell>
                    <TableCell align="center">Total Hours</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeSheet.length > 0 && timeSheet ? (
                    timeSheet.length > 0 &&
                    timeSheet.map((item, index, _id) => {
                      // console.log(item._id)
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            {item.currentDate}
                          </TableCell>

                          <TableCell align="center">
                            <Typography align="center" phy>
                              {item.MTimeIn}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography align="center" phy>
                              {item.MTimeOut}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography align="center" phy>
                              {item.ATimeIn}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography align="center" phy>
                              {item.ATimeOut}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography align="center" phy>
                              {item.TotalHours}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            <ListItemIcon
                              sx={{ color: "#2a9df4" }}
                              onClick={() => delTimeSheet(item._id)}
                            >
                              <DeleteOutlineIcon />
                            </ListItemIcon>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <div>
                      {" "}
                      <h4 className="message">
                        {" "}
                        No Time Sheet Data To BE shown...
                      </h4>{" "}
                    </div>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

        </div>
      </DashBoard>
    </div>
  );
};

export default TimeSheet;
