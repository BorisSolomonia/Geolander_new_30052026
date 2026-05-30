import {
  getMinimumSeasonalRate,
  type CarSeasonalPricing,
} from "@/lib/car-pricing";

export type FleetCarSeed = {
  brand: string;
  model: string;
  registrationNumber: string;
  year: number;
  color: string;
  bodyType: string;
  licenseCategory: string;
  seats: number;
  transmission: "automatic" | "manual";
  fuelType: "gasoline" | "diesel" | "electric" | "hybrid";
  features: string[];
  images: string[];
  descriptionEn: string;
  descriptionKa: string;
  available: boolean;
  sortOrder: number;
  pricing: CarSeasonalPricing[];
};

const fleetCars: FleetCarSeed[] = [
  {
    brand: "Mitsubishi",
    model: "Outlander",
    registrationNumber: "QY-045-QY",
    year: 2018,
    color: "Black",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 1,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: {
          days1To2: 53,
          days3To4: 49,
          days5To7: 47,
          days8To12: 45,
          days13To18: 42,
          days19To30: 37,
          days31Plus: 36,
        },
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: {
          days1To2: 38,
          days3To4: 37,
          days5To7: 33,
          days8To12: 30,
          days13To18: 29,
          days19To30: 33,
          days31Plus: 32,
        },
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: {
          days1To2: 43,
          days3To4: 37,
          days5To7: 36,
          days8To12: 35,
          days13To18: 34,
          days19To30: 33,
          days31Plus: 32,
        },
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: {
          days1To2: 44,
          days3To4: 39,
          days5To7: 39,
          days8To12: 39,
          days13To18: 34,
          days19To30: 33,
          days31Plus: 32,
        },
      },
    ],
  },
  {
    brand: "Mitsubishi",
    model: "Outlander",
    registrationNumber: "QY075QY",
    year: 2016,
    color: "Silver",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 2,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: {
          days1To2: 53,
          days3To4: 48,
          days5To7: 46,
          days8To12: 45,
          days13To18: 42,
          days19To30: 40,
          days31Plus: 35,
        },
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: {
          days1To2: 38,
          days3To4: 37,
          days5To7: 34,
          days8To12: 30,
          days13To18: 35,
          days19To30: 29,
          days31Plus: 28,
        },
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: {
          days1To2: 40,
          days3To4: 36,
          days5To7: 35,
          days8To12: 34,
          days13To18: 35,
          days19To30: 29,
          days31Plus: 28,
        },
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: {
          days1To2: 45,
          days3To4: 42,
          days5To7: 39,
          days8To12: 35,
          days13To18: 35,
          days19To30: 29,
          days31Plus: 28,
        },
      },
    ],
  },
  {
    brand: "Subaru",
    model: "Forester",
    registrationNumber: "LL802ML",
    year: 2020,
    color: "Brown",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 3,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: {
          days1To2: 55,
          days3To4: 49,
          days5To7: 48,
          days8To12: 47,
          days13To18: 45,
          days19To30: 45,
          days31Plus: 39,
        },
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: {
          days1To2: 36,
          days3To4: 34,
          days5To7: 32,
          days8To12: 32,
          days13To18: 35,
          days19To30: 30,
          days31Plus: 29,
        },
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: {
          days1To2: 41,
          days3To4: 38,
          days5To7: 37,
          days8To12: 35,
          days13To18: 35,
          days19To30: 30,
          days31Plus: 29,
        },
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: {
          days1To2: 43,
          days3To4: 40,
          days5To7: 35,
          days8To12: 30,
          days13To18: 30,
          days19To30: 30,
          days31Plus: 29,
        },
      },
    ],
  },
  {
    brand: "Subaru",
    model: "Forester",
    registrationNumber: "TT902FT",
    year: 2019,
    color: "Silver",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 4,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: {
          days1To2: 49,
          days3To4: 48,
          days5To7: 45,
          days8To12: 44,
          days13To18: 44,
          days19To30: 43,
          days31Plus: 40,
        },
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: {
          days1To2: 33,
          days3To4: 31,
          days5To7: 30,
          days8To12: 27,
          days13To18: 37,
          days19To30: 37,
          days31Plus: 35,
        },
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: {
          days1To2: 45,
          days3To4: 39,
          days5To7: 38,
          days8To12: 35,
          days13To18: 37,
          days19To30: 37,
          days31Plus: 35,
        },
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: {
          days1To2: 40,
          days3To4: 39,
          days5To7: 38,
          days8To12: 35,
          days13To18: 37,
          days19To30: 37,
          days31Plus: 35,
        },
      },
    ],
  },
  {
    brand: "Subaru",
    model: "Forester",
    registrationNumber: "UU108UL",
    year: 2016,
    color: "Blue",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 5,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: {
          days1To2: 44,
          days3To4: 42,
          days5To7: 42,
          days8To12: 42,
          days13To18: 39,
          days19To30: 42,
          days31Plus: 38,
        },
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: {
          days1To2: 29,
          days3To4: 28,
          days5To7: 27,
          days8To12: 26,
          days13To18: 32,
          days19To30: 30,
          days31Plus: 29,
        },
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: {
          days1To2: 35,
          days3To4: 34,
          days5To7: 33,
          days8To12: 32,
          days13To18: 32,
          days19To30: 30,
          days31Plus: 29,
        },
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: {
          days1To2: 37,
          days3To4: 35,
          days5To7: 33,
          days8To12: 28,
          days13To18: 28,
          days19To30: 30,
          days31Plus: 29,
        },
      },
    ],
  },
  {
    brand: "Subaru",
    model: "Forester",
    registrationNumber: "BC-402-CC",
    year: 2017,
    color: "Silver",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 6,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: {
          days1To2: 49,
          days3To4: 48,
          days5To7: 45,
          days8To12: 44,
          days13To18: 44,
          days19To30: 43,
          days31Plus: 40,
        },
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: {
          days1To2: 33,
          days3To4: 31,
          days5To7: 30,
          days8To12: 27,
          days13To18: 37,
          days19To30: 37,
          days31Plus: 35,
        },
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: {
          days1To2: 45,
          days3To4: 39,
          days5To7: 38,
          days8To12: 35,
          days13To18: 37,
          days19To30: 37,
          days31Plus: 35,
        },
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: {
          days1To2: 40,
          days3To4: 39,
          days5To7: 38,
          days8To12: 35,
          days13To18: 37,
          days19To30: 37,
          days31Plus: 35,
        },
      },
    ],
  },
  {
    brand: "Subaru",
    model: "Forester",
    registrationNumber: "EE346EL",
    year: 2014,
    color: "White",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 7,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: {
          days1To2: 44,
          days3To4: 42,
          days5To7: 42,
          days8To12: 42,
          days13To18: 39,
          days19To30: 42,
          days31Plus: 38,
        },
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: {
          days1To2: 29,
          days3To4: 28,
          days5To7: 27,
          days8To12: 26,
          days13To18: 32,
          days19To30: 30,
          days31Plus: 29,
        },
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: {
          days1To2: 35,
          days3To4: 34,
          days5To7: 33,
          days8To12: 32,
          days13To18: 32,
          days19To30: 30,
          days31Plus: 29,
        },
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: {
          days1To2: 37,
          days3To4: 35,
          days5To7: 33,
          days8To12: 28,
          days13To18: 28,
          days19To30: 30,
          days31Plus: 29,
        },
      },
    ],
  },
  {
    brand: "Toyota",
    model: "RAV4",
    registrationNumber: "GG581WG",
    year: 2016,
    color: "White",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 8,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: {
          days1To2: 53,
          days3To4: 48,
          days5To7: 46,
          days8To12: 45,
          days13To18: 42,
          days19To30: 40,
          days31Plus: 35,
        },
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: {
          days1To2: 38,
          days3To4: 37,
          days5To7: 34,
          days8To12: 30,
          days13To18: 35,
          days19To30: 29,
          days31Plus: 28,
        },
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: {
          days1To2: 40,
          days3To4: 36,
          days5To7: 35,
          days8To12: 34,
          days13To18: 35,
          days19To30: 29,
          days31Plus: 28,
        },
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: {
          days1To2: 45,
          days3To4: 42,
          days5To7: 39,
          days8To12: 35,
          days13To18: 35,
          days19To30: 29,
          days31Plus: 28,
        },
      },
    ],
  },
  {
    brand: "Subaru",
    model: "Forester",
    registrationNumber: "JZ602ZJ",
    year: 2017,
    color: "Gray",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 9,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: {
          days1To2: 49,
          days3To4: 48,
          days5To7: 45,
          days8To12: 44,
          days13To18: 44,
          days19To30: 43,
          days31Plus: 40,
        },
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: {
          days1To2: 33,
          days3To4: 31,
          days5To7: 30,
          days8To12: 27,
          days13To18: 37,
          days19To30: 37,
          days31Plus: 35,
        },
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: {
          days1To2: 45,
          days3To4: 39,
          days5To7: 38,
          days8To12: 35,
          days13To18: 37,
          days19To30: 37,
          days31Plus: 35,
        },
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: {
          days1To2: 40,
          days3To4: 39,
          days5To7: 38,
          days8To12: 35,
          days13To18: 37,
          days19To30: 37,
          days31Plus: 35,
        },
      },
    ],
  },
  {
    brand: "Subaru",
    model: "Forester",
    registrationNumber: "WX-356-WX",
    year: 2023,
    color: "Black",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 10,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: {
          days1To2: 55,
          days3To4: 49,
          days5To7: 48,
          days8To12: 47,
          days13To18: 45,
          days19To30: 45,
          days31Plus: 39,
        },
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: {
          days1To2: 36,
          days3To4: 34,
          days5To7: 32,
          days8To12: 32,
          days13To18: 35,
          days19To30: 30,
          days31Plus: 29,
        },
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: {
          days1To2: 41,
          days3To4: 38,
          days5To7: 37,
          days8To12: 35,
          days13To18: 35,
          days19To30: 30,
          days31Plus: 29,
        },
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: {
          days1To2: 43,
          days3To4: 40,
          days5To7: 35,
          days8To12: 30,
          days13To18: 30,
          days19To30: 30,
          days31Plus: 29,
        },
      },
    ],
  },
  {
    brand: "Jeep",
    model: "Renegade",
    registrationNumber: "NN-545-KN",
    year: 2017,
    color: "Black",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 11,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: { days1To2: 50, days3To4: 46, days5To7: 44, days8To12: 42, days13To18: 40, days19To30: 35, days31Plus: 33 }
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: { days1To2: 35, days3To4: 33, days5To7: 30, days8To12: 28, days13To18: 28, days19To30: 30, days31Plus: 28 }
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: { days1To2: 40, days3To4: 35, days5To7: 34, days8To12: 32, days13To18: 30, days19To30: 30, days31Plus: 28 }
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: { days1To2: 40, days3To4: 35, days5To7: 34, days8To12: 32, days13To18: 30, days19To30: 30, days31Plus: 28 }
      }
    ]
  },
  {
    brand: "Mitsubishi",
    model: "Outlander",
    registrationNumber: "LC-235-LL",
    year: 2021,
    color: "White",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 12,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: { days1To2: 60, days3To4: 55, days5To7: 52, days8To12: 50, days13To18: 46, days19To30: 42, days31Plus: 40 }
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: { days1To2: 45, days3To4: 42, days5To7: 38, days8To12: 35, days13To18: 35, days19To30: 38, days31Plus: 35 }
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: { days1To2: 50, days3To4: 45, days5To7: 42, days8To12: 40, days13To18: 38, days19To30: 38, days31Plus: 35 }
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: { days1To2: 50, days3To4: 45, days5To7: 42, days8To12: 40, days13To18: 38, days19To30: 38, days31Plus: 35 }
      }
    ]
  },
  {
    brand: "Toyota",
    model: "Highlander",
    registrationNumber: "LC-785-LL",
    year: 2017,
    color: "Silver",
    bodyType: "SUV",
    licenseCategory: "B",
    seats: 7,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 13,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: { days1To2: 80, days3To4: 75, days5To7: 70, days8To12: 65, days13To18: 60, days19To30: 55, days31Plus: 50 }
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: { days1To2: 60, days3To4: 55, days5To7: 50, days8To12: 45, days13To18: 45, days19To30: 48, days31Plus: 45 }
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: { days1To2: 65, days3To4: 60, days5To7: 55, days8To12: 50, days13To18: 48, days19To30: 48, days31Plus: 45 }
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: { days1To2: 65, days3To4: 60, days5To7: 55, days8To12: 50, days13To18: 48, days19To30: 48, days31Plus: 45 }
      }
    ]
  },
  {
    brand: "Subaru",
    model: "Crosstrek",
    registrationNumber: "DY-089-DY",
    year: 2021,
    color: "Gray",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 14,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: { days1To2: 53, days3To4: 49, days5To7: 47, days8To12: 45, days13To18: 42, days19To30: 37, days31Plus: 35 }
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: { days1To2: 38, days3To4: 35, days5To7: 32, days8To12: 29, days13To18: 30, days19To30: 32, days31Plus: 29 }
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: { days1To2: 42, days3To4: 38, days5To7: 35, days8To12: 32, days13To18: 30, days19To30: 32, days31Plus: 29 }
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: { days1To2: 42, days3To4: 38, days5To7: 35, days8To12: 32, days13To18: 30, days19To30: 32, days31Plus: 29 }
      }
    ]
  },
  {
    brand: "Subaru",
    model: "Crosstrek",
    registrationNumber: "RZ117ZR",
    year: 2017,
    color: "Blue",
    bodyType: "Crossover",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 15,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: { days1To2: 44, days3To4: 42, days5To7: 40, days8To12: 38, days13To18: 35, days19To30: 32, days31Plus: 30 }
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: { days1To2: 30, days3To4: 28, days5To7: 26, days8To12: 26, days13To18: 28, days19To30: 28, days31Plus: 26 }
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: { days1To2: 35, days3To4: 32, days5To7: 30, days8To12: 28, days13To18: 28, days19To30: 28, days31Plus: 26 }
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: { days1To2: 35, days3To4: 32, days5To7: 30, days8To12: 28, days13To18: 28, days19To30: 28, days31Plus: 26 }
      }
    ]
  },
  {
    brand: "Jeep",
    model: "Wrangler",
    registrationNumber: "YS-105-SY",
    year: 2017,
    color: "Black",
    bodyType: "SUV",
    licenseCategory: "B",
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    features: [],
    images: [],
    descriptionEn: "",
    descriptionKa: "",
    available: true,
    sortOrder: 16,
    pricing: [
      {
        season: 1,
        period: "Apr 01 - Oct 31",
        prices: { days1To2: 90, days3To4: 85, days5To7: 80, days8To12: 75, days13To18: 70, days19To30: 65, days31Plus: 60 }
      },
      {
        season: 2,
        period: "Nov 01 - Dec 24",
        prices: { days1To2: 70, days3To4: 65, days5To7: 60, days8To12: 55, days13To18: 50, days19To30: 55, days31Plus: 50 }
      },
      {
        season: 3,
        period: "Dec 25 - Jan 05",
        prices: { days1To2: 75, days3To4: 70, days5To7: 65, days8To12: 60, days13To18: 55, days19To30: 55, days31Plus: 50 }
      },
      {
        season: 4,
        period: "Jan 06 - Mar 31",
        prices: { days1To2: 75, days3To4: 70, days5To7: 65, days8To12: 60, days13To18: 55, days19To30: 55, days31Plus: 50 }
      }
    ]
  },
];

export const defaultFleetCars = fleetCars.map((car) => ({
  ...car,
  pricePerDay: getMinimumSeasonalRate(car.pricing),
}));
