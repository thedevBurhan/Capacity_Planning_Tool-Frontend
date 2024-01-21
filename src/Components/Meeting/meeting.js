import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import DashBoard from '../DashBoard/Dashboard';


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function Meeting() {
      const roomID = getUrlParams().get('roomID') || randomID(5);
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID =754103294;
      const serverSecret = "59bcfa0b78b08b8f77222eb23fe3b697";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });


  };

  return (
    <div>
      <DashBoard>
        <div
          className="myCallContainer"
         ref={myMeeting}
          style={{ width: '80vw', height: '80vh',marginLeft:"10%",marginTop:"-5%" }}
           ></div>
       </DashBoard>
    </div>
  );
}


// import DashBoard from "../DashBoard/Dashboard.js";
// import Groups3Icon from '@mui/icons-material/Groups3';
// import { Tooltip } from "@mui/material";
// import gifs from "./Zoom.gif";
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
// import Button from '@mui/material/Button';
// import dotenv from "dotenv";
// //configure thhe environment
// dotenv.config();

// const Meeting = () => {

//   const handleIconClick = () => {
//     const linkUrl = "https://us05web.zoom.us/j/8130158712?pwd=L59xJLy2NbCJzzDj9wDemNA7LnKYDk.1";
//     window.open(linkUrl, "_blank");
//   };
//   return (
//     <div>
//     <DashBoard>
//       <div className="addnew">
//       <Tooltip title="Click Me">
//         <h1 className="Heading" onClick={handleIconClick}> Create Meeting 
//         <span className="dash">----</span> <Groups3Icon/></h1>
//        </Tooltip>
//       </div>
//      <div className=" giff">
//      <img className="imggifs" src={gifs} alt="Planning" />
//      </div>
          
        
//     </DashBoard>
//   </div>
//   )  
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
