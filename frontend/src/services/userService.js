import axios from 'axios'

const url = 'http://localhost:3000/users'

async function getUser(id) {
  return await axios.get(`${url}/${id}`)
}

async function getUserByUsername(username) {
  const users = await axios.get(url)
  return users.find(user => user.username === username)
}

async function postUser(username, password, phone) {
  return await axios.post(url, {
    username, password, phone
  })
}

export { getUser, getUserByUsername, postUser }