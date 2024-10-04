import { Scan } from "../../api/scansApi";
import formatDate from "../../utils/formatDate";
import "./scanCard.scss";

interface ScanCardProps {
  scanDetail: Scan;
}

const ScanCard = ({ scanDetail }: ScanCardProps) => (
  <div className="scan-card">
    <div className="card-inner">
      <CardFront scanDetail={scanDetail} />
      <CardBack scanDetail={scanDetail} />
    </div>
  </div>
);

const CardFront = ({ scanDetail }: { scanDetail: Scan }) => (
  <div className="card-front">
    <h3>{scanDetail.domain}</h3>
    <ScanDetailItem
      label="START TIME"
      value={formatDate(scanDetail.startTime)}
    />
    <ScanDetailItem label="END TIME" value={formatDate(scanDetail.endTime)} />
  </div>
);

const CardBack = ({ scanDetail }: { scanDetail: Scan }) => (
  <div className="card-back">
    <h3>More Details</h3>
    <ScanDetailItem label="ID" value={scanDetail.id} />
    <ScanDetailItem label="Domain" value={scanDetail.domain} />
  </div>
);

const ScanDetailItem = ({ label, value }: { label: string; value: string }) => (
  <p className="scan-card-item">
    <b>{label}:</b> {value}
  </p>
);

export default ScanCard;
