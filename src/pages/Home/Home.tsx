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
import "./home.scss";
import ScanCard from "../../components/ScanCard/ScanCard";
import { useGetScans, Scan, useUpdateSortOrder } from "../../api/scansApi";
import { useQueryClient } from "@tanstack/react-query";
import { Tooltip } from "antd";
import ScanModal from "../../components/ScanModal/ScanModal";
import Button from "../../components/Button/Button";
import { SCAN_TOOLTIP_TEXT } from "../../constants/tooltips";
import SortableCard from "../../components/SortableCard/SortableCard";

const App: FC = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const updateSortOrder = useUpdateSortOrder();
  const { data: items = [], isLoading } = useGetScans();

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

  const selectedScan = items.find((item) => item.id === activeId);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleOpenScanModal = () => setIsScanModalOpen(true);
  const handleCloseScanModal = () => setIsScanModalOpen(false);

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

  return (
    <div className="home">
      <Tooltip title={SCAN_TOOLTIP_TEXT}>
        <Button onClick={handleOpenScanModal} className="scan-btn">
          Scan
        </Button>
      </Tooltip>
      <div className="dnd-wrapper">
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
                <SortableCard key={item.id} scanDetail={item} />
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

      <ScanModal
        handleCloseScanModal={handleCloseScanModal}
        isScanModalOpen={isScanModalOpen}
      />
    </div>
  );
};

export default App;
