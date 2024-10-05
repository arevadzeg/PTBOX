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
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import "./home.scss";
import ScanCard from "../../components/ScanCard/ScanCard";

const App: FC = () => {
  const [items, setItems] = useState(
    Array.from({ length: 20 }, (_, i) => (i + 1).toString())
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over!.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }, []);
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
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
          {activeId ? <ScanCard id={activeId} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default App;
