import api from "@/config/api"
import * as types from "./ActionType"

export const withdrawalRequest = ({amount, jwt}) => async (dispatch) => {
    dispatch({type: types.WITHDRAWAL_REQUEST})

    try{
        const response = await api.post(`/api/withdrawal/${amount}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`}
        })

        console.log("withdrawal ---- ", response.data)
        dispatch({
            type: types.WITHDRAWAL_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: types.WITHDRAWAL_FAILURE,
            payload: error.message
        })
    }
}

// Admin
export const proceedWithdrawal = ({id, jwt, accept}) => async (dispatch) => {
    dispatch({type: types.WITHDRAWAL_PROCEED_REQUEST})

    try{
        const response = await api.patch(`/api/admin/withdrawal/${id}/proceed/${accept}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        console.log("proceed withdrawal ---- ", response.data)
        dispatch({
            type: types.WITHDRAWAL_PROCEED_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.WITHDRAWAL_PROCEED_FAILURE,
            payload: error.message
        })
    }
}

export const getWithdrawalHistory = (jwt) => async (dispatch) => {
    dispatch({type: types.GET_WITHDRAWAL_HISTORY_REQUEST})

    try{
        const response = await api.get('/api/withdrawal', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        console.log("get withdrawal history ---- ", response.data)
        dispatch({
            type: types.GET_WITHDRAWAL_HISTORY_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: types.GET_WITHDRAWAL_HISTORY_FAILURE,
            payload: error.message
        })
    }
}

// Admin
export const getAllWithdrawalRequest = (jwt) => async (dispatch) => {
    dispatch({type: types.GET_WITHDRAWAL_REQUEST_REQUEST})

    try{
        const response = await api.get('/api/admin/withdrawal', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        console.log("get withdrawal requests ---- ", response.data)
        dispatch({
            type: types.GET_WITHDRAWAL_REQUEST_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        console.log("error ",error)
        dispatch({
            type: types.GET_WITHDRAWAL_REQUEST_FAILURE,
            payload: error.message
        })
    }
}

export const addPaymentDetails = ({paymentDetails, jwt}) => async (dispatch) => {
    dispatch({type: types.ADD_PAYMENT_DETAILS_REQUEST})

    try{
        const response = await api.post(`/api/payment-details`, paymentDetails, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        console.log("add payment details ---- ", response.data)
        dispatch({
            type: types.ADD_PAYMENT_DETAILS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.ADD_PAYMENT_DETAILS_FAILURE,
            payload: error.message
        })
    }
}

export const getPaymentDetails = ({jwt}) => async (dispatch) => {
    dispatch({type: types.GET_PAYMENT_DETAILS_REQUEST})

    try{
        const response = await api.get(`/api/payment-details`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        console.log("get payment details ---- ", response.data)
        dispatch({
            type: types.GET_PAYMENT_DETAILS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.GET_PAYMENT_DETAILS_FAILURE,
            payload: error.message
        })
    }
}
