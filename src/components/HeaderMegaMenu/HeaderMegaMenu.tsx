import {
  Anchor,
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  Divider,
  Group,
  HoverCard,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBook,
  IconChartBar,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconFingerprint,
  IconNotification,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../stores/useAuthStore";
import Drawer from "../Drawer/Drawer";
import classes from "./HeaderMegaMenu.module.css";

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
  {
    icon: IconChartBar,
    title: "Statistics",
    description: "View detailed statistics and data analysis",
    link: "/admin/users/statistics",
  },
];

export function HeaderMegaMenu() {
  const navigate = useNavigate();
  const { connectedUser } = useAuthStore();
  const { isAuthenticated } = useAuth();
  const { logout } = useAuthStore();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const handleLogout = () => {
    logout();
  };
  console.log("connectedUser", connectedUser);
  const links = mockdata.map((item) => (
    <UnstyledButton
      className={classes.subLink}
      key={item.title}
      onClick={() => {
        if (item.link) {
          window.location.href = item.link;
        }
      }}
    >
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="/admin/users" className={classes.link}>
              Users
            </a>
          </Group>

          {isAuthenticated ? (
            <Group justify="center">
              <Avatar src={connectedUser?.photo} alt="User Photo" />
              <Button variant="default" onClick={handleLogout}>
                Log out
              </Button>
            </Group>
          ) : (
            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default" onClick={() => navigate(`/login`)}>
                Log in
              </Button>
              <Button>Sign up</Button>
            </Group>
          )}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>
      <Drawer
        drawerOpened={drawerOpened}
        closeDrawer={closeDrawer}
        linksOpened={linksOpened}
        toggleLinks={toggleLinks}
        links={links}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        navigate={navigate}
        theme={theme}
      />
    </Box>
  );
}
