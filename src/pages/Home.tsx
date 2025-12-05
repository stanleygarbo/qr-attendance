import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import "@/patterns.css";
import { cn } from "@/lib/utils";
import { useIsMutating } from "@tanstack/react-query";
import ClassDropDownMenu from "@/components/ClassDropDownMenu";
import { useClassQuery } from "@/hooks/useClassQuery";
import ClassDialog from "@/components/ClassDialog";
import { useNavigate } from "react-router-dom";

const patterns = [
  "pattern-grid-md",
  "pattern-dots-md",
  "pattern-diagonal-lines-md",
  "pattern-vertical-lines-md",
  "pattern-cross-dots-md",
];

const Home = () => {
  const query = useClassQuery();
  const isMutating = useIsMutating({ mutationKey: ["class", "delete"] });
  const navigate = useNavigate();

  return (
    <>
      {(isMutating > 0 || query.isFetching) && (
        <div className="absolute left-0 top-0 z-50 flex items-center justify-center w-full h-full bg-black/10 rounded-xl">
          <img src="/loading.svg" alt="" />
        </div>
      )}
      <div className="relative">
        {!!query.data?.length && (
          <div className="absolute right-0 -top-12">
            <ClassDialog />
          </div>
        )}
        <div className="flex mt-4 flex-wrap gap-5">
          {!query.data?.length && !query.isLoading && (
            <div className="w-full h-60 flex flex-col items-center justify-center">
              <p className="mb-4 w-82 text-center text-gray-500">
                Get started in tracking attendance by creating a class.
              </p>
              <ClassDialog />
            </div>
          )}
          {query.data?.map((i, idx) => (
            <div
              onClick={() => {
                navigate("/class/" + i.id);
              }}
              key={i.id}
              className="border rounded-md bg-background overflow-hidden cursor-pointer"
            >
              <div
                className={cn(
                  "opacity-20 w-[320px] h-20 flex items-center justify-center",
                  patterns[idx % patterns.length]
                )}
              ></div>
              <div className="border-t flex justify-between items-center">
                <div className="px-2 py-2">
                  <div className="">{i.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {i.section}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {i.students?.length || "0"} student(s)
                  </div>
                </div>

                <ClassDropDownMenu id={i.id}>
                  <Button variant="ghost">
                    <EllipsisVertical />
                  </Button>
                </ClassDropDownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
