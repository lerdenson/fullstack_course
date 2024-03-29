import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    await axios.delete(`${baseUrl}/${id}`, config);
  } catch (error) {
    console.log(error);
  }
};

const addComment = async (id, content) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, content)
  return response.data
}

const blogService = { getAll, create, update, remove, addComment };

export default blogService;
