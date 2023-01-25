import React, {useEffect, useState} from 'react'
import api from '../api'
import Modal from './Modal'
import bnb from '../image/bnb-logo.svg'
import btc from '../image/btc.svg'
import eth from '../image/eth.png'
import { useDebounce } from '../hooks/debounce'


export function Swap() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [inputFirst, setInputFirst] = useState('')
  const [inputSecond, setInputSecond] = useState('')
  const [inputAddress, setInputAddress] = useState('')
  const [active, setActive] = useState('ETH')
  const [show, setShow] = useState(false)
  const [createOrders, setCreateOrders] = useState({
    id: '',
    token: ''
  })
  const [order, setOrder] = useState()
  const [data, setData] = useState()
  const [currency, setCurrency] = useState()

  const debounce = useDebounce(inputFirst)
  
  const getCurrency = async () => {
    try {
        const {data} = await api.data.getCurrencies()
        setCurrency(data.response)
        // console.log('currency', data.response)
    } catch (error) {
        console.log('currency error', error)
    }
  }

  const getPrices = async () => {
    if (!inputFirst) {
        setInputSecond('')
        return
    }
    try {
        const {data} = await api.data.getPrice(`${debounce} ${active}`, 'BSC')
        setInputSecond(data.response.to.amount)
        setData(data.response)
        console.log('currency', data.response)
    } catch (error) {
        console.log('currency error', error)
    }
  }

  useEffect(() =>{
    getCurrency()
  }, []) 
  useEffect(() =>{
    if(inputFirst > 0) {
        getPrices()
    }
  }, [debounce])
  useEffect(() =>{
    setInputFirst('')
    setInputSecond('')
  }, [active])

  useEffect(() =>{
    if(createOrders.id && createOrders.token) {
        getOrderV()
    }
  }, [createOrders.id, createOrders.token])

  const getOrderV = async () => {
    if (!inputFirst) {
        setInputSecond('')
        return
    }
    try {
        const {data} = await api.data.getOrder(createOrders.id, createOrders.token)
        setOrder(data.response)
        console.log('currency', data.response)
    } catch (error) {
        console.log('currency error', error)
    }
  }


  const handleChange = async (event) => {
    event.preventDefault()
    if(!inputAddress) {return}
    if(!inputFirst) {return}
    setError('')
    setLoading(true)
    try {
        const {data} = await api.data.createOrder({ 
            from :`${inputFirst} ${active}`, 
            to: 'BSC', 
            toAddress: `${inputAddress}`
        })
        setCreateOrders({
            id: data.response.id,
            token: data.response.token
          })
          setShow(true)
        console.log('currency', data)
    } catch (error) {
        setError('Invalid address: Insert BSC address')
        console.log('currency error', error)
    } finally {
        setLoading(false)
    }
  }


  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <div onChange={e => setActive(e.target.value)} className='flex items-center p-3'>
        <input defaultChecked type='radio' value='ETH' className='w-[20px] h-[20px]' name='gender' /> ETH
        <input type='radio' value='BTC' className='w-[20px] h-[20px] ml-3' name='gender' /> BTC
      </div>
      <div className=" w-[560px]">
        <div className='flex'>
            <div className='relative w-full mr-3'>
                <input
                    type="number"
                    className="border p-2 w-full h-[42px]"
                    placeholder="send"
                    value={inputFirst}
                    onChange={e => setInputFirst(e.target.value)}
                />
                {inputFirst && <div><span>USD:</span> $ {data?.from.usd}</div>}
                {inputFirst && <div><span>max:</span> {data?.from.max} <span>min:</span> {data?.from.min}</div>}
                <div className='absolute flex items-center top-1 right-2 text-black	'>
                    <p>{active}</p>
                    <img height='30' width='30' src={active === 'ETH' ? eth : btc} />
                </div>
                </div>
            <div className='relative w-full ml-3'>
                <input
                    type="text"
                    disabled
                    className="border p-2 w-full h-[42px] text-white"
                    placeholder="recive"
                    value={inputSecond}
                    onChange={e => setInputSecond(e.target.value)}
                />
                {inputFirst && <div><span>USD:</span> $ {data?.to.usd}</div>}
                {inputFirst && <div><span>max:</span> {data?.to.max} <span>min:</span> {data?.to.min}</div>}
                <div className='absolute flex items-center top-1 right-2'>
                    <p>BSC</p>
                    <img height='30' width='30' src={bnb} />
                </div>
            </div>
        </div>
        <div className='flex items-center w-full mt-5'>
            <input
                type="text"
                className="border p-2 w-full h-[42px]"
                placeholder="insert BTC address"
                value={inputAddress}
                onChange={e => setInputAddress(e.target.value)}
            />
            <button disabled={!inputAddress || !inputFirst || loading || inputFirst > data?.from.max || inputFirst < data?.from.min ? true : false} onClick={handleChange} className="py-2 px-4 border bg-yellow-400 hover:text-white">{loading ? 'Loading' : 'Change'}</button>
        </div>
        {error && <div className="text-red-600">{error}</div>}
      </div>
      <div className='flex pt-5'>
        <table>
            <tr>
                <th>Currency</th>
                <th>Symbol</th>
                <th>Network</th>
                <th>Sub</th>
                <th>Name</th>
            </tr>
            {currency?.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.currency}</td>
                        <td>{item.symbol}</td>
                        <td>{item.network}</td>
                        <td>{item.sub}</td>
                        <td>{item.name}</td>
                    </tr>)
            })}
        </table>
      </div>
      <Modal
        order={order}
        show={show}
        setShow={setShow}
      />
    </div>
  )
}