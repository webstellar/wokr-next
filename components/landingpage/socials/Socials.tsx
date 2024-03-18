import Link from "next/link";
import SmFacebook from "/images/logo_fb.png";
import SmTiktok from "/images/logo_tiktok.png";
import SmPinterest from "/images/logo_pinterest.png";
import SmLinkedin from "/images/logo_linkedin.png";
import SmTwitter from "/images/logo_twitter.png";
import SmInstagram from "/images/logo_instagram.png";

import Image from "next/image";

const socialLinks = [
  {
    id: 1,
    link: "",
    title: "/images/logo_instagram.png",
    alt: "Instagram",
  },
  {
    id: 2,
    link: "",
    title: "/images/logo_fb.png",
    alt: "Facebook",
  },
  {
    id: 3,
    link: "",
    title: "/images/logo_pinterest.png",
    alt: "Pinterest",
  },
  {
    id: 4,
    link: "",
    title: "/images/logo_twitter.png",
    alt: "Twitter",
  },
  {
    id: 5,
    link: "",
    title: "/images/logo_tiktok.png",
    alt: "Tiktok",
  },
  {
    id: 6,
    link: "",
    title: "/images/logo_linkedin.png",
    alt: "LinkedIn",
  },
];

const Socials = () => {
  return (
    <div className="flex items-center justify-start gap-x-2 mt-3">
      {socialLinks.map((link) => (
        <Link key={link.id} href={`${link.link}`} className="-m-1.5 p-1.5">
          <span className="sr-only">work {link.alt}</span>
          <Image
            className="h-6 w-auto"
            src={link.title}
            alt={link.alt}
            width={100}
            height={100}
          />
        </Link>
      ))}
    </div>
  );
};

export default Socials;
