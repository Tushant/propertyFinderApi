import React from "react";
import { Link } from "react-router-dom";

import bid from "assets/img/bid.png";


const Advertise = () => {

  return (
    <div className="adBlock" style={{ marginTop: 20, marginBottom: 20 }}>
      <Link to="/bid">
        <img src={bid} className="img-responsive bid" alt="bid" />
      </Link>
    </div>
  );
};

export default Advertise;
