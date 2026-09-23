import "server-only";
import Stripe from "stripe";
import { brand } from "@/brand.config";

/**
 * Serverseitiger Stripe-Client. Nie in eine Client-Komponente importieren —
 * "server-only" lässt den Build absichtlich fehlschlagen, falls das passiert.
 * Vorschau (isStaging) verwendet den Testschlüssel, Produktion den Live-Schlüssel.
 */
const secretKey = brand.isStaging
  ? process.env.STRIPE_SECRET_KEY_TEST
  : process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error(
    brand.isStaging
      ? "STRIPE_SECRET_KEY_TEST fehlt in .env"
      : "STRIPE_SECRET_KEY fehlt in .env",
  );
}

export const stripe = new Stripe(secretKey);
