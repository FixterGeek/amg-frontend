import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { populateActivitiesAction } from '../../store/ducks/activitiesDuck';
import Gastro from '../../atoms/gastro/Gastro';
import Steper from '../../organisms/Steper';
import Button from '../../atoms/Button';
import BoxItem from '../../atoms/BoxItem';

/* was created for profile but is usable in signpup */
import LaboralExperienceModal from '../../components/profile/editables/LaboralExperience';

const LaboralData = ({ activities, populateActivitiesAction }) => {
  useEffect(() => {
    if (!activities[0]) populateActivitiesAction();
  }, [])
  return (
    <div className="signup-container">
      <div className="signup-container-left">
        <Gastro />
        <Steper />
      </div>

      <div className="signup-container-rigth">
        <LaboralExperienceModal />

        {
          activities.map(activity => (
            <BoxItem
              title={activity.charge || activity.subject || activity.institution.name}
              level1={activity.institution.name}
              level2={
                `${moment(activity.startDate).format('YYY')} - ${moment(activity.endDate).format('YYYY')}`
            } />
          ))
        }

        <Button width="100%">
          <Link to="/signup/fiscal">Siguiente</Link>
        </Button>
      </div>
    </div>
  );
};

function mapSateToProps({ activities }) {
  return {
    activities: activities.activitiesArray,
  };
}

export default connect(mapSateToProps, { populateActivitiesAction })(LaboralData);
