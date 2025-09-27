import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { getOrder } from "@/serverActions/actions";
import { OrderClientInterface } from "@/app/(protectedRoutes)/purchased/page";

export default function PurchasesElements({
  orderID,
  index,
  setOrderHighlights,
}: {
  orderID: string;
  index: number;
  setOrderHighlights: (orderHighlights: OrderClientInterface | null) => void;
}) {
  const [orderInfos, setOrderInfos] = useState<OrderClientInterface | null>(
    null
  );
  useEffect(() => {
    const fetchOder = async () => {
      // Call server function to get the order details
      const order = await getOrder(orderID);
      if (order) {
        setOrderInfos(JSON.parse(order));
      }
    };

    fetchOder();
  }, []);
  // /!\ Not in this MVP bro later
  // display the data regarding that order
  // and when clicking on a order will display a popup screen that contain all the data related to that order (products:quantities, sizes, images... , payment,progress shipment, )
  return (
    <>
      {orderInfos && (
        <TableRow
          className="hover:font-bold hover:cursor-pointer"
          onClick={() => setOrderHighlights({ ...orderInfos })}
        >
          <TableCell>{index + 1}</TableCell>
          <TableCell>#{orderID}</TableCell>
          <TableCell>
            <Badge
              variant={
                orderInfos.statusDelivery === "Order Placed"
                  ? "secondary"
                  : orderInfos.statusDelivery === "Delivered"
                  ? "delivered"
                  : "progress"
              }
            >
              {orderInfos.statusDelivery}
            </Badge>
          </TableCell>
          <TableCell className="uppercase">
            {orderInfos.payment.method}
          </TableCell>
          <TableCell>{orderInfos.payment.status}</TableCell>
          <TableCell>${orderInfos.payment.money}</TableCell>
        </TableRow>
      )}
    </>
  );
}
