import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { RiCloseFill } from "react-icons/ri";
import "./Modal.css";
import { BASE_URL } from "../../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

interface AccountModalProps {
  onClose: () => void,
  setUrls: () => void,
  visible: boolean,
}

const CreateUrlModal: React.FC<AccountModalProps> = ({ setUrls, visible, onClose }) => {

  const token: any = window.localStorage.getItem("token")
  const user: any = jwtDecode(token)
  const [urlSchema, setUrlSchema] = useState({
    name: '',
    original_url: '',
  })
  const isUrlSchemaValid = urlSchema.name.length <= 21 && urlSchema.name != "" && urlSchema.original_url.split(".").length > 1 && urlSchema.original_url.split(".")[1].length > 1
  const navigate  = useNavigate()
  const [error, setError] = useState("")

  const handleUrlSchema = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrlSchema: any = { ...urlSchema }
    newUrlSchema[e.target.name] = e.target.value
    setUrlSchema(newUrlSchema)
  }

  const create = async () => {
    await axios.post(BASE_URL + "/url/create", { ...urlSchema, user_id: user.sub.user_id })
    .then(response => {
      onClose()
      setUrls()
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
                  <div>
                    <h2 style={{ fontSize: 16.4 }} className="pb-2 font-medium font-noto" >Url name</h2>
                    <input placeholder="My youtube channel" name='name' onChange={(e) => handleUrlSchema(e)} value={urlSchema.name} style={{ fontSize: 14 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-3 pt-3 pr-3 pl-3" type="text" />
                    <h2 style={{ textAlign: 'right', fontSize: 14.4 }} className="pb-2 font-medium font-noto" >{urlSchema.name.length}/21</h2>
                  </div>
                  <div>
                    <h2 style={{ fontSize: 16.4 }} className="pb-2 font-medium font-noto" >Original Url</h2>
                    <input name='original_url' onChange={(e) => handleUrlSchema(e)} value={urlSchema.original_url} style={{ fontSize: 14 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-3 pt-3 pr-3 pl-3" type="text" />
                  </div>
                  <div className="pb-2">
                    <h2 style={{ fontSize: 14.4 }} className="text-[red] pl-1 pt-2 font-medium font-noto" >{error}</h2>
                  </div>
                  <div  className="justify-between flex pt-4">
                    <div></div>
                    <button disabled={!isUrlSchemaValid} onClick={() => create()} style={{ cursor: isUrlSchemaValid ? 'pointer' : 'not-allowed', fontSize: 14 }} className="font-medium font-noto text-[white] rounded-2xl bg-[#404727] pb-4 pt-4 pr-7 pl-7" >Create</button>
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

export default CreateUrlModal;
