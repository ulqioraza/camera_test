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

//#endregion

//#region HTTP METHOD POST
export const copSetSaveImages = async (payload) => {
  return await copPostCallAPIEndpoint(`${import.meta.env.VITE_API_ENDPOINT_SAVEIMAGE}`, payload)
}
//#endregion