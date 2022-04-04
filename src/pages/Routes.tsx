import { lazy, FC } from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';

export enum routesEnum {
  home = '/',
  stakeCats = '/stake/cats',
  stakeGorillas = '/stake/gorillas',
  galleryCats = '/gallery/cats',
  galleryGorillas = '/gallery/gorillas',
  cureCats = '/cureCats',
  details = '/details',
}

const routes: RouteProps[] = [
  {
    path: routesEnum.home,
    exact: true,
    component: lazy(() => import('./Home')),
  },
  {
    path: routesEnum.stakeCats,
    exact: true,
    component: lazy(() => import('./StakeCats')),
  },
  {
    path: routesEnum.stakeGorillas,
    exact: true,
    component: lazy(() => import('./StakeGorillas')),
  },
  {
    path: routesEnum.galleryCats,
    exact: true,
    component: lazy(() => import('./CatsGallery')),
  },
  {
    path: routesEnum.galleryGorillas,
    exact: true,
    component: lazy(() => import('./GorillasGallery')),
  },
  {
    path: routesEnum.cureCats,
    exact: true,
    component: lazy(() => import('./CureCats')),
  },
  {
    path: routesEnum.details,
    exact: true,
    component: lazy(() => import('./Details')),
  },
];

export const Routes: FC = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route path={route.path} key={route.path as string} exact={route.exact} component={route.component} />
      ))}
    </Switch>
  );
};
