import axios from "axios";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com/",
});

export const getImages = async (query) => {
  let res;
  if (query === "") {
    res = await unsplashApi.get(
      `/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&page=1`
    );
  } else {
    res = await unsplashApi.get(
      `/search/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&query=${query}&page=1`
    );
  }
  return res.data;
};
