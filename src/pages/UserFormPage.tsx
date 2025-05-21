import {
  Box,
  Button,
  Container,
  Group,
  LoadingOverlay,
  PasswordInput,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCheck, IconPhotoPlus, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Category } from "../models/Category";
import type { Gender } from "../models/Gender";
import type { User } from "../models/User";
import useUsersStore from "../stores/useUsersStore";

const genderOptions = [
  { value: "male", label: "Homme" },
  { value: "female", label: "Femme" },
  { value: "other", label: "Autre" },
];

const categoryOptions = [
  { value: "Marketing", label: "Marketing" },
  { value: "Client", label: "Client" },
  { value: "Technique", label: "Technique" },
];

const UserFormPage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();
  const { fetchUserById, users, setUsers } = useUsersStore();
  const [loading, setLoading] = useState(false);
  const [initialPhoto, setInitialPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm({
    initialValues: {
      gender: "male" as Gender,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      birthdate: null as Date | null,
      city: "",
      country: "",
      photo: null as File | null,
      category: "Client" as Category,
      isAdmin: false,
    },

    validate: {
      firstname: (value) => (value.length < 2 ? "Minimum 2 caractères" : null),
      lastname: (value) => (value.length < 2 ? "Minimum 2 caractères" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email invalide"),
      password: (value) =>
        userId ? null : value.length < 6 ? "Minimum 6 caractères" : null,
      phone: (value) => (value.length < 10 ? "Téléphone invalide" : null),
      birthdate: (value) =>
        value === null ? "Date de naissance requise" : null,
      city: (value) => (value.length < 2 ? "Minimum 2 caractères" : null),
      country: (value) => (value.length < 2 ? "Minimum 2 caractères" : null),
    },
  });

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchUserById(userId).then((user) => {
        setLoading(false);
        if (user) {
          form.setValues({
            gender: user.gender,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: "",
            phone: user.phone,
            birthdate: user.birthdate ? new Date(user.birthdate) : null,
            city: user.city,
            country: user.country,
            photo: null,
            category: user.category,
            isAdmin: user.isAdmin,
          });
          setInitialPhoto(user.photo);
        } else {
          navigate("/admin/users");
        }
      });
    }
  }, [userId, fetchUserById, form, navigate]);

  const handleSubmit = (values: typeof form.values) => {
    setLoading(true);

    const newUser: User = {
      id: userId || Math.random().toString(36).substr(2, 9),
      gender: values.gender,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      phone: values.phone,
      birthdate: values.birthdate
        ? values.birthdate.toISOString().split("T")[0]
        : "",
      city: values.city,
      country: values.country,
      photo: initialPhoto || "",
      category: values.category,
      isAdmin: values.isAdmin,
    };

    const updatedUsers: User[] = userId
      ? users.map((u) => (u.id === userId ? newUser : u))
      : [...users, newUser];

    setUsers(updatedUsers);
    setLoading(false);
    navigate("/admin/users");
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setFieldValue("photo", file);
      setInitialPhoto(null);
    }
  };

  return (
    <Container size="sm" py="xl" style={{ position: "relative" }}>
      <LoadingOverlay visible={loading} />
      <Title order={2} mb="md" className="justify-center">
        {userId ? "Modifier l'utilisateur" : "Créer un nouvel utilisateur"}
      </Title>

      <Box mb="md" className="flex justify-center">
        <div
          className="relative group w-[120px] h-[120px] rounded-full overflow-hidden hover:opacity-80 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={
              form.values.photo
                ? URL.createObjectURL(form.values.photo)
                : initialPhoto || ""
            }
            alt="Photo utilisateur"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex justify-center items-center z-50">
            <IconPhotoPlus color="white" size={32} />
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handlePhotoChange}
        />
      </Box>

      <Box
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col gap-[15px]"
      >
        <Select
          label="Genre"
          data={genderOptions}
          {...form.getInputProps("gender")}
          required
        />

        <Group grow>
          <TextInput
            label="Prénom"
            placeholder="Prénom"
            {...form.getInputProps("firstname")}
            required
          />
          <TextInput
            label="Nom"
            placeholder="Nom"
            {...form.getInputProps("lastname")}
            required
          />
        </Group>

        <TextInput
          label="Email"
          placeholder="exemple@mail.com"
          type="email"
          {...form.getInputProps("email")}
          required
        />

        {!userId && (
          <PasswordInput
            label="Mot de passe"
            placeholder="Minimum 6 caractères"
            {...form.getInputProps("password")}
            required
          />
        )}

        <TextInput
          label="Téléphone"
          placeholder="+33 6 12 34 56 78"
          {...form.getInputProps("phone")}
          required
        />

        <Group grow>
          <TextInput
            label="Ville"
            placeholder="Ville"
            {...form.getInputProps("city")}
            required
          />
          <TextInput
            label="Pays"
            placeholder="Pays"
            {...form.getInputProps("country")}
            required
          />
        </Group>

        <Group justify="space-between" className="items-end">
          <Select
            className="flex-1"
            label="Catégorie"
            data={categoryOptions}
            {...form.getInputProps("category")}
            required
          />
          <Group className="flex-1 !h-full p-2">
            <Switch
              label="Administrateur"
              labelPosition="left"
              {...form.getInputProps("isAdmin", { type: "checkbox" })}
            />
          </Group>
        </Group>

        <Stack className="items-center gap-3 mt-4">
          <Text>Date d'anniversaire</Text>
          <DatePicker
            value={form.values.birthdate}
            onChange={(date) => {
              const parsedDate =
                typeof date === "string" ? new Date(date) : date;
              form.setFieldValue("birthdate", parsedDate);
            }}
          />
        </Stack>

        <Group style={{ justifyContent: "flex-end" }} mt="md">
          <Button
            type="submit"
            leftSection={<IconCheck size={18} />}
            color="green"
            radius="md"
          >
            {userId ? "Enregistrer" : "Créer"}
          </Button>

          <Button
            type="button"
            leftSection={<IconX size={18} />}
            color="gray"
            radius="md"
            onClick={() => navigate("/admin/users")}
          >
            Annuler
          </Button>
        </Group>
      </Box>
    </Container>
  );
};

export default UserFormPage;
