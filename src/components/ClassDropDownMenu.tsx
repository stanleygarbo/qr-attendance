import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookCopy, Eye, Trash2 } from "lucide-react";
import { useClassMutations } from "@/hooks/useClassMutations";
import { useNavigate } from "react-router-dom";

const ClassDropDownMenu = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const classMutations = useClassMutations();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" side={"right"} align={"start"}>
        <DropdownMenuItem
          onClick={() => {
            navigate("/class/" + id);
          }}
        >
          <Eye className="text-muted-foreground" />
          <span>View Class</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            classMutations.duplicate.mutate(id);
          }}
        >
          <BookCopy className="text-muted-foreground" />
          <span>Duplicate Class</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            classMutations.delete.mutate(id);
          }}
        >
          <Trash2 className="text-muted-foreground" />
          <span>Delete Class</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ClassDropDownMenu;
