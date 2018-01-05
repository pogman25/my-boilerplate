import axios from 'axios';
// const data = {
//     client_id: '443eadf72ce14612a901a68f83588c90',
//     client_secret: '9f1d21a8b87b4bd88d5357f68dc10a27'
//   };

// const baseUrl = 'https://cloud-api.yandex.net/v1/disk/';

// export const authURL = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${data.client_id}&client_secret=${data.client_secret}`;

const defaultParams = () => {
  return ({
    baseURL: 'https://cloud-api.yandex.net/v1',
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `OAuth ${localStorage.getItem('token')}`
    }
  })
}

export default axios.create(defaultParams())