"use client";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import saveUser from "@/lib/saveUser";

export default function Page() {
  const router = useRouter();

  const from = "/";

  const getGoogleUrl = useCallback((from) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
    console.log({ location: location.href });
    const options = {
      redirect_uri: `${location.origin}/auth/login`,
      client_id:
        "238573560687-bsdqgcv4u2i6e33d61n8mkmkebd8rrhb.apps.googleusercontent.com",
      include_granted_scopes: true,
      response_type: "token",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
      state: from,
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
  }, []);

  const handleClick = useCallback(() => {
    window.location.href = getGoogleUrl(from);
  }, [from, getGoogleUrl]);

  useEffect(() => {
    let unmount = false;
    (async () => {
      try {
        const accessTokenRegex = /access_token=([^&]+)/;
        const isMatch = window.location.href.match(accessTokenRegex);

        if (isMatch) {
          const accessToken = isMatch[1];
          await saveUser(accessToken);
          Cookies.set("access_token", accessToken);
          router.push("/account");
        }
      } catch (err) {
        console.log(err);
      }
    })();
    return function () {
      unmount = true;
    };
  }, [router]);

  return (
    <div>
      <div
        className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-auto"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 326667 333333"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          width={20}
          height={20}
        >
          <path
            d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
            fill="#4285f4"
          />
          <path
            d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
            fill="#34a853"
          />
          <path
            d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
            fill="#fbbc04"
          />
          <path
            d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
            fill="#ea4335"
          />
        </svg>
        <div className="ml-1">Log in with Google</div>
      </div>
    </div>
  );
}
