import { User } from "@prisma/client";

export type NavItem = {
  title: string;
  href: string;
};

export type MarketingConfig = {
  mainNav: NavItem[];
};

export type AppConfig = {
  mainNav: NavItem[];
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type SubscriptionPlan = {
  planId: string;
  promoted: boolean;
  currency: string;
  interval: string;
};

export type TierPlan = SubscriptionPlan & {
  name: string;
  base: number;
  features: string[];
};
