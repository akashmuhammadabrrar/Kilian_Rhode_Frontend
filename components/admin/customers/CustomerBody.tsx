import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

// The imported custom icon (assuming Next.js or a similar setup where this path works)
import orderIcon from "@/public/image/admin/products/orderIcon.svg";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";

// --- Dummy OrderView Component (Placeholder) ---
const OrderView = ({
  onViewChange,
  productId,
}: {
  onViewChange: (view: string) => void;
  productId: number;
}) => (
  <div className="p-6 bg-white rounded-xl border border-[#e8e3dc]">
    <h3 className="text-xl font-semibold text-gray-800">
      Customer Details (ID: {productId})
    </h3>
    <p className="text-gray-600 mt-2">
      This is a placeholder for the detailed customer view screen.
    </p>
    <button
      onClick={() => onViewChange("listOrder")}
      className="mt-4 px-4 py-2 bg-[#155DFC] text-white rounded-xl hover:bg-blue-700 transition"
    >
      Back to Customer List
    </button>
  </div>
);
// --- End Dummy OrderView ---

// --- Custom Dropdown Component ---
interface DropdownFilterProps {
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  // Close when clicking outside
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

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const displayValue = selectedValue === options[0] ? title : selectedValue;
  const Icon = isOpen ? ChevronUp : ChevronDown;

  return (
    <div
      className="relative w-full md:w-auto md:min-w-[180px]"
      ref={dropdownRef}
    >
      <button
        onClick={toggleOpen}
        className="w-full px-4 py-2 border border-[#e8e3dc] rounded-xl bg-neutral-100 text-gray-700 focus:outline-none transition duration-200 flex justify-between items-center hover:bg-neutral-200"
      >
        <span className="truncate">{displayValue}</span>
        <Icon className="w-4 h-4 text-gray-500 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 top-full mt-2 w-full min-w-[180px] bg-white rounded-xl shadow-xl border border-gray-200 max-h-60 overflow-y-auto">
          {/* Header based on image */}

          {/* Options */}
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 transition duration-150 ${
                selectedValue === option
                  ? "font-semibold text-gray-900 bg-gray-50"
                  : "text-gray-700"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
// --- End: Custom Dropdown Component ---

// --- New Type Definitions ---
type ViewType = "listOrder" | "add" | "viewOrder" | "editOrder";
type ViewChangeHandler = (view: ViewType, id?: number) => void;

// --- UPDATED INTERFACE FOR CUSTOMER DATA ---
type OrderDesignType = "AI Generated" | "User Upload" | "Letter/Number";

interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  segment: "Regular" | "New";
  totalOrders: number;
  totalSpent: string;
  preferredDesign: OrderDesignType;
  lastOrderDate: string;
  // Note: These fields were kept for type compatibility, though not used in the table display logic
  orderId: string;
  // Removed product, amount, date, status to simplify the type definition
}

// Helper component for the segment badge
const SegmentBadge = ({ segment }: { segment: "Regular" | "New" }) => {
  const getBadgeStyles = (segment: "Regular" | "New") => {
    return segment === "Regular"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";
  };
  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-semibold ${getBadgeStyles(
        segment
      )}`}
    >
      {segment}
    </span>
  );
};

// --- CORRECTED & COMPLETE DATA FOR CUSTOMER TABLE ---
const initialOrderData: Order[] = [
  {
    id: 1,
    customerName: "Emma Schmidt",
    customerEmail: "emma.s@email.com",
    segment: "Regular",
    totalOrders: 12,
    totalSpent: "€418.88",
    preferredDesign: "AI Generated",
    lastOrderDate: "Oct 10, 2025",
    orderId: "#ORD-2847",
  },
  {
    id: 2,
    customerName: "Lucas Müller",
    customerEmail: "lucas.m@email.com",
    segment: "Regular",
    totalOrders: 8,
    totalSpent: "€279.92",
    preferredDesign: "AI Generated",
    lastOrderDate: "Oct 10, 2025",
    orderId: "#ORD-2846",
  },
  {
    id: 3,
    customerName: "Sophie Weber",
    customerEmail: "sophie.w@email.com",
    segment: "Regular",
    totalOrders: 15,
    totalSpent: "€524.85",
    preferredDesign: "User Upload",
    lastOrderDate: "Oct 09, 2025",
    orderId: "#ORD-2845",
  },
  {
    id: 4,
    customerName: "Noah Fischer",
    customerEmail: "noah.f@email.com",
    segment: "Regular",
    totalOrders: 5,
    totalSpent: "€174.95",
    preferredDesign: "User Upload",
    lastOrderDate: "Oct 09, 2025",
    orderId: "#ORD-2844",
  },
  {
    id: 5,
    customerName: "Mia Becker",
    customerEmail: "mia.b@email.com",
    segment: "New",
    totalOrders: 20,
    totalSpent: "€798.80",
    preferredDesign: "AI Generated",
    lastOrderDate: "Oct 08, 2025",
    orderId: "#ORD-2843",
  },
  {
    id: 6,
    customerName: "Leon Wagner",
    customerEmail: "leon.w@email.com",
    segment: "New",
    totalOrders: 3,
    totalSpent: "€104.97",
    preferredDesign: "User Upload",
    lastOrderDate: "Oct 08, 2025",
    orderId: "#ORD-2842",
  },
];

const HighlightText = ({
  text,
  highlight,
}: {
  text: string | number;
  highlight: string;
}) => {
  const textString = String(text);
  if (!highlight.trim()) {
    return <>{textString}</>;
  }

  const regex = new RegExp(
    `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = textString.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span
            key={index}
            className="bg-yellow-200 font-semibold rounded px-0.5"
          >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

// --- UPDATED OrderTable WITH orderIcon IN TOTAL ORDERS COLUMN ---
const OrderTable = ({
  data,
  onViewOrder,
  searchTerm,
  onDeleteCustomer,
}: {
  data: Order[];
  onViewOrder: (id: number) => void;
  searchTerm: string;
  onDeleteCustomer: (id: number) => void; // Added delete handler
}) => (
  <div className="bg-white rounded-xl border border-[#e8e3dc]">
    <div className="w-full overflow-x-auto rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider min-w-[150px]">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider min-w-[100px]">
              Segment
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider">
              Total Orders
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider">
              Total Spent
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider min-w-[150px]">
              Preferred Design
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider min-w-[100px]">
              Last Order
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider min-w-[100px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 transition duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-[14px] font-medium text-[#1a1410]">
                <div className="flex flex-col">
                  <HighlightText
                    text={order.customerName}
                    highlight={searchTerm}
                  />
                  <span className="text-xs text-gray-400">
                    <HighlightText
                      text={order.customerEmail}
                      highlight={searchTerm}
                    />
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <SegmentBadge segment={order.segment} />
              </td>
              {/* --- UPDATED: Total Orders with orderIcon (SVG Image) --- */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                <div className="flex items-center space-x-2">
                  {/* Using <img> tag for the imported SVG */}
                  <Image
                    src={orderIcon}
                    alt="Order"
                    height={18}
                    width={18}
                    className="mr-2"
                  />
                  <HighlightText
                    text={order.totalOrders}
                    highlight={searchTerm}
                  />
                </div>
              </td>
              {/* --- END UPDATED --- */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                <HighlightText text={formatCurrency(order.totalSpent)} highlight={searchTerm} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <HighlightText
                  text={order.preferredDesign}
                  highlight={searchTerm}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.lastOrderDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-4">
                  {/* View Button */}
                  <button
                    onClick={() => onViewOrder(order.id)}
                    className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 p-1 rounded-full hover:bg-gray-100"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  {/* Edit Button */}
                  <button
                    className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 p-1 rounded-full hover:bg-gray-100"
                    title="Edit Customer"
                  >
                    <Edit className="w-5 h-5 text-[#155DFC]" />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => onDeleteCustomer(order.id)} // Attached delete handler
                    className="text-red-500 hover:text-red-700 flex items-center space-x-1 p-1 rounded-full hover:bg-red-100"
                    title="Delete Customer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {data.length === 0 && (
      <div className="text-center py-10 text-gray-500">
        No customers found matching your criteria.
      </div>
    )}
  </div>
);

// --- Customer List Screen ---
const CustomerListScreen = ({
  onViewChange,
  onDeleteCustomer,
  orderData,
}: {
  onViewChange: ViewChangeHandler;
  onDeleteCustomer: (id: number) => void;
  orderData: Order[];
}) => {
  // --- State for Filtering ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDesignType, setSelectedDesignType] = useState("All Types");
  const [selectedSegment, setSelectedSegment] = useState("All Segments");
  // ---

  const handleViewOrder = (id: number) => {
    onViewChange("viewOrder", id);
  };

  // Custom unique options
  const uniqueSegments = ["All Segments", "Regular", "New"];
  const uniqueDesignTypes = ["All Types", "AI Generated", "User Upload"];

  // Logic to filter the customer data
  const filteredOrders = orderData.filter((order) => {
    const searchLower = searchTerm.toLowerCase().trim();

    // 1. Search Term Filter (Name, Email, Total Spent, Total Orders, Preferred Design)
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchLower) ||
      order.customerEmail.toLowerCase().includes(searchLower) ||
      order.totalSpent.toLowerCase().includes(searchLower) ||
      String(order.totalOrders).includes(searchLower) ||
      order.preferredDesign.toLowerCase().includes(searchLower);

    // 2. Segment Filter
    const matchesSegment =
      selectedSegment === "All Segments" || order.segment === selectedSegment;

    // 3. Design Type Filter (Preferred Design)
    const matchesDesignType =
      selectedDesignType === "All Types" ||
      order.preferredDesign === selectedDesignType;

    return matchesSearch && matchesSegment && matchesDesignType;
  });

  return (
    <div className=" w-full bg-gray-50">
      {/* Search and Filters Section */}
      <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#e8e3dc] mb-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="relative flex-grow w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search customers, email, or spent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border border-[#e8e3dc] rounded-xl bg-neutral-100 text-gray-800 placeholder-gray-500 focus:outline-none transition duration-200"
            />
          </div>

          {/* 1. Segment Dropdown (NEW) */}
          <DropdownFilter
            title="All Segments"
            options={uniqueSegments}
            selectedValue={selectedSegment}
            onSelect={setSelectedSegment}
          />

          {/* 2. Design Types Dropdown (Custom Component) */}
          <DropdownFilter
            title="All Types"
            options={uniqueDesignTypes}
            selectedValue={selectedDesignType}
            onSelect={setSelectedDesignType}
          />
        </div>
      </div>
      {/* --- END: Search and Filters Section --- */}

      {/* Order Table */}
      <div className="w-full mt-6">
        <OrderTable
          data={filteredOrders}
          onViewOrder={handleViewOrder}
          onDeleteCustomer={onDeleteCustomer}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [orderData, setOrderData] = useState<Order[]>(initialOrderData);
  const [view, setView] = useState<ViewType>("listOrder");
  const [currentOrderId, setCurrentOrderId] = useState<number>(0);

  const handleViewChange: ViewChangeHandler = (newView, id = 0) => {
    setCurrentOrderId(id);
    setView(newView);
  };

  // Delete handler for the table
  const handleDeleteCustomer = (id: number) => {
    const customerToDelete = orderData.find((order) => order.id === id);
    const customerNameText = customerToDelete
      ? customerToDelete.customerName
      : `ID: ${id}`;

    const isConfirmed = window.confirm(
      `Are you sure you want to delete customer ${customerNameText}?`
    );
    if (isConfirmed) {
      setOrderData((prevData) => prevData.filter((order) => order.id !== id));
      alert(`Customer ${customerNameText} deleted successfully.`);
      if (view !== "listOrder" && currentOrderId === id) {
        handleViewChange("listOrder");
      }
    }
  };

  return (
    <div className=" bg-gray-50 p-4">
      <div className="mt-4">
        {view === "listOrder" && (
          <CustomerListScreen
            onViewChange={handleViewChange}
            onDeleteCustomer={handleDeleteCustomer}
            orderData={orderData}
          />
        )}

        {view === "viewOrder" && currentOrderId > 0 && (
          // OrderView is used as a placeholder for Customer View
          <OrderView
            onViewChange={(newView: string) =>
              handleViewChange(newView as ViewType)
            }
            productId={currentOrderId}
          />
        )}
      </div>
    </div>
  );
};

export default App;
