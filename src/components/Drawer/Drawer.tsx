import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Group,
  Drawer as MantineDrawer,
  ScrollArea,
  UnstyledButton,
  type MantineTheme,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import type { MouseEventHandler } from "react";
import classes from "./Drawer.module.css";

interface DrawerProps {
  drawerOpened: boolean;
  closeDrawer: () => void;
  linksOpened: boolean;
  toggleLinks: () => void;
  links: React.ReactNode;
  isAuthenticated: boolean;
  handleLogout: MouseEventHandler<HTMLButtonElement>;
  navigate: (path: string) => void;
  theme: MantineTheme; //
}

const Drawer = ({
  drawerOpened,
  closeDrawer,
  linksOpened,
  toggleLinks,
  links,
  isAuthenticated,
  handleLogout,
  navigate,
  theme,
}: DrawerProps) => {
  return (
    <MantineDrawer
      opened={drawerOpened}
      onClose={closeDrawer}
      size="100%"
      padding="md"
      title="Navigation"
      hiddenFrom="sm"
      zIndex={1000000}
    >
      <ScrollArea h="calc(100vh - 80px)" mx="-md">
        <Divider my="sm" />

        <a href="#" className={classes.link}>
          Home
        </a>
        <UnstyledButton className={classes.link} onClick={toggleLinks}>
          <Center inline>
            <Box component="span" mr={5}>
              Features
            </Box>
            <IconChevronDown size={16} color={theme.colors.blue[6]} />
          </Center>
        </UnstyledButton>
        <Collapse in={linksOpened}>{links}</Collapse>
        <a href="#" className={classes.link}>
          Learn
        </a>
        <a href="#" className={classes.link}>
          Academy
        </a>

        <Divider my="sm" />

        {!isAuthenticated ? (
          <Button variant="default" onClick={handleLogout}>
            Log out
          </Button>
        ) : (
          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" onClick={() => navigate(`/login`)}>
              Log in
            </Button>
            <Button>Sign up</Button>
          </Group>
        )}
      </ScrollArea>
    </MantineDrawer>
  );
};

export default Drawer;
