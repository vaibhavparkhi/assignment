import axios from "axios";

const GET_DATA_URL = "https://demo-api.now.sh/users";

const POST_DATA_URL = "https://demo-api.now.sh/users";

export const sendData = async (formData) => {
  try {
    return await axios.post(POST_DATA_URL, formData);
  } catch (err) {
    console.log(err);
  }
};

export const getData = async () => {
  try {
    return await axios.get(GET_DATA_URL);
  } catch (err) {
    console.error(err);
  }
};
