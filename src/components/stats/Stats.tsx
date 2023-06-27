import { FaBullseye, FaSadTear, FaShareAlt } from 'react-icons/fa'
import { IoIosAddCircle } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { ImStatsDots } from 'react-icons/im'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils'
import jwtDecode from 'jwt-decode'
import { SpinnerDotted } from 'spinners-react/lib/esm/SpinnerDotted'
import { Line, Pie } from 'react-chartjs-2'
import { ArcElement, CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'

Chart.register(CategoryScale, ArcElement);

const Stats = () => {

  const navigate = useNavigate()
  const url = useParams().shorted_url
  const [mode, setMode] = useState("daily")
  const [shortedUrl, setShortedUrl] = useState<any>({})
  const [occuredError, setOccuredError] = useState(false)
  const [platformChart, setPlatformViews] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [views, setViews] = useState({})
  const [countryViews, setCountryViews] = useState<any>({})
  const token: any = window.localStorage.getItem("token")

  useEffect(() => {
    if (token == null)
      navigate("/")
    else{ 
      getUrl()
    }
  },[])

  const getViews = async (urlId: number, mode: string) => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/view/get/"+urlId+"?mode=" + mode)
      .then(response => {
        setViews(response.data.param.views_chart)
        setCountryViews({
          labels: response.data.param.countries_chart.labels,
          values: response.data.param.countries_chart.values
        })
        setPlatformViews({
          labels: response.data.param.platforms_chart.labels,
          values: response.data.param.platforms_chart.values
        })
      })
      .catch(error => setOccuredError(true))
      setIsLoading(false)
  }

  const getUrl = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/url/get/" + url, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => {
        setShortedUrl(response.data.param)
        getViews(response.data.param.url_id, mode)
      })
      .catch(error => navigate("/"))
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
          ):( 
            <div className='mt-24 items-center justify-around flex w-screen' >
              <div>
                <div className='p-8 items-center justify-around flex' ><FaSadTear size={54} color='#ccd0af' /></div>
                <h2 style={{ maxWidth: 340, fontSize: 24 }} className="text-center text-[#404727] font-extrabold font-noto">An Error occured while loading your dashboard :(. Try Again</h2>
              </div>
            </div>
          )
        ) : (
          <div>
            <select defaultValue={mode} value={mode} onChange={(e) => { setMode(e.target.value); getViews(shortedUrl.url_id, e.target.value) }} name="" id="">
              <option value=""></option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </select>
            <Pie style={{ display: 'block', height: -140, width: 180 }} data={{
            labels: countryViews.labels,
            datasets: [
              {
                label: 'people saw the website',
                data: countryViews.values,
                backgroundColor: [
                  '#404727',
                  '#5E6839',
                  '#473E27',
                  '#304727',
                  '#93A45A'
                ],
                borderWidth: 1,
              },
            ],
          }} />
          <Pie style={{ display: 'block', height: -140, width: 180 }} data={{
            labels: platformChart.labels,
            datasets: [
              {
                label: 'people saw the website',
                data: platformChart.values,
                backgroundColor: [
                  '#404727',
                  '#5E6839',
                  '#473E27',
                  '#304727',
                  '#93A45A'
                ],
                borderWidth: 1,
              },
            ],
          }} />
          <Line
            height="600px"
            width="400px"
          data={{
            datasets: [
              {
                label: 'Views',
                data: views,
                borderColor: '#404727',
                backgroundColor: '#404727',
              }
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: true,
                text: '',
              },
            },
          }}
        />
        </div>
        )}
    </div>
  )
}

export default Stats