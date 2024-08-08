"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import scan from "./../public/assets/Scan.svg";
import dashboard from "./../public/assets/Category.svg";
import home from "./../public/inbox-in-svgrepo-com.svg";
import score from "./../public/assets/Chart.svg";
import about from "./../public/inbox-out-svgrepo-com.svg";
const Footer = () => {
  const pathname = usePathname();
  // cookie.cookie.name
  const bottombarLinks = [
    {
      imgURL: about,
      route: "/outbox",
      label: "Outbox",
    },
    {
      imgURL: home,
      route: "/",
      label: "inbox",
    },
    {
      imgURL: score,
      route: "/dashboard",
      label: "Dashboard",
    },

    {
      imgURL: dashboard,
      route: "/settings",
      label: "Settings",
    },
    // {
    //   imgURL: scan,
    //   route: "/qr",
    //   label: "QR",
    // },
  ];
  return (
    <div className="mainColor flex z-50 flex-between justify-around w-[95%] sticky bottom-2 rounded-[20px] bg-dark-2 px-5 py-2 mx-auto ">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            href={link.route}
            className={`${
              isActive && "rounded-[10px] bg-primary-500 "
            } center flex-col gap-1 p-2 transition`}
          >
            <Image
              loading="lazy"
              src={link.imgURL}
              alt={link.label}
              width={20}
              height={20}
              className={`${isActive && "invert-white"}`}
            />

            <p className="text-sm text-white text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Footer;
