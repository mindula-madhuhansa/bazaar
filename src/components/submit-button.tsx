import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
};

export function SubmitButton({ children }: Props) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-600/90 px-4 py-2 rounded transition
        disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-800 disabled:hover:bg-gray-400/90
        "
      >
        {pending ? (
          <span className="animate-pulse">Publishing...</span>
        ) : (
          <span>{children}</span>
        )}
      </button>
    </>
  );
}
