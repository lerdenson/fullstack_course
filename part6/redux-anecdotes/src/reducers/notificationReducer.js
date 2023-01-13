import {createSlice} from '@reduxjs/toolkit'

let previous = undefined

const showStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
}

const hideStyle = {
    display: 'none'
}

const initialState = {
    content: 'welcome to anecdotes page',
    style: hideStyle,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
                return {content: action.payload, style: showStyle}

        },

        hideNotification(state) {
            return {...state, style: hideStyle}
        }
    }
})

export const setNotification = (message, seconds) => {
    clearTimeout(previous)
    const ms = seconds * 1000
    return async dispatch => {
        dispatch(createNotification(message))
        previous = setTimeout(()=> {
            dispatch(hideNotification())
        }, ms)
    }
}

export const {createNotification, hideNotification} = notificationSlice.actions
export default notificationSlice.reducer

