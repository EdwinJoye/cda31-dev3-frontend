import {
  Button,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  Pagination,
  Stack,
  Title,
} from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCard } from "../components/UserCard";
import UserFilter from "../components/UserFIlter";
import type { Category } from "../models/Category";
import useUsersStore from "../stores/useUsersStore";
import { useAuthStore } from "../stores/useAuthStore";

const ListPage = () => {
  const navigate = useNavigate();
  const { connectedUser } = useAuthStore();
  const { users, fetchAllUsers } = useUsersStore();
  const [activePage, setActivePage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      await fetchAllUsers();
      setIsLoading(false);
    };

    loadUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleFilter = ({
    name,
    category,
    text,
  }: {
    name: string;
    category: Category | null;
    text: string;
  }) => {
    const filtered = users.filter((user) => {
      const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
      const nameMatch = name ? fullName.includes(name.toLowerCase()) : true;
      const categoryMatch = category ? user.category === category : true;
      const textMatch = text
        ? fullName.includes(text.toLowerCase()) ||
          user.email.toLowerCase().includes(text.toLowerCase()) ||
          user.city?.toLowerCase().includes(text.toLowerCase()) ||
          user.country?.toLowerCase().includes(text.toLowerCase())
        : true;

      return nameMatch && categoryMatch && textMatch;
    });
    setFilteredUsers(filtered);
    setActivePage(1);
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const uniqueUserNames = [
    ...new Set(users.map((user) => `${user.firstname} ${user.lastname}`)),
  ];

  return (
    <Container
      size="xl"
      py="xl"
      className="h-full flex flex-col justify-between"
    >
      {isLoading ? (
        <Center style={{ height: "100vh" }}>
          <Loader size="xl" />
        </Center>
      ) : (
        <Stack>
          <Group className="justify-between">
            <Title mb="lg">Liste des utilisateurs</Title>
            {connectedUser?.admin ? (
              <Button
                onClick={() => navigate(`/admin/user/create`)}
                leftSection={<IconUserPlus size={20} />}
              >
                Ajouter un utilisateur
              </Button>
            ) : null}
          </Group>
          <UserFilter onFilter={handleFilter} userNames={uniqueUserNames} />
          <Grid gutter="lg">
            {displayedUsers.map((user) => (
              <Grid.Col key={user.id} span={{ base: 12, md: 4, lg: 3 }}>
                <UserCard user={user} />
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      )}

      <Group p="xl" justify="center">
        <Pagination
          total={totalPages}
          value={activePage}
          onChange={setActivePage}
        />
      </Group>
    </Container>
  );
};

export default ListPage;
