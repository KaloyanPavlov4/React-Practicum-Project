import axios from 'axios'

const url = 'http://localhost:3000/posts'

async function getAllPosts() {
  return await axios.get(`${url}`).data
}

async function getPost(id) {
  return await axios.get(`${url}/${id}`).data
}


async function postPost(form, userId) {
  return await axios.post(url, {
    ...form,
    userId
  }).data
}

export { getAllPosts, getPost, postPost }