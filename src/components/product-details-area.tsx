import { categories } from "@/constants";

export function ProductDetailsArea() {
  return (
    <>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Enter the title of your product"
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Enter the description of your product"
      />

      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        placeholder="Enter the price of your product"
      />

      <label htmlFor="category">Category</label>
      <select
        name="category"
        id="category"
        defaultValue="selectCat"
        className="focus:ring-0"
      >
        <option value="selectCat" disabled>
          Select Category
        </option>
        <option value="electronics">📱 Electronics</option>
        <option value="fashion">👚 Fashion</option>
        <option value="homeAppliances">🏠 Home Appliances</option>
        <option value="beauty">💄 Beauty & Health</option>
        <option value="toys">🧸 Toys & Games</option>
        <option value="books">📚 Books & Media</option>
        <option value="automotive">🚗 Automotive</option>
        <option value="sports">🏏 Sports & Outdoors</option>
        <option value="groceries">🛒 Groceries</option>
        <option value="pets">🐶 Pets</option>
      </select>

      <label htmlFor="contact">Contact Informations</label>
      <textarea
        id="contact"
        name="contact"
        placeholder="Enter your contact information"
      />
    </>
  );
}
