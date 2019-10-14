import axios from 'axios';

export default function request(url, method, data) {
  return axios({
    method,
    url,
    data
  })
  .then((res) => {
    return res.data
  })
  .catch((err) => {
    return err
  })
}
