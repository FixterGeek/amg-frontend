import React, { useState, useEffect } from 'react';

import { getUserByFilter } from '../../../services/userServices';
import CheckboxField from '../../reusables/CheckboxField';

/**
 * return Object like JSON stringify to use in axios request
*/

function UserFilter({ usersArray, onResults }) {
  const [currentFilter, setCurrentFilter] = useState(null);
  const [speciality, setSpeciality] = useState(null);
  const [membership, setMembership] = useState(null);
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    if (currentFilter !== null) {
      getUserByFilter(currentFilter)
        .then((data) => {
          if (onResults) onResults(data);
        });
    }
  }, [currentFilter]);

  const handleFilter = (filter, name, value) => {
    let filteredUsers = [];

    if (name === 'speciality') {
      setSpeciality(value);
      filteredUsers = usersArray.filter(user => user.basicData.speciality === value);
    }
    if (name === 'membership') {
      setMembership(value);
      filteredUsers = usersArray.filter(user => user.membershipStatus === value);
    }
    if (name === 'userStatus') {
      setUserStatus(value);
      filteredUsers = usersArray.filter(user => user.userStatus === value);
    }

    onResults(filteredUsers);
  };

  console.log(usersArray);

  return (
    <div>
      <CheckboxField
        onChange={value => handleFilter({ 'basicData.speciality': value[0] }, 'speciality', value[0])}
        label="Especialidad"
        checks={['Gastroenterología', 'Endoscopia', 'Motilidad', 'Medicina Interna', 'Cirujano', 'Otra']}
        value={speciality}
      />
      <CheckboxField
        onChange={value => handleFilter({ membershipStatus: value[0] }, 'membership', value[0])}
        label="Membresia"
        checks={['Free', 'Residente', 'Socio', 'Veterano']}
        value={membership}
      />
      <CheckboxField
        onChange={value => handleFilter({ membershipStatus: value[0] }, 'userStatus', value[0])}
        label="Estado del usuario"
        checks={['Registrado', 'Pendiente', 'Aprobado', 'No Aprobado']}
        value={userStatus}
      />
    </div>
  );
}

export default UserFilter;
