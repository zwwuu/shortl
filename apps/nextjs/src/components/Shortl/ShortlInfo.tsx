import * as process from "process";
import { useState } from "react";
import { ActionIcon, Avatar, Box, Text, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCheck, IconCopy } from "@tabler/icons-react";

type ShortlInfoProps = {
  slug: string;
  url: string;
};
export default function ShortlInfo({ slug, url }: ShortlInfoProps) {
  const clipboard = useClipboard({ timeout: 2000 });
  const [expanded, setExpanded] = useState(false);
  const shortlUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${slug}`;

  return (
    <Box sx={{ display: "flex", alignItems: "first baseline" }}>
      <Avatar
        alt={`${shortlUrl} favicon`}
        mr={"sm"}
        size={"xs"}
        src={`https://s2.googleusercontent.com/s2/favicons?domain=${url}`}
      />
      <Box sx={{ position: "relative", flexGrow: 1 }}>
        <Text mb={"xs"} size={"lg"} sx={{ lineBreak: "anywhere", paddingRight: "28px" }} weight={600}>
          {shortlUrl}
        </Text>
        <Tooltip
          color={clipboard.copied ? "green" : undefined}
          label={clipboard.copied ? "Copied" : "Copy to clipboard"}
          position={"left"}
          withArrow
        >
          <ActionIcon
            aria-label={clipboard.copied ? "Copied" : "Copy to clipboard"}
            color={clipboard.copied ? "green" : undefined}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
            }}
            variant={"light"}
            onClick={() => clipboard.copy(shortlUrl)}
          >
            {clipboard.copied ? <IconCheck /> : <IconCopy />}
          </ActionIcon>
        </Tooltip>
        <Text
          lineClamp={expanded ? undefined : 2}
          size={"md"}
          sx={{ lineBreak: "anywhere" }}
          onClick={() => setExpanded(!expanded)}
        >
          {url}
        </Text>
      </Box>
    </Box>
  );
}
