"use client";

import * as React from "react";
import { Home, LifeBuoy, Notebook, QrCode, Send } from "lucide-react";

import { NavMain } from "@/components/nav-main";

import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavClasses } from "./nav-classes";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";
import { useClassQuery } from "@/hooks/useClassQuery";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSnapshot(authStore);

  const query = useClassQuery();

  const classes = React.useMemo(
    () =>
      query.data?.map((i) => {
        return {
          name: i.section + " - " + i.name,
          url: "/class/" + i.id,
          icon: Notebook,
          id: i.id,
        };
      }),
    [query]
  );

  const data = {
    user: {
      name: user?.displayName || "",
      email: user?.email || "",
      avatar: user?.photoURL || "",
    },
    navMain: [
      {
        title: "Home",
        url: "/",
        icon: Home,
        isActive: true,
      },
      // {
      //   title: "Students",
      //   url: "/students",
      //   icon: CircleUserRound,
      // },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
    classes,
  };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <QrCode className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Attendance</span>
                  <span className="truncate text-xs"></span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {classes && <NavClasses classes={classes} />}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
