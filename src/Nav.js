import React, { useState, useEffect } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        className="nav__logo"
      />
      <img
        src="https://occ-0-3708-3662.1.nflxso.net/dnm/api/v6/0RO1pLmU93-gdXvuxd_iYjzPqkc/AAAABa4kM1cduOY7n8hxNofTNWcRprInP3dw0Fta7OC4gfEAcZe8AgHHS46VqJfPtxFuNG9I1aFQIkBJCDy5n4zzOBU.png?r=318"
        alt="Netflix avatar"
        className="nav__avatar"
      />
    </div>
  );
}

export default Nav;
