import { categories } from "@/constants";

type Props = {
  defaultValues: FieldTypes;
};

export function ProductDetailsArea({ defaultValues }: Props) {
  return (
    <>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        defaultValue={defaultValues.title}
        placeholder="Enter the title of your product"
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        defaultValue={defaultValues.description}
        placeholder="Enter the description of your product"
      />

      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        defaultValue={defaultValues.price}
        placeholder="Enter the price of your product"
      />

      <label htmlFor="category">Category</label>
      <select
        name="category"
        id="category"
        defaultValue={defaultValues.category || "selectCat"}
        className="focus:ring-0"
      >
        <option value="selectCat" disabled>
          Select Category
        </option>

        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>

      <label htmlFor="contact">Contact Informations</label>
      <textarea
        id="contact"
        name="contact"
        defaultValue={defaultValues.contact}
        placeholder="Enter your contact information"
      />
    </>
  );
}
