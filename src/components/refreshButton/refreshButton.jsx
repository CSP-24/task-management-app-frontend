import { IconRefresh } from "@tabler/icons-react";
import { Button } from "@mantine/core";

export default function RefreshButton({ refresh }) {
  return (
    <Button variant="default" onClick={refresh}>
      <IconRefresh size={14} />
    </Button>
  );
}
