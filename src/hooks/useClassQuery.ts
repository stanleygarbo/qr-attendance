import { useAppServices } from "@/context/AppContext";
import type { Class } from "@/models/Class";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export function useClassQuery(id: string): UseQueryResult<Class>;
export function useClassQuery(id?: undefined): UseQueryResult<Class[]>;

export function useClassQuery(id?: string) {
  const { classService } = useAppServices();

  return useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      if (id) {
        return await classService.getById(id);
      } else {
        try {
          return await classService.getAll();
        } catch (err) {
          console.log(err);
        }
      }
    },
    enabled: id ? !!id : true,
  });
}
