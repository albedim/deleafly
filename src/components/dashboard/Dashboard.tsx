import { FaBullseye, FaSadTear, FaShareAlt } from 'react-icons/fa'
import { PiPencilSimpleLineFill } from 'react-icons/pi'
import { IoIosAddCircle } from 'react-icons/io'
import { MdDelete, MdFileDownloadDone } from 'react-icons/md'
import { ImStatsDots } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils'
import jwtDecode from 'jwt-decode'
import { SpinnerDotted } from 'spinners-react/lib/esm/SpinnerDotted'
import { IoClose, IoCopy, IoSave } from 'react-icons/io5'
import Modal from '../modal/Modal'
import CreateUrlModal from '../modal/CreateUrlModal'
import { BiSolidLeftArrowCircle, BiSolidRightArrowCircle } from 'react-icons/bi'

const Dashboard = () => {

  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)
  const [createUrlModalOptions, setCreateUrlModalOptions] = useState({ visible: false })
  const [modalOptions, setModalOptions] = useState({ body: <div></div>, visible: false })
  const [inEditingUrl, setInEditingUrl] = useState<any>({
    url_id: 0,
    name: ''
  })
  const [occuredError, setOccuredError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [maxUrls, setMaxUrls] = useState(0)
  const [urls, setUrls] = useState<any[][]>([])
  const token: any = window.localStorage.getItem("token")

  useEffect(() => {
    if (token == null)
      navigate("/")
    else getUrls()
  }, [])

  const getUrls = async () => {
    await axios.get(BASE_URL + "/url/get/of", { headers: { "Authorization": `Bearer ${token}` } })
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

  const editUrl = async () => {
    await axios.put(BASE_URL + "/url/change/" + inEditingUrl.url_id + "?name=" + inEditingUrl.name, {}, { headers: { "Authorization": `Bearer ${token}` } })
      .then(response => {
        setUrls(response.data.param.urls)
      })
      .catch(error => console.log(error))
  }

  const getUrlsQuantity = () => {
    var counter = 0
    urls.forEach(page => counter += page.length)
    return counter
  }

  return (
    <div className="items-center justify-around w-screen flex">
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
          <>
            <CreateUrlModal setUrls={() => getUrls()} onClose={() => setCreateUrlModalOptions({ visible: false })} visible={createUrlModalOptions.visible} />
            <Modal body={modalOptions.body} onClose={() => setModalOptions({ body: <div></div>, visible: false })} visible={modalOptions.visible} />
            <div>
              <div className="pb-4 p-14 justify-between flex">
                <h2 style={{ fontSize: 24 }} className="text-[#404727] font-extrabold font-noto" >Your url's</h2>
                <div className='flex'>
                  <h2 style={{ fontSize: 24 }} className="text-[#ccd0af] font-extrabold font-noto" >{getUrlsQuantity()}/{maxUrls}</h2>
                  <div className='items-center justify-around flex pl-2' ><IoIosAddCircle className='cursor-pointer' onClick={() => setCreateUrlModalOptions({ visible: true })} size={28} color='#404727' /></div>
                </div>
              </div>
              <div style={{ marginTop: 24}} >
                {
                  urls[currentPage].map(url => (
                    <div className='pt-4 pb-4 p-14'>
                      <div className="bg-[#fcfcfc] rounded-xl justify-between flex-block shadow-md p-6">
                        <div className='justify-around flex'>
                          <div className='items-center justify-around flex p-8'>
                            <FaShareAlt className='cursor-pointer' onClick={() => setModalOptions({
                              visible: true,
                              body: 
                                <div className='p-4'>
                                  <div className='pl-6'>
                                    <h2 style={{ width: 284, fontSize: 16 }} className="text-[#404727] font-bold font-noto" >
                                      Copy the url and share it to see its traffic.</h2>
                                  </div>
                                  <div className='items-center justify-around flex p-4'>
                                    <div style={{ width: 254 }} className='rounded-md flex p-2 bg-[#fafafa]' >
                                      <input className='bg-[#fafafa]' value={"deleafly.pages.dev/" + url.shorted_url} disabled type="text"></input>
                                      <div onClick={() => {
                                          navigator.clipboard.writeText("https://deleafly.pages.dev/" + url.shorted_url); 
                                          const d: any = document.querySelector("#copy-icon"); 
                                          d.style.display = 'none'
                                          const a: any = document.querySelector("#copied-icon");
                                          a.style.display = 'block'
                                        }} id='copy' className='ml-4 rounded-md p-2 bg-[#ccd0af]'>
                                        <IoCopy id='copy-icon' color='white'/>
                                        <MdFileDownloadDone className='hidden' id='copied-icon' color='white'/>
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
                                inEditingUrl.url_id == url.url_id ? (
                                  inEditingUrl.name.length > 0 && inEditingUrl.name != url.name ? (
                                    <>
                                      <input autoFocus onChange={(e) => setInEditingUrl({ url_id: url.url_id, name: e.target.value })} value={inEditingUrl.name} style={{ fontSize: 19 }} className="text-[#404727] font-extrabold font-noto" />
                                      <div className='pl-3' ><IoSave className='cursor-pointer' size={24} color='gray' onClick={() => { setInEditingUrl({ url_id: 0, name: ''}); editUrl()}} /></div>
                                    </>
                                  ) : (
                                    <>
                                      <input autoFocus onChange={(e) => setInEditingUrl({ url_id: url.url_id, name: e.target.value})} value={inEditingUrl.name} style={{ fontSize: 19 }} className="text-[#404727] font-extrabold font-noto" />
                                      <div className='pl-3' ><IoClose className="cursor-pointer" size={24} color='gray' onClick={() => { setInEditingUrl({ url_id: 0, name: ''})}} /></div>
                                    </>
                                  )
                                ) : (
                                  <>
                                    <h2 style={{ fontSize: 19 }} className="text-[#404727] font-extrabold font-noto" >{url.name}</h2>
                                    <div className='pl-4'><PiPencilSimpleLineFill className="cursor-pointer" size={24} color='gray' onClick={() => { setInEditingUrl({ url_id: url.url_id, name: url.name })}} /></div>
                                  </>
                                )
                              }
                            </div>
                            <a target='_blank' href={`http://deleafly.pages.dev/${url.shorted_url}`}><h2 style={{ textDecoration: 'underline', fontSize: 17 }} className="text-[#ccd0af] font-extrabold font-noto" >deleafly.pages.dev/{url.shorted_url}</h2></a>
                          </div>
                        </div>
                        <div className='none-block h-10' ></div>
                        <div className='flex no-padding pl-24 items-center justify-around'>
                          <div className='flex'>
                            <div className='p-4'><ImStatsDots className="cursor-pointer" onClick={() => navigate(`/${url.shorted_url}/stats`)} color='#404727' size={24} /></div>
                            <div className='p-4'><MdDelete opacity={urls.length > 1 || urls[currentPage].length > 1 ? "100%" : "40%"} className='cursor-pointer' onClick={() => {
                              if(urls.length == 1 && urls[currentPage].length == 1){
                                // not removable
                              }else{
                                removeUrl(url.url_id)
                                if(urls[currentPage].length == 1)
                                  setCurrentPage(currentPage-1)
                              }
                            }} color='#404727' size={28} /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='justify-around flex p-14'>
                <div className='items-center flex'>
                  <BiSolidLeftArrowCircle opacity={currentPage == 0 ? "40%" : "100%"} className='cursor-pointer' onClick={() => currentPage == 0 ? {} : setCurrentPage(currentPage-1)} size={28} color='#404727' />
                  <div className='pr-4 pl-4'>
                    <h2 style={{ fontSize: 18 }} className="text-[#404727] font-extrabold font-noto" >{currentPage+1}/{urls.length}</h2>
                  </div>
                  <BiSolidRightArrowCircle opacity={currentPage == urls.length - 1 ? "40%" : "100%"} className='cursor-pointer' onClick={() => currentPage == urls.length - 1 ? {} : setCurrentPage(currentPage+1)} size={28} color='#404727' />
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Dashboard