import { Button, Select, Stack, TextInput } from "@mantine/core";

export default function Sidebar() {
  return (
    <Stack>
      <TextInput label="Title" disabled />
      <TextInput label="Description" disabled />
      <Select label="Status" disabled />
      <Button disabled>Filter</Button>
    </Stack>
  );
}
