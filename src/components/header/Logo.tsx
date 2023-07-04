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
      <img style={{ width: 114 }} src={require("../../images/logo.jpg")} alt="" />
    </div> 
  )
}

export default Logo