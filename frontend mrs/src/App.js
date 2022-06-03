import './App.css';
import Appbar from './components/Appbar';
import Movies from './components/Movies'
import AddMovie from "./components/AddMovie";
import EachMovie from "./components/EachMovie";
import EditMovie from "./components/EditMovie";
import AddReview from './components/AddReview';
import EditReview from './components/EditReview';
import Register from "./components/Register";
import Login from "./components/Login";
import EachUser from './components/EachUser';
import EditUser from './components/EditUser';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
// import { useState } from 'react';

function App() {
        // const userid = '';
        // const [userid, setUserid] = useState('');
        // const pull_data = (data) => {
        //         console.log("In app.js, data is: ", data); // LOGS DATA FROM CHILD 
        //         // userid = data;
        //         // setUserid(data);
        //         localStorage.setItem('userid', data);
        // }

        // const userid = localStorage.getItem('userid');
        const [userid, setUserid] = useState('');
        useEffect(() => {
                setUserid(localStorage.getItem('userid'));
        })

        return (
                <Router>
                        <Appbar />
                        <div className="App">

                                <Routes>
                                        <Route exact path="/" element={<Movies />} />
                                        <Route path="/movies" element={<Movies />} />
                                        <Route path="/addmovie" element={<AddMovie />} />
                                        <Route path="/eachmovie/:id" element={userid ? <EachMovie /> : <Login />} />
                                        <Route path="/editmovie/:id" element={userid ? <EditMovie /> : <Login />} />
                                        <Route path="/addreview/:id" element={userid ? <AddReview /> : <Login />} />
                                        <Route path="/editreview/:cid" element={userid ? <EditReview /> : <Login />} />
                                        <Route path="/register" element={<Register />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/eachuser/:uid" element={userid ? <EachUser /> : <Login />} />
                                        <Route path="/edituser" element={userid ? <EditUser /> : <Login />} />
                                </Routes>

                        </div>
                </Router>
        );
}

export default App;
