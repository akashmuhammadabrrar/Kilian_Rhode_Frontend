import { baseBackendApi } from "../baseBackendApi";

export interface IOrderAdminItem {
    id: number;
    order_uid: string;
    customer_email: string;
    customer_name: string;
    product: string;
    design_type: string;
    amount: string;
    date: string;
    status: string;
    items: {
        product_name: string;
        design_type: string;
        quantity: number;
    }[];
}

export interface IOrderAdminResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IOrderAdminItem[];
}

export interface IOrderAdminDetail extends IOrderAdminItem {
    shipping_details?: {
        address: string;
        phone: string;
        customer_name: string;
    };
    payment_details?: {
        method: string;
        date: string;
        subtotal: string;
        shipping_cost: string;
        tax_amount: string;
        total: string;
    };
}

export interface IOrderAdminQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    type?: string;
    order_uid?: string;
    customer?: string;
    date_from?: string;
    date_to?: string;
    amount_min?: number;
    amount_max?: number;
    sort_by?: string;
    sort_order?: "asc" | "desc" | string;
}

export const orderAdminApi = baseBackendApi.injectEndpoints({
  overrideExisting: true,
    endpoints: (builder) => ({
        getOrders: builder.query<IOrderAdminResponse, IOrderAdminQueryParams | void>({
            query: (params) => ({
                url: "/content/orders/",
                params: params ? params : undefined,
            }),
            providesTags: ["Orders"],
        }),
        getOrderById: builder.query<IOrderAdminDetail, number>({
            query: (id) => `/content/orders/${id}/`,
            providesTags: (_result, _error, id) => [{ type: "Orders", id }],
        }),
        updateOrderStatus: builder.mutation<any, { id: number; status: string }>({
            query: ({ id, status }) => ({
                url: `/content/orders/${id}/status/`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: "Orders", id }, "Orders"],
        }),
    }),

});

export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useUpdateOrderStatusMutation,
} = orderAdminApi;
