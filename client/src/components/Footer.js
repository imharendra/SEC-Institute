import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <div className="bgcolor-coffee-pot">
      <Box sx={{mt: 4, py: 4 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Help</Typography>
              <Typography>Email: info@hikeinstitute.com</Typography>
              <Typography>Call directly: +91 8445443437</Typography>
              <Typography>
                Reach Us: BSA Engineering College Road opp RS Plaza, Mathura, UP
                - 281001
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6">Important Link</Typography>
              {[
                "Home",
                "About",
                "Courses",
                "Branches",
                "Webmail",
                "Branch Login",
                "Privacy Policy",
              ].map((text) => (
                <Typography key={text}>
                  <Link href="#" color="inherit" sx={{ textDecoration: 'none', color:'#EED6D3' }}>
                    {text}
                  </Link>
                </Typography>
              ))}
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6">Location</Typography>
              <Box>
                <iframe
                  title="SECI Location"
                  src="https://www.google.com/maps/embed?..."
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </Box>
            </Grid>
          </Grid>

          <Box mt={4} textAlign="center">
            <Typography variant="body2">
              Powered By : Hypernet | Copyright ©2019-20 Hike Institute of
              Computer Education | All Rights Reserved
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
