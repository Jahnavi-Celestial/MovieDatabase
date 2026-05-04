import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRequestToken, validateTokenWithLogin, createSession, getAccountDetails } from "../api/tmdb"; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    try {
      const token = await getRequestToken();
      await validateTokenWithLogin(username, password, token);
      const sessionId = await createSession(token);
      const accountData = await getAccountDetails(sessionId);

      localStorage.setItem("tmdb_session_id", sessionId); 
      localStorage.setItem("tmdb_account_id", accountData.id.toString()); 

      navigate("/watchlist");
    } catch (err) {
      setError(true);
      console.error("Auth Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          User is not authenticated. Invalid username or password.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          disabled={loading}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          disabled={loading}
        />
        <Button 
          variant="contained" 
          type="submit" 
          color="primary" 
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
