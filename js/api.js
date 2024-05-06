const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const sendRequest = async (route, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {method, body});
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    throw new Error(errorText);
  }
};

const getData = async () => await sendRequest(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = async (body) => await sendRequest(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {
  getData,
  sendData
};
