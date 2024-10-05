// import React, { forwardRef, HTMLAttributes, CSSProperties } from "react";
// import ScanCard from "../../components/ScanCard/ScanCard";

// export type ItemProps = HTMLAttributes<HTMLDivElement> & {
//   id: string;
//   withOpacity?: boolean;
//   isDragging?: boolean;
// };

// const Item = forwardRef<HTMLDivElement, ItemProps>(
//   ({ id, withOpacity, isDragging, style, ...props }, ref) => {
//     const inlineStyles: CSSProperties = {
//       opacity: withOpacity ? "0.5" : "1",
//       transformOrigin: "50% 50%",
//       borderRadius: "10px",
//       cursor: isDragging ? "grabbing" : "grab",
//       backgroundColor: "transparent",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       transform: isDragging ? "scale(1.05)" : "scale(1)",
//       ...style,
//     };

//     return (
//       <div ref={ref} style={inlineStyles} {...props}>
//         <ScanCard
//           ref={ref}
//           {...props}
//           scanDetail={{
//             id: "",
//             endTime: "",
//             domain: "YLE" + id,
//             startTime: "as",
//           }}
//         />{" "}
//       </div>
//     );
//   }
// );

// export default Item;
