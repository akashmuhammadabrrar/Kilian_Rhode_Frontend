// components/ProductTable.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { formatCurrency } from "@/utils/formatCurrency";

interface Product {
  id: number;
  name: string;
  category: string;
  ageGroup: string;
  price: string;
  stock: number;
  sales: number;
  status: string;
}

// --- Dropdown Types ---
interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  defaultOption: DropdownOption;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  label: string;
}

// --- Custom Dropdown ---
const CustomDropdown: React.FC<CustomDropdownProps> = ({
  defaultOption,
  options,
  onSelect,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption>(defaultOption);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-auto z-10" ref={dropdownRef}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full sm:min-w-[140px] py-2 px-4 pr-10 text-gray-700 
							bg-[#F3F3F5] border border-[#E8E3DC] rounded-[14px]
							flex items-center justify-between text-left cursor-pointer text-sm
							focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150 ease-in-out"
          title={label}
        >
          {selected.label}
          <ChevronDownIcon
            className={`absolute right-3 w-4 h-4 text-gray-500 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isOpen && (
          <ul
            className="absolute top-full mt-2 w-full sm:min-w-[140px] 
								bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200
								max-h-60 overflow-y-auto z-20"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`py-2 px-4 text-gray-700 cursor-pointer text-sm
										hover:bg-gray-100 transition duration-100 ease-in-out
										${selected.value === option.value ? "bg-gray-200 font-semibold" : ""}`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// --- Sample Product Data (MODIFIED: All IDs are 1) ---
const initialProducts: Product[] = [
  {
    id: 1, // All IDs are set to 1
    name: "Premium Custom T-Shirt",
    category: "T-Shirts",
    ageGroup: "Adults (18-35)",
    price: "€34.99",
    stock: 156,
    sales: 234,
    status: "Active",
  },
  {
    id: 1, // All IDs are set to 1
    name: "Kids AI Design T-Shirt",
    category: "T-Shirts",
    ageGroup: "Kids (5-12)",
    price: "€29.99",
    stock: 89,
    sales: 145,
    status: "Active",
  },
  {
    id: 1, // All IDs are set to 1
    name: "Premium Custom Hoodie",
    category: "Hoodies",
    ageGroup: "Adults (18-35)",
    price: "€54.99",
    stock: 67,
    sales: 89,
    status: "Active",
  },
  {
    id: 1, // All IDs are set to 1
    name: "Custom Letter Cap",
    category: "Caps",
    ageGroup: "All Ages",
    price: "€24.99",
    stock: 234,
    sales: 178,
    status: "Active",
  },
  {
    id: 1, // All IDs are set to 1
    name: "AI Design Mug",
    category: "Mugs",
    ageGroup: "Adults (18+)",
    price: "€19.99",
    stock: 312,
    sales: 456,
    status: "Active",
  },
  {
    id: 1, // All IDs are set to 1
    name: "Women's Premium T-Shirt",
    category: "T-Shirts",
    ageGroup: "Women (18-45)",
    price: "€34.99",
    stock: 0,
    sales: 267,
    status: "Out of Stock",
  },
];

// --- Table Header ---
const TableHeader: React.FC<{ name: string }> = ({ name }) => (
  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
    {name}
  </th>
);

// --- Table Row Props (Updated) ---
interface TableRowProps {
  product: Product;
  // onView ekhon kono argument expect kore na
  onView: () => void;
}

// --- Table Row (MODIFIED: onView does not pass product) ---
const TableRow: React.FC<TableRowProps> = ({ product, onView }) => {
  const isAvailable = product.status === "Active";
  const isInStock = product.stock > 0;

  const StatusBadge = () => (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-2xl ${
        isAvailable ? "bg-green-100 text-green-800" : "bg-[#d4183d] text-white"
      }`}
    >
      {product.status}
    </span>
  );

  const StockValue = () => (
    <span
      className={`text-sm ${
        isInStock ? "text-gray-900" : "text-red-600 font-semibold"
      }`}
    >
      {product.stock}
    </span>
  );

  return (
    <tr className="border-t border-gray-100 hover:bg-gray-50 transition duration-150">
      <td className="px-4 py-4 text-sm font-medium text-gray-900">
        {product.name}
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">{product.category}</td>
      <td className="px-4 py-4 text-sm text-gray-600">{product.ageGroup}</td>
      <td className="px-4 py-4 text-sm font-bold text-gray-900">
        {formatCurrency(product.price)}
      </td>
      <td className="px-4 py-4 text-sm text-gray-900">
        <StockValue />
      </td>
      <td className="px-4 py-4 text-sm text-gray-900">{product.sales}</td>
      <td className="px-4 py-4 text-sm">
        <StatusBadge />
      </td>
      <td className="px-4 py-4 text-sm">
        <div className="flex space-x-2 gap-3">
          <button
            className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
            onClick={onView} // On click shudhu function-ti call hobe
          >
            <EyeIcon className="h-5 w-5" />
            <span className="text-[14px]">View</span>
          </button>
          <button className="text-blue-500 hover:text-blue-700 flex items-center space-x-1">
            <PencilSquareIcon className="h-5 w-5" />
            <span className="text-[14px]">Edit</span>
          </button>
          <button className="text-red-500 hover:text-red-700 flex items-center space-x-1">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// --- Product Details Component (No Change) ---
const ProductDetailsView: React.FC<{
  product: Product;
  onBack: () => void;
}> = ({ product, onBack }) => {
  const StatusBadge = () => (
    <span
      className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-2xl ${
        product.status === "Active"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {product.status}
    </span>
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 w-full mx-auto my-4">
      {/* Header matching the image */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 border border-[#E8E3DC] rounded-xl text-gray-600 hover:bg-gray-50 transition"
            title="Go back to list"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Product Details
            </h1>
            <p className="text-sm text-gray-500">
              Complete information about this product
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          {/* Edit Button - Styled to match the image */}
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150">
            <PencilSquareIcon className="w-5 h-5" />
            <span>Edit Product</span>
          </button>
          {/* Delete Button - Styled to match the image */}
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-300 rounded-lg hover:bg-red-100 transition duration-150">
            <TrashIcon className="w-5 h-5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">
        {product.name} Details
      </h2>

      {/* Product Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border p-4 rounded-lg bg-gray-50">
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase text-gray-500">
            ID
          </span>
          <span className="text-lg font-semibold text-gray-900">
            {product.id}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase text-gray-500">
            Category
          </span>
          <span className="text-lg text-gray-700">{product.category}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase text-gray-500">
            Age Group
          </span>
          <span className="text-lg text-gray-700">{product.ageGroup}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase text-gray-500">
            Price
          </span>
          <span className="text-2xl font-bold text-green-600">
            {formatCurrency(product.price)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase text-gray-500">
            Stock
          </span>
          <span
            className={`text-lg ${
              product.stock === 0 ? "text-red-500" : "text-gray-700"
            }`}
          >
            {product.stock} units
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase text-gray-500">
            Sales
          </span>
          <span className="text-lg text-gray-700">{product.sales} sold</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase text-gray-500">
            Status
          </span>
          <StatusBadge />
        </div>
      </div>
    </div>
  );
};

// --- Main Component (MODIFIED) ---
const ProductTable: React.FC = () => {
  const [products] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");
  const [viewedProduct, setViewedProduct] = useState<Product | null>(null);

  // ID 1 er product-ti khuje newa
  const productWithId1 = products.find((p) => p.id === 1) || null;

  const categoryOptions: DropdownOption[] = [
    { label: "All Categories", value: "all" },
    { label: "T-Shirts", value: "T-Shirts" },
    { label: "Hoodies", value: "Hoodies" },
    { label: "Caps", value: "Caps" },
    { label: "Mugs", value: "Mugs" },
  ];

  const ageGroupOptions: DropdownOption[] = [
    { label: "All Age Groups", value: "all" },
    { label: "Adults (18-35)", value: "Adults (18-35)" },
    { label: "Kids (5-12)", value: "Kids (5-12)" },
    { label: "All Ages", value: "All Ages" },
    { label: "Adults (18+)", value: "Adults (18+)" },
    { label: "Women (18-45)", value: "Women (18-45)" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesAgeGroup =
      selectedAgeGroup === "all" || product.ageGroup === selectedAgeGroup;
    return matchesSearch && matchesCategory && matchesAgeGroup;
  });

  // MODIFIED: Ekhon ei function-ti shudhu ID 1 product-kei set korbe.
  const handleViewProduct = () => {
    setViewedProduct(productWithId1);
  };

  const handleBackToList = () => {
    setViewedProduct(null);
  };

  // Conditional Rendering: If a product is selected, ONLY render the details view.
  if (viewedProduct) {
    return (
      <ProductDetailsView product={viewedProduct} onBack={handleBackToList} />
    );
  }

  // Render Product Table (List View) with filters/search
  return (
    <>
      <div className="p-4 rounded-[14px] border border-[#E8E3DC] bg-white mx-auto my-4">
        {/* Search and Filters container */}
        <div className="flex flex-col sm:flex-row sm:space-y-0 sm:space-x-3 space-y-3">
          <div className="flex-1 min-w-0 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-12 pr-4 text-[14px] rounded-[14px] border border-[#E8E3DC] bg-[#F3F3F5] text-gray-700 focus:outline-none transition duration-150 ease-in-out"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>

          <div className="flex flex-wrap gap-3 sm:flex-nowrap sm:space-x-3 sm:gap-0">
            <CustomDropdown
              label="Category Filter"
              defaultOption={
                categoryOptions.find((opt) => opt.value === selectedCategory) ||
                categoryOptions[0]
              }
              options={categoryOptions}
              onSelect={setSelectedCategory}
            />
            <CustomDropdown
              label="Age Filter"
              defaultOption={
                ageGroupOptions.find((opt) => opt.value === selectedAgeGroup) ||
                ageGroupOptions[0]
              }
              options={ageGroupOptions}
              onSelect={setSelectedAgeGroup}
            />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl">
        {/* Product Table */}
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-[14px]">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader name="Product Name" />
              <TableHeader name="Category" />
              <TableHeader name="Age Group" />
              <TableHeader name="Price" />
              <TableHeader name="Stock" />
              <TableHeader name="Sales" />
              <TableHeader name="Status" />
              <TableHeader name="Actions" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <TableRow
                  // React warning erate index use kora holo, kintu sob id 1.
                  key={product.name + index}
                  product={product}
                  onView={handleViewProduct}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No products found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;
