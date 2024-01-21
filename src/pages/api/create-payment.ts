import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = require("stripe")(
  "sk_test_51OaCAmSI8FJKhVHQWz0zyN58mBpacYFUxsX5nUTbc2W4fYydYPs1AR5gSXFYespXo5Lwwso3fUGfpJ2rq26qgUru00PCGfrGjb"
);

const host = "http://localhost:3000";

export default async function route(req: NextApiRequest, res: NextApiResponse) {
  const customer = await stripe.customers.create({
    name: "Jenny Rosen",
    email: "jennyrosen@example.com",
    address: {
      line1: "street1",
      line2: "street2",
      city: "city",
      country: "IN",
      postal_code: "zip",
      state: "state",
    },
    shipping: {
      name: "Jenny Rosen",
      phone: "4868467461",
      address: {
        line1: "street1",
        line2: "street2",
        city: "city",
        country: "IN",
        postal_code: "zip",
        state: "state",
      },
    },
  });

  try {
    const cart = req.body;
    const productList = cart;
    console.log(productList);

    if (!productList) return res.json({ message: "Please Send Cart Items" });
    const lineItems = productList.map(
      (product: {
        title: string;
        price: number;
        imageUrl: string;
        _id: string;
      }) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: product.title,
            images: [product.imageUrl],
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      })
    );

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${host}/success`,
      cancel_url: `${host}/cancel`,
    });

    res.json({ session_id: session.id, url: session.url });
  } catch (error) {
    res.json({ error });
  }
}
