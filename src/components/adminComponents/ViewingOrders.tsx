import React, { useEffect, useState } from "react";
import OrderElement from "./OrderElement";
import { OrdersInterface } from "@/models/order";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { getOrdersAdmin } from "@/serverActions/adminServerActions";

interface orderInfosInterface {
  page: number;
  totalPages: number;
  totalOrders: number;
}

export default function ViewingOrders() {
  const [fetchedOrders, setFetchedOrders] = useState<OrdersInterface[] | null>(
    null
  );
  const [ordersInfos, setOrdersInfos] = useState<orderInfosInterface>({
    page: 1,
    totalPages: 1,
    totalOrders: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [updatedData, setUpdatedData] = useState(false);

  useEffect(() => {
    const fetchOrdersQueryFunction = async () => {
      const orders = JSON.parse(await getOrdersAdmin(currentPage));
      if (orders && orders.page) {
        setFetchedOrders(orders.orders);
        setOrdersInfos({
          page: orders.page,
          totalPages: orders.totalPages,
          totalOrders: orders.totalOrders,
        });
      }
    };
    fetchOrdersQueryFunction();
  }, [currentPage, updatedData]);

  return (
    <div className="p-6">
      <h1>Orders Page</h1>
      <div className="flex flex-col gap-5">
        {fetchedOrders !== null &&
          fetchedOrders.map((item, index) => (
            <OrderElement
              order={item}
              key={`${item._id}_order-admin-element${index}`}
              setUpdatedData={setUpdatedData}
            />
          ))}
      </div>

      {fetchedOrders !== null && (
        <Pagination className="mt-3">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
                }
              />
            </PaginationItem>
            {Array.from({ length: ordersInfos.totalPages }).map((_, index) => (
              <PaginationItem
                onClick={() => setCurrentPage(index + 1)}
                key={`page ${index}`}
              >
                <PaginationLink
                  isActive={currentPage === index + 1 ? true : false}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(
                    currentPage < ordersInfos.totalPages
                      ? currentPage + 1
                      : currentPage
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
