import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  useTheme,
  Button,
} from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        mt: 6,
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Footer with Columns */}
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3} sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Help & Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: somnatheducationinstitute@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Call: +91 6395267390
            </Typography>
            <Typography variant="body2">
              Somnath Marriage Home, NH-19, Mathura, UP - 281001
            </Typography>
          </Grid>

          {/* Important Links */}
          <Grid item xs={12} sm={6} md={3} sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Important Links
            </Typography>
            {[
              { text: "Home", href: "#" },
              { text: "About", href: "#" },
              { text: "Courses", href: "#" },
              { text: "Branches", href: "#" },
              { text: "Privacy Policy", href: "#" },
            ].map((link) => (
              <Typography variant="body2" key={link.text} sx={{ mb: 1 }}>
                <Link
                  href={link.href}
                  underline="none"
                  sx={{
                    color: "#EED6D3",
                    "&:hover": {
                      color: "#fff",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {link.text}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Map Column */}
          <Grid item xs={12} sm={12} md={5} sx={{ flexGrow: 2 }}>
            <Typography variant="h6" gutterBottom>
              Our Location
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: "hidden", mt: 1 }}>
              <iframe
                title="SEC Institute Location"
                src="https://www.google.com/maps?q=27.454789, 77.682027&z=18&output=embed" // Replace with real link
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
            <Button
        variant="contained"
        color="primary"
        href="https://www.google.com/maps/search/?api=1&query=27.454789, 77.682027"
        target="_blank"
        rel="noopener noreferrer"
      >
        📍 Open in Google Maps
      </Button>
          </Grid>
        </Grid>

        {/* Bottom Footer */}
        <Box
          mt={6}
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          textAlign={{ xs: "left", md: "left" }}
          gap={2}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: "0.85rem", color: "#ccc" }}
          >
            © 2025 Somnath Education & Computer Institute. All Rights Reserved.
          </Typography>

          <Box textAlign="right">
            <Typography variant="body2" sx={{ color: "#ccc" }}>
              Developed by: DEVELOPER NAME
            </Typography>
            <Typography variant="body2">
              <Link
                href="mailto:EMAIL@gmail.com"
                underline="none"
                sx={{
                  color: "#EED6D3",
                  "&:hover": { color: "#fff", textDecoration: "underline" },
                }}
              >
                EMAIL@gmail.com
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
