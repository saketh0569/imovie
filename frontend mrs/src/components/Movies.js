import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Typography, Box, Card, CardContent, Grid, CardHeader, CardMedia, Rating, CardActions, Stack } from '@mui/material';
import { Link } from "react-router-dom";

export default function Movie() {
        const [movies, setMovies] = useState([])
        const uid = localStorage.getItem('userid');
        useEffect(() => {
                fetch("http://localhost:8080/movie/getall")
                        .then(res => res.json())
                        .then((result) => {
                                setMovies(result);
                        })
        }, [])

        return (
                <Stack style={{ margin: "3% 10%" }}>
                        <Card elevation={6} style={{ margin: "30px 10px", padding: "27px 28px", textAlign: "left", borderRadius: "10px" }}>
                                <CardContent>
                                        < Typography variant='h2'>Movie Review System </Typography> <br />
                                        < Typography variant='h5'>You can find and give reviews for all your favorite Movies....</Typography>
                                </CardContent>
                                {
                                        uid == 1 || uid == 2 ?
                                                <CardActions>
                                                        <Button variant='contained'>
                                                                <Link to='/addmovie' style={{ color: 'white', textDecoration: 'none' }}>Add Movie</Link>
                                                        </Button>
                                                </CardActions>
                                                :
                                                <></>
                                }
                        </Card>

                        <Box style={{ margin: "30px 10px" }}>
                                <Grid
                                        container
                                        spacing={2.5}
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                >
                                        {movies.map(movie => (
                                                <Grid item xs={12} sm={6} md={3} key={movie.id} align-items="center">
                                                        <Card style={{ borderRadius: '10px' }} sx={{ maxWidth: "100%" }} >
                                                                <CardMedia component='img' height='100%' image={`${movie.url}`} alt="movie photo" />
                                                                {/* <CardMedia style={{ height: 100, paddingTop: '10%' }} image={movies.url} /> */}
                                                                <CardHeader
                                                                        title={`Name : ${movie.name}`}
                                                                // subheader={`Rating : ${movie.rating}`}
                                                                />
                                                                <Typography variant='h6'> Rating: {movie.rating} </Typography>
                                                                <Rating name="read-only" value={movie.rating} precision={0.2} readOnly />
                                                                <CardActions>
                                                                        <Button size='small'>
                                                                                <Link to={`/eachmovie/${movie.id}`} style={{ textDecoration: 'none' }}>More Details</Link>
                                                                        </Button>
                                                                </CardActions>
                                                        </Card>
                                                </Grid>
                                        ))}
                                </Grid>
                        </Box>
                </Stack >
        );
}
