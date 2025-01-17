
import axiosInstance from './axios'

const copGetCallAPIEndpoint = async (endpoint, controller = `${import.meta.env.VITE_API_CONTROLLER}`, jsonheader = {}) => {
  try {
    const response = await axiosInstance.get(`/${controller}/${endpoint}`, { headers: {...jsonheader} })
    return response.data
  } catch (error) {
    return { result: [], statuscode: 500, status: 'Error', message: 'Internal Server Error' }
  }
}
const copPostCallAPIEndpoint = async (endpoint, payload, controller = `${import.meta.env.VITE_API_CONTROLLER}`, jsonheader = {}) => {
  try {
    const response = await axiosInstance.post(`/${controller}/${endpoint}`, payload, { headers: {...jsonheader} })
    return response.data
  } catch (error) {
    return { result: [], statuscode: 500, status: 'Error', message: 'Internal Server Error' }
  }
}

//#region HTTP GET AUTHEN
export const copGetUser = async () => {
  return await copGetCallAPIEndpoint(`${import.meta.env.VITE_API_ENDPOINT_GETUSER}`, `${import.meta.env.VITE_API_CONTROLLER_AUTHEN}`)
}
export const copGetLogin = async (params) => {
  return await copGetCallAPIEndpoint(`${import.meta.env.VITE_API_ENDPOINT_GETLOGIN}/${params.username || ''}`, `${import.meta.env.VITE_API_CONTROLLER_AUTHEN}`)
}
//#endregion
