"use client";

import { MoreHorizontal, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ClassDropDownMenu from "./ClassDropDownMenu";
import { Link, useParams } from "react-router-dom";

export function NavClasses({
  classes,
}: {
  classes: {
    name: string;
    url: string;
    icon: LucideIcon;
    id: string;
  }[];
}) {
  const params = useParams();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Classes</SidebarGroupLabel>
      <SidebarMenu>
        {classes.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton isActive={params.id === item.id} asChild>
              <Link to={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <ClassDropDownMenu id={item.id}>
              <SidebarMenuAction showOnHover>
                <MoreHorizontal />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            </ClassDropDownMenu>
          </SidebarMenuItem>
        ))}
        {/* <SidebarMenuItem>
          <SidebarMenuButton>
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
