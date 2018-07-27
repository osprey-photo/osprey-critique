const mocks = {
  auth: { POST: { token: 'This-is-a-mocked-token' } },
  'user/me': { GET: { name: 'doggo', title: 'sir' } }
}

const devServer = {
  auth: {
    POST: (username, password) => {
      return this.$http.post('http://localhost:3000/login', {
        email: this.email,
        password: this.password
      })
    }
  },
  'user/me': { GET: { name: 'doggo', title: 'sir' } }
}

const apiCall = ({ url, method, ...args }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(devServer[url][method || 'GET'])
        console.log(`Mocked '${url}' - ${method || 'GET'}`)
        console.log('response: ', mocks[url][method || 'GET'])
      } catch (err) {
        reject(new Error(err))
      }
    }, 1000)
  })

export default apiCall
