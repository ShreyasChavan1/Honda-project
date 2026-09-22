import { createFileRoute, redirect } from "@tanstack/react-router";

// EV is now a vehicle category (managed in the admin panel alongside Scooters and
// Motorcycles), so this legacy URL redirects into the main catalogue instead of
// rendering its own static page.
export const Route = createFileRoute("/products/ev")({
  beforeLoad: () => {
    throw redirect({ to: "/vehicles", search: { category: "ev" } });
  },
});
