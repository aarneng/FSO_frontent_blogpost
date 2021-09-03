import React from "react"
import "./svg-animation.css"


const SvgIcon = () => {
  return (
    <svg height="40" viewBox="0 0 95 95" className="svg-icon">
      <defs id="SvgjsDefs1001">
        <linearGradient id="SvgjsLinearGradient1011">
          <stop offset="0%" stopColor="hsl(330, 32%, 60%)" />

          <stop offset="55%" stopColor="#efefef" />
          <stop offset="100%" stopColor="hsl(330, 32%, 60%)" />
          <animateTransform attributeName="gradientTransform"
            type="translate"
            from="-1 0"
            to="1 0"
            begin="0s"
            dur="4.5s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <g id="SvgjsG1007" featurekey="2ou6gm-0" transform="matrix(2.3508136134879964,0,0,2.3508136134879964,14.886980502759137,20)" className="test">
        <g xmlns="http://www.w3.org/2000/svg">
          <path d="M29.825,16L2.175,0v16v16L29.825,16z M4.589,28.217L12.446,16l13.257,0L4.589,28.217z">
          </path>
        </g>
      </g>
    </svg>
  )
}

export default SvgIcon
