import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleScan } from "../../api/scansApi";
import "./scanDetails.scss";
import ScanCard from "../../components/ScanCard/ScanCard";
import Button from "../../components/Button/Button";

const ScanDetails: React.FC = () => {
  const navigate = useNavigate();
  const { scanId } = useParams<{ scanId: string }>();
  const { data: scanDetail } = useGetSingleScan(scanId ?? "");

  const handleNavigateToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="single-scan-page">
      <Button onClick={handleNavigateToHomePage} className="back-button">
        ← Back
      </Button>
      {scanDetail && <ScanCard scanDetail={scanDetail} rotateOnHover={false} />}
    </div>
  );
};

export default ScanDetails;
