// import React ,{ useState, useEffect } from "react";
// import axios from "axios";
// // import Backdrop from '@mui/material/Backdrop';
// // import CircularProgress from '@mui/material/CircularProgress';
// // import Button from '@mui/material/Button';
// // import dotenv from "dotenv";
// // //configure thhe environment
// // dotenv.config();
// const CLIENTID = "Xu8dJsqkSEiUHAb4aFauA";
// const REDIRECTURL = encodeURIComponent("https://capacity-planning-tool-backend.vercel.app/Meeting/zoom/");


// const Meeting = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const authorizationCode = urlParams.get("code");
//     console.log(authorizationCode,"authorizationCode");
//     console.log(urlParams,"urlParams");

//     if (authorizationCode) {
//       setLoading(true);
//       const redirectUri = encodeURIComponent(`${window.location.origin}/zoom/callback`);
//       console.log(redirectUri,"redirectUri")
//       const formData = new URLSearchParams();
//       formData.append('code', authorizationCode);
//       formData.append('redirectUri', redirectUri);
      
//       axios.post("https://capacity-planning-tool-backend.vercel.app/zoom/", formData, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       })
//         .then(response => {
//           console.log(response);
//           const { access_token } = response.data;
          
//           axios.get("https://api.zoom.us/v2/users/me", {
//             headers: {
//               Authorization: `Bearer ${access_token}`
//             }
//           })
//           .then(response => {
//             console.log(response.data);
//             setUserData(response.data);
//             setLoading(false);
//           })
//           .catch(error => {
//             console.error("Error fetching user information:", error);
//             setLoading(false);
//           });
//         })
//         .catch(error => {
//           console.error("Error exchanging code for access token:", error);
//           setLoading(false);
//         });
//     }
//   }, []);

//   const handleOAuthClick = () => {
//     const oauthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${CLIENTID}&redirect_uri=${REDIRECTURL}`;
//     window.location.href = oauthUrl;
//   };

//   return (
//     <div>
//       <h1>Zoom OAuth Integration</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : userData ? (
//         <div>
//           <h2>Hello {userData.first_name} {userData.last_name}!</h2>
//           <p>{userData.role_name}, {userData.company}</p>
//           <img src={userData.pic_url} alt="User" />
//         </div>
//       ) : (
//         <button onClick={handleOAuthClick}>Authenticate with Zoom</button>
//       )}
//     </div>
//   );
// };

// export default Meeting;

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
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CLIENT_ID = 'Xu8dJsqkSEiUHAb4aFauA';
const REDIRECT_URL = encodeURIComponent(`${window.location.origin}/zoom/callback`);

const Meeting = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");
    console.log (authorizationCode);
    if (authorizationCode) {
      setLoading(true);
      const formData = new URLSearchParams();
      formData.append('code', authorizationCode);
      formData.append('redirectUri', REDIRECT_URL);

      axios.post("https://capacity-planning-tool-backend.vercel.app/Meeting/zoom/", formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => {
        const { access_token } = response.data;

        axios.get("https://api.zoom.us/v2/users/me", {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
        .then(response => {
          console.log(response.data);
          setUserData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching user information:", error);
          setLoading(false);
        });
      })
      .catch(error => {
        console.error("Error exchanging code for access token:", error);
        setLoading(false);
      });
    }
  }, []);

  const handleOAuthClick = () => {
    const oauthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
    window.location.href = oauthUrl;
  };

  return (
    <div>
      <h1>Zoom OAuth Integration</h1>
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div>
          <h2>Hello {userData.first_name} {userData.last_name}!</h2>
          <p>{userData.role_name}, {userData.company}</p>
          <img src={userData.pic_url} alt="User" />
        </div>
      ) : (
        <button onClick={handleOAuthClick}>Authenticate with Zoom</button>
      )}
    </div>
  );
};

export default Meeting;
