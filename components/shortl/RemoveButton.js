import { ActionIcon, Tooltip } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useHistory } from "../../context/HistoryContext";

const RemoveButton = ({ id }) => {
  const { removeShortl } = useHistory();

  return (
    <Tooltip color="red" label="Delete" position="top" withArrow>
      <ActionIcon aria-label="Delete" color="red" size="lg" variant="outline" onClick={() => removeShortl(id)}>
        <IconX />
      </ActionIcon>
    </Tooltip>
  );
};

export default RemoveButton;
