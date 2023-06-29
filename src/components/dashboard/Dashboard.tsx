import { FaBullseye, FaSadTear, FaShareAlt } from 'react-icons/fa'
import { PiPencilSimpleLineFill } from 'react-icons/pi'
import { IoIosAddCircle } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { ImStatsDots } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils'
import jwtDecode from 'jwt-decode'
import { SpinnerDotted } from 'spinners-react/lib/esm/SpinnerDotted'
import { IoClose, IoCopy, IoSave } from 'react-icons/io5'
import Modal from '../modal/Modal'

const Dashboard = () => {

  const navigate = useNavigate()
  const [modalOptions, setModalOptions] = useState({ body: <div></div>, visible: false })
  const [inEditingUrl, setInEditingUrl] = useState<any>("")
  const [inEditing, setInEditing] = useState(false)
  const [occuredError, setOccuredError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [maxUrls, setMaxUrls] = useState(0)
  const [urls, setUrls] = useState<any[]>([])
  const token: any = window.localStorage.getItem("token")

  useEffect(() => {
    if (token == null)
      navigate("/")
    else getUrls()
  }, [])

  const getUrls = async () => {
    await axios.get(BASE_URL + "/url/get/of/" + jwtDecode<any>(token).sub.user_id)
      .then(response => {
        setUrls(response.data.param.urls)
        setMaxUrls(response.data.param.max_urls)
      })
      .catch(error => setOccuredError(true))
    setIsLoading(false)
  }

  const removeUrl = async (urlId: number) => {
    await axios.delete(BASE_URL + "/url/remove/" + urlId)
      .then(response => {
        setUrls(response.data.param.urls)
        setMaxUrls(response.data.param.max_urls)
      })
      .catch(error => console.log(error))
  }

  const editUrl = async (urlId: any) => {
    await axios.put(BASE_URL + "/url/change/" + urlId + "?name=" + inEditingUrl, {}, { headers: { "Authorization": `Bearer ${token}` } })
      .then(response => {
        setUrls(response.data.param.urls)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="items-center justify-around w-screen flex">
      <Modal body={modalOptions.body} onClose={() => setModalOptions({ body: <div></div>, visible: false })} visible={modalOptions.visible} />
      {
        isLoading || occuredError ? (
          isLoading ? (
            <div className='mt-24 items-center justify-around flex w-screen' >
              <div>
                <div className='p-8 items-center justify-around flex' ><SpinnerDotted speed={140} thickness={140} size={54} color='#ccd0af' /></div>
                <h2 style={{ fontSize: 24 }} className="text-[#404727] font-extrabold font-noto">Loading...</h2>
              </div>
            </div>
          ) : (
            <div className='mt-24 items-center justify-around flex w-screen' >
              <div>
                <div className='p-8 items-center justify-around flex' ><FaSadTear size={54} color='#ccd0af' /></div>
                <h2 style={{ maxWidth: 340, fontSize: 24 }} className="text-center text-[#404727] font-extrabold font-noto">An Error occured while loading your dashboard :(. Try Again</h2>
              </div>
            </div>
          )
        ) : (
          <div>
            <div className="pb-4 p-14 justify-between flex">
              <h2 style={{ fontSize: 24 }} className="text-[#404727] font-extrabold font-noto" >Your url's</h2>
              <div className='flex'>
                <h2 style={{ fontSize: 24 }} className="text-[#ccd0af] font-extrabold font-noto" >{urls.length}/{maxUrls}</h2>
                {
                  urls.length > 2 &&
                  <div className='items-center justify-around flex pl-2' ><IoIosAddCircle size={24} color='#404727' /></div>
                }
              </div>
            </div>
            <div>
              {
                urls.map(url => (
                  <div className='pt-4 pb-4 p-14'>
                    <div className="bg-[#fcfcfc] rounded-xl justify-between flex-block shadow-md p-6">
                      <div className='justify-around flex'>
                        <div className='items-center justify-around flex p-8'>
                          <FaShareAlt onClick={() => setModalOptions({
                            visible: true,
                            body: 
                              <div className='p-4'>
                                <div className='pl-6'>
                                  <h2 style={{ width: 284, fontSize: 16 }} className="text-[#404727] font-bold font-noto" >
                                    Copy the url and share it to see its traffic.</h2>
                                </div>
                                <div className='items-center justify-around flex p-4'>
                                  <div style={{ width: 254 }} className='rounded-md flex p-2 bg-[#fafafa]' >
                                    <input className='bg-[#fafafa]' value={"sturl-web.pages.dev/" + url.shorted_url.substring(0,2) + "..."} disabled type="text"></input>
                                    <div id='copy' className='ml-4 rounded-md p-2 bg-[#ccd0af]'>
                                      <IoCopy onClick={() => {
                                        navigator.clipboard.writeText("https://sturl-web.pages.dev/" + url.shorted_url); 
                                        const d: any = document.querySelector("#copy"); 
                                        d.style.transition = "0.7s"; 
                                        d.style.backgroundColor = '#9fdb8f'; 
                                        setTimeout(() => {
                                          d.style.backgroundColor = '#ccd0af'
                                        }, 1800)
                                      }} color='white'/>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          })} color='#404727' size={24} />
                        </div>
                      </div>
                      <div className='items-center justify-around flex'>
                        <div>
                          <div className='items-center flex'>
                            {
                              inEditing ? (
                                inEditingUrl.length > 0 && inEditingUrl != url.name ? (
                                  <>
                                    <input autoFocus onChange={(e) => setInEditingUrl(e.target.value)} value={inEditingUrl} style={{ fontSize: 19 }} className="text-[#404727] font-extrabold font-noto" />
                                    <div className='pl-3' ><IoSave size={24} color='gray' onClick={() => { setInEditing(false); editUrl(url.url_id) }} /></div>
                                  </>
                                ) : (
                                  <>
                                    <input autoFocus onChange={(e) => setInEditingUrl(e.target.value)} value={inEditingUrl} style={{ fontSize: 19 }} className="text-[#404727] font-extrabold font-noto" />
                                    <div className='pl-3' ><IoClose size={24} color='gray' onClick={() => { setInEditing(false) }} /></div>
                                  </>
                                )
                              ) : (
                                <>
                                  <h2 style={{ fontSize: 19 }} className="text-[#404727] font-extrabold font-noto" >{url.name}</h2>
                                  <div className='pl-4'><PiPencilSimpleLineFill size={24} color='gray' onClick={() => { setInEditing(true); setInEditingUrl(url.name) }} /></div>
                                </>
                              )
                            }
                          </div>
                          <a target='_blank' href={`http://sturl-web.pages.dev/${url.shorted_url}`}><h2 style={{ textDecoration: 'underline', fontSize: 17 }} className="text-[#ccd0af] font-extrabold font-noto" >sturl.pages.dev/{url.shorted_url}</h2></a>
                        </div>
                      </div>
                      <div className='none-block h-10' ></div>
                      <div className='flex no-padding pl-24 items-center justify-around'>
                        <div className='flex'>
                          <div className='p-4'><ImStatsDots className="cursor-pointer" onClick={() => navigate(`/${url.shorted_url}/stats`)} color='#404727' size={24} /></div>
                          <div className='p-4'><MdDelete className='cursor-pointer' onClick={() => removeUrl(url.url_id)} color='#404727' size={28} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="p-8 items-center justify-around flex">
              {
                urls.length < 3 &&
                <button className="font-lg font-noto text-[white] rounded-2xl bg-[#404727] pb-5 pt-5 pr-8 pl-8" >Create</button>
              }
            </div>
          </div>
        )}
    </div>
  )
}

export default Dashboard