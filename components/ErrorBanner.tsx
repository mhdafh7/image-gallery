import { ErrorIcon } from "./Svgs";

interface ErrorProps {
  error: Error;
}

const ErrorBanner = ({ error }: ErrorProps) => {
  return (
    <div
      className="mb-3 inline-flex w-full items-center rounded-lg bg-red-100 py-5 px-6 text-base text-red-700"
      role="alert"
    >
      <span className="mr-2">
        <ErrorIcon />
      </span>
      <p>Error!! {error.message}</p>
    </div>
  );
};
export default ErrorBanner;
