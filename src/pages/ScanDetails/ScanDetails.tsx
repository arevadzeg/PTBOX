import React from "react";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleScan } from "../../api/scansApi";
import "./scanDetails.scss";
import ScanCard from "../../components/ScanCard/ScanCard";

const ScanDetails: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const { scanId } = useParams<{ scanId: string }>();

  const { data: scanDetail } = useGetSingleScan(scanId ?? "");

  return (
    <div className="single-scan-page">
      <Button onClick={handleBack} className="back-button">
        ← Back
      </Button>
      {scanDetail && <ScanCard scanDetail={scanDetail} rotateOnHover={false} />}
    </div>
  );
};

export default ScanDetails;
