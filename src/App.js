import React, { useReducer, useEffect, useState } from 'react'
import { deleteForm, fetchForm, putForm } from './indexeddb/form'

const initialState = {
  name: '',
  email: '',
  message: ''
}

function App() {
  const [log, setLog] = useState([])

  const reducer = (state, action) => {
    if (action.type === 'fetch') {
      return {...state, ...action.payload}
    }
    return { ...state, [action.payload.target.name]: action.payload.target.value }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchForm().then(setLog)
  }, [])

  const handleSelect = (event) => {
    event.preventDefault()
    const kwargs = log.filter(item => item.datetime === event.target.value)
    let action = {}
    console.log(kwargs.length)
    if (kwargs.length !== 0) {
      action = {
        type: 'fetch',
        payload: kwargs[0]
      }
    } else {
      action = {
        type: 'fetch',
        payload: initialState
      }
    }
    dispatch(action)
  }

  const handleClick = async (event) => {
    event.preventDefault()
    putForm({ ...state })
    fetchForm().then(setLog)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    await deleteForm(event.target[0].value)
    fetchForm().then(setLog)
  }

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-300">
      <div
        className="block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <h2 className="text-lg mb-2">履歴選択</h2>
        <form className="mb-8" onSubmit={ handleDelete }>
          <select name="select" id="select" className="w-full border border-2 border-gray-300 rounded mb-4 py-2 px-1" onChange={handleSelect}>
            <option>履歴を選択してください</option>
            {log.map((item, index) => <option key={index} value={item.datetime}>{item.datetime}</option>)}
          </select>
          <button
            type="submit"
            className="inline-block w-full bg-indigo-500 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-indigo-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-indigo-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            削除
          </button>
        </form>
        <h2 className="text-lg mb-2">フォーム</h2>
        <form>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none"
              id="name"
              name="name"
              placeholder="Name"
              value={state.name}
              onChange={event => dispatch({payload: event})}
            />
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="email"
              className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none"
              id="email"
              name="email"
              placeholder="Email address"
              value={state.email}
              onChange={event => dispatch({ payload: event })}
            />
          </div>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <textarea
              className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none"
              id="message"
              name="message"
              rows="3"
              placeholder="Message"
              onChange={event => dispatch({ payload: event })}
              value={state.message}
            >
            </textarea>
          </div>
          <button
            type="submit"
            className="inline-block w-full bg-indigo-500 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-indigo-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-indigo-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={handleClick}
          >
            一時保存
          </button>
        </form>
      </div>
    </div>
  );
}

export default App
