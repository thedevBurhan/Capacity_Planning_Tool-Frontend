import React, { useEffect }  from "react";
// import DashBoard from "../DashBoard/Dashboard.js";
// import Groups3Icon from '@mui/icons-material/Groups3';
// import { Tooltip } from "@mui/material";
// import gifs from "./Zoom.gif";
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
// import Button from '@mui/material/Button';
import dotenv from "dotenv";
// //configure thhe environment
dotenv.config();


const Meeting = () => {

  const clientId = process.env.REACT_APP_CLIENTID;
  const redirectUri = process.env.REACT_APP_REDIRECTURL;
  const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  useEffect(() => {
    // Function to handle the Zoom redirect after authorization
    const handleZoomRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        // Send the authorization code to your server
        try {
          const response = await fetch('/your-server-endpoint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          if (response.ok) {
            // Handle successful response (e.g., display user data)
            const userData = await response.json();
            console.log('User Data:', userData);
          } else {
            // Handle error response
            console.error('Error fetching access token:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        console.error('Authorization code not found in URL.');
      }
    };

    // Call the handleZoomRedirect function when the component mounts
    handleZoomRedirect();
  }, []);

  const startZoomOAuth = () => {
    // Redirect the user to the Zoom OAuth URL
    window.location.href = zoomAuthUrl;
  };

  return (
    <div>
      <button onClick={startZoomOAuth}>Authorize with Zoom</button>
    </div>
  );  
};


export default Meeting;

// const Meeting = () => {
//   // const [open, setOpen] = React.useState(false);
//   // const handleClose = () => {
//   //   setOpen(false);
//   // };
//   // const handleOpen = () => {
//   //   setOpen(true);
//   // };
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Step 1: Check if there is an authorization code in the URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const authorizationCode = urlParams.get("code");
//     console.log("Authorization Code:", authorizationCode);
    
//     if (authorizationCode) {
//       // Step 3: Request an access token using the authorization code
//       const redirectUri = encodeURIComponent(`${window.location.origin}/zoom/callback`);
//       axios.post("/api/callback", { code: authorizationCode, redirectUri })
//         .then(response => {
//           const { access_token } = response.data;
//           // Step 4: Get user information using the obtained access token
//           axios.get("https://api.zoom.us/v2/users/me", {
//             headers: {
//               Authorization: `Bearer ${access_token}`
//             }
//           })
//           .then(response => {
//             setUserData(response.data);
//           })
//           .catch(error => {
//             console.error("Error exchanging code for access token:", error);
//           });
//         })
//         .catch(error => {
//           console.error("Error exchanging code for access token:", error);
//         });
//     }
//   }, []); // Empty dependency array ensures the effect runs once after the initial render
//   const handleOAuthClick = () => {
//     try{
//     const oauthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${CLIENTID}&redirect_uri=${encodeURIComponent(REDIRECTURL)}`;
//     console.log("OAuth URL:", oauthUrl);
//     window.location.href = oauthUrl;
//     }catch (error) {
//       console.error("Error during OAuth process:", error);
//       // Handle the error gracefully, send an appropriate response to the client
//     }
//   };
  

//   return (
//     <div>
//       <h1>Zoom OAuth Integration</h1>
//       {userData ? (
//         <div>
//           <h2>Hello {userData.first_name} {userData.last_name}!</h2>
//           <p>{userData.role_name}, {userData.company}</p>
//           <img src={userData.pic_url} alt="User" />
//         </div>
//       ) : (
//         <button onClick={handleOAuthClick}>Authenticate with Zoom</button>
//       )}
//     </div>
//   //   <div>
//   //   <Button onClick={handleOpen} sx={{mt:40,ml:80}}>Fetching Zoom Link Is Under Process....</Button>
//   //   <Backdrop
//   //     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//   //     open={open}
//   //     onClick={handleClose}
//   //   >
//   //     <CircularProgress color="inherit" />
//   //   </Backdrop>
//   // </div>
// );
// }
// //   );
// // };

// export default Meeting;
