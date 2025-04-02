import {
  IconPin,
  IconHourglass,
  IconChecks,
  IconEdit,
  IconXboxX,
} from "@tabler/icons-react";
import { Accordion } from "@mantine/core";
import classes from "./taskAccordion.module.css";

export default function TaskAccordion({
  tasks,
  setTaskToUpdate,
  setTaskToDelete,
}) {
  const items = tasks.map((task) => {
    let icon;
    switch (task.status) {
      case "To Do":
        icon = <IconPin size={20} color="var(--mantine-color-red-6)" />;
        break;
      case "In Progress":
        icon = <IconHourglass size={20} color="var(--mantine-color-blue-6)" />;
        break;
      case "Completed":
        icon = <IconChecks size={20} color="var(--mantine-color-green-6)" />;
        break;
    }

    const onUpdate = () => {
      setTaskToUpdate(task);
    };
    const onDelete = () => {
      setTaskToDelete(task);
    };

    return (
      <Accordion.Item value={task.id} key={task.id}>
        <Accordion.Control icon={icon}>{task.title}</Accordion.Control>
        <Accordion.Panel>
          <div className={classes.buttonContainer}>
            <IconEdit
              size={20}
              color="var(--mantine-color-blue-6)"
              onClick={onUpdate}
            />
            <IconXboxX
              size={20}
              color="var(--mantine-color-red-6)"
              onClick={onDelete}
            />
          </div>
          {task.description}
        </Accordion.Panel>
      </Accordion.Item>
    );
  });

  return (
    <Accordion
      variant="contained"
      multiple
      classNames={{ content: classes.content }}
    >
      {items}
    </Accordion>
  );
}
