import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <Link to="/">
        <p className="gastro">
          GASTR<span className="gastro text-style-1">O</span>
        </p>
      </Link>
    </div>
  );
};
