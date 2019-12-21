import React, { useState } from 'react';

import CheckboxField from '../../reusables/CheckboxField';

/**
 * return Object like JSON stringify to use in axios request
*/

function UserFilter({ usersArray, onResults }) {
  const [currentFilter, setCurrentFilter] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(null);

  const handleFilter = (value) => {
    if (value.includes('No Aprobado')) value = [...value, 'Registrado']; 
    setCurrentFilter(value);

    if (!value[0]) {
      setFilteredUsers(null);
      onResults(usersArray);
      return;
    }

    const usersToFilter = usersArray;

    const filtered = usersToFilter.filter(
      user => {
        let incs = [false, false, false];
        if (value.includes(user.basicData.speciality)) incs[0] = true;
        if (value.includes(user.membershipStatus)) incs[1] = true;
        if (value.includes(user.userStatus)) incs[2] = true;

        return incs.includes(true);
      });

    setFilteredUsers(filtered);
    onResults(filtered);
  };

  return (
    <div className="admin-reusables-user-filter">
      <CheckboxField
        onChange={value => handleFilter(value)}
        checksGroup={[
          { name: 'Especialidad', checks: ['Gastroenterología', 'Endoscopia', 'Motilidad', 'Medicina Interna', 'Cirujano', 'Otra'] },
          { name: 'Membresia', checks: ['Free', 'Residente', 'Socio'] },
          { name: 'Estado del usuario', checks: ['Registrado', 'Pendiente', 'Aprobado', 'No Aprobado'] },
        ]}
        value={currentFilter}
        groupClassName="admin-reusables-user-filter-group"
      />
    </div>
  );
}

export default UserFilter;
