import curipod from "../public/images/curipod.png";
import chatgpt from "../public/images/chatgpt.png";
import copilot from "../public/images/copilot.png";
import perplexity from "../public/images/perplexity.png";
import yippity from "../public/images/yippity.png";
import processFace from "../public/images/process_face.png";
import processPost from "../public/images/process_post.png";
import processShare from "../public/images/process_share.png";
import dashboard from "../public/images/dashboard.svg";
import contacts from "../public/images/contacts.svg";
import analytics from "../public/images/analytics.svg";
import earnings from "../public/images/earnings.svg";
import services from "../public/images/services.svg";
import setting from "../public/images/settings.svg";
import orders from "../public/images/orders.svg";
import { NavItem } from "../types/types";

export const offerings = [
  {
    id: 1,
    title: "Sales & Prospecting",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
  },
  {
    id: 2,
    title: "Recruiting",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
  },
  {
    id: 3,
    title: "Data Research",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
  },
  {
    id: 4,
    title: "Marketing",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
  },
];

export const Categories = [
  {
    id: "1",
    title: "Ad management",
    url: "#",
  },
  {
    id: "2",
    title: "SEO",
    url: "#",
  },
  {
    id: "3",
    title: "Cold calling",
    url: "#",
  },
];

export const allIntegrations = [
  {
    id: "1",
    title: "Chat GPT",
    icon: chatgpt,
  },
  {
    id: "2",
    title: "Perplexity",
    icon: perplexity,
  },
  {
    id: "3",
    title: "Curipod",
    icon: curipod,
  },
  {
    id: "4",
    title: "Copilot",
    icon: copilot,
  },
  {
    id: "5",
    title: "Yippity",
    icon: yippity,
  },
];

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const processes = [
  {
    id: "1",
    title: "Register Your Account",
    description:
      "Start by signing up for an AI tool or platform of your choice. This usually involves providing basic information and setting up your preferences.",
    icon: processFace,
  },
  {
    id: "2",
    title: "Post a Job",
    description:
      "Start by signing up for an AI tool or platform of your choice. This usually involves providing basic information and setting up your preferences.",
    icon: processPost,
  },
  {
    id: "3",
    title: "Get the work done",
    description:
      "Start by signing up for an AI tool or platform of your choice. This usually involves providing basic information and setting up your preferences.",
    icon: processShare,
  },
];

export const homeMenu = [
  {
    id: 1,
    url: "/my-orders",
    title: "Orders",
  },
  {
    id: 2,
    url: "/my-rofile",
    title: "Switch to Selling",
  },
];

export const profileLinks = [
  { href: "/my-profile", label: "My Profile" },
  { href: "/post-job", label: "Post a Job" },
];
export const settinglinks = [
  { href: "/settings", label: "Settings" },
  { href: "/support", label: "Help & Support" },
  { href: "/settings", label: "Billing" },
];

export const languages = [
  { value: "No Value", label: "Select Language" },
  { value: "Mandarin Chinese", label: "Mandarin Chinese" },
  { value: "Spanish", label: "Spanish" },
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Bengali", label: "Bengali" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Russian", label: "Russian" },
  { value: "Japanese", label: "Japanese" },
  { value: "Western Punjabi", label: "Western Punjabi" },
  { value: "Marathi", label: "Marathi" },
  { value: "Telugu", label: "Telugu" },
  { value: "Wu Chinese", label: "Wu Chinese" },
  { value: "Turkish", label: "Turkish" },
  { value: "Korean", label: "Korean" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Tamil", label: "Tamil" },
  { value: "Yue Chinese", label: "Yue Chinese" },
  { value: "Urdu", label: "Urdu" },
];

export const languageLevels = [
  { value: "No Value", label: "Select Level" },
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Proficient", label: "Proficient" },
  { value: "Native", label: "Native" },
];

export const skillLevels = [
  { value: "No Value", label: "Select Level" },
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Proficient", label: "Proficient" },
];

export const skills = [
  { value: "No Value", label: "Select Skill" },
  { value: "Social media management", label: "Social Media Management" },
  { value: "Digital marketing", label: "Digital Marketing" },
  { value: "Web scraping", label: "Web Scraping" },
  { value: "Web development", label: "Web Development" },
];

export const automationTools = [
  { value: "No Value", label: "Select Tool" },
  { value: "uipath", label: "UiPath" },
  { value: "blueprism", label: "Blue Prism" },
  { value: "automationanywhere", label: "Automation Anywhere" },
  { value: "ansible", label: "Ansible" },
  { value: "chef", label: "Chef" },
  { value: "puppet", label: "Puppet" },
  { value: "jenkins", label: "Jenkins" },
  { value: "gitlabci", label: "GitLab CI/CD" },
  { value: "circleci", label: "CircleCI" },
  { value: "nintex", label: "Nintex" },
  { value: "zapier", label: "Zapier" },
  { value: "powerautomate", label: "Microsoft Power Automate" },
  { value: "terraform", label: "Terraform" },
  { value: "cloudformation", label: "AWS CloudFormation" },
  { value: "selenium", label: "Selenium" },
  { value: "appium", label: "Appium" },
  { value: "cypress", label: "Cypress" },
  { value: "hubspot", label: "HubSpot" },
  { value: "marketo", label: "Marketo" },
  { value: "informatica", label: "Informatica PowerCenter" },
  { value: "apachenifi", label: "Apache NiFi" },
  { value: "talend", label: "Talend" },
  { value: "zendesk", label: "Zendesk" },
  { value: "freshdesk", label: "Freshdesk" },
];

export const automationLevels = [
  { value: "No Value", label: "Select Level" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "proficient", label: "Proficient" },
];

export const sidebarNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: dashboard,
  },
  {
    label: "Orders",
    href: "/my-orders",
    icon: orders,
  },
  {
    label: "Jobs",
    href: "/my-jobs",
    icon: services,
  },
  {
    label: "Analytics",
    href: "/my-analytics",
    icon: analytics,
  },
  {
    label: "Earnings",
    href: "/my-earnings",
    icon: earnings,
  },
  {
    label: "Contacts",
    href: "/my-contacts",
    icon: contacts,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: setting,
  },
];

export const feeTypes = [
  {
    id: 1,
    label: "One-time",
    value: "one-time",
  },
  {
    id: 3,
    value: "Fixed Price",
    label: "Fixed Price",
  },
  {
    id: 2,
    value: "Subscription",
    label: "Subscription",
  },
  {
    id: 3,
    value: "Pay-As-You-Go",
    label: "Pay-As-You-Go",
  },
];

export const deliveryTimes = [
  { id: 1, label: "1 day", value: "1" },
  { id: 2, label: "2 days", value: "2" },
  { id: 3, label: "3 days", value: "3" },
  { id: 4, label: "4 days", value: "4" },
  { id: 5, label: "5 days", value: "5" },
  { id: 6, label: "6 days", value: "6" },
  { id: 7, label: "7 days", value: "7" },
  { id: 8, label: "8 days", value: "8" },
  { id: 9, label: "9 days", value: "9" },
  { id: 10, label: "10 days", value: "10" },
  { id: 11, label: "11 days", value: "11" },
  { id: 12, label: "12 days", value: "12" },
  { id: 13, label: "13 days", value: "13" },
  { id: 14, label: "14 days", value: "14" },
  { id: 15, label: "15 days", value: "15" },
  { id: 16, label: "16 days", value: "16" },
  { id: 17, label: "17 days", value: "17" },
  { id: 18, label: "18 days", value: "18" },
  { id: 19, label: "19 days", value: "19" },
  { id: 20, label: "20 days", value: "20" },
  { id: 21, label: "21 days", value: "21" },
];
