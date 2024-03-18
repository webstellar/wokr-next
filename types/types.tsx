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
  _id?: string;
  categories: any;
  tags: any;
  servicesIncluded: any;
  title: string;
  price: string;
  deliveryTime: string;
  maxRevisions: string;
  description: string;
  featuredImage: string;
  images: any;
  video: string;
  email?: any;
  fee?: string;
  skills?: any;
  tools?: any;
  owner?: string;
};

export type userData = {
  _id?: string;
  email?: string | any;
  username: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  description?: string;
  profileImage: StaticImageData;
  automationTools?: any;
  skillsets?: any;
  languages?: any;
};

export type newJobData = {
  _id?: string;
  categories: any;
  tags: any;
  servicesIncluded: any;
  title: string;
  price: string;
  deliveryTime: string;
  maxRevisions: string;
  description: string;
  featuredImage: string;
  images: any;
  video: string;
  email?: any;
  fee?: string;
  skills?: any;
  tools?: any;
  owner?: string;
  user: userData;
  toolIcons: toolData[];
};

export type toolData = {
  name: string;
  icon: string;
};

export type automationData = {
  automation: string;
  automationLevel: string;
  _id: string;
};
