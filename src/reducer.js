
import { ACTION_TYPES } from "./constants"

const initialState = {
    phone: '',
    password: '',
    user: {},
    loading: false,
    error: '',
    photo: [],
}

const reducer = (state = initialState, action) => {

    if(action.type === ACTION_TYPES.CHANGE_PHONE) {
        return {
            ...state,
            phone: action.payload,
            error: ''
        }
    }

    if(action.type === ACTION_TYPES.CHANGE_PASSWORD) {
        return {
            ...state,
            password: action.payload,
            error: ''
        }
    }

    if(action.type === ACTION_TYPES.LOGIN_SUCCESS) {
        return {
            ...state,
            user: action.payload,
            loading: false
        }
    }

    if(action.type === ACTION_TYPES.LOGIN_START) {
        return {
            ...state,
            loading: true
        }
    }

    if(action.type === ACTION_TYPES.LOGIN_FAILURE) {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    }

    if(action.type === ACTION_TYPES.GET_PHOTO) {
        return {
            ...state,
            photo: action.payload
        }
    }

  return state
}

export default reducer;