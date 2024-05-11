"use client";

import axios from "axios";

export default async function saveUser(accessToken) {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${accessToken}`
    );
    const user = res.data;
    await axios.post("/api/users", {
      ...user,
      avatar: user.picture,
      lastName: user.family_name,
      firstName: user.given_name,
      verified: user.verified_email,
    });
  } catch (err) {
    console.log(err);
  }
}
