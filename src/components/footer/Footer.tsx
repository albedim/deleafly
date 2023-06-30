import Logo from "../header/Logo";
import { BsTwitter, BsGithub } from 'react-icons/bs'
import { SiTiktok } from 'react-icons/si'

const Footer = () => {
  return (
    <>
      <div style={{ height: 54 }} ></div>
      <div style={{ paddingRight: 140, paddingLeft: 140 }} className="w-screen p-14 items-center justify-around flex-block" >
        <div>
          <div className="justify-around block-flex">
            <Logo style={{}} class_name={"flex"} />
          </div>
          <div className="justify-around block-flex">
            <h2 style={{ fontSize: 16 }} className="mt-4 text-[gray] font-regular font-noto" >Copyright © 2023 Deleafly.</h2>
          </div>
        </div>
        <div className="justify-around flex">
          <div className="flex">
            <div className="pb-14 pt-14 pr-14"><BsTwitter size={24} /></div>
            <div className="pb-14 pt-14 pr-14"><SiTiktok size={24} /></div>
            <div className="pb-14 pt-14"><BsGithub size={24} /></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer