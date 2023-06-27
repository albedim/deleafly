import { isMobile } from 'react-device-detect';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils';
import { useParams } from 'react-router-dom';

const ShortedUrl = () => {

  const url = useParams().shorted_url

  const get = async () => {
    await axios.get(BASE_URL + "/url/get/free/" + url)
    .then((response) => {
      create(response.data.param.url_id, response.data.param.original_url)
    })
    .catch(error => {})
  }

  const create = async (urlId: any, original_url: any) => {
    const res = await axios.get('https://geolocation-db.com/json/')
    await axios.post(BASE_URL + "/view/create", {
      url_id: urlId,
      platform: isMobile ? "Phone" : "PC",
      ipv4: res.data.IPv4,
      country_code: res.data.country_code
    })
    .then(response => window.location.href = "https://" + original_url)
    .catch(error => console.log(error))
    return
  }

  useEffect(() => {
    get()
  },[])

return (
  <></>
);
}

export default ShortedUrl;