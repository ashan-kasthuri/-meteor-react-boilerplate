import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';

import '../imports/startup/simple-schema-configuration';
import AppRouter, { onAuthChange } from '../imports/client/AppRouter';

Tracker.autorun(() => onAuthChange(!!Meteor.userId()));

Meteor.startup(() => {
  ReactDOM.render(AppRouter, document.getElementById('app'));
});
