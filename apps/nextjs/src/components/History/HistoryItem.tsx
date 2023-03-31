import { Box, Group } from "@mantine/core";

import RemoveButton from "~/components/Buttons/RemoveButton";
import ShareButton from "~/components/Buttons/ShareButton";
import VisitButton from "~/components/Buttons/VisitButton";
import ShortlInfo from "~/components/Shortl/ShortlInfo";
import ShortlMeta from "~/components/Shortl/ShortlMeta";
import { Shortl } from "~/types/shortl";

type HistoryItemProps = {
  shortl: Shortl;
};

export default function HistoryItem({ shortl }: HistoryItemProps) {
  return (
    <Box
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.colors.gray[3]}`,
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        "&:last-child": {
          borderBottom: "none",
        },
      })}
    >
      <Box mb={"xs"}>
        <ShortlInfo slug={shortl.slug} url={shortl.url} />
      </Box>
      <Box mb={"xs"}>
        <ShortlMeta createdAt={shortl.createdAt} />
      </Box>
      <Group position={"right"}>
        <VisitButton slug={shortl.slug} />
        <ShareButton slug={shortl.slug} />
        <RemoveButton id={shortl.id} />
      </Group>
    </Box>
  );
}
