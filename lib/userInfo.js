"use server";
import axios from "axios";
import Cookies from "js-cookie";

export async function userInfo() {
  try {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      throw "no cookie";
    }
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${accessToken}`
    );
    const user = res.data;
    return user;
  } catch (err) {
    Cookies.set("access_token", "");
    return null;
  }
}
