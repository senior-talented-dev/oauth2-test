import Link from "next/link";
import LoginDialog from "../components/LoginDialog";

export default function Header() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-green-700 p-6 w-screen">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Landing</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-green-200 border-green-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            href="/home"
            className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4"
          >
            Home
          </Link>
          <Link
            href="/account"
            className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4"
          >
            Account
          </Link>
          <Link
            href="/activation"
            className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white"
          >
            Activation
          </Link>
        </div>
        <div>
          <Link
            href="/auth/login"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-500 hover:bg-white mt-4 lg:mt-0"
          >
            Login
          </Link>
        </div>
      </div>
      <LoginDialog />
    </nav>
  );
}