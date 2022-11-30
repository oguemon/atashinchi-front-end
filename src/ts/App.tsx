import React from 'react';
import { render, hydrate } from "react-dom";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactGA from 'react-ga';

import Layout from "./components/Layout";
import Top from "./pages/Top";
import Search from "./pages/Search";
import AnimeEpisode from "./pages/AnimeEpisode";
import Character from "./pages/Character";
import "../sass/style.scss"

const history = createBrowserHistory({
    basename: "/atashinchi"
});
ReactGA.initialize('UA-89114839-4');
history.listen(({ pathname }) => {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
});

const rootElement = document.getElementById('app');

if (rootElement.hasChildNodes()) {
    hydrate(
        <Router history={ history }>
            <Layout>
                <Route exact path="/" component={Top}></Route>
                <Route exact path="/search" component={Search}></Route>
                <Route exact path="/anime/:episode_id([12]/\d{1,3})" component={AnimeEpisode}></Route>
                <Route exact path="/character/:character_id" component={Character}></Route>
            </Layout>
        </Router>
    , rootElement);
  } else {
    render(
        <Router history={ history }>
            <Layout>
                <Route exact path="/" component={Top}></Route>
                <Route exact path="/search" component={Search}></Route>
                <Route exact path="/anime/:episode_id([12]/\d{1,3})" component={AnimeEpisode}></Route>
                <Route exact path="/character/:character_id" component={Character}></Route>
            </Layout>
        </Router>
    , rootElement);
  }

