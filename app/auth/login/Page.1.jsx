"use client";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";


export default function Page() {

  const router = useRouter();
  const [isLoggedin, setIsLoggedin] = useState(false);

  const from = location.state?.from.pathname || "/";

  const getGoogleUrl = useCallback((from) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

    const options = {
      redirect_uri: "http://localhost:5173/",
      client_id: "238573560687-bsdqgcv4u2i6e33d61n8mkmkebd8rrhb.apps.googleusercontent.com",
      include_granted_scopes: true,
      response_type: "token",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
      state: from,
    }, [];
  });

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}
