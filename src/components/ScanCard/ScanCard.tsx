import { forwardRef, HTMLAttributes, CSSProperties } from "react";
import formatDate from "../../utils/formatDate";
import "./scanCard.scss";
import { Scan } from "../../api/scansApi";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  withOpacity?: boolean;
  isDragging?: boolean;
  rotateOnHover?: boolean;
  scanDetail: Scan;
};

const ScanCard = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      withOpacity,
      isDragging,
      rotateOnHover = true,
      style,
      scanDetail,
      ...props
    },
    ref
  ) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? 0.5 : 1,
      cursor: isDragging ? "grabbing" : "grab",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    const navigate = useNavigate();

    const navigateToScan = () => {
      navigate(`/${scanDetail.id}`);
    };

    return (
      <div
        className={`scan-card ${rotateOnHover ? "rotate-on-hover" : ""}`} // Conditionally apply the hover class
        ref={ref}
        style={inlineStyles}
        {...props}
      >
        <div
          className="card-inner"
          style={{
            ...(withOpacity
              ? { transform: "rotateY(0deg)", transition: "transform 0s" }
              : {}),
            ...(isDragging
              ? { transform: "rotateY(180deg)", transition: "transform 0s" }
              : {}),
          }}
        >
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
            <Button onClick={navigateToScan} isFullWidth={false}>
              More Details
            </Button>
            <p className="scan-card-item">
              <b>ID:</b> {scanDetail.id}
            </p>
            <p className="scan-card-item">
              <b>Domain:</b> {scanDetail.domain}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default ScanCard;
