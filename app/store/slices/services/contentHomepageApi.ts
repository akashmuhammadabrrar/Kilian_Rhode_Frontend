import { baseBackendApi } from "./baseBackendApi";

// --- Save Feature Interfaces ---
export interface ISaveFeature {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
}

export interface ISaveFeatureListResponse {
  success: boolean;
  message: string;
  data: ISaveFeature[];
}

// --- Hero Interfaces ---
export interface IHero {
  id: number;
  hero_bgImage: string;
  hero_title: string;
  hero_subtitle: string;
  button_text: string;
}

export interface IHeroListResponse {
  success: boolean;
  message: string;
  data: IHero[];
}

export const contentHomepageApi = baseBackendApi.injectEndpoints({
  endpoints: (builder) => ({
    getSaveFeatures: builder.query<ISaveFeatureListResponse, void>({
      query: () => "/content/homepage/save_feature/",
      providesTags: ["HomepageSaveFeature"],
    }),
    getHero: builder.query<IHeroListResponse, void>({
      query: () => "/content/homepage/hero/",
      providesTags: ["HomepageHero"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSaveFeaturesQuery, useGetHeroQuery } = contentHomepageApi;
