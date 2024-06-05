import { useRef } from "react";
import { StoreIcon } from "lucide-react";

import { categories } from "@/constants";
import { RadioBtn } from "@/components/radio-btn";
import { SubmitButton } from "@/components/submit-button";

type Props = {
  action: (formData: FormData) => void;
};

export function SearchForm({ action }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form
      ref={formRef}
      action={action}
      className="flex flex-col bg-white grow md:w-1/4 p-4 border-r gap-4"
    >
      <input
        name="phrase"
        type="text"
        placeholder="Search Bazaar"
        className="text-sm"
      />

      <div className="flex flex-col">
        <RadioBtn
          Icon={StoreIcon}
          label="All Categories"
          value=""
          defaultChecked
          onClick={() => formRef.current?.requestSubmit()}
        />
        {categories.map((category) => (
          <RadioBtn
            key={category.id}
            Icon={category.icon}
            label={category.label}
            value={category.value}
            onClick={() => formRef.current?.requestSubmit()}
          />
        ))}
      </div>

      <div className="flex flex-col">
        <label className="uppercase">Filter by Price</label>

        <div className="flex gap-2">
          <input type="number" name="min" placeholder="Min" />
          <input type="number" name="max" placeholder="Max" />
        </div>

        <SubmitButton>Search</SubmitButton>
      </div>
    </form>
  );
}
