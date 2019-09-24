import React, { useState } from 'react';
import { connect } from 'react-redux';

import { List, Checkbox } from 'antd';

import Button from '../../reusables/Button';

function AdminSpeakersAddList({
  speakers, onSpeakers
}) {
  const [addedSpeakers, setAddedSpeaker] = useState([]);

  const handleChange = (target, speakerId, speaker) => {
    console.log(target.checked);
    if (target.checked) {
      if (!addedSpeakers.includes(speakerId)) setAddedSpeaker([...addedSpeakers, speakerId]);
    } else {
      const filterSpeakers = addedSpeakers.filter(speaker => speaker !== speakerId);
      setAddedSpeaker(filterSpeakers);
    }
  }

  const handleAdd = () => {
    const spkrs = speakers.filter(speaker => addedSpeakers.includes(speaker._id))
    if (onSpeakers) onSpeakers(spkrs);
  }

  return (
    <List>
      {
        speakers.map(speaker => (
          <List.Item key={speaker._id}>
            { speaker.fullName }
            <div>
              <Checkbox
                onChange={({ target }) => handleChange(target, speaker._id, speaker)}
              />
            </div>
          </List.Item>
        ))
      }
      <Button width="100%" htmlType="button" onClick={() => handleAdd()}>
        Agregar ponentes seleccionados
      </Button>
    </List>
  );
}

function mapSatateToProps({ admin }) {
  return {
    fetching: admin.workingOn.fetching,
    status: admin.workingOn.status,
    speakers: admin.workingOn.speakers,
  };
}

export default connect(
  mapSatateToProps
)(AdminSpeakersAddList);
