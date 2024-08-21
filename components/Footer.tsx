"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import dashboard from "./../public/assets/Category.svg";
import home from "./../public/inbox-in-svgrepo-com.svg";
import score from "./../public/assets/Chart.svg";
import about from "./../public/inbox-out-svgrepo-com.svg";
import { checkCookie } from "@/app/data/CookieCheck";
import { useEffect, useState } from "react";
const Footer = () => {
  const [id, setID] = useState<string>();
  const [unread, setUnread] = useState<number>();
  const pathname = usePathname().split("/")[1];
  const fun = async () => {
    const cookie = await checkCookie();
    setID(cookie?.value);
  };
  useEffect(() => {
    fun();
  }, []);

  //  websocket
  try {
    const ws = new WebSocket("wss://uramsys.onrender.com/ws");

    ws.onopen = () => {
      // Send the userId to the server after connecting

      ws.send(JSON.stringify({ id: id }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data) {
        console.log("Unread tasks count:", data);
        // Update your UI with the unread tasks count
        setUnread(data);
      } else if (data.error) {
        console.error("Error:", data.error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  } catch (error) {
    console.log(error);
  }

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
      {bottombarLinks.map((link, index) => {
        const isActive = pathname === link.route;
        return (
          <a
            key={`bottombar-${link.label}`}
            href={`/${link.route}`}
            className={`${
              isActive ? "rounded-[10px] bg-[#606060]" : ""
            } center flex-col gap-1 p-2 transition hover:bg-[#606060] rounded-[10px] `}
          >
            {index === 0 ? (
              <span
                className={`text-white text-[8px] font-bold ${
                  unread === 0
                    ? "hidden"
                    : "bg-red-700 rounded-full text-center p-[5px]"
                }`}
              >
                {unread}
              </span>
            ) : (
              ""
            )}
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
