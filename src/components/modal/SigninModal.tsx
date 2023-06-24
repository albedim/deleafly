import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { RiCloseFill } from "react-icons/ri";
import "./Modal.css";

interface SigninmodalProps {
  onClose: () => void,
  visible: boolean,
}

const SigninModal: React.FC<SigninmodalProps> = ({ visible, onClose }) => {

  const [signinSchema, setSigninSchema] = useState({
    email: '',
    password: ''
  })

  const handleSigninSchema = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSigninSchema: any = { ...signinSchema }
    newSigninSchema[e.target.name] = e.target.value
    setSigninSchema(newSigninSchema)
    console.log(newSigninSchema)
  }

  return (
    <>
      {
        visible ? (
          <div className="modal" onClick={onClose}>
            <div className="modal-wrapper p-4">
              <div style={{ borderRadius: 8 }} className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="p-4 items-center justify-between flex">
                  <div></div>
                  <div><RiCloseFill className="cursor-pointer" onClick={onClose} color="gray" size={24} /></div>
                </div>
                <div className='pt-4 pl-14 pr-14 pb-14'>
                  <div className='pb-3'>
                    <h2 style={{ fontSize: 16.4 }} className="pb-2 font-medium font-noto" >E-mail</h2>
                    <input name='email' onChange={(e) => handleSigninSchema(e)} value={signinSchema.email} style={{ fontSize: 16 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-4 pt-4 pr-4 pl-4" type="text" />
                  </div>
                  <div className='pb-3'>
                    <h2 style={{ fontSize: 16.4 }} className="pb-2 font-medium font-noto" >Password</h2>
                    <input name='password' onChange={(e) => handleSigninSchema(e)} value={signinSchema.password} style={{ fontSize: 16 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-4 pt-4 pr-4 pl-4" type="password" />
                  </div>
                  <div  className="justify-between flex pt-4">
                    <div></div>
                    <button style={{ fontSize: 16 }} className="font-medium font-noto text-[white] rounded-2xl bg-[#404727] pb-4 pt-4 pr-7 pl-7" >Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )
      }
    </>
  );
};

export default SigninModal;
