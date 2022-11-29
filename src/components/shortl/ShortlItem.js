import { Box, Button, Group } from "@mantine/core";
import ShareButton from "./ShareButton";
import ShortlInfo from "./ShortlInfo";
import VisitButton from "./VisitButton";

const ShortlItem = ({ shortl, onReset }) => {
  const link = `${process.env.NEXT_PUBLIC_APP_URL}/${shortl.slug}`;

  return (
    <Box>
      <Box mb={"sm"}>
        <ShortlInfo link={link} url={shortl.url} />
      </Box>
      <Box mb={"md"}>
        <Group position={"right"}>
          <VisitButton link={link} />
          <ShareButton link={link} name={shortl.slug} />
        </Group>
      </Box>
      <Button size="lg" variant="outline" fullWidth onClick={onReset}>
        Shorten another
      </Button>
    </Box>
  );
};

export default ShortlItem;
