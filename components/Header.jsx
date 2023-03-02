import { Logo } from "./Svgs";

const Header = ({setQuery}) => {
  return (
    <header className="fixed top-0 flex gap-6 items-center justify-between px-12 max-md:px-4 py-6 bg-white bg-opacity-60 backdrop-blur-md z-50 w-full">
      <Logo />
      <input
        type={"search"}
        placeholder="Search for images"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="w-72 max-w-screen-sm rounded-2xl text-slate-800 border-gray-200 border-solid border-2 px-2 py-1 text-sm"
      />
    </header>
  );
};
export default Header;
