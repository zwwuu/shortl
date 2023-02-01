import { Box, Text, Tooltip } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import prettyTime from "../../utils/pretty-time";

const ShortlMeta = ({ createdAt }) => {
  return (
    <Box>
      <Text color="dimmed" mb={4} mr="xs" size={"sm"} sx={{ display: "flex" }} transform="uppercase">
        <IconCalendar size={16} />
        <Tooltip label={createdAt} position="right" withArrow>
          <Text ml={4} inherit>
            Created: <time dateTime={createdAt}>{prettyTime(Date.parse(createdAt))}</time>
          </Text>
        </Tooltip>
      </Text>
    </Box>
  );
};

export default ShortlMeta;
