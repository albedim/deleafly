import Logo from "./Logo";
import { IoLogIn, IoMenu } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import SigninModal from "../modal/SigninModal";
import { useState } from "react";
import jwtDecode from "jwt-decode";

interface HeaderProps {
  route_name: String
}

const Header: React.FC<HeaderProps> = ({
  route_name
}) => {

  const navigate = useNavigate()
  const token: any = window.localStorage.getItem("token")
  const [modalOptions, setModalOptions] = useState({ visible: false })

  return (
    <div style={{ paddingLeft: 84, paddingRight: 84 }} className="justify-between items-center flex w-screen pb-14 pt-14">
      <SigninModal onClose={() => setModalOptions({ visible: false })} visible={modalOptions.visible} />
      <Logo style={{ paddingLeft: 40 }} class_name="flex-none" />
      <Logo style={{}} class_name="none-flex" />
      <div style={{ paddingRight: 284 }} className="flex-none">
        <div style={{ paddingRight: 184 }} className="items-center flex">
          <div onClick={() => navigate("/")} style={{ color: route_name == 'get_started' ? "#ccd0af" : "#404727", fontSize: 18.4 }} className={"font-semibold font-noto pr-14 pl-14"}><h2>Get Started</h2></div>
          <div onClick={() => navigate("/about")} style={{ color: route_name == 'about_us' ? "#ccd0af" : "#404727", fontSize: 18.4 }} className={"font-semibold font-noto pr-14 pl-14"}><h2>About us</h2></div>
          <div onClick={() => token != null ? navigate("/dashboard") : null} style={{ color: route_name == 'dashboard' ? "#ccd0af" : "#404727", fontSize: 18.4 }} className={"font-semibold font-noto pr-14 pl-14"}><h2>Dashboard</h2></div>
        </div>
        <div className="items-center flex">
          {
            token != null ?
              <img style={{ width: 28 }} src={"https://api.dicebear.com/6.x/big-ears-neutral/svg?seed=AAAAAAAA&radius=20&backgroundColor=da9969,f8b788"} alt="" />
              : <IoLogIn onClick={() => setModalOptions({ visible: true })} color="#404727" size={30} />
          }
        </div>
      </div>
      <IoMenu className="none-block" size={50} />
    </div>
  );

}

export default Header