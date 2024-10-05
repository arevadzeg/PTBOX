import { forwardRef, HTMLAttributes, CSSProperties } from "react";
import formatDate from "../../utils/formatDate";
import "./scanCard.scss";
import { Scan } from "../../api/scansApi";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  withOpacity?: boolean;
  isDragging?: boolean;
  scanDetail: Scan;
};

const ScanCard = forwardRef<HTMLDivElement, ItemProps>(
  ({ withOpacity, isDragging, style, scanDetail, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? 0.5 : 1,
      cursor: isDragging ? "grabbing" : "grab",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    return (
      <div className="scan-card" ref={ref} style={inlineStyles} {...props}>
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
    );
  }
);

export default ScanCard;

// import { forwardRef, HTMLAttributes, CSSProperties } from "react";
// import formatDate from "../../utils/formatDate";
// import "./scanCard.scss";
// import { Scan } from "../../api/scansApi";

// export type ItemProps = HTMLAttributes<HTMLDivElement> & {
//   withOpacity?: boolean;
//   isDragging?: boolean;
//   scanDetail: Scan;
// };

// const ScanCard = forwardRef<HTMLDivElement, ItemProps>(
//   ({ withOpacity, isDragging, scanDetail, ...props }, ref) => {
//     const inlineStyles: CSSProperties = {
//       opacity: withOpacity ? 0.5 : 1,
//       cursor: isDragging ? "grabbing" : "grab",

//       transform: isDragging ? "scale(1.05)" : "scale(1)",
//     };

//     return (
//       <div className="scan-card" ref={ref} style={inlineStyles} {...props}>
//         <div className="card-inner">
//           <div className="card-front">
//             <h3>{scanDetail.domain}</h3>
//             <p className="scan-card-item">
//               <b>START TIME:</b> {formatDate(scanDetail.startTime)}
//             </p>
//             <p className="scan-card-item">
//               <b>END TIME:</b> {formatDate(scanDetail.endTime)}
//             </p>
//           </div>
//           <div className="card-back">
//             <h3>More Details</h3>
//             <p className="scan-card-item">
//               <b>ID:</b> {scanDetail.id}
//             </p>
//             <p className="scan-card-item">
//               <b>Domain:</b> {scanDetail.domain}
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// export default ScanCard;
