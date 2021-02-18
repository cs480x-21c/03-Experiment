import React from 'react';
import {Route} from 'react-router-dom'
import HomePageView from './containers/HomePageView'
import Project1PageView from './containers/Project1PageView'
import Project2PageView from './containers/Project2PageView'
import Project3PageView from './containers/Project3PageView'
import Project4PageView from './containers/Project4PageView'
import Project5PageView from './containers/Project5PageView'

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={HomePageView}/>
        <Route exact path='/project1' component={Project1PageView}/>
        <Route exact path='/project2' component={Project2PageView}/>
        <Route exact path='/project3' component={Project3PageView}/>
        <Route exact path='/project4' component={Project4PageView}/>
        <Route exact path='/project5' component={Project5PageView}/>
    </div>
);

export default BaseRouter;