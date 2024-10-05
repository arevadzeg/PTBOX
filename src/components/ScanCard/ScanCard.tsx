import React, { forwardRef, HTMLAttributes, CSSProperties } from "react";
import formatDate from "../../utils/formatDate";
import "./scanCard.scss";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  withOpacity?: boolean;
  isDragging?: boolean;
};

const ScanCard = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, withOpacity, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? 0.5 : 1,
      transformOrigin: "50% 50%",
      borderRadius: "10px",
      cursor: isDragging ? "grabbing" : "grab",
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    const scanDetail = {
      id: id,
      endTime: "", // Placeholder, update as needed
      domain: "YLE" + id,
      startTime: "as", // Placeholder, update as needed
    };

    return (
      <div ref={ref} style={inlineStyles} {...props}>
        <div className="scan-card">
          <div className="card-inner">
            <div className="card-front">
              <h3>{scanDetail.domain}</h3>
              <p className="scan-card-item">
                <b>START TIME:</b> {formatDate(scanDetail.startTime)}
              </p>
              <p className="scan-card-item">
                <b>END TIME:</b> {formatDate(scanDetail.endTime)}
              </p>
            </div>
            <div className="card-back">
              <h3>More Details</h3>
              <p className="scan-card-item">
                <b>ID:</b> {scanDetail.id}
              </p>
              <p className="scan-card-item">
                <b>Domain:</b> {scanDetail.domain}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ScanCard;
