import { baseBackendApi } from "./baseBackendApi";

// --- Contact Information Interfaces ---
export interface IContactInfo {
    id: number;
    email: string;
    phone_number: number;
    whatsappNumber: number;
    businessAddress: string | null;
}

export interface IContactInfoResponse {
    success: boolean;
    message: string;
    data: IContactInfo[];
}

// --- Social Media Interfaces ---
export interface ISocialMedia {
    id: number;
    icon: string; // URL string returned from backend
    name: string | null;
    link: string;
}

export interface ISocialMediaListResponse {
    success: boolean;
    message: string;
    data: ISocialMedia[];
}

// --- Contact Messages Interfaces ---
export interface IContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
    updated_at: string;
}

export interface IContactMessageListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IContactMessage[];
}

export interface ISubmitContactRequest {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const contentContactApi = baseBackendApi.injectEndpoints({
  overrideExisting: true,
    endpoints: (builder) => ({
        getContactInfo: builder.query<IContactInfoResponse, void>({
            query: () => "/content/contact/contact_information/",
            providesTags: ["ContactInfo"],
        }),
        getSocialMedia: builder.query<ISocialMediaListResponse, void>({
            query: () => "/content/contact/social_media/",
            providesTags: ["SocialMedia"],
        }),
        getContactMessages: builder.query<IContactMessageListResponse, { page?: number }>({
            query: ({ page = 1 }) => `/communication/contact/?page=${page}`,
            providesTags: ["ContactMessages"],
        }),
        getContactMessageById: builder.query<IContactMessage, number>({
            query: (id) => `/communication/contact/${id}/`,
            providesTags: ["ContactMessages"],
        }),
        submitContactMessage: builder.mutation<IContactMessage, ISubmitContactRequest>({
            query: (data) => ({
                url: "/communication/contact-us/create/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["ContactMessages"],
        }),
        deleteContactMessage: builder.mutation<void, number>({
            query: (id) => ({
                url: `/communication/contact/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["ContactMessages"],
        }),
    }),

});

export const {
    useGetContactInfoQuery,
    useGetSocialMediaQuery,
    useGetContactMessagesQuery,
    useGetContactMessageByIdQuery,
    useSubmitContactMessageMutation,
    useDeleteContactMessageMutation,
} = contentContactApi;
