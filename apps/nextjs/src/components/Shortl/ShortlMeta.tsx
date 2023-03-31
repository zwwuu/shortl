import { Box, Text, Tooltip } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { prettyTime } from "shortl-pretty-time";

import useLocalTime from "~/hooks/useLocalTime";

type ShortlMetaProps = {
  createdAt: Date;
};
export default function ShortlMeta({ createdAt }: ShortlMetaProps) {
  const localCreatedAt = useLocalTime(createdAt);

  return (
    <Box>
      <Text color={"dimmed"} mb={4} mr={"xs"} size={"sm"} sx={{ display: "flex" }} transform={"uppercase"}>
        <IconCalendar size={16} />
        <Tooltip label={localCreatedAt} position={"right"} withArrow>
          <Text ml={4} inherit>
            Created: <time dateTime={localCreatedAt ?? ""}>{prettyTime(createdAt.getTime())}</time>
          </Text>
        </Tooltip>
      </Text>
    </Box>
  );
}
