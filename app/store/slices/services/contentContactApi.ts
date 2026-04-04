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

export const contentContactApi = baseBackendApi.injectEndpoints({
    endpoints: (builder) => ({
        getContactInfo: builder.query<IContactInfoResponse, void>({
            query: () => "/content/contact/contact_information/",
            providesTags: ["ContactInfo"],
        }),
        getSocialMedia: builder.query<ISocialMediaListResponse, void>({
            query: () => "/content/contact/social_media/",
            providesTags: ["SocialMedia"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetContactInfoQuery,
    useGetSocialMediaQuery,
} = contentContactApi;
