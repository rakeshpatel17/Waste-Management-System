import React from 'react';
import { Card, CardContent, Avatar, Typography, Grid, Box, CardActionArea, Container } from '@mui/material';

const user = {
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg',
    bio: 'Software Developer',
    email: 'john.doe@example.com',
    location: 'San Francisco, CA',
};

const Employee = () => {
    return (
        <Container maxWidth="md">
            <Card sx={{ maxWidth: 345, margin: 'auto', mt: 5 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar
                                alt={user.name}
                                src={user.avatarUrl}
                                sx={{ width: 80, height: 80 }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">{user.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {user.bio}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box mt={2}>
                        <Typography variant="body2">
                            <strong>Email:</strong> {user.email}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Location:</strong> {user.location}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            <Box mt={5}>
                <Typography variant="h6" align="center" gutterBottom>
                    Stats
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Driver Rating
                                    </Typography>
                                    <Typography variant="body2">
                                        4.5/5
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" whiteSpace={"nowrap"}>
                                        Successful Waste Pickups
                                    </Typography>
                                    <Typography variant="body2">
                                        5
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Complaints
                                    </Typography>
                                    <Typography variant="body2">
                                        1
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Employee;
