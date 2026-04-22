import { baseBackendApi } from "./baseBackendApi";

export interface SubscribeNewsletterResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    send_newsletter_emails: boolean;
    created_at: string;
    updated_at: string;
  };
}

export interface SendNewsletterResponse {
  success: boolean;
  message: string;
  data: {
    emails: string[];
  };
}

export const newsletterApi = baseBackendApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation<SubscribeNewsletterResponse, FormData>({
      query: (formData) => ({
        url: "/smtp/subscribe-newsletter/",
        method: "POST",
        body: formData,
      }),
    }),
    sendNewsletter: builder.mutation<SendNewsletterResponse, FormData>({
      query: (formData) => ({
        url: "/smtp/send-newsletter/",
        method: "POST",
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSubscribeNewsletterMutation, useSendNewsletterMutation } = newsletterApi;
