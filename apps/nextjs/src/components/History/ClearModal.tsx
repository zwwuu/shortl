import { Button, Group, Modal, Text } from "@mantine/core";

type ClearModalProps = {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
};

export default function ClearModal({ open, onClose, onClear }: ClearModalProps) {
  return (
    <Modal opened={open} title={"Clear history"} zIndex={500} centered onClose={onClose}>
      <Text>
        {"Clearing history is a permanent action cannot be reversed. "}
        <Text weight={"600"} span>
          Are you sure?
        </Text>
      </Text>
      <Group position={"right"}>
        <Button color={"red"} onClick={onClear}>
          Yes
        </Button>
        <Button color={"green"} onClick={onClose}>
          No
        </Button>
      </Group>
    </Modal>
  );
}
