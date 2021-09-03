import React from "react"
import SvgIcon from "./svgicon"
import "./navstyles.css"


const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="navbar-nav">
        <div className="navbar-element">
          <SvgIcon/>
        </div>
        <div className="navbar-element">
          test
        </div>
      </ul>
    </div>
  )
}


export default Navbar

