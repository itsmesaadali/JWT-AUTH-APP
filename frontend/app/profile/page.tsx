import axios from "axios";
import { cookies } from "next/headers";

type Response = {
  message:string,
  user:{
    id:number;
    name:string;
    email:string;
  }
}

const getUser = async () => {
  const cookieStore = await cookies();
  const accessToken = (await cookieStore.get("access_token"))?.value;
  const refreshToken = (await cookieStore.get("refresh_token"))?.value;
  const res = await axios.get("/user/me", {
    withCredentials: true,
    headers: {
      Authorization: `access_token=${accessToken}, refresh_token=${refreshToken}`,
    },
  });

  const data = await res.data as Response;
  return data;
};

const profielPage = async () => {
  const user = await getUser()
  return <div>{JSON.stringify(user)}</div>;
};

export default profielPage;
