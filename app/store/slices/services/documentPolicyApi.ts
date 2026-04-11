import { baseBackendApi } from "./baseBackendApi";

export interface IDocumentPolicy {
    id: number;
    title: string;
    file: string;
    created_at: string;
    updated_at: string;
}

export interface IDocumentPolicyResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IDocumentPolicy[];
}

export const documentPolicyApi = baseBackendApi.injectEndpoints({
    endpoints: (builder) => ({
        getDocumentPolicies: builder.query<IDocumentPolicyResponse, void>({
            query: () => "/document/policy/",
            providesTags: ["DocumentPolicy"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetDocumentPoliciesQuery,
} = documentPolicyApi;
