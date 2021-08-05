
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { ACTION_TYPES } from "./constants"
import axios from 'axios'
import React, { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch()

  const phone = useSelector((state) => { return state.phone })
  const password = useSelector((state) => { return state.password })
  const user = useSelector((state) => { return state.user })
  const error = useSelector((state) => { return state.error })
  const photo = useSelector((state) => { return state.photo })
  const currentPage = useSelector((state) => { return state.currentPage })
  const pages = [1,2,3,4,5,6,7,8,9,10]

  const onChangePhone = (event) => {

    const changePhoneAction = {
      type: ACTION_TYPES.CHANGE_PHONE,
      payload: event.target.value
    }
    dispatch(changePhoneAction)
  }

  const onChangePassword = (event) => {
    dispatch({
      type: ACTION_TYPES.CHANGE_PASSWORD,
      payload: event.target.value
    })
  }

  const onLogin = async () => {
    try {
      dispatch ({
        type: ACTION_TYPES.LOGIN_START,
      })

      const responce = await axios.post("http://localhost:3001/auth/sign-in", {
        phone,
        password,
      })

        console.log(responce);
        dispatch ({
          type: ACTION_TYPES.LOGIN_SUCCESS,
          payload: responce.data
        })
      } catch (err) {
        console.log('response error', err.responce);
        dispatch ({
          type: ACTION_TYPES.LOGIN_FAILURE,
          payload: err.responce.data
        })
      }
  }

  const onPhoto = async () => {
    try {

      const responce = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=5`)
        dispatch ({
          type: ACTION_TYPES.GET_PHOTO,
          payload: responce.data
        })
    } catch (err) {
      console.log('response error', err);
    }
  }

  useEffect(() => {
    onPhoto(currentPage)
}, [currentPage])

const changePage = (id) => {
  dispatch({
    type: ACTION_TYPES.SELECTED_PAGE,
    payload: id
  })
}

  return (
    <div className='App'>
      <input type="text" value={phone} placeholder='phone' onChange={onChangePhone}/>
      <input type="password" value={password} placeholder='password' onChange={onChangePassword} />
      <span style={{color: 'red'}}>{error}</span>
      <button onClick={onLogin}>Login</button>
      <strong>{user.about}</strong>

      
      <div className='images'>
        {photo.map((item) => 
        <img key={item.id} src={item.thumbnailUrl} ></img>
        )}
      </div>

      <div className="pagination">
      {pages.map((item) => 
        <a key={item} 
        className={item === currentPage ? "active" : ''}
        onClick={() => changePage(item)}>  {item}  </a>)}
      </div>

    </div>
  )
}

export default App;
