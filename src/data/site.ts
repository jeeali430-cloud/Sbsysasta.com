export const site = {
  name: "Sbsysasta.com",
  legalName: "Sbsysasta Electronics",
  tagline: "Premium appliances. Honest prices. Delivered across Lahore.",
  url: "https://sbsysasta.com",
  city: "Lahore",
  country: "Pakistan",
  whatsappNumber: "923202785197",
  whatsappDisplay: "+92 320 2785197",
  supportPhone: "03202785197",
  supportPhoneDisplay: "0320 2785197",
  email: "support@sbsysasta.com",
  address: "Lahore, Pakistan",
  hours: "Mon–Sat, 10:00 AM – 9:00 PM",
  social: {
    facebook: "https://facebook.com/sbsysasta",
    instagram: "https://instagram.com/sbsysasta",
  },
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
