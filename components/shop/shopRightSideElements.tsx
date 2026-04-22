import React, { useState } from "react";
import HeaderElement from "@/components/shop/headerElements";
import PropularWeek from "./propularWeek";

import { useGetProductsQuery, IProductQueryParams } from "@/app/store/slices/services/product/productApi";
import EmptyState from "../EmptyState";

const ShopRightSideElements = ({ filters }: { filters: IProductQueryParams }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productsData, isLoading } = useGetProductsQuery({
    ...filters,
    limit: 10, // As per prompt
    page: currentPage
  });

  const products = Array.isArray(productsData?.results?.categories) ? productsData.results.categories : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  console.log("rightsideeement :", productsData)

  const totalCount = productsData?.count || 0;
  const hasMore = currentPage * 10 < totalCount;

  if (!isLoading && products.length === 0) {
    return (
      <div className="px-4 lg:px-0 md:px-0">
        <HeaderElement />
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-0 md:px-0">
      <HeaderElement />
      <PropularWeek
        products={products}
        isLoading={isLoading}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        hasMore={hasMore}
      />

    </div>
  );
};

export default ShopRightSideElements;
