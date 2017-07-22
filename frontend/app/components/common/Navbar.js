import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/NavLink';
// import { NavItem } from 'react-bootstrap';
import { Menu, Image, Dropdown } from 'semantic-ui-react';

import Notification from 'containers/Globals/Notifications/Loadable';

class TopNavBar extends React.PureComponent {
  render() {
    const {
      Logo,
      ProfilePic,
      username,
      handleLogout,
      navigateToProfilePage,
      updateNotificationSeenStatus
    } = this.props;
    const trigger = (
      <span>
        <Image avatar src={ProfilePic} /> {username && username}
      </span>
    );
    return (
      <Menu secondary>
        <Menu.Item name="logo">
          <Link to="/">
            <Image src={Logo} />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="logo">
            <Link to="/">
              <i className="icon-home-outline" />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Dropdown trigger={trigger}>
              <Dropdown.Menu>
                <Dropdown.Item text="Profile" onClick={() => navigateToProfilePage()} />
                <Dropdown.Item text="Logout" onClick={() => handleLogout()} />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
// =======
// const TopNavBar = ({
//   Logo,
//   ProfilePic,
//   username,
//   handleLogout,
//   navigateToProfilePage,
//   updateNotificationSeenStatus,
//   seeAllNotifications,
//   newNotificationsCount
// }) =>
//   (<header className="clearfix">
//     <Link to="/">
//       <img src={Logo} alt="xceltrip" className="logo logo-sm" />
//     </Link>
//     {/* <Navbar>*/}
//     <Nav pullRight className="navbar-nav">
//       <NavItem href="/">
//         <i className="icon-home-outline" />
//       </NavItem>
//
//       <NavDropdown
//         key="Notification"
//         onClick={updateNotificationSeenStatus}
//         title={
//           <span className="notification">
//             <i className="icon-bell-o" />
//             {
//               newNotificationsCount > 0 &&
//               ((newNotificationsCount <= 99) ?
//                 <span className="new_notifications_count">{  newNotificationsCount}</span> :
//                 <span className="new_notifications_count">99<i className="fa fa-plus"/></span>)
//
//             }
//           </span>
//         }
//         id="notification_dropdown"
//       >
//         <Notification className="pull-right" />
//         {
//           newNotificationsCount > 0 && <MenuItem onClick={() => seeAllNotifications()}>See all</MenuItem> }
//       </NavDropdown>
//
//       <NavDropdown
//         eventKey={1}
//         title={
//           <span
//             data-toggle="dropdown"
//             role="button"
//             aria-haspopup="true"
//             aria-expanded="false"
//           >
//             <img src={ProfilePic} /> {username && username}{' '}
//           </span>
//         }
//         id="basic-nav-dropdown"
//       >
//         <MenuItem onClick={() => navigateToProfilePage()}>Profile</MenuItem>
//         <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
//       </NavDropdown>
//     </Nav>
//   </header>);
// >>>>>>> a753e6ab6ae897a6385edf9e2c66bc4d46c85096

TopNavBar.propTypes = {
  Logo: PropTypes.string.isRequired,
  ProfilePic: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  navigateToProfilePage: PropTypes.func.isRequired,
  updateNotificationSeenStatus: PropTypes.func.isRequired,
  newNotificationsCount: PropTypes.number.isRequired,
  seeAllNotifications: PropTypes.func
};

export default TopNavBar;
