const enCommon = {
  appName: "Cosy Frontend",
  nav: {
    home: "Home",
    about: "About",
  },
  language: {
    label: "Language",
    en: "EN",
    fi: "FI",
  },
  home: {
    title: "Cosy Domain Provider",
    description:
      "Tailwind + shadcn-style UI, Redux state, and TanStack Router are now wired together.",
    counterLabel: "Redux counter state",
    increment: "Increment",
    decrement: "Decrement",
    reset: "Reset",
  },
  about: {
    title: "About this setup",
    description:
      "The app now follows a scalable frontend composition with isolated UI, pages, routing, and state.",
    points: {
      ui: "• shadcn-style primitives live in components/ui.",
      routing: "• Routing is managed by TanStack Router.",
      state: "• Shared global state is managed by Redux Toolkit.",
      styling:
        "• Styling uses Tailwind utility-first classes and design tokens.",
    },
  },
} as const;

type DeepStringSchema<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringSchema<T[K]>;
};

type CommonSchema = DeepStringSchema<typeof enCommon>;

const fiCommon: CommonSchema = {
  appName: "Cosy Frontend",
  nav: {
    home: "Koti",
    about: "Tietoa",
  },
  language: {
    label: "Kieli",
    en: "EN",
    fi: "FI",
  },
  home: {
    title: "Cosy Domain Provider",
    description:
      "Tailwind + shadcn-tyylinen UI, Redux-tila ja TanStack Router on nyt kytketty yhteen.",
    counterLabel: "Redux-laskurin tila",
    increment: "Kasvata",
    decrement: "Pienennä",
    reset: "Nollaa",
  },
  about: {
    title: "Tietoa tästä toteutuksesta",
    description:
      "Sovellus noudattaa nyt skaalautuvaa frontend-rakennetta, jossa UI, sivut, reititys ja tila on erotettu.",
    points: {
      ui: "• shadcn-tyyliset primitiivit ovat kansiossa components/ui.",
      routing: "• Reitityksestä vastaa TanStack Router.",
      state: "• Jaettu globaali tila hallitaan Redux Toolkitilla.",
      styling:
        "• Tyylitys käyttää Tailwindin utility-luokkia ja design tokeneita.",
    },
  },
};

export const defaultNS = "common";

export const resources = {
  en: { common: enCommon },
  fi: { common: fiCommon },
} as const;

export type AppLanguage = keyof typeof resources;
