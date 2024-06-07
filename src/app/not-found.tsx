import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] bg-gray-100  px-4 md:px-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Page not found
        </h2>
        <p className="text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
