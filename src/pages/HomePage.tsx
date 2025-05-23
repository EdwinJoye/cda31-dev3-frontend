import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Card,
  Grid,
  Group,
  Stack,
  Avatar,
  Badge,
  Divider,
  Box,
} from "@mantine/core";
import {
  IconUsers,
  IconChartBar,
  IconBell,
  IconCalendar,
  IconArrowRight,
  IconSparkles,
  IconHeart,
  IconTrendingUp,
} from "@tabler/icons-react";

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  const quickActions = [
    {
      title: "Gérer les Collaborateurs",
      description: "Visualiser, ajouter et modifier les profils",
      icon: IconUsers,
      color: "blue",
    },
    {
      title: "Statistiques",
      description: "Tableau de bord et analyses",
      icon: IconChartBar,
      color: "green",
    },
    {
      title: "Calendrier",
      description: "Planifier et organiser",
      icon: IconCalendar,
      color: "orange",
    },
    {
      title: "Notifications",
      description: "Suivre les dernières actualités",
      icon: IconBell,
      color: "purple",
    },
  ];

  const recentActivity = [
    {
      name: "Marie Dubois",
      action: "a rejoint l'équipe Marketing",
      time: "Il y a 2h",
      avatar: "/api/placeholder/40/40",
    },
    {
      name: "Thomas Martin",
      action: "a mis à jour son profil",
      time: "Il y a 4h",
      avatar: "/api/placeholder/40/40",
    },
    {
      name: "Sophie Laurent",
      action: "a été promue Manager",
      time: "Hier",
      avatar: "/api/placeholder/40/40",
    },
  ];

  return (
    <Box
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Background Pattern */}
      <Box
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='27' cy='7' r='2'/%3E%3Ccircle cx='47' cy='7' r='2'/%3E%3Ccircle cx='7' cy='27' r='2'/%3E%3Ccircle cx='27' cy='27' r='2'/%3E%3Ccircle cx='47' cy='27' r='2'/%3E%3Ccircle cx='7' cy='47' r='2'/%3E%3Ccircle cx='27' cy='47' r='2'/%3E%3Ccircle cx='47' cy='47' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container size="xl" className="relative z-10 py-8">
        {/* Header Section */}
        <Box className="text-center mb-12">
          <Group justify="center" mb="md">
            <IconSparkles size={32} className="text-white" />
          </Group>
          <Title
            order={1}
            className="text-white text-4xl md:text-6xl font-bold mb-4"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            {getGreeting()} !
          </Title>
          <Text
            size="xl"
            className="text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
          >
            Bienvenue dans votre espace intranet collaboratif où chaque talent
            trouve sa place et où l'excellence de nos équipes prend vie.
          </Text>
          <Badge
            size="lg"
            variant="white"
            leftSection={<IconHeart size={16} />}
          >
            L'humain au cœur de tout
          </Badge>
        </Box>

        {/* Quick Actions Grid */}
        <Grid gutter="lg" mb="xl">
          {quickActions.map((action, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 3 }}>
              <Card
                shadow="xl"
                padding="xl"
                radius="lg"
                className="h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/95 backdrop-blur-sm group"
              >
                <Stack>
                  <Group>
                    <Box
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor:
                          action.color === "blue"
                            ? "#dbeafe"
                            : action.color === "green"
                            ? "#dcfce7"
                            : action.color === "orange"
                            ? "#fed7aa"
                            : "#f3e8ff",
                      }}
                    >
                      <action.icon
                        size={24}
                        style={{
                          color:
                            action.color === "blue"
                              ? "#2563eb"
                              : action.color === "green"
                              ? "#16a34a"
                              : action.color === "orange"
                              ? "#ea580c"
                              : "#9333ea",
                        }}
                      />
                    </Box>
                    <IconArrowRight
                      size={16}
                      className="text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Group>
                  <div>
                    <Text size="lg" fw={600} className="text-gray-800 mb-2">
                      {action.title}
                    </Text>
                    <Text size="sm" className="text-gray-600 leading-relaxed">
                      {action.description}
                    </Text>
                  </div>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Bottom Section */}
        <Grid gutter="lg">
          {/* Recent Activity */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card
              shadow="xl"
              padding="xl"
              radius="lg"
              className="bg-white/95 backdrop-blur-sm"
            >
              <Group mb="lg">
                <IconTrendingUp size={24} className="text-blue-600" />
                <Title order={3} className="text-gray-800">
                  Activité Récente
                </Title>
              </Group>
              <Stack>
                {recentActivity.map((activity, index) => (
                  <div key={index}>
                    <Group>
                      <Avatar src={activity.avatar} size={40} radius="xl" />
                      <div className="flex-1">
                        <Text size="sm" className="text-gray-800">
                          <span style={{ fontWeight: 600 }}>
                            {activity.name}
                          </span>{" "}
                          {activity.action}
                        </Text>
                        <Text size="xs" className="text-gray-500">
                          {activity.time}
                        </Text>
                      </div>
                    </Group>
                    {index < recentActivity.length - 1 && <Divider my="sm" />}
                  </div>
                ))}
              </Stack>
            </Card>
          </Grid.Col>

          {/* Welcome Card */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Card
              shadow="xl"
              padding="xl"
              radius="lg"
              className="bg-white/95 backdrop-blur-sm h-full"
            >
              <Stack className="h-full justify-center text-center">
                <Box className="mb-4">
                  <Title order={3} className="text-gray-800 mb-4">
                    Votre Impact Aujourd'hui
                  </Title>
                  <Text className="text-6xl font-bold text-blue-600 mb-2">
                    247
                  </Text>
                  <Text className="text-gray-600">
                    Collaborateurs connectés
                  </Text>
                </Box>
                <Button
                  size="lg"
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: "blue", to: "purple" }}
                  className="mt-4"
                >
                  Découvrir l'équipe
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Time Display */}
        <Box className="text-center mt-12">
          <Text className="text-white/70 text-lg">
            {currentTime.toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            •{" "}
            {currentTime.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
