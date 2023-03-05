import { Box, Button, Modal, Text } from "@mantine/core";

const ClearHistoryModal = ({ open, onClose, onClear }) => {
  return (
    <Modal opened={open} title="Clear history" zIndex={500} centered onClose={onClose}>
      <Text>
        {"Clearing history is a permanent action cannot be reversed. "}
        <Text weight="600" span>
          Are you sure?
        </Text>
      </Text>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button color="red" mr={"sm"} onClick={onClear}>
          Yes
        </Button>
        <Button color="green" onClick={onClose}>
          No
        </Button>
      </Box>
    </Modal>
  );
};

export default ClearHistoryModal;
