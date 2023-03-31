import { ActionIcon, Tooltip } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

import { useHistory } from "~/context/HistoryContext";

type RemoveButtonProps = {
  id: number;
};

export default function RemoveButton({ id }: RemoveButtonProps) {
  const { remove } = useHistory();

  return (
    <Tooltip color={"red"} label={"Delete"} position={"top"} withArrow>
      <ActionIcon aria-label={"Delete"} color={"red"} size={"lg"} variant={"outline"} onClick={() => remove(id)}>
        <IconX />
      </ActionIcon>
    </Tooltip>
  );
}
