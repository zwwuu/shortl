import { Box, Button, Popover } from "@mantine/core";
import { IconQrcode } from "@tabler/icons";
import { QRCodeCanvas } from "qrcode.react";
import { useCallback, useRef, useState } from "react";

const ShareButton = ({ link, name }) => {
  const qrCode = useRef(null);
  const [opened, setOpened] = useState(false);
  const handleDownload = useCallback(
    (type) => {
      const linkElement = document.createElement("a");
      linkElement.href = qrCode.current.children[0].toDataURL("image/" + type);
      linkElement.download = `${name}.${type}`;
      linkElement.click();
    },
    [name]
  );

  return (
    <Popover opened={opened} position="top" shadow="lg" withArrow onChange={setOpened}>
      <Popover.Target>
        <Button leftIcon={<IconQrcode />} onClick={() => setOpened(!opened)}>
          Share
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box mb={"xs"} ref={qrCode}>
            <QRCodeCanvas level={"M"} value={link} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button mr="xs" onClick={() => handleDownload("jpg")}>
              JPG
            </Button>
            <Button onClick={() => handleDownload("png")}>PNG</Button>
          </Box>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
};

export default ShareButton;
