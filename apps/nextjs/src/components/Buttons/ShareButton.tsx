import process from "process";
import { useRef, useState } from "react";
import { Box, Button, Group, Popover } from "@mantine/core";
import { IconQrcode } from "@tabler/icons-react";
import { QRCodeCanvas } from "qrcode.react";

type ShareButtonProps = {
  slug: string;
};

export default function ShareButton({ slug }: ShareButtonProps) {
  const shortlUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${slug}`;
  const qrCode = useRef<HTMLDivElement | null>(null);
  const fileTypes = ["jpg", "png"];
  const [opened, setOpened] = useState(false);

  const handleDownload = (type: (typeof fileTypes)[number]) => {
    if (qrCode.current && qrCode.current.children[0]) {
      const linkElement = document.createElement("a");
      linkElement.href = (qrCode.current.children[0] as HTMLCanvasElement).toDataURL("image/" + type);
      linkElement.download = `${slug}.${type}`;
      linkElement.click();
    }
  };

  return (
    <Popover opened={opened} position={"top"} shadow={"lg"} withArrow onChange={setOpened}>
      <Popover.Target>
        <Button leftIcon={<IconQrcode />} onClick={() => setOpened(!opened)}>
          Share
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box mb={"xs"} ref={qrCode}>
            <QRCodeCanvas level={"M"} value={shortlUrl} />
          </Box>
          <Group>
            {fileTypes.map((type) => (
              <Button key={type} onClick={() => handleDownload(type)}>
                {type.toUpperCase()}
              </Button>
            ))}
          </Group>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
}
