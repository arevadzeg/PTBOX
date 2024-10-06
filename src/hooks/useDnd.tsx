import { useState, useCallback } from "react";
import { useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { DragEndEvent, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateSortOrder, Scan } from "../api/scansApi";
import { arrayMove } from "@dnd-kit/sortable";

export const useDnd = (items: Scan[]) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 1,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 1,
      },
    })
  );

  const updateSortOrder = useUpdateSortOrder();

  const queryClient = useQueryClient();

  const selectedScan = items.find((item) => item.id === activeId);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        queryClient.setQueryData<Scan[]>(["scans"], (oldItems = []) => {
          const oldIndex = oldItems.findIndex((item) => item.id === active.id);
          const newIndex = oldItems.findIndex((item) => item.id === over?.id);

          const reorderedItems = arrayMove(oldItems, oldIndex, newIndex);

          const prevItem = reorderedItems[newIndex - 1];
          const nextItem = reorderedItems[newIndex + 1];

          const prevSortOrder = prevItem?.sortOrder || 0;
          const nextSortOrder = nextItem?.sortOrder || prevSortOrder + 1;

          const newSortOrder = (prevSortOrder + nextSortOrder) / 2;

          console.log({
            prevSortOrder,
            nextSortOrder,
            newSortOrder,
          });

          updateSortOrder.mutate({
            id: String(active.id),
            newSortOrder,
          });

          return reorderedItems.map((item) =>
            item.id === active.id ? { ...item, sortOrder: newSortOrder } : item
          );
        });
      }

      setActiveId(null);
    },
    [queryClient, updateSortOrder]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);
  return {
    sensors,
    activeId,
    selectedScan,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};
