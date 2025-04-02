import { IconSquarePlus } from "@tabler/icons-react";
import { Button } from "@mantine/core";

export default function CreateButton({ open }) {
  return (
    <Button
      leftSection={<IconSquarePlus size={14} />}
      variant="default"
      onClick={open}
    >
      New Task
    </Button>
  );
}
