import { isMobile } from 'react-device-detect';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils';
import { useParams } from 'react-router-dom';

const ShortedUrl = () => {

  const url = useParams().shorted_url

  const create = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    await axios.post(BASE_URL + "/view/create", {
      url_code: url,
      platform: isMobile ? "Phone" : "PC",
      ipv4: res.data.IPv4,
      country_code: res.data.country_code
    })
      .then(response => window.location.href = "https://" + response.data.param.original_url)
      .catch(error => create())
    return
  }

  useEffect(() => {
    create()
  }, [])

  return (
    <></>
  );
}

export default ShortedUrl;