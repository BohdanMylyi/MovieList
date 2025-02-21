import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-[#504B38]">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to={"/popular-movies"}>
          <h1 className="text-[#fff]">MovieList</h1>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/watched-movies"}>
              <h1 className="text-[#fff]">Watched</h1>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
