import React, { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import "./Modal.css";
import { BASE_URL } from "../../utils";
import axios from "axios";
import jwtDecode from "jwt-decode";


interface AccountModalProps {
  onClose: () => void,
  visible: boolean,
}


const AccountModal: React.FC<AccountModalProps> = ({
  visible,
  onClose
}) => {

  const token: any = window.localStorage.getItem("token")

  const user: any = jwtDecode(token)

  const [accountSchema, setAccountSchema] = useState({
    complete_name: user.sub.complete_name, 
    email: user.sub.email,
    new_password: ''
  })

  const isAccountSchemaValid = ( 
    (accountSchema.complete_name != "" && 
      accountSchema.complete_name != user.sub.complete_name
    ) && accountSchema.new_password == "" ||
    (
      accountSchema.new_password != "" && 
      accountSchema.new_password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    )
  )

  const [error, setError] = useState("")


  const handleAccountSchema = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAccountSchema: any = { ...accountSchema }
    newAccountSchema[e.target.name] = e.target.value
    setAccountSchema(newAccountSchema)
  }


  const change = async () => {
    await axios.put(BASE_URL + "/user/change/" + user.sub.user_id, accountSchema)
    .then(response => {
      window.localStorage.setItem("token", response.data.param.token)
      onClose()
    })
    .catch(error => setError(error.response.data.error))
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
                    <h2 style={{ fontSize: 16.4 }} className="pb-2 font-medium font-noto" >Complete name</h2>
                    <input
                      placeholder="Marcus Loren" 
                      name='complete_name' 
                      onChange={(e) => handleAccountSchema(e)} 
                      value={accountSchema.complete_name} 
                      style={{ fontSize: 14 }} 
                      className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-3 pt-3 pr-3 pl-3" 
                      type="text" 
                    />
                  </div>
                  <div className='pb-3'>
                    <h2 
                      style={{ fontSize: 16.4 }} 
                      className="pb-2 font-medium font-noto" >E-mail
                    </h2>
                    <input 
                      name='email' 
                      disabled 
                      onChange={(e) => handleAccountSchema(e)} 
                      value={accountSchema.email} 
                      style={{ fontSize: 14 }} 
                      className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-3 pt-3 pr-3 pl-3" 
                      type="text" 
                    />
                  </div>
                  <div 
                    className='pb-3'>
                    <h2 
                      style={{ fontSize: 16.4 }} 
                      className="pb-2 font-medium font-noto" >New Password
                    </h2>
                    <input 
                      placeholder="Marcus23" 
                      name='new_password' 
                      onChange={(e) => handleAccountSchema(e)} 
                      value={accountSchema.new_password} 
                      style={{ fontSize: 14 }} 
                      className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-3 pt-3 pr-3 pl-3" 
                      type="password" 
                    />
                  </div>
                  <div>
                    <h2 
                      style={{ fontSize: 14.4 }} 
                      className="text-[red] pl-1 pt-2 font-medium font-noto" >{error}
                    </h2>
                  </div>
                  <div className="justify-between flex pt-4">
                    <div></div>
                    <button 
                      disabled={!isAccountSchemaValid} 
                      onClick={() => change()} 
                      style={{ cursor: isAccountSchemaValid ? 'pointer' : 'not-allowed', fontSize: 14 }} 
                      className="font-medium font-noto text-[white] rounded-2xl bg-[#404727] pb-4 pt-4 pr-7 pl-7" >Change
                    </button>
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

export default AccountModal;
