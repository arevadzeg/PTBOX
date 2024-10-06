import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ScanCard from "../../components/ScanCard/ScanCard";
import { Scan } from "../../api/scansApi";

interface SortableCardProps {
  scanDetail: Scan;
}

const SortableCard: FC<SortableCardProps> = ({ scanDetail }) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: scanDetail.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <ScanCard
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      scanDetail={scanDetail}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableCard;
