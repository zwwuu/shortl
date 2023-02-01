import { ActionIcon, Box, Card, Divider, Text, Title, Tooltip } from "@mantine/core";
import { IconClearAll, IconMoodSad } from "@tabler/icons-react";
import { useState } from "react";
import { useHistory } from "../context/HistoryContext";
import ClearHistoryModal from "./ClearHistoryModal";
import ShortlListItem from "./shortl/ShortlListItem";

const History = () => {
  const [openModal, setOpenModal] = useState(false);
  const { shortls, clearHistory } = useHistory();

  return (
    <>
      <Card radius="md" shadow="sm" sx={{ overflow: "visible" }} withBorder>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Title order={2}>History</Title>
          {shortls.length > 0 && (
            <Tooltip color="orange" label={"Clear history"} position="left" withArrow>
              <ActionIcon aria-label={"Clear history"} color="orange" ml={"auto"} onClick={() => setOpenModal(true)}>
                <IconClearAll />
              </ActionIcon>
            </Tooltip>
          )}
        </Box>
        <Divider my="sm" variant="dashed" />
        {shortls.length > 0 ? (
          <Box>
            {shortls.map((shortl) => {
              return <ShortlListItem key={shortl.id} shortl={shortl} />;
            })}
          </Box>
        ) : (
          <Text color="dimmed" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box mr={"xs"}>It is empty here</Box>
            <IconMoodSad />
          </Text>
        )}
      </Card>
      <ClearHistoryModal
        open={openModal}
        onClear={() => {
          clearHistory();
          setOpenModal(false);
        }}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};
export default History;
