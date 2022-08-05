import { Box, Button } from "@mantine/core";
import ShareButton from "./ShareButton";
import ShortlInfo from "./ShortlInfo";
import ShortlActions from "./StortlActions";
import VisitButton from "./VisitButton";

const ShortlItem = ({ shortl, onReset }) => {
  const link = `${process.env.NEXT_PUBLIC_APP_URL}/${shortl.slug}`;

  return (
    <Box>
      <Box mb={"sm"}>
        <ShortlInfo link={link} url={shortl.url} />
      </Box>
      <Box mb={"md"}>
        <ShortlActions>
          <VisitButton link={link} />
          <ShareButton link={link} name={shortl.slug} />
        </ShortlActions>
      </Box>
      <Button size="lg" variant="outline" fullWidth onClick={onReset}>
        Shorten another
      </Button>
    </Box>
  );
};

export default ShortlItem;
