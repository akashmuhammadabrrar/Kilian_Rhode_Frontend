import React, { useState } from "react";
import HeaderElement from "@/components/shop/headerElements";
import PropularWeek from "./propularWeek";
import BottomCard from "./bottomCard";
import { useGetProductsQuery, IProductQueryParams } from "@/app/store/slices/services/product/productApi";
import EmptyState from "../EmptyState";

const ShopRightSideElements = ({ filters }: { filters: IProductQueryParams }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productsData, isLoading } = useGetProductsQuery({
    ...filters,
    limit: 10,
    page: currentPage
  });

  const products = Array.isArray(productsData?.results?.categories) ? productsData.results.categories : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  console.log("rightsideeement :", productsData)

  const totalCount = productsData?.count || 0;
  const hasMore = currentPage * 10 < totalCount;

  console.log("check", products, isLoading)
  if (!isLoading && products.length === 0) {
    return (
      <div className="px-4 lg:px-0 md:px-0">
        <HeaderElement />
        <EmptyState />
      </div>
    );
  }

  // 2 products in PopularWeek, up to 8 in BottomCard
  const topProducts = products.slice(0, 2);
  const bottomProducts = products.slice(2);

  return (
    <div className="px-4 lg:px-0 md:px-0">
      <HeaderElement />

      {/* Render Popular Week only if we have products on the first page or always but without pagination footer */}
      {topProducts.length > 0 && (
        <PropularWeek
          products={topProducts}
          isLoading={isLoading}
          /* Removed pagination props from PropularWeek since it only shows top 2 items */
        />
      )}

      {bottomProducts.length > 0 && (
        <BottomCard 
          products={bottomProducts}
          isLoading={isLoading}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasMore={hasMore}
        />
      )}
    </div>
  );
};

export default ShopRightSideElements;
