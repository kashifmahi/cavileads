export const SUPPORT_EMAIL = "support@cavicord.tech";

// Legal operator of cavicord.tech (shown on About, footer, Privacy Policy and Terms).
export const OPERATOR = {
  legalName: "Zodic LLC",
  manager: "Muhammad Ibrar Arshad",
  street: "7901 4th St N, Ste 300",
  city: "St. Petersburg",
  region: "FL",
  postalCode: "33702",
  country: "US",
  phone: "+1 (267) 387-9526",
  tel: "+12673879526",
};
export const OPERATOR_ADDRESS = "7901 4th St N, Ste 300, St. Petersburg, FL 33702, United States";
export const operatorSchema = () => ({
  legalName: OPERATOR.legalName,
  email: SUPPORT_EMAIL,
  telephone: OPERATOR.tel,
  address: {
    "@type": "PostalAddress",
    streetAddress: OPERATOR.street,
    addressLocality: OPERATOR.city,
    addressRegion: OPERATOR.region,
    postalCode: OPERATOR.postalCode,
    addressCountry: OPERATOR.country,
  },
});

export const INDEPENDENCE_NOTE =
  "Cavicord is an independent CD comparison website. We are not a bank or broker-dealer and are not affiliated with or endorsed by the banks or institutions listed. We will never ask for passwords, bank or card numbers, or your Social Security number.";
