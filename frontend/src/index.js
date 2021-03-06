import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Register from './register';
import { Provider } from 'react-redux';
import store from './app/store';
import Post from './features/posts/postform';
import Home from './mainhome';
import MyPosts from './features/posts/mypost';
import Advs from './features/advertisements/advsform';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
<BrowserRouter>
  <Routes>
    
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/myposts' element={<MyPosts/>}></Route>
    <Route path='/logout' element={  <App />}></Route>
    <Route path='/addadvs' element={  <Advs />}></Route>
    <Route path='/addpost' element={<Post></Post>}></Route>
    <Route path='/' element={ <App />}></Route>
  </Routes>
  
    </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
