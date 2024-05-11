"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Accounts() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const searchUsers = useCallback((search) => {
    let unmount = false;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${search}`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
    return function () {
      unmount = true;
    };
  }, []);

  useEffect(() => {
    searchUsers("");
  }, [searchUsers]);

  return (
    <div className="flex-col w-full">
      <div className="flex justify-around w-full">
        <input
          id="search"
          name="search"
          value={search}
          placeholder="Search..."
          onChange={(event) => setSearch(event.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          htmlFor="search"
          onClick={() => searchUsers(search)}
          className="block justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
        >
          Search
        </button>
      </div>

      <ul role="list" className="divide-y divide-gray-100">
        {loading ? (
          <span className="relative flex h-3 w-3 p-2 mx-auto">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        ) : users.length === 0 ? (
          "No users"
        ) : (
          users.map((person, i) => (
            <li key={i} className="flex justify-between gap-x-6 py-5">
              <Link
                href={`/account/${person.id}`}
                className="flex justify-between w-full"
              >
                <div className="flex min-w-0 gap-x-4">
                  <Image
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={person.avatar}
                    alt={`avatar-${person.email}`}
                    width={50}
                    height={50}
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {person.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {person.email}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{person.id}</p>
                  {!person.verified ? (
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      didn&apos;t verified yet
                    </p>
                  ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">
                        verified
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
