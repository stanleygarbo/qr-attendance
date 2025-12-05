"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Plus,
  Rows2,
  Rows3,
  Rows4,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStudentQuery } from "@/hooks/useStudentQuery";
import type { Student } from "@/models/Student";
import useStudentMutations from "@/hooks/useStudentMutations";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";

export const columns: ColumnDef<
  Student & { attendance: { date: string; status: string }[] }
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "usn",
    header: () => <div>USN</div>,
    cell: ({ row }) => <div>{row.getValue("usn")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "attendance",
    header: () => <div>Attendance</div>,
    cell: ({ row }) => {
      const attendanceArr = row.getValue("attendance") as {
        date: string;
        status: string;
      }[];

      return (
        <div className="flex gap-3">
          {attendanceArr?.map((i) => (
            <div key={i.date}>
              <Tooltip>
                <TooltipTrigger>{i.status}</TooltipTrigger>
                <TooltipContent>
                  <p>{dayjs(i.date).format("ddd MMM DD, YYYY")}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "s2",
    header: () => <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>,
    cell: () => <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>,
  },
  {
    accessorKey: "s3",
    header: () => <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>,
    cell: () => <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>,
  },
  {
    accessorKey: "s4",
    header: () => <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>,
    cell: () => <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>,
  },
  {
    accessorKey: "s5",
    header: () => <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>,
    cell: () => <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original;
      const { deletefromClass } = useStudentMutations();
      const params = useParams();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <Link to={`?usn=${student.usn}&name=${student.name}`}>
              <DropdownMenuItem>View QR</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                deletefromClass.mutate({
                  studentId: student.usn,
                  classId: params.id || "",
                });
              }}
            >
              Remove from class
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTableDensityDemo() {
  const [density, setDensity] = React.useState<string>();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const params = useParams();
  const studentQuery = useStudentQuery(params?.id || "");

  const table = useReactTable({
    data: studentQuery.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-background"
        />

        <div className="flex ml-auto gap-4">
          <Select value={density} onValueChange={setDensity}>
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Density" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Density</SelectLabel>
                <SelectItem value="compact">
                  <div className="flex items-center gap-2">
                    <Rows4 className="h-4 w-4" />
                    Compact
                  </div>
                </SelectItem>
                <SelectItem
                  value="standard"
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Rows3 className="h-4 w-4" /> Standard
                  </div>
                </SelectItem>
                <SelectItem
                  value="flexible"
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Rows2 className="h-4 w-4" />
                    Flexible
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant={"outline"}
            disabled={Object.keys(rowSelection).length < 1}
            onClick={() => {
              const indexes = Object.keys(rowSelection) as unknown as number[];

              const selected = [];
              for (const i of indexes) {
                selected.push(studentQuery.data?.[i]);
              }
              navigate("/qr-list", { state: selected });
            }}
          >
            <Plus />
            Download QR Codes
          </Button>
        </div>
      </div>
      <div className="rounded-md border bg-background">
        <Table
          className={cn({
            "[&_td]:py-px [&_th]:py-px": density === "compact",
            "[&_td]:py-1 [&_th]:py-1": density === "standard",
            "[&_td]:py-2 [&_th]:py-1": density === "flexible",
          })}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="w-[10px]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {studentQuery.isFetching ? (
                    <img src="/loading.svg" className="mx-auto" />
                  ) : (
                    "No results."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
