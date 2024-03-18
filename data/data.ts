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
    title: "chatgpt",
    icon: "/images/chatgpt.png",
  },
  {
    id: "2",
    title: "perplexity",
    icon: "/images/perplexity.png",
  },
  {
    id: "3",
    title: "curipod",
    icon: "/images/curipod.png",
  },
  {
    id: "4",
    title: "copilot",
    icon: "/images/copilot.png",
  },
  {
    id: "5",
    title: "yippity",
    icon: "/images/yippity.png",
  },
];

export const allTools = [
  { name: "uipath", icon: "/tools/uipath.png" },
  { name: "blueprism", icon: "/tools/blue_prism.png" },
  { name: "automationanywhere", icon: "/tools/automation_anywhere.png" },
  { name: "ansible", icon: "/tools/ansible.png" },
  { name: "chef", icon: "/tools/chef.png" },
  { name: "jenkins", icon: "/tools/jenkins.png" },
  { name: "gitlabci", icon: "/tools/gitlab.png" },
  { name: "circleci", icon: "/tools/circleci.png" },
  { name: "nintex", icon: "/tools/nintex.png" },
  { name: "zapier", icon: "/tools/zapier.png" },
  { name: "powerautomate", icon: "/tools/power_automate.png" },
  { name: "terraform", icon: "/tools/terraform.png" },
  { name: "cloudformation", icon: "/tools/aws_cloudformation.png" },
  { name: "selenium", icon: "/tools/selenium.png" },
  { name: "appium", icon: "/tools/appium.png" },
  { name: "cypress", icon: "/tools/cypress.png" },
  { name: "hubspot", icon: "/tools/hubspot.png" },
  { name: "zendesk", icon: "/tools/zendesk.png" },
  { name: "freshdesk", icon: "/tools/freshdesk.png" },
  { name: "marketo", icon: "/tools/marketo.png" },
  { name: "talend", icon: "/tools/talend.png" },
  { name: "informatica", icon: "/tools/informatica_powercenter.png" },
  { name: "apachenifi", icon: "/tools/apache_nifi.png" },
  { name: "chatgpt", icon: "/tools/chatgpt.png" },
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
    icon: "/images/process_face.png",
  },
  {
    id: "2",
    title: "Post a Job",
    description:
      "Start by signing up for an AI tool or platform of your choice. This usually involves providing basic information and setting up your preferences.",
    icon: "/images/process_post.png",
  },
  {
    id: "3",
    title: "Get the work done",
    description:
      "Start by signing up for an AI tool or platform of your choice. This usually involves providing basic information and setting up your preferences.",
    icon: "/images/process_share.png",
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
    url: "/my-profile",
    title: "Switch to Selling",
  },
];

export const profileLinks = [
  { href: "/my-orders", label: "My Orders" },
  { href: "/my-jobs", label: "My Jobs" },
  { href: "/post-job", label: "Post a Job" },
];
export const settinglinks = [
  { href: "/settings", label: "Settings" },
  { href: "/support", label: "Help & Support" },
  { href: "/settings#billing", label: "Billing" },
];

export const languages = [
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
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Proficient", label: "Proficient" },
  { value: "Native", label: "Native" },
  { value: "Conversational", label: "Conversational" },
];

export const skillLevels = [
  { id: 1, value: "Beginner", label: "Beginner" },
  { id: 2, value: "Intermediate", label: "Intermediate" },
  { id: 3, value: "Proficient", label: "Proficient" },
];

export const skills = [
  { id: 1, value: "Social media management", label: "Social Media Management" },
  { id: 2, value: "Digital marketing", label: "Digital Marketing" },
  { id: 3, value: "Web scraping", label: "Web Scraping" },
  { id: 4, value: "Web development", label: "Web Development" },
];

export const automationTools = [
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
  { value: "chatgpt", label: "ChatGPT" },
];

export const automationLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "proficient", label: "Proficient" },
];

export const sidebarNavItems: NavItem[] = [
  {
    label: "Overview",
    href: "/overview",
    icon: "/images/dashboard.svg",
  },
  {
    label: "Orders",
    href: "/my-orders",
    icon: "/images/orders.svg",
  },
  {
    label: "Jobs",
    href: "/my-jobs",
    icon: "/images/services.svg",
  },
  {
    label: "Analytics",
    href: "/my-analytics",
    icon: "/images/analytics.svg",
  },
  {
    label: "Earnings",
    href: "/my-earnings",
    icon: "/images/earnings.svg",
  },
  {
    label: "Contacts",
    href: "/my-contacts",
    icon: "/images/contacts.svg",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "/images/settings.svg",
  },
];

export const feeTypes = [
  {
    id: 1,
    label: "One-time",
    value: "One-time",
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

export const categorylists = [
  { id: 1, label: "Web Development", value: "Web Development" },
  { id: 2, label: "Mobile Development", value: "Mobile Development" },
  { id: 3, label: "Data Science", value: "Data Science" },
  { id: 4, label: "Machine Learning", value: "Machine Learning" },
  { id: 5, label: "Artificial Intelligence", value: "Artificial Intelligence" },
  { id: 6, label: "Blockchain", value: "Blockchain" },
  { id: 7, label: "Cybersecurity", value: "Cybersecurity" },
  { id: 8, label: "DevOps", value: "DevOps" },
  { id: 9, label: "Game Development", value: "Game Development" },
  { id: 10, label: "IoT", value: "IoT" },
];

export const taglists = [
  { id: 1, value: "AI" },
  { id: 2, value: "automation" },
  { id: 3, value: "blockchain" },
  { id: 4, value: "cloud" },
  { id: 5, value: "cybersecurity" },
  { id: 6, value: "data" },
  { id: 7, value: "devops" },
];

export const tagOptions = [
  { id: 1, value: "AI", label: "AI" },
  { id: 2, value: "automation", label: "automation" },
  { id: 3, value: "blockchain", label: "blockchain" },
  { id: 4, value: "cloud", label: "cloud" },
  { id: 5, value: "cybersecurity", label: "cybersecurity" },
];

export const includedServices = [
  { id: 1, value: "Setup and Installation" },
  { id: 2, value: "Maintenance" },
  { id: 4, value: "Customer support" },
];

export const skillLevelList = ["Beginner", "Intermediate", "Proficient"];

export const skillList = [
  "Social media management",
  "Digital marketing",
  "Web scraping",
  "Web development",
];

export const toolLevelList = ["beginner", "intermediate", "proficient"];
export const toolList = [
  "uipath",
  "blueprism",
  "automationanywhere",
  "ansible",
  "chef",
  "jenkins",
  "gitlabci",
  "circleci",
  "nintex",
  "zapier",
  "powerautomate",
  "terraform",
  "cloudformation",
  "selenium",
  "appium",
  "cypress",
  "hubspot",
  "marketo",
  "informatica",
  "apachenifi",
  "talend",
  "zendesk",
  "freshdesk",
  "chatgpt",
  "curipod",
  "perplexity",
  "yippity",
];

export const languageList = [
  "Mandarin Chinese",
  "Spanish",
  "English",
  "Hindi",
  "Bengali",
  "Portuguese",
  "Russian",
  "Japanese",
  "Western Punjabi",
  "Marathi",
  "Telugu",
  "Wu Chinese",
  "Turkish",
  "Korean",
  "French",
  "German",
  "Vietnamese",
  "Tamil",
  "Yue Chinese",
  "Urdu",
];
export const languageLevelList = [
  "Beginner",
  "Intermediate",
  "Proficient",
  "Conversational",
];
