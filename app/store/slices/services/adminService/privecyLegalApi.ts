import { baseBackendApi } from "../baseBackendApi";

export interface ILegalContent {
    id: number;
    title: string | null;
    file: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface ILegalContentResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ILegalContent[];
}

export const privecyLegalApi = baseBackendApi.injectEndpoints({
  overrideExisting: true,
    endpoints: (builder) => ({
        // Get all legal content
        getLegalContent: builder.query<ILegalContentResponse, void>({
            query: () => "/document/policy/",
            providesTags: ["LegalContent"],
        }),

        // Create new legal content
        createLegalContent: builder.mutation<ILegalContent, FormData>({
            query: (data) => ({
                url: "/document/policy/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["LegalContent"],
        }),

        // Update legal content
        updateLegalContent: builder.mutation<ILegalContent, { id: number; data: FormData }>({
            query: ({ id, data }) => ({
                url: `/document/policy/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["LegalContent"],
        }),

        // Delete legal content
        deleteLegalContent: builder.mutation<void, number>({
            query: (id) => ({
                url: `/document/policy/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["LegalContent"],
        }),
    }),
});

export const {
    useGetLegalContentQuery,
    useCreateLegalContentMutation,
    useUpdateLegalContentMutation,
    useDeleteLegalContentMutation,
} = privecyLegalApi;
