import { useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Container,
  Grid,
  Group,
  Progress,
  RingProgress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBuildings,
  IconCalendar,
  IconShield,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useUsersStore from "../stores/useUsersStore";

const StatisticsPage = () => {
  const { users, fetchAllUsers } = useUsersStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  // Statistiques générales
  const totalUsers = users.length;
  const admins = users.filter((user) => user.isAdmin).length;
  const avgAge = Math.round(
    users.reduce((sum, user) => {
      if (user.birthdate) {
        const age =
          new Date().getFullYear() - new Date(user.birthdate).getFullYear();
        return sum + age;
      }
      return sum;
    }, 0) / users.length
  );

  // Calcul des données pour les graphiques directement depuis les utilisateurs
  const categoryCounts = {
    Marketing: users.filter((u) => u.category === "Marketing").length,
    Technique: users.filter((u) => u.category === "Technique").length,
    Client: users.filter((u) => u.category === "Client").length,
  };

  const genderCounts = {
    female: users.filter((u) => u.gender === "female").length,
    male: users.filter((u) => u.gender === "male").length,
    other: users.filter((u) => u.gender === "other").length,
  };

  const cityCounts = users.reduce((acc, user) => {
    const city = user.city || "Non spécifiée";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const cityChartData = Object.entries(cityCounts)
    .map(([city, count]) => ({
      city,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const ageGroups = {
    "20-30": users.filter((u) => {
      if (!u.birthdate) return false;
      const age =
        new Date().getFullYear() - new Date(u.birthdate).getFullYear();
      return age >= 20 && age < 30;
    }).length,
    "30-40": users.filter((u) => {
      if (!u.birthdate) return false;
      const age =
        new Date().getFullYear() - new Date(u.birthdate).getFullYear();
      return age >= 30 && age < 40;
    }).length,
    "40+": users.filter((u) => {
      if (!u.birthdate) return false;
      const age =
        new Date().getFullYear() - new Date(u.birthdate).getFullYear();
      return age >= 40;
    }).length,
  };

  const ageGroupData = Object.entries(ageGroups).map(([group, count]) => ({
    group,
    count,
  }));

  const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="h-full">
      <Group>
        <Box className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon size={24} className={`text-${color}-600`} />
        </Box>
        <div className="flex-1">
          <Text size="sm" className="text-gray-600 mb-1">
            {title}
          </Text>
          <Text size="xl" fw={700} className="text-gray-800 mb-1">
            {value}
          </Text>
          <Text size="xs" className="text-gray-500">
            {subtitle}
          </Text>
        </div>
      </Group>
    </Card>
  );

  return (
    <Container size="xl" py="xl">
      {/* Header */}
      <Group mb="xl">
        <IconTrendingUp size={32} className="text-blue-600" />
        <div>
          <Title order={1} className="text-gray-800">
            Statistiques & Analytics
          </Title>
          <Text className="text-gray-600">
            Insights sur vos collaborateurs et équipes
          </Text>
        </div>
      </Group>

      {/* KPIs Cards */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Collaborateurs"
            value={totalUsers}
            subtitle="Équipe complète"
            icon={IconUsers}
            color="blue"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Administrateurs"
            value={admins}
            subtitle={`${Math.round((admins / totalUsers) * 100)}% de l'équipe`}
            icon={IconShield}
            color="red"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Âge Moyen"
            value={`${avgAge} ans`}
            subtitle="Équipe dynamique"
            icon={IconCalendar}
            color="green"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Départements"
            value="3"
            subtitle="Diversité organisationnelle"
            icon={IconBuildings}
            color="purple"
          />
        </Grid.Col>
      </Grid>

      {/* Charts Section */}
      <Grid gutter="lg">
        {/* Répartition par Catégorie */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="h-full"
          >
            <Title order={3} mb="md" className="text-gray-800">
              Répartition par Département
            </Title>
            <Box className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(categoryCounts).map(
                      ([name, value]) => ({ name, value })
                    )}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(categoryCounts).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#8884d8", "#82ca9d", "#ffc658"][index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid.Col>

        {/* Répartition par Genre */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="h-full"
          >
            <Title order={3} mb="md" className="text-gray-800">
              Répartition par Genre
            </Title>
            <Stack>
              <Group justify="center" mb="md">
                <RingProgress
                  size={200}
                  thickness={20}
                  sections={[
                    {
                      value: (genderCounts.female / totalUsers) * 100,
                      color: "#ff7c7c",
                    },
                    {
                      value: (genderCounts.male / totalUsers) * 100,
                      color: "#7c9aff",
                    },
                    {
                      value: (genderCounts.other / totalUsers) * 100,
                      color: "#a0e07a", // Couleur pour "other"
                    },
                  ]}
                  label={
                    <Text ta="center" fw={700} size="xl">
                      {totalUsers}
                    </Text>
                  }
                />
              </Group>
              <Group justify="center">
                <Group>
                  <Box className="w-3 h-3 rounded-full bg-red-300"></Box>
                  <Text size="sm">Femmes ({genderCounts.female})</Text>
                </Group>
                <Group>
                  <Box className="w-3 h-3 rounded-full bg-blue-300"></Box>
                  <Text size="sm">Hommes ({genderCounts.male})</Text>
                </Group>
                <Group>
                  <Box className="w-3 h-3 rounded-full bg-green-300"></Box>
                  <Text size="sm">Autres ({genderCounts.other})</Text>
                </Group>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Top Villes */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="h-full"
          >
            <Title order={3} mb="md" className="text-gray-800">
              Répartition Géographique
            </Title>
            <Box className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="city" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid.Col>

        {/* Pyramide des Âges */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="h-full"
          >
            <Title order={3} mb="md" className="text-gray-800">
              Répartition par Âge
            </Title>
            <Stack>
              {ageGroupData.map((item, index) => (
                <div key={index}>
                  <Group justify="apart" mb="xs">
                    <Text size="sm" fw={500}>
                      {item.group} ans
                    </Text>
                    <Text size="sm" className="text-gray-600">
                      {item.count}
                    </Text>
                  </Group>
                  <Progress
                    value={(item.count / totalUsers) * 100}
                    color={
                      index === 0 ? "blue" : index === 1 ? "green" : "orange"
                    }
                    mb="md"
                  />
                </div>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Derniers Collaborateurs */}
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="md" className="text-gray-800">
              Équipe Récente
            </Title>
            <Grid>
              {users.slice(0, 6).map((user) => (
                <Grid.Col key={user.id} span={{ base: 12, sm: 6, md: 4 }}>
                  <Group>
                    <Avatar
                      src={`/api/placeholder/50/50`}
                      size={50}
                      radius="xl"
                    />
                    <div>
                      <Text fw={500} size="sm">
                        {user.firstname} {user.lastname}
                      </Text>
                      <Badge
                        variant="light"
                        size="sm"
                        color={
                          user.category === "Marketing"
                            ? "blue"
                            : user.category === "Technique"
                            ? "green"
                            : "orange"
                        }
                      >
                        {user.category}
                      </Badge>
                      <Text size="xs" className="text-gray-500 mt-1">
                        {user.city}, {user.country}
                      </Text>
                    </div>
                  </Group>
                </Grid.Col>
              ))}
            </Grid>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default StatisticsPage;
