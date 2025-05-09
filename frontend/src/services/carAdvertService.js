import axios from 'axios'

const url = 'http://localhost:3000/posts'

async function getAllPosts() {
  const response = await axios.get(`${url}`)
  return response.data
}

async function getPost(id) {
  const response = await axios.get(`${url}/${id}`)
  return response.data
}


async function postPost(form, userId) {
  return await axios.post(url, {
    ...form,
    userId
  })
}

export { getAllPosts, getPost, postPost }