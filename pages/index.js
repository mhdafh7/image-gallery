import Head from "next/head";
import ImageCard from "@/components/ImageCard";
import { useQuery } from "react-query";
import { getImages } from "./api/unsplashApi";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("random");
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    data: images,
  } = useQuery(["images", query], () => getImages(["rentals", query], query), {
    keepPreviousData: true,
  });
  console.log(images);
  return (
    <>
      <Head>
        <title>Image gallery</title>
        <meta
          name="description"
          content="Image gallery app using Unsplash api and NextJS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex items-center justify-between px-12 max-md:px-4 py-6">
        <h2 className="font-bold text-3xl text-center">Image Gallery</h2>{" "}
        <input
          type={"search"}
          placeholder="Search for images"
          onChange={(e) => {
            setQuery(e.target.value);
            setTimeout(() => { 
              console.log('fetch');
              refetch()
             }, 500);
          }}
          className="w-72 max-w-screen-sm rounded text-slate-800 border-gray-200 border-solid border-2 px-2 py-1 text-sm"
        />
      </header>
      <main className="flex flex-col gap-8 py-6 px-8 md:px-4 items-center justify-center">
        {isLoading ? (
          <div className="flex items-center justify-center gap-6 text-gray-500">
            <strong>Loading images...</strong>
            <div
              className="ml-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </div>
        ) : isError ? (
          <div
            className="mb-3 inline-flex w-full items-center rounded-lg bg-red-100 py-5 px-6 text-base text-red-700"
            role="alert"
          >
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Error!! {error.message}
          </div>
        ) : isSuccess ? (
          <section className="grid grid-cols-3 place-items-center w-full gap-5 mt-5 max-lg:grid-cols-2 max-lg:grid-rows-3 max-md:flex max-md:items-center max-md:justify-center max-md:flex-col px-6">
            {images.results.map((image) => {
              return (
                <ImageCard
                  key={image.id}
                  url={image.urls.small}
                  alt={image.alt_description}
                  blurDataURL={image.urls.thumb}
                  likes={image.likes}
                  user={image.user}
                />
              );
            })}
          </section>
        ) : null}
      </main>
    </>
  );
}
