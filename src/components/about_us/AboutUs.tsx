import { HiCheckCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {

  const navigate = useNavigate()

  return (
    <div className="justify-around flex w-screen">
      <div className="mt-14 flex-block">
        <div>
          <div className="flex p-14">
            <div>
              <h2 
                style={{ maxWidth: 514, fontSize: 34 }} 
                className="text-[#07242b] font-extrabold font-noto" >
                What is Deleafly?
              </h2>
              <h2 
                style={{ maxWidth: 514, fontSize: 18 }} 
                className="pt-3 text-[#07242b] font-medium font-noto" >
                Deleafly is the first Web Tracker. <br />
                Also known as life saver if you need to track the traffic on your webistes or urls<br />
                Statistics available daily, weekly, monthly and yearly.<br />
                That's what you can do only with Deleafly:<br /><br />

                <div 
                  style={{ marginBottom: -24 }} 
                  className="pl-2 pt-2 flex">
                  <div className="pt-1 pr-2" >
                    <HiCheckCircle 
                      size={28} 
                      color="#ccd0af" 
                    />
                  </div>
                  <span 
                    className="font-normal" >
                    See how many people watch your urls. <br /> 
                    Using the cleanest dashboard you've ever used
                  </span>
                </div><br /><br />
                <div 
                  style={{ marginBottom: -24 }} 
                  className="pt-2 pl-2 flex">
                  <div className="pt-1 pr-2" >
                    <HiCheckCircle 
                      size={28} 
                      color="#ccd0af" 
                    />
                  </div>
                  <span 
                    className="font-normal" >
                    See where your viewers come from, grouped <br />
                    by country.
                  </span>
                </div><br /><br />
                <div 
                  style={{ marginBottom: -24 }} 
                  className="pt-2 pl-2 flex">
                  <div className="pt-1 pr-2" >
                    <HiCheckCircle 
                      size={28} 
                      color="#ccd0af" 
                    />
                  </div>
                  <span 
                    className="font-normal" >
                    See the devices your viewers use to see <br />your urls.
                  </span>
                </div><br /><br />
                <div 
                  style={{ marginBottom: -24 }} 
                  className="pt-2 pl-2 flex">
                  <div className="pt-1 pr-2" >
                    <HiCheckCircle 
                      size={28} 
                      color="#ccd0af" 
                    />
                  </div>
                  <span 
                    className="font-normal" >
                    See the avarage count of the reviews <br />your urls get.
                  </span>
                </div>
                <br /><br />
              </h2>
            </div>
            <div className="pl-14 justify-around flex">
              <div>
                <div className="pb-8 pt-0 p-14">
                  <div 
                    className="w-60 rounded-2xl p-6 bg-[#ccd0af]">
                    <h2 
                      style={{ fontSize: 34 }} 
                      className="text-[white] font-extrabold font-noto" >50+
                    </h2>
                    <h2 
                      style={{ fontSize: 16 }} 
                      className="text-[white] font-extrabold font-noto" >Users using Deleafly
                    </h2>
                  </div>
                </div>
                <div className="pb-8 p-14">
                  <div 
                    className="w-60 rounded-2xl p-6 bg-[#ccd0af]">
                    <h2 
                      style={{ fontSize: 34 }} 
                      className="text-[white] font-extrabold font-noto" >100
                    +</h2>
                    <h2 
                      style={{ fontSize: 16 }} 
                      className="text-[white] font-extrabold font-noto" >Tracked urls
                    </h2>
                  </div>
                </div>
                <div className="p-14">
                  <div 
                    className="w-60 rounded-2xl p-6 bg-[#ccd0af]">
                    <h2 
                      style={{ fontSize: 34 }} 
                      className="text-[white] font-extrabold font-noto" >200
                    +</h2>
                    <h2 
                      style={{ fontSize: 16 }} 
                      className="text-[white] font-extrabold font-noto" >Urls' views per day
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex p-14">
            <div>
              <h2 
                style={{ maxWidth: 514, fontSize: 34 }} 
                className="text-[#07242b] font-extrabold font-noto" >How can I track my urls?
              </h2>
              <h2 
                style={{ maxWidth: 514, fontSize: 18 }} 
                className="pt-3 text-[#07242b] font-medium font-noto" >
                You can track any kind of website/url. 
                You just need to go to your 
                <span 
                  style={{ textDecorationColor: '#ccd0af', textDecoration: 'underline' }} 
                  onClick={() => navigate("/dashboard")} >dashboard
                </span> 
                and create a new URL, 
                Deleafly is going to create a shorted one 
                that you can share to people and track whenever you want
              </h2>
            </div>
            <div className="pl-14 justify-around flex">
              <div>
                <div 
                  className="pb-8 pt-0 p-14">
                  <div 
                    className="w-60 rounded-2xl p-6 bg-[#ccd0af]">
                    <h2 
                      style={{ fontSize: 34 }} 
                      className="text-[white] font-extrabold font-noto" >50+
                    </h2>
                    <h2 
                      style={{ fontSize: 16 }} 
                      className="text-[white] font-extrabold font-noto" >Active dashobards
                    </h2>
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

export default AboutUs