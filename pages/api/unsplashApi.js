import axios from "axios";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com/",
});

// export const getImages = async () => {
//   const res = await unsplashApi.get('/rentals');
//   return res.data;
// };
export const getImages = async (query) => {
  const res = await unsplashApi.get(
    `/search/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&query=${query}&page=1`
  );
  console.log(res);

  return res.data;
};
