import React, { useState } from 'react';
import { connect } from 'react-redux';

import { List, Checkbox, Input } from 'antd';

import Button from '../../reusables/Button';

function AdminSpeakersAddList({
  speakers, onSpeakers
}) {
  const { Search } = Input;
  const [addedSpeakers, setAddedSpeaker] = useState([]);
  const [filtered, setFiltered] = useState(speakers);

  const handleChange = (target, speakerId, speaker) => {
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

  const handleSearch = (value) => {
    const regex = new RegExp(value, 'i');
    const f = speakers.filter(s => regex.test(s.fullName));
    setFiltered(f);
  };

  return (
    <div>
      <Search
        onChange={({ target }) => handleSearch(target.value)}
        placeholder="Nombre del ponente"
        style={{ marginTop: '32px' }}
      />
      <List className="admin-speakers-add-list">
        {
          filtered.map(speaker => (
            <List.Item key={speaker._id} className="admin-speakers-add-list-item">
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
    </div>
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
