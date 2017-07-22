import React from 'react';
import Link from 'react-router-dom/Link';
import { Menu, Image, Dropdown } from 'semantic-ui-react';

import Notification from 'containers/Globals/Notifications/Loadable';
import Logo from 'assets/img/logo.svg';
import Avatar from 'assets/img/avatar.png';

const isDroppedDown = false;
const signUpEvent = userForm => {
  userForm('signup');
};

const loginEvent = userForm => {
  userForm('login');
};

const checkItemInArray = (user_role, userRole) =>
  user_role.some(item => userRole && userRole.length && userRole.includes(item));

class Navbar extends React.PureComponent {
  render() {
    const {
      isLoggedIn,
      userInstance,
      userForm,
      handleLogout,
      updateNotificationSeenStatus,
      seeAllNotifications
    } = this.props;
    const userRole = userInstance && userInstance.userInfo.user_role;

    const topNavMenus = [
      {
        title: 'My Lists',
        link: '/my-favourites',
        icon: 'icon-heart-o',
        dynamicData: false,
        authenticatedOnly: true,
        showText: true,
        showIcon: true,
        user_role: ['imp', 'enduser'],
        childMenu: []
      },
      {
        title: 'Notifications',
        link: '',
        icon: 'icon-bell-o',
        dynamicData: true,
        authenticatedOnly: true,
        showText: false,
        showIcon: true,
        childMenu: []
      },
      {
        title: 'Help',
        link: '/support',
        icon: 'icon-help-outline',
        dynamicData: false,
        authenticatedOnly: false,
        showText: true,
        showIcon: true,
        childMenu: []
      },
      {
        title: 'Sign In',
        link: '',
        icon: 'fa fa-login',
        action: loginEvent,
        dynamicData: false,
        authenticatedOnly: false,
        hideWhenLoggedIn: true,
        showText: true,
        showIcon: false,
        childMenu: []
      },
      {
        title: 'Sign Up',
        link: '',
        icon: 'fa fa-register',
        action: signUpEvent,
        dynamicData: false,
        authenticatedOnly: false,
        hideWhenLoggedIn: true,
        showText: true,
        showIcon: false,
        childMenu: []
      }
    ];

    let roleMenu = [];
    if (userRole && userRole.indexOf('superadmin') > -1) {
      roleMenu = [
        {
          title: 'My Dashboard',
          link: '/admin/dashboard'
        }
      ];
    }
    if (userRole && userRole.indexOf('hoteladmin') > -1) {
      roleMenu = [
        {
          title: 'My Dashboard',
          link: '/hotel/dashboard'
        }
      ];
    }
    if (userRole && userRole.indexOf('enduser') > -1) {
      roleMenu = [
        {
          title: 'My Dashboard',
          link: '/user/dashboard'
        }
      ];
    }
    // has to wrap inside a block so li is used. Yo change garnu parxa vane dai block ma wrap garnu hai
    if (userRole && userRole.indexOf('imp') > -1) {
      roleMenu = [
        {
          title: 'IMP Dashboard',
          link: '/imp/dashboard'
        },
        {
          title: 'User Dashboard',
          link: '/user/dashboard'
        }
      ];
    }

    const profileTrigger = (
      <span>
        <img className="avatar image" src={Avatar} alt="profileImg" />
      </span>
    );
    const notificationTrigger = <span className="item notification">notification</span>;
    return (
      <div>
        <div className={isLoggedIn ? 'topBar bg-gray' : 'topBar'}>
          <div className="container">
            <nav role="navigation" className="menu">
              <ul className="right menu">
                {topNavMenus.map((obj, index) => {
                  if (obj.dynamicData) {
                    if (isLoggedIn && obj.title === 'Notifications') {
                      return (
                        <Dropdown
                          key={obj.title}
                          onClick={updateNotificationSeenStatus}
                          trigger={notificationTrigger}
                          id="notification_dropdown"
                        >
                          <Notification />
                          <Menu.Item name="see all" onClick={() => seeAllNotifications()}>
                            See all
                          </Menu.Item>
                        </Dropdown>
                      );
                    }
                  } else if (obj.childMenu.length > 0) {
                  } else {
                    if (obj.authenticatedOnly) {
                      return (
                        ((isLoggedIn &&
                          obj.user_role &&
                          checkItemInArray(obj.user_role, userRole)) ||
                          (isLoggedIn && !obj.user_role)) &&
                        <li className="item" key={obj.title}>
                          {' '}{obj.action
                            ? <a href="javascript:void(0);" onClick={() => obj.action(userForm)}>
                                {obj.showIcon && <i className={obj.icon} />}
                                {obj.showText &&
                                  <label>
                                    {obj.title}
                                  </label>}
                              </a>
                            : <Link key={obj.title} to={obj.link}>
                                {obj.showIcon && <i className={obj.icon} />}
                                {obj.showText &&
                                  <label>
                                    {obj.title}
                                  </label>}
                              </Link>}{' '}
                        </li>
                      );
                    }
                    return obj.hideWhenLoggedIn
                      ? !isLoggedIn &&
                        <li className="item" key={obj.title}>
                          {' '}{obj.action
                            ? <a href="javascript:void(0);" onClick={() => obj.action(userForm)}>
                                {obj.showIcon && <i className={obj.icon} />}
                                {obj.showText &&
                                  <label>
                                    {obj.title}
                                  </label>}
                              </a>
                            : <Link className="item" key={obj.title} to={obj.link}>
                                {obj.showIcon && <i className={obj.icon} />}
                                {obj.showText &&
                                  <label>
                                    {obj.title}
                                  </label>}
                              </Link>}{' '}
                        </li>
                      : <li className="item" key={obj.title}>
                          {' '}{obj.action
                            ? <a href="javascript:void(0);" onClick={() => obj.action(userForm)}>
                                {obj.showIcon && <i className={obj.icon} />}
                                {obj.showText &&
                                  <label>
                                    {obj.title}
                                  </label>}
                              </a>
                            : <Link key={obj.title} to={obj.link}>
                                {obj.showIcon && <i className={obj.icon} />}
                                {obj.showText &&
                                  <label>
                                    {obj.title}
                                  </label>}
                              </Link>}{' '}
                        </li>;
                  }
                })}
                {isLoggedIn &&
                  <Dropdown trigger={profileTrigger} id="admin_nav_dropdown">
                    <Dropdown.Menu>
                      {roleMenu.map((obj, index) =>
                        <Dropdown.Item key={index} href={obj.link}>
                          {obj.title}
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item onClick={() => handleLogout()}>LogOut</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>}
              </ul>
            </nav>
          </div>
        </div>
        <div id="header" className={isLoggedIn ? 'loggedIn' : 'noLogged'}>
          <div className="container">
            <Link to="/">
              <img src={Logo} alt="xceltrip" className="logo" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

// const Navbar = ({
//   isLoggedIn,
//   userInstance,
//   userForm,
//   handleLogout,
//   updateNotificationSeenStatus,
//   seeAllNotifications
// }) => {
//   const userRole = userInstance && userInstance.userInfo.user_role;
//
//   const topNavMenus = [
//     {
//       title: 'My Lists',
//       link: '/my-favourites',
//       icon: 'icon-heart-o',
//       dynamicData: false,
//       authenticatedOnly: true,
//       showText: true,
//       showIcon: true,
//       user_role: ['imp', 'enduser'],
//       childMenu: []
//     },
//     {
//       title: 'Notifications',
//       link: '',
//       icon: 'icon-bell-o',
//       dynamicData: true,
//       authenticatedOnly: true,
//       showText: false,
//       showIcon: true,
//       childMenu: []
//     },
//     {
//       title: 'Help',
//       link: '/support',
//       icon: 'icon-help-outline',
//       dynamicData: false,
//       authenticatedOnly: false,
//       showText: true,
//       showIcon: true,
//       childMenu: []
//     },
//     {
//       title: 'Sign In',
//       link: '',
//       icon: 'fa fa-login',
//       action: loginEvent,
//       dynamicData: false,
//       authenticatedOnly: false,
//       hideWhenLoggedIn: true,
//       showText: true,
//       showIcon: false,
//       childMenu: []
//     },
//     {
//       title: 'Sign Up',
//       link: '',
//       icon: 'fa fa-register',
//       action: signUpEvent,
//       dynamicData: false,
//       authenticatedOnly: false,
//       hideWhenLoggedIn: true,
//       showText: true,
//       showIcon: false,
//       childMenu: []
//     }
//   ];
//
//   let roleMenu = [];
//   if (userRole && userRole.indexOf('superadmin') > -1) {
//     roleMenu = [
//       {
//         title: 'My Dashboard',
//         link: '/admin/dashboard'
//       }
//     ];
//   }
//   if (userRole && userRole.indexOf('hoteladmin') > -1) {
//     roleMenu = [
//       {
//         title: 'My Dashboard',
//         link: '/hotel/dashboard'
//       }
//     ];
//   }
//   if (userRole && userRole.indexOf('enduser') > -1) {
//     roleMenu = [
//       {
//         title: 'My Dashboard',
//         link: '/user/dashboard'
//       }
//     ];
//   }
//   // has to wrap inside a block so li is used. Yo change garnu parxa vane dai block ma wrap garnu hai
//   if (userRole && userRole.indexOf('imp') > -1) {
//     roleMenu = [
//       {
//         title: 'IMP Dashboard',
//         link: '/imp/dashboard'
//       },
//       {
//         title: 'User Dashboard',
//         link: '/user/dashboard'
//       }
//     ];
//   }
//
//   return (
//     <div>
//       <div className={isLoggedIn ? 'topBar bg-gray' : 'topBar'}>
//         <div className="container">
//           <nav role="navigation" className="menu">
//             <ul className="right menu">
//               {topNavMenus.map((obj, index) => {
//                 if (obj.dynamicData) {
//                   if (isLoggedIn && obj.title === 'Notifications') {
//                     return (
//                       <NavDropdown
//                         key={obj.title}
//                         onClick={updateNotificationSeenStatus}
//                         title={
//                           <span className="item notification">
//                             {obj.showIcon && <i className="{obj.icon}" />}
//                             {obj.showText &&
//                               <label>
//                                 {obj.title}
//                               </label>}
//                           </span>
//                         }
//                         id="notification_dropdown"
//                       >
//                         <Notification />
//                         <Menu.Item name="see all" onClick={() => seeAllNotifications()}>
//                           See all
//                         </Menu.Item>
//                       </NavDropdown>
//                     );
//                   }
//                 } else if (obj.childMenu.length > 0) {
//                 } else {
//                   if (obj.authenticatedOnly) {
//                     return (
//                       ((isLoggedIn && obj.user_role && checkItemInArray(obj.user_role, userRole)) ||
//                         (isLoggedIn && !obj.user_role)) &&
//                       <li className="item" key={obj.title}>
//                         {' '}{obj.action
//                           ? <a href="javascript:void(0);" onClick={() => obj.action(userForm)}>
//                               {obj.showIcon && <i className={obj.icon} />}
//                               {obj.showText &&
//                                 <label>
//                                   {obj.title}
//                                 </label>}
//                             </a>
//                           : <Link key={obj.title} to={obj.link}>
//                               {obj.showIcon && <i className={obj.icon} />}
//                               {obj.showText &&
//                                 <label>
//                                   {obj.title}
//                                 </label>}
//                             </Link>}{' '}
//                       </li>
//                     );
//                   }
//                   return obj.hideWhenLoggedIn
//                     ? !isLoggedIn &&
//                       <li className="item" key={obj.title}>
//                         {' '}{obj.action
//                           ? <a href="javascript:void(0);" onClick={() => obj.action(userForm)}>
//                               {obj.showIcon && <i className={obj.icon} />}
//                               {obj.showText &&
//                                 <label>
//                                   {obj.title}
//                                 </label>}
//                             </a>
//                           : <Link className="item" key={obj.title} to={obj.link}>
//                               {obj.showIcon && <i className={obj.icon} />}
//                               {obj.showText &&
//                                 <label>
//                                   {obj.title}
//                                 </label>}
//                             </Link>}{' '}
//                       </li>
//                     : <li className="item" key={obj.title}>
//                         {' '}{obj.action
//                           ? <a href="javascript:void(0);" onClick={() => obj.action(userForm)}>
//                               {obj.showIcon && <i className={obj.icon} />}
//                               {obj.showText &&
//                                 <label>
//                                   {obj.title}
//                                 </label>}
//                             </a>
//                           : <Link key={obj.title} to={obj.link}>
//                               {obj.showIcon && <i className={obj.icon} />}
//                               {obj.showText &&
//                                 <label>
//                                   {obj.title}
//                                 </label>}
//                             </Link>}{' '}
//                       </li>;
//                 }
//               })}
//               {isLoggedIn &&
//                 <Dropdown
//                   title={<img className="avatar image" src={Avatar} alt="profileImg" />}
//                   id="admin_nav_dropdown"
//                 >
//                   <Dropdown.Menu>
//                     {roleMenu.map((obj, index) =>
//                       <Dropdown.Item key={index} href={obj.link}>
//                         {obj.title}
//                       </Dropdown.Item>
//                     )}
//                     <Dropdown.Item onClick={() => handleLogout()}>LogOut</Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>}
//             </ul>
//           </nav>
//         </div>
//       </div>
//       <div id="header" className={isLoggedIn ? 'loggedIn' : 'noLogged'}>
//         <div className="container">
//           <Link to="/">
//             <img src={Logo} alt="xceltrip" className="logo" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Navbar;
