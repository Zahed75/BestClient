
## Getting Started

First, run the development server:

````bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

const productData = {
  name: "Conion BEW-DC24KRNV 2 Ton Inverter (DynaCool) Air Conditioner",
  images: [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg", // Replace with actual image URLs
  ],
  stock: true,
  mrpPrice: {
    default: 89000,
    colors: {
      white: 88000,
      black: 90000,
      silver: 89000,
    },
  },
  offerPrice: {
    default: 86500,
    colors: {
      white: 85900,
      black: 87100,
      silver: 86200,
    },
  },
  description:
    "Heavy Duty Cooling Up To 52°C. R32 Green Refrigerant. 100% Copper Condenser. Warranty: Compressor- 12 years, Mainboard- 2 years, Spare parts- 2 years, Service- 2 years",
  specifications: [
    { type: "Inverter" },
    { capacity: "2 Ton" },
    { model: "BEW-DC24KRNV" },
    { brand: "Conion" },
  ],
  highlights: [
    "Heavy Duty Cooling Up To 52°C",
    "R32 Green Refrigerant",
    "100% Copper Condenser",
  ],
  favorite: false,
  categories: [
    "Air Conditioner",
    "Hisense",
    "Hisense Air Conditioner (AC)",
    "Home Appliances",
  ],
  logos: [
    {
      src: "logo1.png",
      alt: "Logo 1",
      link: "https://www.example.com/logo1",
    },
    {
      src: "logo2.png",
      alt: "Logo 2",
      link: "https://www.example.com/logo2",
    },
  ],
};

