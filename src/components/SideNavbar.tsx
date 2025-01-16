/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

type Props = object;

import {
  Calendar,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  Shapes,
  CrownIcon,
  QrCodeIcon,
  TicketIcon,
  GalleryHorizontalEnd
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({ }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[70px] border-r px-3  pb-10 pt-3 ">
      {
        !isCollapsed ? (
          <div className="font-bold text-2xl px-4 mb-2">
          </div>
        ) : (
          <div className="font-bold text-lg px-4 mb-2">
            K E
          </div>
        )
      }

      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            className=" rounded-full p-1 px-2 bg-gray-300"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
            variant: "default"
          },
          {
            title: "Categories",
            href: "/admin/categories",
            icon: Shapes,
            variant: "ghost"
          },
          {
            title: "Ticket Type",
            href: "/admin/ticket-type",
            icon: CrownIcon,
            variant: "ghost"
          },
          {
            title: "Events",
            href: "/admin/events",
            icon: Calendar,
            variant: "ghost"
          },
          {
            title: "Purchases",
            href: "/admin/purchases",
            icon: TicketIcon,
            variant: "ghost"
          },
          {
            title: "Users",
            href: "/admin/users",
            icon: UsersRound,
            variant: "ghost"
          },
          {
            title: "QR Scanner",
            href: "/admin/ticket-validator",
            icon: QrCodeIcon,
            variant: "ghost"
          },
          {
            title: "Banner",
            href: "/admin/banner",
            icon: GalleryHorizontalEnd,
            variant: "ghost"
          },
          {
            title: "Settings",
            href: "#",
            icon: Settings,
            variant: "ghost",
            subLinks: [
              { title: "Profile", href: "/admin/settings/profile" },
              { title: "Payment Settings", href: "/admin/settings/payments" },
              { title: "Others", href: "#" }
            ]
          }
        ]}
      />

    </div>
  );
}
