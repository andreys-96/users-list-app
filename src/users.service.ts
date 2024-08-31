import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const UserService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`)
      return response.data
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }
}
