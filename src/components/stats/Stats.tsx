import { FaBullseye, FaSadTear, FaShareAlt, FaUserAlt } from 'react-icons/fa'
import { TbAlertCircleFilled } from 'react-icons/tb'
import { IoIosAddCircle } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { ImStatsDots } from 'react-icons/im'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL, TEXTS_SCHEMA } from '../../utils'
import jwtDecode from 'jwt-decode'
import { SpinnerDotted } from 'spinners-react/lib/esm/SpinnerDotted'
import { Line, Pie } from 'react-chartjs-2'
import { ArcElement, CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import Footer from '../footer/Footer'
import { PiClockCounterClockwiseDuotone } from 'react-icons/pi'

Chart.register(CategoryScale, ArcElement);

const Stats = () => {

  const navigate = useNavigate()
  const url = useParams().shorted_url

  const [mode, setMode] = useState<string>("daily")
  const [general, setGeneral] = useState<any>({})
  const [shortedUrl, setShortedUrl] = useState<any>({})
  const [occuredError, setOccuredError] = useState<boolean>(false)
  const [platformChart, setPlatformChart] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [viewsChart, setViewsChart] = useState<any>({})
  const [countryChart, setCountryChart] = useState<any>({})

  const token: any = window.localStorage.getItem("token")

  useEffect(() => {
    if (token == null)
      navigate("/")
    else {
      getUrl()
    }
  }, [])


  const getViews = async (urlId: number, mode: string) => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/view/get/" + urlId + "?mode=" + mode)
      .then(response => {
        setViewsChart(mode != 'daily' ? sortWeekdaysOrMonths(response.data.param.views_chart.value) : response.data.param.views_chart.value)
        setCountryChart({
          labels: response.data.param.countries_chart.labels,
          values: response.data.param.countries_chart.values
        })
        setPlatformChart({
          labels: response.data.param.platforms_chart.labels,
          values: response.data.param.platforms_chart.values
        })
        setGeneral({
          views: response.data.param.general.views,
          reviews: response.data.param.general.reviews
        })
      })
      .catch(error => setOccuredError(true))
    setIsLoading(false)
  }

  function sortWeekdaysOrMonths(jsonData: any) {
    const sortedData = Object.entries(jsonData)
      .sort(([keyA, valueA], [keyB, valueB]) => {
        const order = isWeekDay(jsonData) ? ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] : ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
        return order.indexOf(keyA.toLowerCase()) - order.indexOf(keyB.toLowerCase());
      })
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return sortedData
  }

  function isWeekDay(jsonData: any) {
    const data = jsonData
    const firstKey = Object.keys(data)[0];

    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    return weekdays.includes(firstKey.toLowerCase())
  }

  const getUrl = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/url/get/" + url, { headers: { "Authorization": `Bearer ${token}` } })
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
            <div className='p-10 none-flex items-center'>
              <select style={{ width: 154, height: 84 }} className='cursor-pointer font-semibold text-xl rounded-md bg-[#fcfcfc] shadow-md p-4' defaultValue={mode} value={mode} onChange={(e) => { setMode(e.target.value); getViews(shortedUrl.url_id, e.target.value) }} name="" id="">
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
            <div className='justify-between flex-block'>
              <div className='flex-block'>
                <div className='box-p-pp'>
                  <div className='flex bg-[#fcfcfc] rounded-md p-8 shadow-lg'>
                    <div className='items-center flex p-2'><FaUserAlt size={45} /></div>
                    <div className='pl-4'>
                      <h2 style={{ fontSize: 34 }} className="text-[#404727] font-semibold font-noto">{general.views}</h2>
                      <h2 style={{ fontSize: 18 }} className="text-[#404727] font-regular font-noto">{TEXTS_SCHEMA[mode].views}</h2>
                    </div>
                  </div>
                </div>
                <div className='box-p-pp'>
                  <div className='flex bg-[#fcfcfc] rounded-md p-8 shadow-lg'>
                    <div className='items-center flex p-2'><PiClockCounterClockwiseDuotone size={54} /></div>
                    <div className='pl-4'>
                      <h2 style={{ fontSize: 34 }} className="text-[#404727] font-semibold font-noto">{general.reviews.toFixed()}<span style={{ fontSize: 24 }} className="text-[#404727] font-semibold font-noto"> times</span></h2>
                      <h2 style={{ fontSize: 18 }} className="text-[#404727] font-regular font-noto">{TEXTS_SCHEMA[mode].reviews}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex-none pr-16 items-center justify-around p-4'>
                <select style={{ width: 154, height: 84 }} className='cursor-pointer font-semibold text-xl rounded-md bg-[#fcfcfc] shadow-md p-4' defaultValue={mode} value={mode} onChange={(e) => { setMode(e.target.value); getViews(shortedUrl.url_id, e.target.value) }} name="" id="">
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
            </div>
            <div className='flex-block'>
              <div className='pl-4 justify-around flex p-8'>
                <div className='pt-4 chart-line bg-[#fcfcfc] rounded-md p-8 shadow-lg'>
                  <div className='p-4'>
                    <h2 style={{ maxWidth: 340, fontSize: 18 }} className="text-[#404727] font-medium font-noto">{TEXTS_SCHEMA[mode].views}</h2>
                  </div>
                  <Line
                    height="400px"
                    width="400px"
                    data={{
                      datasets: [
                        {
                          label: 'Views',
                          data: viewsChart,
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
              </div>
              <div className='pt-4 p-8 flex-block'>
                <div className='pr-4 pt-4 p-8'>
                  <div style={{ width: 340, height: 440 }} className='pt-4 bg-[#fcfcfc] rounded-md p-8 shadow-lg'>
                    <div className='p-4'>
                      <h2 style={{ maxWidth: 284, fontSize: 18 }} className="text-[#404727] font-medium font-noto">{TEXTS_SCHEMA[mode].country}</h2>
                    </div>
                    {
                      countryChart.labels.length > 0 ? (
                        <Pie style={{ display: 'block', height: -140, width: 280 }} data={{
                          labels: countryChart.labels,
                          datasets: [
                            {
                              label: 'people saw the website',
                              data: countryChart.values,
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
                      ) : (
                        <img width={340} src={require("../../images/not_found.png")} alt="" />
                      )
                    }
                  </div>
                </div>
                <div className='pl-4 pt-4 p-8'>
                  <div style={{ width: 340, height: 440 }} className='pt-4 bg-[#fcfcfc] rounded-md p-8 shadow-lg'>
                    <div className='p-4'>
                      <h2 style={{ maxWidth: 284, fontSize: 18 }} className="text-[#404727] font-medium font-noto">{TEXTS_SCHEMA[mode].platform}</h2>
                    </div>
                    {
                      platformChart.labels.length > 0 ? (
                        <Pie style={{ display: 'block', height: -140, width: 280 }} data={{
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
                      ) : (
                        <img width={340} src={require("../../images/not_found.png")} alt="" />
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Stats