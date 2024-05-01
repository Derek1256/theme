import React, { lazy } from 'react';
import ServerConsole from '@/components/server/console/ServerConsoleContainer';
import DatabasesContainer from '@/components/server/databases/DatabasesContainer';
import ScheduleContainer from '@/components/server/schedules/ScheduleContainer';
import UsersContainer from '@/components/server/users/UsersContainer';
import BackupContainer from '@/components/server/backups/BackupContainer';
import NetworkContainer from '@/components/server/network/NetworkContainer';
import StartupContainer from '@/components/server/startup/StartupContainer';
import FileManagerContainer from '@/components/server/files/FileManagerContainer';
import SettingsContainer from '@/components/server/settings/SettingsContainer';
import AccountOverviewContainer from '@/components/dashboard/AccountOverviewContainer';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import AccountSSHContainer from '@/components/dashboard/ssh/AccountSSHContainer';
import ActivityLogContainer from '@/components/dashboard/activity/ActivityLogContainer';
import ServerActivityLogContainer from '@/components/server/ServerActivityLogContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faTerminal, faFolder, faDatabase, faCalendar, faUsers, faArchive, faNetworkWired, faPlayCircle, faEye, faKey, IconDefinition } from '@fortawesome/free-solid-svg-icons';

// Each of the router files is already code split out appropriately — so
// all of the items above will only be loaded in when that router is loaded.
//
// These specific lazy loaded routes are to avoid loading in heavy screens
// for the server dashboard when they're only needed for specific instances.
const FileEditContainer = lazy(() => import('@/components/server/files/FileEditContainer'));
const ScheduleEditContainer = lazy(() => import('@/components/server/schedules/ScheduleEditContainer'));

interface RouteDefinition {
  path: string;
  // If undefined is passed this route is still rendered into the router itself
  // but no navigation link is displayed in the sub-navigation menu.
  name: string | undefined;
  component: React.ComponentType;
  icon?: IconDefinition;
  exact?: boolean;
}

interface ServerRouteDefinition extends RouteDefinition {
  permission: string | string[] | null;
  nestId?: number;
  eggId?: number;
  nestIds?: number[];
  eggIds?: number[];
}

interface Routes {
  // All of the routes available under "/account"
  account: RouteDefinition[];
  // All of the routes available under "/server/:id"
  server: ServerRouteDefinition[];
}

export default {
  account: [
    {
      path: '/',
      name: 'Settings',
      icon: faCogs,
      component: AccountOverviewContainer,
      exact: true,
    },
    {
      path: '/api',
      name: 'API Credentials',
      icon: faCogs,
      component: AccountApiContainer,
    },
    {
      path: '/ssh',
      name: 'SSH Keys',
      icon: faKey,
      component: AccountSSHContainer,
    },
    {
      path: '/activity',
      name: 'Activity',
      icon: faEye,
      component: ActivityLogContainer,
    },
  ],
  server: [
    {
      path: '/',
      permission: null,
      name: 'Console',
      icon: faTerminal,
      component: ServerConsole,
      exact: true,
    },
    {
      path: '/files',
      permission: 'file.*',
      name: 'Files',
      icon: faFolder,
      component: FileManagerContainer,
    },
    {
      path: '/files/:action(edit|new)',
      permission: 'file.*',
      name: undefined,
      component: FileEditContainer,
    },
    {
      path: '/databases',
      permission: 'database.*',
      name: 'Databases',
      icon: faDatabase,
      component: DatabasesContainer,
    },
    {
      path: '/schedules',
      permission: 'schedule.*',
      name: 'Schedules',
      icon: faCalendar,
      component: ScheduleContainer,
    },
    {
      path: '/schedules/:id',
      permission: 'schedule.*',
      name: undefined,
      component: ScheduleEditContainer,
    },
    {
      path: '/users',
      permission: 'user.*',
      name: 'Users',
      icon: faUsers,
      component: UsersContainer,
    },
    {
      path: '/backups',
      permission: 'backup.*',
      name: 'Backups',
      icon: faArchive,
      component: BackupContainer,
    },
    {
      path: '/network',
      permission: 'allocation.*',
      name: 'Network',
      icon: faNetworkWired,
      component: NetworkContainer,
    },
    {
      path: '/startup',
      permission: 'startup.*',
      name: 'Startup',
      icon: faPlayCircle,
      component: StartupContainer,
    },
    {
      path: '/settings',
      permission: ['settings.*', 'file.sftp'],
      name: 'Settings',
      icon: faCogs,
      component: SettingsContainer,
    },
    {
      path: '/activity',
      permission: 'activity.*',
      name: 'Activity',
      icon: faEye,
      component: ServerActivityLogContainer,
    },
  ],
} as Routes;

