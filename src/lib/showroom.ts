export const SHOWROOM = {
  isDemoContent: false,
  name: "Laxmi Motors",
  tagline: "Authorised Honda Two-Wheeler Showroom",
  shortDescription:
    "Explore Honda scooters and motorcycles at Laxmi Motors, Lanja. Check models, variants and availability, and contact our team for enquiries.",
  phoneDisplay: "8830996202",
  phone: "+918830996202",
  whatsapp: "919922932430",
  contacts: [
    { label: "Sales", display: "9922932430", tel: "+919922932430" },
    { label: "Workshop", display: "8830996202", tel: "+918830996202" },
  ],
  email: null,
  addressLines: [
    "Laxmi Motors, Near Rest House",
    "Lanja - 416701, Tal. Lanja",
    "Dist. Ratnagiri, Maharashtra",
  ],
  mapEmbedQuery: "Laxmi Motors, Near Rest House, Lanja - 416701, Tal. Lanja, Dist. Ratnagiri, Maharashtra",
  mapUrl: "https://maps.app.goo.gl/oPmcik7NCtCTGQfY6",
  instagramUrl: "https://www.instagram.com/laxmi.motors.lanja/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61571979691355",
  hours: [
    { days: "Tuesday – Sunday", time: "9:00 AM – 6:00 PM" },
    { days: "Monday", time: "Closed" },
  ],
  stats: [
    { value: "4★", label: "Google rating" },
    { value: "Experienced", label: "Staff" },
  ],
  about: {
    intro:
      "Laxmi Motors is an authorized Honda two-wheeler showroom located near Rest House, Lanja. We provide complete sales, service, spare parts, insurance and exchange facilities for Honda scooters and motorcycles. With experienced staff serving Lanja and surrounding areas, we are committed to providing customer service and after-sales support.",
  },
  whyChooseUs: [
    {
      title: "Authorized Honda showroom",
      description: "Explore Honda scooters and motorcycles at an authorized Honda two-wheeler showroom in Lanja.",
    },
    {
      title: "Sales support",
      description: "Get assistance choosing a Honda two-wheeler based on your everyday riding needs.",
    },
    {
      title: "Service support",
      description: "Sales and service support for Honda two-wheelers at the showroom.",
    },
    {
      title: "Spare parts",
      description: "Spare parts support is available as part of the showroom's facilities.",
    },
    {
      title: "Insurance & exchange",
      description: "Insurance and exchange facilities are available for customers.",
    },
    {
      title: "Experienced staff",
      description: "Our experienced staff is available to help with model information, enquiries and after-sales support.",
    },
  ],
} as const;

export const CATEGORIES = [
  {
    value: "scooter",
    label: "Scooters",
    description: "Automatic, easy to ride and built for everyday city use.",
    image: "/images/demo/honda-activa-6g-05.jpg",
  },
  {
    value: "motorcycle",
    label: "Motorcycles",
    description: "Commuter and sporty motorcycles for everyday riding.",
    image: "/images/demo/Honda-Shine-100-DX-side.jpg",
  },
  {
    value: "ev",
    label: "EV",
    description: "Electric two-wheelers for clean, quiet everyday mobility.",
    image: "/images/reference/honda-ev-scooters.png",
  },
] as const;

export const VALUE_ADDED_SERVICES = [
  {
    label: "Right To Repair",
    href: "https://www.honda2wheelersindia.com/right-to-repair",
  },
  {
    label: "EV Care",
    href: "https://www.honda2wheelersindia.com/services/maintenance/ev-care",
  },
  {
    label: "Annual Maintenance Contract",
    href: "https://www.honda2wheelersindia.com/services/maintenance/annual-maintenance-contract",
  },
  {
    label: "Extended Warranty Plus",
    href: "https://www.honda2wheelersindia.com/services/maintenance/extended-warranty-plus",
  },
] as const;

export const SERVICE_LINKS = [
  {
    label: "Honda Recall Campaign",
    href: "https://www.honda2wheelersindia.com/services/maintenance/recall-campaign",
  },
  {
    label: "Honda Genuine Parts",
    href: "https://www.honda2wheelersindia.com/services/how-to-idendify-honda-genuine-parts",
  },
] as const;

export const toEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : url;
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        const id = parsed.pathname.split("/")[2];
        return id ? `https://www.youtube.com/embed/${id}` : url;
      }
    }
    return url;
  } catch {
    return url;
  }
};

export const categoryLabel = (value: string) =>
  CATEGORIES.find((c) => c.value === value)?.label ?? value;

export const waLink = (message: string) =>
  `https://wa.me/${SHOWROOM.whatsapp}?text=${encodeURIComponent(message)}`;

export const formatPrice = (value: number | null | undefined) =>
  value == null
    ? "Price on request"
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(value);
