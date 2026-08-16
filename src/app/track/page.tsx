import { Suspense } from "react";
import { OrderTrackerClient } from "./OrderTrackerClient";

export const metadata = {
  title: "Track Your Order — Naaz Arts",
  description: "Live studio order tracking for handmade concrete art pieces. Track your hand-casting, curing, and delivery stages.",
};

export default function OrderTrackingPage() {
  return (
    <div className="track-page-wrapper">
      <header className="page-header" style={{ paddingBottom: "24px" }}>
        <div className="container">
          <span className="eyebrow">Studio Dispatch</span>
          <h1>Track Your Order</h1>
          <p className="lede" style={{ margin: "8px auto 0" }}>
            Enter your 6-digit studio tracking ID (e.g. <strong>#NAS-749102</strong>) to follow your piece from mold to doorstep.
          </p>
        </div>
      </header>

      <Suspense
        fallback={
          <div className="container" style={{ padding: "60px 0", textAlign: "center" }}>
            <p className="body-text">Loading tracking system...</p>
          </div>
        }
      >
        <OrderTrackerClient />
      </Suspense>
    </div>
  );
}
