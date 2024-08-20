"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import dashboard from "./../public/assets/Category.svg";
import home from "./../public/inbox-in-svgrepo-com.svg";
import score from "./../public/assets/Chart.svg";
import about from "./../public/inbox-out-svgrepo-com.svg";
const Footer = () => {
  const pathname = usePathname().split("/")[1];

  // cookie.cookie.name
  const bottombarLinks = [
    {
      imgURL: home,
      route: "",
      label: "inbox",
    },
    {
      imgURL: about,
      route: "outbox",
      label: "Outbox",
    },

    {
      imgURL: score,
      route: "dashboard",
      label: "Dashboard",
    },

    {
      imgURL: dashboard,
      route: "settings",
      label: "Settings",
    },
    // {
    //   imgURL: scan,
    //   route: "/qr",
    //   label: "QR",
    // },
  ];
  return (
    <div className="backdrop-blur-lg bg-white/60 shadow-xl flex z-50 flex-between justify-around w-[95%] sticky bottom-2 rounded-[20px] bg-dark-2 px-5 py-2 mx-auto md:w-2/5 ">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <a
            key={`bottombar-${link.label}`}
            href={`/${link.route}`}
            className={`${
              isActive ? "rounded-[10px] bg-[#606060]" : ""
            } center flex-col gap-1 p-2 transition hover:bg-[#606060] rounded-[10px] `}
          >
            <Image
              loading="lazy"
              src={link.imgURL}
              alt={link.label}
              width={20}
              height={20}
              className={`${isActive && "invert-white"}`}
            />

            <p className="text-sm text-white 2xl:text-black text-light-2">
              {link.label}
            </p>
          </a>
        );
      })}
    </div>
  );
};

export default Footer;
