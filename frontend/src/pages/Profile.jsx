import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Response Status:", response.status);
console.log("Profile Response:", data);

      if (response.ok && data.success) {
        setUser(data.user); // or data.data depending on backend
      } else {
        alert(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!user) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card elevation={5}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                fontSize: 45,
              }}
            >
              {user.fullName?.charAt(0).toUpperCase()}
            </Avatar>

            <Typography
              variant="h4"
              mt={2}
              fontWeight="bold"
            >
              {user.fullName}
            </Typography>

            <Typography color="text.secondary">
              {user.email}
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight="bold">
                Full Name
              </Typography>

              <Typography>{user.fullName}</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight="bold">
                Email
              </Typography>

              <Typography>{user.email}</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight="bold">
                Phone
              </Typography>

              <Typography>{user.phone}</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight="bold">
                Role
              </Typography>

              <Typography>{user.role}</Typography>
            </Grid>
          </Grid>

          <Box mt={5}>
            <Button
              color="error"
              variant="contained"
              fullWidth
              onClick={logout}
            >
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}