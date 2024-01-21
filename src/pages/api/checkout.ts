import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export default async function createPaymentIntent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const customer = await stripe.customers.create({
    name: "Jenny Rosen",
    email: "jennyrosen@example.com",
    address: {
      line1: "street1",
      line2: "street2",
      city: "city",
      country: "US",
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
        country: "US",
        postal_code: "zip",
        state: "state",
      },
    },
  });

  const { amount } = req.body;
  if (!amount) return res.json({ message: "Please Enter Amount" });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      amount: Math.round(Number(amount) * 100),
      currency: "USD",
      payment_method_types: ["card"],
      description: "Thanks For Purchasing the Course",
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
      succes: true,
    });
  } catch (error: any) {
    return res.json({ error });
  }
}
