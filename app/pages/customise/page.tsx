"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Jost, Cormorant_Garamond } from "next/font/google";

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
});

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import PremiunCollectionTshirt from "@/components/home/premiunCollectionTshirt";
import DSCRsection from "@/components/product/dscrSection";
import MayAlsoLike from "@/components/product/mayAlsoLike";
import CustomDesignStudio from "@/components/customizer/customSignStdio";

import { useGetProductDetailsQuery } from "@/app/store/slices/services/product/productApi";
import Link from "next/link";

const Loader = () => (
  <div className="flex flex-col items-center justify-center h-[60vh] w-full bg-white">
    <div className="relative w-20 h-20">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-[#D4AF37]/20 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
    </div>
    <p className="mt-6 text-[#D4AF37] font-medium tracking-[4px] uppercase text-sm">
      Loading Details
    </p>
  </div>
);

const ProductNotFound = () => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
    <h2 className={`${cormorantItalic.className} text-4xl text-gray-900 mb-4`}>Product Not Found</h2>
    <p className={`${jostFont.className} text-gray-600 mb-8 max-w-md tracking-[0.5px]`}>
      Sorry, we couldn&apos;t find the product you&apos;re looking for. It may have been removed or the link is incorrect.
    </p>
    <Link
      href="/pages/shop"
      className={`${jostFont.className} px-8 py-3 bg-[#795548] text-white tracking-[2px] text-sm font-medium hover:bg-opacity-90 transition-all shadow-lg`}
    >
      BACK TO SHOP
    </Link>
  </div>
);

const CustomiseContent = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const id = productId ? parseInt(productId) : 0;

  const { data, isLoading, isError } = useGetProductDetailsQuery(id, {
    skip: !id,
  });

  if (!id) return <ProductNotFound />;
  if (isLoading) return <Loader />;
  if (isError || !data?.success || !data?.data) return <ProductNotFound />;

  const product = data.data;

  return (
    <>
      <PremiunCollectionTshirt apiProduct={product} productId={id} />
      <DSCRsection apiProduct={product} productId={id} />
      <MayAlsoLike productId={id} />
      <CustomDesignStudio />
    </>
  );
};

const Page = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <CustomiseContent />
      </Suspense>
      <Footer />
    </>
  );
};

export default Page;
