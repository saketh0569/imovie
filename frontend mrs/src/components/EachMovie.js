import * as React from 'react';
import { Button, Typography, Card, CardContent, CardMedia, Rating, CardActions, Stack } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
// import { Box } from '@mui/system';

export default function EachMovie() {
        const userid = localStorage.getItem('userid');
        const { id } = useParams();
        const mid = id;
        const [movies, setMovies] = useState([])

        // get all comments of a particular movie
        const [comments, setComments] = useState([])
        useEffect(() => {
                fetch(`http://localhost:8080/comment/${id}`)
                        .then(res => res.json())
                        .then((result) => {
                                setComments(result);
                        })
        })

        // get info of each movie
        useEffect(() => {
                fetch(`http://localhost:8080/movie/${id}`)
                        .then(res => res.json())
                        .then((result) => {
                                setMovies(result);
                        })
        });
        // console.log("here ", userid, movies.uid)

        // delete a movie
        const handleClick = (e) => {
                fetch(`http://localhost:8080/movie/${id}`, {
                        method: "DELETE"
                        // headers: { "Content-Type": "application/json" }
                }).then(() => {
                        alert("Movie Deleted");
                })
        }

        // checking user logged in or not
        // const [userid, setUserid] = useState('');
        // useEffect(() => {
        //         setUserid(localStorage.getItem('userid'));
        // })
        // get comments from (mid, uid)
        const uid = localStorage.getItem('userid');
        const [temp, setTemp] = useState('');
        useEffect(() => {
                fetch(`http://localhost:8080/comment/${mid}/${uid}`)
                        .then(res => res.json())
                        .then((result) => {
                                setTemp(result);
                        })
                // console.log("here", temp);
                // console.log(temp.length);
        })

        return (
                <Stack style={{ margin: "2% 20%" }}>
                        <Card elevation={6} style={{ margin: "auto", padding: "15px 10px", textAlign: "left", borderRadius: "10px" }} sx={{ maxWidth: "80%", maxHeight: "20%" }} >
                                {/* <CardMedia component='img' image={`${movies.url}`} /> */}
                                <CardMedia component='img' style={{ height: "700px", width: "605px", margin: "auto", padding: "10px" }} image={`${movies.url}`} />
                                <CardContent>
                                        < Typography variant='h4'>{`Name: ${movies.name}`}</Typography> <br />
                                        < Typography variant='h5'>{`Rating: ${movies.rating}`}</Typography> <br />
                                        <Rating name="read-only" value={`${movies.rating}`} precision={0.2} readOnly />
                                        < Typography variant='h6'>{`Description: ${movies.description}`}</Typography>
                                </CardContent>
                                <CardActions>
                                        {
                                                temp.length == 0 ?
                                                        <Button variant='contained'>
                                                                <Link to={`/addreview/${movies.id}`} style={{ color: 'white', textDecoration: 'none' }}>Add Review</Link>
                                                        </Button>
                                                        :
                                                        <></>
                                        }
                                        {
                                                userid == movies.uid ?
                                                        <>
                                                                <Button variant='contained'>
                                                                        <Link to={`/editmovie/${movies.id}`} style={{ color: 'white', textDecoration: 'none' }}>Edit Movie</Link>
                                                                </Button>
                                                                <Button variant='contained' onClick={handleClick}>
                                                                        <Link to={`/movies`} style={{ color: 'white', textDecoration: 'none' }}>Delete Movie</Link>
                                                                </Button>
                                                        </>
                                                        :
                                                        <></>
                                        }
                                </CardActions>
                        </Card>

                        <Stack style={{ margin: "5% 20%", padding: "1%" }}>
                                < Typography variant='h4'>Reviews</Typography>
                                {comments.map(comment => (
                                        <Card style={{ margin: "2%", borderRadius: '10px', padding: "1%" }} key={comment.cid} >
                                                <Button color="inherit">
                                                        <Link to={`/eachuser/${comment.uid}`} style={{ color: 'black', textDecoration: 'none' }}>
                                                                User Details
                                                        </Link>
                                                </Button>
                                                <Typography variant="h5" component="div">
                                                        Rating: {comment.rate}
                                                </Typography>
                                                {
                                                        comment.review.length > 0 ?
                                                                <Typography variant="h5" component="div">
                                                                        Review: {comment.review}
                                                                </Typography>
                                                                :
                                                                <></>
                                                }
                                                {
                                                        userid == comment.uid ?
                                                                <Button variant='contained' style={{ margin: "1%" }}>
                                                                        <Link to={`/editreview/${comment.cid}`} style={{ color: 'white', textDecoration: 'none' }}>Edit Review</Link>
                                                                </Button>
                                                                :
                                                                <></>
                                                }
                                        </Card>
                                ))}
                        </Stack>
                </Stack>
        );
}
