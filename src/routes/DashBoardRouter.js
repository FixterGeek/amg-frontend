import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import moment from 'moment';

import { logoutAction } from '../store/ducks/userDuck';
import { getUser } from '../services/userServices';
import useSweet from '../hooks/useSweetAlert';

import Feed from '../components/feed/Feed';
import EventsList from '../components/events/EventsList';
import EventDetail from '../components/events/EventDetail';
import Program from '../components/events/Program';
import Speakers from '../components/events/Speakers';
import EventCourses from '../components/events/EventCourses';
import EventCoursesDetail from '../components/events/EventCourseDetail';
import ActivityDetail from '../components/events/ActivityDetail';
import Settings from '../components/settings/Settings';
import MembershipPayment from '../components/membership/MembershipPayment';
import MembershipPaymentCard from '../components/membership/MembersipPaymentCard';
import PersonalProfile from '../components/profile/PersonalProfile';
import MainProfile from '../components/profile/MainProfile';
import UserProfilFollow from '../components/profile/UserProfileDetails';
import PaymentEvent from '../components/membership/PaymentEvent';
import PaymentCourses from '../components/membership/PaymentCourse';
import MembershipInvoice from '../components/membership/MembershipInvoice';
import Resources from '../components/resources/Resources';
import Guides from '../components/resources/Guides';
import Posts from '../components/resources/Posts';
import UserList from '../components/profile/UsersList';


function DashBoardRouter({
  userStatus, logoutAction, history,
  userId, memberShipStatus,
}) {
  const baseURL = '/dashboard';
  const { infoAlert } = useSweet();

  useEffect(() => {
    if (userStatus === 'Inactivo') {
      logoutAction();
      history.push('/');
      infoAlert({ text: 'Tu cuenta fue desactivada de forma temporal.' });
    }
  }, [userStatus]);

  useEffect(() => {
    // token verification
    const token = localStorage.authToken;
    if (!token) history.push('/')
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const tokenData = JSON.parse(window.atob(base64));
      const { exp } = tokenData;
      const diff = moment().isAfter(moment.unix(exp));
      if (diff) {
        logoutAction();
        history.push('/login');
      }
    }

    getUser(userId)
      .then((userRes) => {
        if (userRes.memberShipStatus === 'Free' && memberShipStatus !== userRes.memberShipStatus) {
          logoutAction();
          history.push('/login');
        }
      })
  }, []);

  return (
    <Switch>
      <Route path={`${baseURL}/perfil/publico/:slug`} component={UserProfilFollow} />
      <Route exact path={`${baseURL}/perfil/editar`} component={PersonalProfile} />
      <Route path="/dashboard/perfil" component={MainProfile} />
      <Route path="/dashboard/pagos/:id/facturar" component={MembershipInvoice} />
      {/* Payments */}
      <Route path={`${baseURL}/pago/evento/:eventId/cursos`} component={PaymentCourses} />
      <Route path={`${baseURL}/payment/event/:id`} component={PaymentEvent} />
      <Route path={`${baseURL}/payment/membership/:type`} component={MembershipPaymentCard} />
      <Route path={`${baseURL}/payment/:membership`} component={MembershipPayment} />
      {/* Events */}
      <Route path={`${baseURL}/events/:id/program/:id`} component={ActivityDetail} />
      <Route path={`${baseURL}/events/:id/program`} component={Program} />
      <Route exact path={`${baseURL}/eventos/:eventId/cursos/:courseId`} component={EventCoursesDetail} />
      <Route path={`${baseURL}/events/:id/cursos`} component={EventCourses} />
      <Route path={`${baseURL}/events/:id/speakers`} component={Speakers} />
      <Route path={`${baseURL}/eventos/:id`} component={EventDetail} />
      <Route exact path={`${baseURL}/events`} component={EventsList} />
      {/* Resources */}
      <Route path={`${baseURL}/recursos/guias`} component={Guides} />
      <Route path={`${baseURL}/recursos/publicaciones`} component={Posts} />
      <Route excat path={`${baseURL}/recursos`} component={Resources} />
      <Route exact path={`${baseURL}/settings/`} component={Settings} />
      <Route exact path={`${baseURL}`} component={Feed} />
      {/* User */}
      <Route exact path={`${baseURL}/usuario/:userId/seguidores`} component={UserList} />
      <Route exact path={`${baseURL}/usuario/:userId/siguiendo`} component={UserList} />
    </Switch>
  );
}

function mapStateToProps({ user }) {
  return {
    userStatus: user.userStatus,
    userId: user._id,
    memberShipStatus: user.memberShipStatus,
  }
}

export default withRouter(connect(
  mapStateToProps, {
    logoutAction
  }
)(DashBoardRouter));
