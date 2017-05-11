import * as React from 'react';
import { Switch } from 'react-router';
import {Link, Route} from 'react-router-dom';
import {Counter} from './counter/Counter';
import NotFound from './NotFound';
import {RecruitProofreading} from "./counter/RecruitProofreading";

export class Routes extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <h1>AI Executor</h1>
        <li><Link to='/google-label' >Google Vision API (LABEL DETECTION)</Link></li>
        <li><Link to='/recruit-proofreading' >Recruit Proofreading</Link></li>
        <Switch>
          <Route exact path='/google-label' component={Counter} />
          <Route exact path='/recruit-proofreading' component={RecruitProofreading} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }
}