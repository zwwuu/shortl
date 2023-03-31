import { useState } from "react";
import { ActionIcon, Box, Card, Divider, Text, Title, Tooltip } from "@mantine/core";
import { IconClearAll, IconMoodSad } from "@tabler/icons-react";

import ClearModal from "~/components/History/ClearModal";
import HistoryItem from "~/components/History/HistoryItem";
import { useHistory } from "~/context/HistoryContext";

export default function History() {
  const [openModal, setOpenModal] = useState(false);
  const { shortls, clear } = useHistory();

  return (
    <>
      <Card radius={"md"} shadow={"sm"} sx={{ overflow: "visible" }} withBorder>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Title order={2}>History</Title>
          {shortls.length > 0 && (
            <Tooltip color={"orange"} label={"Clear history"} position={"left"} withArrow>
              <ActionIcon aria-label={"Clear history"} color={"orange"} ml={"auto"} onClick={() => setOpenModal(true)}>
                <IconClearAll />
              </ActionIcon>
            </Tooltip>
          )}
        </Box>
        <Divider my={"sm"} variant={"dashed"} />
        {shortls.length > 0 ? (
          <Box>
            {shortls.map((shortl) => {
              return <HistoryItem key={shortl.id} shortl={shortl} />;
            })}
          </Box>
        ) : (
          <Text color={"dimmed"} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box mr={"xs"}>It is empty here</Box>
            <IconMoodSad />
          </Text>
        )}
      </Card>
      <ClearModal
        open={openModal}
        onClear={() => {
          clear();
          setOpenModal(false);
        }}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}
