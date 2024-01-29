import { StaticImageData } from "next/image";

export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export type IntegrationsAi = {
  id: string;
  title: string;
  icon: StaticImageData;
};

export type ProcessBlurb = {
  id: string;
  title: string;
  description: string;
  icon: StaticImageData;
};
