"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { LogOutIcon, PlusIcon, UserIcon } from "lucide-react";

type Props = {
  session: Session | null;
};

export function Header({ session }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b p-4">
      <Link
        href="/"
        target="_parent"
        className="text-blue-600 font-bold text-2xl"
      >
        Bazaar
      </Link>

      <nav className="flex items-center space-x-4">
        <Link
          href={
            session
              ? "/new-ad"
              : `/api/auth/signin?callbackUrl=${encodeURIComponent("/new-ad")}`
          }
          className="nav-btn inline-flex items-center space-x-2 border-blue-600 text-blue-600"
        >
          <PlusIcon className="size-5" />
          <span>Post Your Ad</span>
        </Link>

        {!session?.user ? (
          <>
            <button
              onClick={() => signIn("google")}
              className="nav-btn bg-blue-600 hover:bg-blue-600/90 transition text-white border-0"
            >
              Sign In / Sign Up
            </button>
          </>
        ) : (
          <>
            <div className="relative flex items-center">
              <button onClick={() => setOpen(!open)}>
                <Image
                  src={session.user.image!}
                  alt={session.user.name!}
                  width={48}
                  height={48}
                  className={`rounded-xl relative z-50 ${open ? "z-50" : ""}`}
                />
              </button>

              {open && (
                <>
                  <div
                    onClick={() => setOpen(false)}
                    className="bg-black/90 fixed inset-0 z-40"
                  />
                  <div className="absolute z-50 right-2 top-14 bg-white rounded-md border w-40 p-2">
                    <button
                      onClick={() => {
                        setOpen(false);
                        router.push("/my-ads");
                      }}
                      className="flex items-center space-x-3 px-4 py-2 w-full hover:bg-blue-100 transition rounded"
                    >
                      <UserIcon className="size-5" />
                      <span>My Ads</span>
                    </button>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center space-x-3 px-4 py-2 w-full hover:bg-blue-100 transition rounded mt-1"
                    >
                      <LogOutIcon className="size-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
