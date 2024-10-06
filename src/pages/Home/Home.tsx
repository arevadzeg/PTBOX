import { FC, useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import "./home.scss";
import ScanCard from "../../components/ScanCard/ScanCard";
import { useGetScans } from "../../api/scansApi";
import { Tooltip } from "antd";
import ScanModal from "../../components/ScanModal/ScanModal";
import Button from "../../components/Button/Button";
import { SCAN_TOOLTIP_TEXT } from "../../constants/tooltips";
import SortableCard from "../../components/SortableCard/SortableCard";
import { useDnd } from "../../hooks/useDnd";
import SpinLoader from "../../components/SpinLoader/SpinLoader";

const App: FC = () => {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const { data: scans = [], isLoading } = useGetScans();

  const {
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    selectedScan,
    sensors,
  } = useDnd(scans);

  const handleOpenScanModal = () => setIsScanModalOpen(true);
  const handleCloseScanModal = () => setIsScanModalOpen(false);

  return (
    <div className="home">
      <Tooltip title={SCAN_TOOLTIP_TEXT}>
        <Button onClick={handleOpenScanModal} className="scan-btn">
          Scan
        </Button>
      </Tooltip>
      <SpinLoader isLoading={isLoading}>
        <div className="dnd-wrapper">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            {!isLoading && (
              <SortableContext items={scans} strategy={rectSortingStrategy}>
                {scans.map((scan) => (
                  <SortableCard key={scan.id} scanDetail={scan} />
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
      </SpinLoader>

      <ScanModal
        handleCloseScanModal={handleCloseScanModal}
        isScanModalOpen={isScanModalOpen}
      />
    </div>
  );
};

export default App;
