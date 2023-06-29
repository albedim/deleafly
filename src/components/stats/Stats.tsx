import { FaBullseye, FaSadTear, FaShareAlt } from 'react-icons/fa'
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

Chart.register(CategoryScale, ArcElement);

const Stats = () => {

  const navigate = useNavigate()
  const url = useParams().shorted_url

  const [mode, setMode] = useState<string>("daily")
  const [shortedUrl, setShortedUrl] = useState<any>({})
  const [occuredError, setOccuredError] = useState<boolean>(false)
  const [platformChart, setPlatformViews] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [views, setViews] = useState<any>({})
  const [countryViews, setCountryViews] = useState<any>({})

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
        setViews({
          label: response.data.param.views_chart.label,
          value: mode != 'daily' ? sortWeekdaysOrMonths(response.data.param.views_chart.value) : response.data.param.views_chart.value
        })
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
            <select className='shadow-md p-4' defaultValue={mode} value={mode} onChange={(e) => { setMode(e.target.value); getViews(shortedUrl.url_id, e.target.value) }} name="" id="">
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </select>
            <div className='flex-block'>
              <div className='bg-[#fcfcfc] rounded-2xl p-8 shadow-lg'>
                <div className='p-4'>
                  <h2 style={{ maxWidth: 340, fontSize: 18 }} className="text-[#404727] font-extrabold font-noto">{TEXTS_SCHEMA[mode].views}: {views.label}</h2>
                </div>
                <Line
                  height="600px"
                  width="400px"
                  data={{
                    datasets: [
                      {
                        label: 'Views',
                        data: views.value,
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
              <div className='p-8 flex-block'>
                <div className='p-8'>
                  <div className='bg-[#fcfcfc] rounded-2xl p-8 shadow-lg'>
                    <div className='p-4'>
                      <h2 style={{ maxWidth: 284, fontSize: 18 }} className="text-[#404727] font-extrabold font-noto">{TEXTS_SCHEMA[mode].country}</h2>
                    </div>
                    {
                      countryViews.labels.length > 0 ? (
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
                <div className='p-8'>
                  <div className='bg-[#fcfcfc] rounded-2xl p-8 shadow-lg'>
                    <div className='p-4'>
                      <h2 style={{ maxWidth: 284, fontSize: 18 }} className="text-[#404727] font-extrabold font-noto">{TEXTS_SCHEMA[mode].platform}</h2>
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