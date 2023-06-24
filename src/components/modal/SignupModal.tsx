import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { RiCloseFill } from "react-icons/ri";
import "./Modal.css";

interface SignupModalProps {
  onClose: () => void,
  visible: boolean,
  first_url: string
}

const SignupModal: React.FC<SignupModalProps> = ({ first_url, visible, onClose }) => {

  const [signupSchema, setSignupSchema] = useState({
    email: '',
    complete_name: '',
    password: '',
    first_url: ''
  })

  const handleSignupSchema = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSignupSchema: any = { ...signupSchema }
    newSignupSchema[e.target.name] = e.target.value
    setSignupSchema(newSignupSchema)
    console.log(newSignupSchema)
  }

  useEffect(() => setSignupSchema({ ...signupSchema, first_url: first_url }), [first_url])

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
                <div className='pt-9 p-14'>
                  <div className='pb-3'>
                    <h2 style={{ fontSize: 16.4 }} className="pb-2 font-medium font-noto" >Complete name</h2>
                    <input name='complete_name' onChange={(e) => handleSignupSchema(e)} value={signupSchema.complete_name} style={{ fontSize: 16 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-4 pt-4 pr-4 pl-4" type="text" />
                  </div>
                  <div className='pb-3'>
                    <h2 style={{ fontSize: 16.4 }} className="pb-2 font-medium font-noto" >E-mail</h2>
                    <input name='email' onChange={(e) => handleSignupSchema(e)} value={signupSchema.email} style={{ fontSize: 16 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-4 pt-4 pr-4 pl-4" type="text" />
                  </div>
                  <div className='pb-3'>
                    <h2 style={{ fontSize: 16.4 }} className="pb-2 font-medium font-noto" >Password</h2>
                    <input name='password' onChange={(e) => handleSignupSchema(e)} value={signupSchema.password} style={{ fontSize: 16 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-4 pt-4 pr-4 pl-4" type="password" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 16.4 }} className="pb-1 font-medium font-noto" >First url</h2>
                    <input name='first_url' onChange={(e) => handleSignupSchema(e)} value={signupSchema.first_url} style={{ fontSize: 16 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-4 pt-4 pr-4 pl-4" type="text" />
                  </div>
                  <div  className="justify-between flex pt-9">
                    <div></div>
                    <button style={{ fontSize: 16 }} className="font-medium font-noto text-[white] rounded-2xl bg-[#404727] pb-4 pt-4 pr-7 pl-7" >Next</button>
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

export default SignupModal;
