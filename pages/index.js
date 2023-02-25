import Head from "next/head";
import ImageCard from "@/components/ImageCard";
import { useQuery } from "react-query";
import { getImages } from "./api/unsplashApi";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import Modal from "@/components/Modal";
import { Empty, ErrorIcon } from "@/components/Svgs";

export default function Home() {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const {
    isLoading,
    isError,
    error,
    data: images,
  } = useQuery(["images", debouncedQuery], () => getImages(debouncedQuery), {
    keepPreviousData: true,
  });
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
        <h2 className="font-bold text-3xl text-center">Image Gallery</h2>
        <input
          type={"search"}
          placeholder="Search for images"
          onChange={(e) => {
            setQuery(e.target.value);
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
              <ErrorIcon />
            </span>
            Error!! {error.message}
          </div>
        ) : images.length > 0 ? (
          <section className="grid grid-cols-3 place-items-center w-full gap-5 mt-5 max-lg:grid-cols-2 max-lg:grid-rows-3 max-md:flex max-md:items-center max-md:justify-center max-md:flex-col px-6">
            {images.map((image) => {
              return (
                <ImageCard
                  key={image.id}
                  url={image.urls}
                  alt={image.alt_description}
                  likes={image.likes}
                  user={image.user}
                  setShowModal={setShowModal}
                />
              );
            })}
          </section>
        ) : debouncedQuery !== "" &&
          images.results &&
          images.results.length > 0 ? (
          <section className="grid grid-cols-3 place-items-center w-full gap-5 mt-5 max-lg:grid-cols-2 max-lg:grid-rows-3 max-md:flex max-md:items-center max-md:justify-center max-md:flex-col px-6">
            {images.results.map((image) => {
              return (
                <ImageCard
                  key={image.id}
                  url={image.urls}
                  alt={image.alt_description}
                  likes={image.likes}
                  user={image.user}
                  setShowModal={setShowModal}
                />
              );
            })}
          </section>
        ) : (
          <div
            className="mb-4 rounded-lg py-5 px-6 text-base text-neutral-600 w-full text-center flex flex-col items-center"
            role="alert"
          >
            <p>
              Oh oh! No image found for <strong>{debouncedQuery}</strong>
            </p>
            <Empty />
          </div>
        )}
        {showModal ? <Modal setShowModal={setShowModal} /> : null}
      </main>
    </>
  );
}
