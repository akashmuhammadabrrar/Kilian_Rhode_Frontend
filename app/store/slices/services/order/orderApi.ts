import { baseBackendApi } from "../baseBackendApi";

export interface IAIDesignInfo {
  version_id: number;
  version_number: number;
  design_cost: number;
  available_images: string[];
  selected_image: string;
}

export interface ICartItemProduct {
  id: number;
  name: string;
  price: string;
  discounted_price: number | null;
  images: { id: number; image: string }[];
  color_code?: string;
  colors?: string[];
  cloth_size?: string[];
  kids_size?: string[];
  mug_size?: string[];
}

export interface ICartItem {
  id: number;
  product: ICartItemProduct;
  quantity: number;
  subtotal: number; // or total_price
  ai_design_info?: IAIDesignInfo;
}

export interface ICartResponse {
  id: number;
  cards: ICartItem[];
  total_price: number;
}

export interface IShipmentType {
  id: number;
  title: string;
  description: string;
  cost: number;
}

export interface IShipmentTypeResponse {
  success: boolean;
  message: string;
  data: IShipmentType[];
}

export interface IOrderItem {
  id: number;
  order_product_id: number;
  order_product_name: string;
  order_product_category: string;
  order_product_sub_category: string;
  order_product_classification: string;
  order_product_price: string;
  order_product_size: string[];
  order_product_color_code: string[];
  quantity: number;
  subtotal: string;
  item_image: string[];
  ai_design_info?: IAIDesignInfo;
}

export interface IOrder {
  id: number;
  order_uid: string;
  status: string;
  items: IOrderItem[];
  product_total_amount: number;
  shipping_cost: number;
  tax: number;
  promo_discount: number;
  applied_promo_codes: Array<{ code: string; discount_amount: number; applied_to: string }>;
  total_cost: number;
  total_savings: number;
  is_free_delivery: boolean;
  savings_breakdown: {
    promo_codes_discount: number;
    free_shipping_savings: number;
    product_discounts: number;
    total_saved: number;
  };
  original_total: number;
  created_at: string;
}

export interface IOrderResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IOrder[];
}

export interface IAddAddressRequest {
  order_id: number;
  is_new_address: boolean;
  address_name: string;
  address: string;
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  postal_code: number;
  address_id?: number | null;
}

export interface IPaymentSessionResponse {
  success: boolean;
  message: string;
  data: {
    payment_url: string;
    session_id: string;
    order_id: number;
    amount: number;
  };
}

export interface IAddressBookItem {
  id: number;
  address_name: string;
  address: string;
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  postal_code: number;
  user: number;
}

export interface IAddressBookResponse {
  success: boolean;
  message: string;
  address: IAddressBookItem[];
}

export const orderApi = baseBackendApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<ICartResponse, void>({
      query: () => ({
        url: "/order/cart/",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<ICartResponse, { product: number; quantity: number; custom_ai_product_version?: number; selected_design_image?: string }>({
      query: (body) => ({
        url: "/order/cart/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation<ICartResponse, { product_id: number; quantity: number }>({
      query: ({ product_id, quantity }) => ({
        url: `/order/cart/${product_id}/`,
        method: "PATCH",
        body: { quantity }
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/order/cart/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    checkout: builder.mutation<any, {
      card_products: Array<{
        checkout_card_id: number;
        quantity: number;
        checkout_product_color: string[];
        checkout_product_size: string[];
        custom_ai_design_version?: number;
        selected_design_image?: string;
      }>;
      shipping_id: number;
      promo_codes?: Record<string, string>;
    }>({
      query: (body) => ({
        url: "/order/orders/checkout/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart", "Orders"],
    }),
    getShipmentsType: builder.query<IShipmentTypeResponse, void>({
      query: () => ({
        url: "/order/shipments_type/",
        method: "GET",
      }),
    }),
    getOrders: builder.query<IOrderResponse, void>({
      query: () => ({
        url: "/order/orders/",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    addOrderAddress: builder.mutation<any, IAddAddressRequest>({
      query: (body) => ({
        url: "/order/UseAddressBook/Add-order-address/",
        method: "POST",
        body,
      }),
    }),
    createPaymentSession: builder.mutation<IPaymentSessionResponse, { order_id: number }>({
      query: (body) => ({
        url: "/order/payment/create/",
        method: "POST",
        body,
      }),
    }),
    getAddressBook: builder.query<IAddressBookResponse, void>({
      query: () => ({
        url: "/order/UseAddressBook/",
        method: "GET",
      }),
      providesTags: ["AddressBook"],
    }),
    deleteAddress: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/order/UseAddressBook/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["AddressBook"],
    }),
    getOrderDetails: builder.query<IOrder, number>({
      query: (id) => ({
        url: `/order/orders/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useCheckoutMutation,
  useGetShipmentsTypeQuery,
  useGetOrdersQuery,
  useAddOrderAddressMutation,
  useCreatePaymentSessionMutation,
  useGetAddressBookQuery,
  useDeleteAddressMutation,
  useGetOrderDetailsQuery,
} = orderApi;
