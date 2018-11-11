import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../client/AppRouter';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page Not Found</h1>
        <p>Hmmm, we're unble to find that page</p>
        <Link className="button button--link" to={AppRoutes.home.path}>
          HEAD HOME
        </Link>
      </div>
    </div>
  );
};
