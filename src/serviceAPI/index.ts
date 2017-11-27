//import axios from 'axios';

const data = {
    client_id: '443eadf72ce14612a901a68f83588c90',
    client_secret: '9f1d21a8b87b4bd88d5357f68dc10a27'
  };

export const authURL = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.client_id}`;