import axios from "axios";

export const validateAuth = async () => {
  console.log("Validating the user");

  try {
    const URL = process.env.LOCAL_BACKEND_URL + "/validate/tokens";
    const accessToken = (await cookieStore.get("access_token"))?.value;
    const refreshToken = (await cookieStore.get("refresh_token"))?.value;

    const res = await axios.get(URL, {
      headers: {
        Authorization: `access_token=${accessToken}, refresh_token=${refreshToken}`,
      },
    });

    const data = await res.data;
    console.log('Response for validate  ',data)
    return data
  } catch (error) {
    console.log('Error for validate', error)
    throw error
  }
};
