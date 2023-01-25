import axios from 'axios'

const apiClient = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL}api/`
    baseURL: 'api/'
})

const api = {
  data: {
    async createOrder (payload) {
      return apiClient.post('/createOrder', payload)
    },
    async getCurrencies () {
      const { error, data } = await apiClient.get('/getCurrencies')
      if (error) { return error } else { return { data } }
    },
    async getPrice (from, to) {
      const url = `/getPrice?from=${from}&to=${to}`
      return apiClient.get(url)
    },
    async getOrder (id, token) {
        const url = `/getOrder?id=${id}&token=${token}`
        return apiClient.get(url)
    }
  },
  getErrorMsg (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return error.response.data.error
    } else if (error.request) {
      console.log('error.request', error.request)
      return error.request.statusText || error.request.status
    } else {
      console.log('api - error', error)
      return 'Error'
    }
  }
}

export default api