import '../../style/index.css'
import { useState } from 'react'
import SignupModal from '../modal/SignupModal';
import { HiCheckCircle } from 'react-icons/hi';


const GetStarted = () => {

  const [modalOptions, setModalOptions] = useState({ visible: false })

  const [url, setUrl] = useState("")

  const isUrlValid = url.split(".").length > 1 && url.split(".")[1].length > 0


  return (
    <div className='w-screen'>
      <div className="justify-around flex">
        <SignupModal first_url={url} onClose={() => setModalOptions({ visible: false })} visible={modalOptions.visible} />
        <div className="mt-4 flex">
          <div className="get_started_padding items-center justify-around flex">
            <div>
              <div className="pl-6 pr-14 pt-14" ><h2 style={{ maxWidth: 334, fontSize: 44 }} className="text-[#07242b] font-extrabold font-noto" >track your <span className="text-[#404727]" >urls</span> with us</h2></div>
              <div className="pt-6 pb-14 pr-14 pl-6" ><h2 style={{ maxWidth: 454, fontSize: 18.4 }} className="font-medium font-noto" >The first Web tracker that let you track the traffic on your urls easy and fast with a clean dashboard.</h2></div>
              <div className="flex pl-6 pr-14 pb-14" >
                <div className="pr-2">
                  <input onChange={(e) => setUrl(e.target.value)} value={url} style={{ fontSize: 16 }} className="w-mobile font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-4 pt-4 pr-1 pl-8" type="text" placeholder="Write your url" />
                </div>
                <div>
                  <button disabled={!isUrlValid} style={{ cursor: isUrlValid ? 'pointer' : 'not-allowed', fontSize: 16 }} onClick={() => setModalOptions({ visible: true })} className="font-medium font-noto text-[white] rounded-2xl bg-[#404727] pb-4 pt-4 pr-7 pl-7" >Track</button>
                </div>
              </div>
            </div>
          </div>
          <div className="pl-24 justify-around flex-none">
            <img width={624} src={require("../../images/get_started.png")} alt="" />
          </div>
        </div>
      </div>
      <div className="justify-around mt-24 flex">
        <div>
          <div className="justify-around flex-block p-14">
            <div className='justify-around flex'>
              <div>
                <h2 style={{ fontSize: 34 }} className="max-w text-[#07242b] font-extrabold font-noto" >What is Deleafly?</h2>
                <h2 style={{ fontSize: 18 }} className="max-w pt-3 text-[#07242b] font-medium font-noto" >
                  Deleafly is the first Web Tracker. <br />Also known as life saver if you need to track the traffic on your webistes or urls<br />Statistics available daily, weekly, monthly and yearly.<br />That's what you can do only with Deleafly:<br /><br />

                  <div style={{ marginBottom: -24 }} className="pl-2 pt-2 flex">
                    <div className="pt-1 pr-2" ><HiCheckCircle size={28} color="#ccd0af" /></div><span className="font-normal" >See how many people watch your urls. <br /> Using the cleanest dashboard you've ever used</span>
                  </div><br /><br />
                  <div style={{ marginBottom: -24 }} className="pt-2 pl-2 flex">
                    <div className="pt-1 pr-2" ><HiCheckCircle size={28} color="#ccd0af" /></div><span className="font-normal" >See where your viewers come from, grouped <br />by country.</span>
                  </div><br /><br />
                  <div style={{ marginBottom: -24 }} className="pt-2 pl-2 flex">
                    <div className="pt-1 pr-2" ><HiCheckCircle size={28} color="#ccd0af" /></div><span className="font-normal" >See the devices your viewers use to see <br />your urls.</span>
                  </div><br /><br />
                  <div style={{ marginBottom: -24 }} className="pt-2 pl-2 flex">
                    <div className="pt-1 pr-2" ><HiCheckCircle size={28} color="#ccd0af" /></div><span className="font-normal" >See the avarage count of the reviews <br />your urls get.</span>
                  </div><br /><br />
                </h2>
              </div>
            </div>
            <div className="p-14 justify-around flex">
              <div>
                <div className="pt-0 p-6">
                  <div className="w-60 rounded-2xl p-6 bg-[#ccd0af]">
                    <h2 style={{ fontSize: 34 }} className="text-[white] font-extrabold font-noto" >50+</h2>
                    <h2 style={{ fontSize: 16 }} className="text-[white] font-extrabold font-noto" >Users using Deleafly</h2>
                  </div>
                </div>
                <div className="pt-0 p-6">
                  <div className="w-60 rounded-2xl p-6 bg-[#ccd0af]">
                    <h2 style={{ fontSize: 34 }} className="text-[white] font-extrabold font-noto" >100+</h2>
                    <h2 style={{ fontSize: 16 }} className="text-[white] font-extrabold font-noto" >Tracked urls</h2>
                  </div>
                </div>
                <div className="pt-0 p-6">
                  <div className="w-60 rounded-2xl p-6 bg-[#ccd0af]">
                    <h2 style={{ fontSize: 34 }} className="text-[white] font-extrabold font-noto" >200+</h2>
                    <h2 style={{ fontSize: 16 }} className="text-[white] font-extrabold font-noto" >Urls' views per day</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='p-14 justify-around flex'>
            <div className='flex-block'>
              <div className='justify-around flex'>
                <div>
                  <h2 style={{ fontSize: 34 }} className="max-w text-[#07242b] font-extrabold font-noto" >How can I track my urls?</h2>
                  <h2 style={{ fontSize: 18 }} className="max-w pt-3 text-[#07242b] font-medium font-noto" >You can track any kind of website/url. You just need to register a new link to track, <span style={{ textDecorationColor: '#ccd0af', textDecoration: 'underline' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} >here</span>.<br />Deleafly is going to create a shorted one that you can share to people and track whenever you want</h2>
                </div>
              </div>
              <div className="p-14 justify-around flex">
                <div>
                  <div className="pt-0 p-6">
                    <div className="w-60 rounded-2xl p-6 bg-[#ccd0af]">
                      <h2 style={{ fontSize: 34 }} className="text-[white] font-extrabold font-noto" >50+</h2>
                      <h2 style={{ fontSize: 16 }} className="text-[white] font-extrabold font-noto" >Active dashobards</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default GetStarted