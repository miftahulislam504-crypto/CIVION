"use client";

/**
 * ProjectShowcase — superseded by ProjectTourSection.
 * Detail panel এবং project selection এখন ProjectTourSection handle করে।
 * এই component এখন শুধু #showcase anchor section রাখে যাতে
 * scroll trigger কাজ করে।
 */
export default function ProjectShowcase() {
  return <section id="showcase" className="sr-only" aria-hidden />;
}
