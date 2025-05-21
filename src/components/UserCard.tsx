import {
  Avatar,
  Badge,
  Card,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { IconCake, IconMail, IconPhone } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import type { User } from "../models/User";

interface UserCardProps {
  user: User;
  handleClick: () => void;
}

dayjs.extend(relativeTime);

// function getAge(birthdate: string) {
//   return dayjs().diff(dayjs(birthdate), "year");
// }

export const UserCard = ({ user }: UserCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
      className="max-w-[420px] !h-full cursor-pointer"
      onClick={() => navigate(`/admin/user/${user.id}`)}
    >
      <Group mb="md">
        <Group>
          <Avatar src={user.photo} size={64} radius="xl" />
          <div>
            <Text size="lg" className="font-bol">
              {user.firstname} {user.lastname}
            </Text>
            <Text size="sm" color="dimmed">
              {user.city}, {user.country}
            </Text>
          </div>
        </Group>
        <Badge variant="light" size="md" color="blue">
          {user.category}
        </Badge>
      </Group>

      <Divider my="sm" />

      <Stack>
        <Text size="sm" color="dimmed">
          {/* 👤 Âge : {getAge(user.birthdate)} ans */}
        </Text>

        <Group>
          <IconMail size={16} />
          <Text size="sm">{user.email}</Text>
        </Group>

        <Group>
          <IconPhone size={16} />
          <Text size="sm">{user.phone}</Text>
        </Group>

        <Group>
          <IconCake size={16} />
          <Text size="sm">{dayjs(user.birthdate).format("DD MMMM YYYY")}</Text>
        </Group>
      </Stack>
    </Card>
  );
};
