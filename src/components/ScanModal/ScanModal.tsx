import { Button, Input, Modal } from "antd";
import { useCreateScan } from "../../api/scansApi";
import { useState } from "react";
import validateDomain from "../../utils/validateDomain";

interface ScanModalProps {
  isScanModalOpen: boolean;
  handleCloseScanModal: () => void;
}

const ScanModal = ({
  isScanModalOpen,
  handleCloseScanModal,
}: ScanModalProps) => {
  const [domain, setDomain] = useState("");
  const [isDomainValid, setIsDomainValid] = useState(false); // State to track domain validity
  const createScan = useCreateScan(handleCloseScanModal);

  const isScanButtonDisabled = !domain || !isDomainValid;

  const handleDomainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setDomain(inputValue);
    setIsDomainValid(validateDomain(inputValue));
  };

  const handleScan = () => {
    createScan.mutate({
      domain: domain,
    });
  };

  return (
    <Modal
      footer={null}
      onCancel={handleCloseScanModal}
      open={isScanModalOpen}
      closable={false}
    >
      <div className="scan-modal">
        <h3 className="title">Scan for</h3>
        <Input onChange={handleDomainChange} />

        <Button
          className="scan-btn"
          onClick={handleScan}
          loading={createScan.isPending}
          disabled={isScanButtonDisabled}
        >
          Scan
        </Button>
      </div>
    </Modal>
  );
};

export default ScanModal;
