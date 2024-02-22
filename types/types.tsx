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

export type jobData = {
  categories: any;
  tags: any;
  servicesIncluded: any;
  title: string;
  price: string;
  deliveryTime: string;
  maxRevisions: string;
  description: string;
  featuredImage: string | null;
  images: any;
  video: string;
  email?: any;
  fee?: string;
  skills?: any;
  tools?: any;
};

export type userData = {
  email?: string | any;
  username?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  description?: string;
  profileImage?: string;
  automationTools?: any;
  skillsets?: any;
  languages?: any;
};
