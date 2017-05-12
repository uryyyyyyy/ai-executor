import * as React from 'react';
import { Switch } from 'react-router';
import {Link, Route} from 'react-router-dom';
import {VisionAPI} from './apis/google/VisionAPI';
import NotFound from './NotFound';
import {Proofreading} from "./apis/recruit/Proofreading";
import {TextSuggest} from './apis/recruit/TextSuggest';
import {VideoAPI} from "./apis/google/VideoAPI";

export class Routes extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <h1>AI Executor</h1>
        <li><Link to='/google-vision' >Google Vision API</Link></li>
        <li><Link to='/google-video' >Google Video API</Link></li>
        <li><Link to='/recruit-proofreading' >Recruit Proofreading</Link></li>
        <li><Link to='/recruit-textSuggest' >Recruit textSuggest</Link></li>
        <Switch>
          <Route exact path='/google-vision' component={VisionAPI} />
          <Route exact path='/google-video' component={VideoAPI} />
          <Route exact path='/recruit-proofreading' component={Proofreading} />
          <Route exact path='/recruit-textSuggest' component={TextSuggest} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }
}