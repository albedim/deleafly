import React from "react"
import '../../style/index.css'

interface LogoProps {
  style: object
  class_name: String
}

const Logo: React.FC<LogoProps> = ({
  style,
  class_name
}) => {
  return ( 
    <div style={style} className={"items-center " + class_name }>
      <img style={{ width: 48 }} src={require("../../images/logo.png")} alt="" />
      <h2 style={{ fontSize: 23.4 }} className="text-[#07242b] font-semibold font-noto" >Sturl</h2>
    </div> 
  )
}

export default Logo