import Head from "next/head";
import Masonry, {
  ResponsiveMasonry,
  MasonryProps,
} from "react-responsive-masonry";
import ImageCard from "@/components/ImageCard";
import { useQuery } from "react-query";
import { getImages } from "./api/unsplashApi";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import ErrorBanner from "@/components/ErrorBanner";
import LoadingBanner from "@/components/LoadingBanner";
import { Empty } from "@/components/Svgs";
import { ImageType } from "@/context/ModalContext";

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

  const Wrapper = ({ children }: MasonryProps) => {
    return (
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 360: 1, 768: 2, 992: 3 }}
        className="h-full w-full"
      >
        <Masonry>{children}</Masonry>
      </ResponsiveMasonry>
    );
  };
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
      <Header setQuery={setQuery} />
      <main className="flex flex-col gap-8 pb-6 px-8 max-md:px-0 mt-24 max-md:mt-36 items-center justify-start max-w-7xl min-h-screen mx-auto">
        {isLoading ? (
          <LoadingBanner />
        ) : isError ? (
          <ErrorBanner error={error as Error} />
        ) : images.length > 0 ? (
          <Wrapper>
            {images.map((image: ImageType) => {
              return (
                <ImageCard
                  key={image.id}
                  image={image}
                  setShowModal={setShowModal}
                />
              );
            })}
          </Wrapper>
        ) : debouncedQuery !== "" &&
          images.results &&
          images.results.length > 0 ? (
          <Wrapper>
            {images.results.map((image: ImageType) => {
              return (
                <ImageCard
                  key={image.id}
                  image={image}
                  setShowModal={setShowModal}
                />
              );
            })}
          </Wrapper>
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
