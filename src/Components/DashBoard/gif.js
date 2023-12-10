import React from "react";
import gifs from "./gif.gif";
import DashBoard from "./Dashboard";

const gif = () => {
  return (
    <div>
      <DashBoard>
        <div>
          <img className="imggif" src={gifs} alt="Planning" />
        </div>
      </DashBoard>
    </div>
  );
};

export default gif;
