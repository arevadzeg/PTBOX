import { FC, useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import "./home.scss";
import ScanCard from "../../components/ScanCard/ScanCard";
import useGetScans, { Scan, useUpdateSortOrder } from "../../api/scansApi";
import { useQueryClient } from "@tanstack/react-query";

const App: FC = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    })
  );

  const queryClient = useQueryClient();
  const updateSortOrder = useUpdateSortOrder();
  const { data: items = [], isLoading } = useGetScans();

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

          // Reorder the items in the array
          const reorderedItems = arrayMove(oldItems, oldIndex, newIndex);

          // Determine the new sort order based on the new index
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

          // Update the sort order in the database using the mutation
          updateSortOrder.mutate({
            id: String(active.id),
            newSortOrder,
          });

          // Return reordered items to update the cache
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

  return (
    <div className="home">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {!isLoading && (
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.map((item) => (
              <SortableItem key={item.id} scanDetail={item} />
            ))}
          </SortableContext>
        )}
        <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
          {selectedScan ? (
            <ScanCard isDragging scanDetail={selectedScan} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default App;
