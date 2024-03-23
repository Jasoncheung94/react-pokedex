import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";

const SimpleModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <div>
            <h2>Modal Content</h2>
            <p>This is a simple modal.</p>
            <Button onClick={handleClose}>Close Modal</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SimpleModal;
