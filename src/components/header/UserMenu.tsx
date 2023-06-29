import { Button, Menu, MenuItem } from "@mui/joy";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserMenuProps{
  token: any
}

const UserMenu: React.FC<UserMenuProps> = ({
  token
}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const user: any = jwtDecode(token)
  const open = Boolean(anchorEl);
  const navigate = useNavigate()

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='align-center space-around display-flex border-radius-5'>
      <Button
        id="basic-demo-button"
        style={{ backgroundColor: "transparent" }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <div className='pr-8 flex'>
          <div className='items-center justify-around flex'>
            <img style={{ width: 28 }} src={"https://api.dicebear.com/6.x/big-ears-neutral/svg?seed=&radius=20&backgroundColor=da9969,f8b788"} alt="" />
          </div>
        </div>
      </Button>
      <Menu
        id="basic-menu"
        style={{ border: 'none', boxShadow: '-2px -4px 12px -1px rgba(110,110,110,0.14)', borderRadius: 4, backgroundColor: 'white' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="basic-demo-button"
      >
        <MenuItem
          style={{ paddingRight: 14, paddingLeft: 14 }}
          className="justify-around flex"
          onClick={() => { navigate("/dashboard"); handleClose() }}>
          <div className="items-center justify-around flex" style={{ paddingTop: 8, paddingBottom: 8, paddingRight: 54, paddingLeft: 54 }}>
            <div className="justify-around flex"><h2 style={{ fontSize: 14, fontWeight: 400, fontFamily: 'Noto Sans JP' }}>Account</h2></div>
          </div>
        </MenuItem>
        {
          /*
        <MenuItem
          style={{ paddingRight: 14, paddingLeft: 14 }}
          className="justify-around flex"
          onClick={() => { handleClose() }}>
          <div className="items-center justify-around flex" style={{ paddingTop: 8, borderBottom: '1px solid #ededed', paddingBottom: 14, paddingRight: 54, paddingLeft: 54 }}>
            <div><h2 style={{ fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}>Settings</h2></div>
          </div>
        </MenuItem>
        */
        }
        <div style={{ paddingRight: 14, paddingLeft: 14 }} ><div style={{ paddingTop: 1, backgroundColor: '#d6d6d6' }} ></div></div>
        <MenuItem
          style={{ paddingRight: 14, paddingLeft: 14 }}
          className="justify-around flex"
          onClick={() => { window.localStorage.removeItem("token"); navigate("/"); handleClose() }}>
          <div className="items-center justify-around flex" style={{ paddingTop: 8, paddingBottom: 8, paddingRight: 54, paddingLeft: 54 }}>
            <div className="justify-around flex"><h2 style={{ fontSize: 14, fontWeight: 400, fontFamily: 'Noto Sans JP' }}>Logout</h2></div>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu