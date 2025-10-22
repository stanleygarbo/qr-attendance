import { useAppServices } from "@/context/AppContext";
import type { Class } from "@/models/Class";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useClassMutations = () => {
  const { classService } = useAppServices();
  const queryClient = useQueryClient();

  return {
    add: useMutation({
      mutationKey: ["class", "add"],
      async mutationFn({ name, section }: { name: string; section: string }) {
        const res = await classService.add({
          name,
          section,
        });

        return res;
      },
      onError(err) {
        console.log(err);
      },
      onSuccess(data) {
        queryClient.setQueryData(
          ["class", undefined],
          (prev: (typeof data)[]) => {
            return [data, ...prev];
          }
        );
      },
    }),
    delete: useMutation({
      mutationFn: async (id: string) => {
        await classService.delete(id);

        return id;
      },
      async onSuccess(id) {
        queryClient.setQueryData(["class", undefined], (prev: Class[]) => {
          if (prev) {
            const newData = prev.filter((i) => id != i.id);

            return newData;
          }
        });
      },
    }),
    duplicate: useMutation({
      mutationFn: async (id: string) => {
        const data = await classService.duplicate(id);

        return data;
      },
      async onSuccess(data) {
        queryClient.setQueryData(["class", undefined], (prev: Class[]) => {
          if (prev) {
            return [data, ...prev];
          }
        });
      },
    }),
    update: useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: Partial<Class>;
      }) => {
        const res = await classService.update(id, data);
        return res;
      },
      async onSuccess(data) {
        queryClient.setQueryData(["class", undefined], (prev: Class[]) => {
          const newClasses = prev.map((item) =>
            item.id === data?.id
              ? { ...item, name: data.name, section: data.section }
              : item
          );

          return newClasses;
        });

        queryClient.setQueryData(["class", data?.id], (prev: Class) => {
          return { ...prev, name: data?.name, section: data?.section };
        });
      },
    }),
  };
};
