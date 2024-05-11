"use client";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Example({ params }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(() => {
    let unmount = false;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.put(`/api/user/${params.id}`, user);
        if (!unmount) {
          setUser(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
    return function () {
      unmount = true;
    };
  }, [params.id, user]);

  useEffect(() => {
    let unmount = false;
    (async () => {
      try {
        const res = await axios.get(`/api/user/${params.id}`);
        if (!unmount) {
          setUser(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
    return function () {
      unmount = true;
    };
  }, [params.id]);

  return (
    <div className="p-12">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="firstName"
              id="firstName"
              autoComplete="firstName"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="lastName"
              id="lastName"
              autoComplete="lastName"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="address"
              id="address"
              autoComplete="address"
              value={user.address}
              onChange={(e) => {
                setUser({ ...user, address: e.target.value });
              }}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <span className="relative flex h-3 w-3 p-2 mx-auto">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      ) : (
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            type="button"
            href="/account"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Back
          </Link>

          <button
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
