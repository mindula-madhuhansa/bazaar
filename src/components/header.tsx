"use client";

import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { PlusIcon } from "lucide-react";
import { signIn } from "next-auth/react";

type Props = {
  session: Session | null;
};

export function Header({ session }: Props) {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <Link href="/" className="text-blue-600 font-bold text-2xl">
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
            <Link href="/account">
              <Image
                src={session.user.image!}
                alt={session.user.name!}
                width={48}
                height={48}
                className="rounded-full"
              />
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
