"use client";

import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    fetch(`/api/ads?id=${id}`, {
      method: "DELETE",
    }).then(() => {
      setOpen(false);
      router.push("/");
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-x-2 bg-red-500 hover:bg-red-500/90 text-white px-4 py-2 rounded-md"
      >
        <Trash2Icon className="size-4" />
        <span>Delete</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold">
              Are you sure you want to delete this ad?
            </h2>
            <p className="text-sm">
              This action cannot be undone. This will permanently delete the ad
              and all its data.
            </p>
            <div className="flex gap-x-2 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="flex-grow bg-blue-500 hover:bg-blue-500/90 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-grow bg-red-500 hover:bg-red-500/90 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
