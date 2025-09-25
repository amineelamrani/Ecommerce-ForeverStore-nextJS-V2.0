"use server";

import { BasketContentType } from "@/contexts/userContext";
import dbConnect from "@/lib/database/dbConnect";
import { Order, Product, User } from "@/models/models";
import Stripe from "stripe";
import { getUserId } from "./authActions";
const stripe = new Stripe(process.env.STRIPE_TEST!);

export interface InitialOrderingInterface {
  redirectingUrl: string | null;
  message: string;
  paymentMethod: string;
  error: {
    error: boolean;
    message: string;
  };
}

export const orderServerAction = async (
  initialState: InitialOrderingInterface,
  formData: FormData
) => {
  console.log("Server Action invoqued");
  if (
    !formData.get("productsToBuy") ||
    !formData.get("paymentMethod") ||
    !formData.get("firstName") ||
    !formData.get("lastName") ||
    !formData.get("email") ||
    !formData.get("street") ||
    !formData.get("city") ||
    !formData.get("state") ||
    !formData.get("country") ||
    !formData.get("zipCode") ||
    !formData.get("phone")
  ) {
    return {
      redirectingUrl: "",
      message: "",
      paymentMethod: "card",
      error: {
        error: true,
        message: "Please Provide all The fields!",
      },
    };
  }

  const data = Object.fromEntries(formData);

  const {
    productsToBuy,
    paymentMethod,
    firstName,
    lastName,
    email,
    street,
    city,
    state,
    country,
    zipCode,
    phone,
  } = data;

  if (
    productsToBuy !== "" &&
    paymentMethod !== "" &&
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    street !== "" &&
    city !== "" &&
    state !== "" &&
    country !== "" &&
    Number(zipCode) > 0 &&
    Number(phone) > 10
  ) {
    // check what is the payment method

    if (paymentMethod === "card") {
      // if stripe -> Prepare data for stripe - calculate the total price - and return the url provided by stripe (/!\Attention : the url must include something other thant only success=true as that can be tricked by the user )
      const jsonProductToBuy = JSON.parse(productsToBuy.toString());
      if (jsonProductToBuy.length < 1) {
        return {
          redirectingUrl: "",
          message: "",
          paymentMethod: "card",
          error: {
            error: true,
            message: "You did not provide the product that you need to buy!",
          },
        };
      }
      const paymentItems = jsonProductToBuy.map((item: BasketContentType) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      });

      paymentItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping Fee",
          },
          unit_amount: 10 * 100,
        },
        quantity: 1,
      });

      /////////////////////// Start

      let subTotal = 0,
        total = 0;
      for (let i = 0; i < jsonProductToBuy.length; i++) {
        subTotal += jsonProductToBuy[i].quantity * jsonProductToBuy[i].price;
      }
      total = subTotal + 10;

      const products = jsonProductToBuy.map((item: BasketContentType) => {
        return {
          productID: item.id,
          size: item.size,
          quantity: item.quantity,
          title: item.title,
        };
      });
      await dbConnect();
      const userId = await getUserId();

      const newOrder = await Order.create({
        products,
        owner: userId,
        deliveryInformation: {
          firstName: firstName.toString(),
          lastName: lastName.toString(),
          email: email.toString(),
          street: street.toString(),
          city: city.toString(),
          state: state.toString(),
          country: country.toString(),
          zipCode: Number(zipCode),
          phone: Number(phone),
        },
        payment: {
          method: "stripe",
          status: "pending",
          money: total,
        },
        statusDelivery: "Order Placed",
      });

      const actualUser = await User.findById(userId);
      actualUser.orders.push(newOrder._id);
      actualUser.confirmPassword = actualUser.password;
      await actualUser.save();

      const arrayProducts = jsonProductToBuy.map(
        async (item: BasketContentType) => {
          const productImpacted = await Product.findById(item.id);
          productImpacted.ordersNumber++;
          await productImpacted.save();
          return productImpacted;
        }
      );

      if (!arrayProducts) {
        return {
          redirectingUrl: "",
          message: "",
          paymentMethod: "card",
          error: {
            error: true,
            message: "Internal Server Error!",
          },
        };
      }

      /////////////////////////// End
      const session = await stripe.checkout.sessions.create({
        line_items: paymentItems,
        mode: "payment",
        success_url: `${
          process.env.REDIRECTING_URL
        }?success=true&session_id={CHECKOUT_SESSION_ID}&order_id=${newOrder._id.toString()}`,
        cancel_url: `${process.env.REDIRECTING_URL}?canceled=true`,
      });

      return {
        redirectingUrl: session.url,
        message: "Stripe session created",
        paymentMethod: "card",
        error: {
          error: false,
          message: "",
        },
      };
    } else if (paymentMethod === "cod") {
      // If COD -> Prepare data - calculate the total price - and store in the database
      const jsonProductToBuy = JSON.parse(productsToBuy.toString());
      if (jsonProductToBuy.length < 1) {
        return {
          redirectingUrl: "",
          message: "",
          paymentMethod: "cod",
          error: {
            error: true,
            message: "You did not provide the product that you need to buy!",
          },
        };
      }

      let subTotal = 0,
        total = 0;
      for (let i = 0; i < jsonProductToBuy.length; i++) {
        subTotal += jsonProductToBuy[i].quantity * jsonProductToBuy[i].price;
      }
      total = subTotal + 10;

      const products = jsonProductToBuy.map((item: BasketContentType) => {
        return {
          productID: item.id,
          size: item.size,
          quantity: item.quantity,
          title: item.title,
        };
      });
      await dbConnect();
      const userId = await getUserId();

      const newOrder = await Order.create({
        products,
        owner: userId,
        deliveryInformation: {
          firstName: firstName.toString(),
          lastName: lastName.toString(),
          email: email.toString(),
          street: street.toString(),
          city: city.toString(),
          state: state.toString(),
          country: country.toString(),
          zipCode: Number(zipCode),
          phone: Number(phone),
        },
        payment: {
          method: "cod",
          status: "pending",
          money: total,
        },
        statusDelivery: "Order Placed",
      });

      const actualUser = await User.findById(userId);
      actualUser.orders.push(newOrder._id);
      actualUser.confirmPassword = actualUser.password;
      await actualUser.save();

      const arrayProducts = jsonProductToBuy.map(
        async (item: BasketContentType) => {
          const productImpacted = await Product.findById(item.id);
          productImpacted.ordersNumber++;
          await productImpacted.save();
          return productImpacted;
        }
      );

      if (arrayProducts) {
        return {
          redirectingUrl: "/success=true",
          message: "success",
          paymentMethod: "cod",
          error: {
            error: false,
            message: "",
          },
        };
      } else {
        return {
          redirectingUrl: "/success=canceled",
          message: "fail",
          paymentMethod: "cod",
          error: {
            error: true,
            message: "An internal server error",
          },
        };
      }
    } else {
      return {
        redirectingUrl: "",
        message: "",
        paymentMethod: "card",
        error: {
          error: true,
          message: "Not Supported Payment Mode!",
        },
      };
    }
  } else {
    return {
      redirectingUrl: "",
      message: "",
      paymentMethod: "card",
      error: {
        error: true,
        message: "Invalid Delivery Information, Please provide Correct infos!",
      },
    };
  }
};

export const checkStripeSuccess = async (
  session_id: string,
  order_id: string
) => {
  // This server function to check if the stripe payment is done successfully  or the user try to trick us
  // Url returned when success : '${process.env.REDIRECTING_URL}?success=true&session_id={CHECKOUT_SESSION_ID}'
  // So I will received the session_id from the client, and I will check if it is done successfully or not then will return a feedback to the browser if it is succeded or not
  if (!session_id) {
    return {
      status: "fail",
      message:
        "Please provide the session id, to check if the payment done successfully",
    };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log(session);
    if (session.payment_status === "paid") {
      // Then at this moment we need to update the database to take that command into consideration
      // But here if we decided to add it to the database in this function then we will call the server with the same data two time

      // /!\ Decision -> when we call the form function "orderServerAction" we will create an order but with unpaid status and after the stripe payment, if success here then we pass the status to paid else we delete that Order from the database

      // We have order_id and session_id (so when success -> we update status of payment to payed)
      // If not successfull -> We do the inverse, remove the product, decrement from the product

      return {
        status: "success",
        message: "Payment Done successfully",
      };
    } else {
      return {
        status: "fail",
        message: "Not Paid",
      };
    }
  } catch (err) {
    return {
      status: "fail",
      message:
        "Internal Error while trying to proceed with Payment, Please Try Again",
    };
  }
};

const removeOrder = async (order_id: string) => {
  // This is the process that will be made when a stripe order is not paid successfully
  // fetch for the order
};
