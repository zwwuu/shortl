import { Box } from "@mantine/core";
import ShareButton from "./ShareButton";
import ShortlInfo from "./ShortlInfo";
import ShortlMeta from "./ShortlMeta";
import ShortlActions from "./StortlActions";
import VisitButton from "./VisitButton";
import RemoveButton from "./RemoveButton";

const ShortlListItem = ({ shortl }) => {
  const link = `${process.env.NEXT_PUBLIC_APP_URL}/${shortl.slug}`;

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
      <Box mb="xs">
        <ShortlInfo link={link} url={shortl.url} />
      </Box>
      <Box mb="xs">
        <ShortlMeta createdAt={shortl.createdAt} />
      </Box>
      <ShortlActions>
        <VisitButton link={link} />
        <ShareButton link={link} name={shortl.slug} />
        <RemoveButton id={shortl.id} />
      </ShortlActions>
    </Box>
  );
};

export default ShortlListItem;
