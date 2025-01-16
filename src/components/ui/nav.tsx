"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
    subLinks?: {
      title: string;
      href: string;
    }[];
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathName = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) => (
            <div key={index} className="flex flex-col">
              <div
                onClick={() => {
                  if (link.subLinks) toggleExpand(link.title);
                }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({
                      variant: link.href === pathName ? "default" : "ghost",
                      size: "sm",
                    }),
                    "justify-start cursor-pointer"
                  )}
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {!isCollapsed && link.title} {/* Show the title only if not collapsed */}
                </Link>
              </div>
              {link.subLinks && expanded[link.title] && !isCollapsed && (
                <div className="group flex flex-col py-1 data-[collapsed=true]:py-2 bg-slate-200 ml-7">
                  {link.subLinks.map((subLink, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subLink.href}
                      className={cn(
                        buttonVariants({
                          variant:
                            subLink.href === pathName ? "default" : "ghost",
                          size: "sm",
                        }),
                        "justify-start pl-4"
                      )}
                    >
                      {subLink.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </TooltipProvider>
  );
}
