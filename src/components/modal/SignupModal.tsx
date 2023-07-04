import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { RiCloseFill } from "react-icons/ri";
import "./Modal.css";
import { BASE_URL } from "../../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface SignupModalProps {
  onClose: () => void,
  visible: boolean,
  first_url: string
}


const SignupModal: React.FC<SignupModalProps> = ({
  first_url,
  visible,
  onClose
}) => {

  const [signupSchema, setSignupSchema] = useState({
    email: '',
    complete_name: '',
    password: '',
    first_url: ''
  })

  const [error, setError] = useState("")

  const navigate = useNavigate()


  const isSignupSchemaValid = (
    signupSchema.complete_name != ""
    && signupSchema.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    && signupSchema.first_url != "" 
    && signupSchema.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  )


  const handleSignupSchema = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSignupSchema: any = { ...signupSchema }
    newSignupSchema[e.target.name] = e.target.value
    setSignupSchema(newSignupSchema)
    console.log(newSignupSchema)
  }


  const signup = async () => {
    await axios.post(BASE_URL + "/user/signup", signupSchema)
    .then(response => {
      window.localStorage.setItem("token", response.data.param.token)
      navigate("/dashboard")
      onClose()
    })
    .catch(error => setError(error.response.data.error))
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
                    <input placeholder="Marcus Loren" name='complete_name' onChange={(e) => handleSignupSchema(e)} value={signupSchema.complete_name} style={{ fontSize: 14 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-3 pt-3 pr-3 pl-3" type="text" />
                  </div>
                  <div className='pb-3'>
                    <h2 style={{ fontSize: 16.4 }} className="pb-2 font-medium font-noto" >E-mail</h2>
                    <input placeholder="marcusloren@gmail.com" name='email' onChange={(e) => handleSignupSchema(e)} value={signupSchema.email} style={{ fontSize: 14 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-3 pt-3 pr-3 pl-3" type="text" />
                  </div>
                  <div className='pb-3'>
                    <h2 style={{ fontSize: 16.4 }} className="pb-2 font-medium font-noto" >Password</h2>
                    <input placeholder="Marcus2023" name='password' onChange={(e) => handleSignupSchema(e)} value={signupSchema.password} style={{ fontSize: 14 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-3 pt-3 pr-3 pl-3" type="password" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 16.4 }} className="pb-1 font-medium font-noto" >First url</h2>
                    <input name='first_url' onChange={(e) => handleSignupSchema(e)} value={signupSchema.first_url} style={{ fontSize: 14 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-3 pt-3 pr-3 pl-3" type="text" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 14.4 }} className="text-[red] pl-1 pt-2 font-medium font-noto" >{error}</h2>
                  </div>
                  <div  className="justify-between flex pt-9">
                    <div></div>
                    <button disabled={!isSignupSchemaValid} onClick={() => signup()} style={{ cursor: isSignupSchemaValid ? 'pointer' : 'not-allowed', fontSize: 14 }} className="font-medium font-noto text-[white] rounded-2xl bg-[#404727] pb-4 pt-4 pr-7 pl-7" >Next</button>
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
