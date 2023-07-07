import { IoCloseSharp, IoLogIn, IoMenu } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import SigninModal from "../modal/SigninModal";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import AccountModal from "../modal/AcountModal";
import UserMenu from '../header/UserMenu';


interface MobileHeaderProps {
  route_name: String,
  visible: boolean,
  onClose: () => void
}


const MobileHeader: React.FC<MobileHeaderProps> = ({
  route_name,
  visible,
  onClose
}) => {

  const navigate = useNavigate()

  const token: any = window.localStorage.getItem("token")

  const [signinModalOptions, setSigninModalOptions] = useState({ visible: false })


  return (
    visible ? (
      <div className="h-screen top-0 shadow-lg bg-[white] fixed right-0 w-60 pt-14">
        <SigninModal onClose={() => setSigninModalOptions({ visible: false })} visible={signinModalOptions.visible} />
        <div style={{ paddingBottom: 54, paddingTop: 24, paddingLeft: 54 }}>
          <IoCloseSharp onClick={() => onClose()} size={34} />
        </div>
        <div style={{ paddingLeft: 34 }}>
          <div style={{ paddingLeft: 34 }}>
            <div onClick={() => {navigate("/"); onClose()}} style={{ color: route_name == 'get_started' ? "#ccd0af" : "#404727", fontSize: 18.4 }} className={"font-semibold font-noto pt-6 pb-6"}><h2 className="cursor-pointer" >Get Started</h2></div>
            <div onClick={() => {navigate("/"); setTimeout(() => window.scrollTo({ top: 740, behavior: 'smooth' }), 100); onClose()}} style={{ color: route_name == 'about_us' ? "#ccd0af" : "#404727", fontSize: 18.4 }} className={"font-semibold font-noto pt-6 pb-6"}><h2 className="cursor-pointer" >About us</h2></div>
            <div onClick={() => token != null ? (navigate("/dashboard"), onClose()) : null} style={{ color: route_name == 'dashboard' ? "#ccd0af" : "#404727", fontSize: 18.4 }} className={"font-semibold font-noto pt-6 pb-6"}><h2 className="cursor-pointer" >Dashboard</h2></div>
          </div>
          <div style={{ paddingTop: 54, paddingLeft: 34 }}>
            {
              token != null ?
                <UserMenu token={token} />
                : <IoLogIn className="cursor-pointer" onClick={() => setSigninModalOptions({ visible: true })} color="#404727" size={30} />
            }
          </div>
        </div>
      </div>
    ) : (
      <></>
    )
  );

}

export default MobileHeader