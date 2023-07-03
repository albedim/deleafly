import '../../style/index.css'
import { useState } from 'react'
import Modal from '../modal/Modal';
import SignupModal from '../modal/SignupModal';
import { Line, Pie } from 'react-chartjs-2';
import { ArcElement, CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto';


const GetStarted = () => {

  const [modalOptions, setModalOptions] = useState({ visible: false })
  const [url, setUrl] = useState("")
  const isUrlValid = url.split(".").length > 1 && url.split(".")[1].length > 0

  return (
    <div className="justify-around flex">
      <SignupModal first_url={url} onClose={() => setModalOptions({ visible: false })} visible={modalOptions.visible} />
      <div className="mt-4 flex">
        <div className="get_started_padding items-center justify-around flex">
          <div>
            <div className="pl-14 pr-14 pt-14" ><h2 style={{ maxWidth: 414, fontSize: 44 }} className="text-[#07242b] font-extrabold font-noto" >track your <span className="text-[#404727]" >links</span> with us</h2></div>
            <div className="pt-6 pb-14 pr-14 pl-14" ><h2 style={{ maxWidth: 484, fontSize: 18.4 }} className="font-medium font-noto" >Track the traffic on your urls easy and fast with our clean dashboard.</h2></div>
            <div className="flex-block pl-14 pr-14 pb-14" >
              <div className="pr-2">
                <input onChange={(e) => setUrl(e.target.value)} value={url} style={{ fontSize: 16 }} className="font-noto rounded-xl bg-opacity-30 bg-[#cdd0b0] pb-4 pt-4 pr-1 pl-8" type="text" placeholder="Write your url" />
              </div>
              <div className="padding-no">
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
  );

}

export default GetStarted