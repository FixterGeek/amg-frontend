import React from 'react';

import { Typography } from 'antd';

import NavBar from '../../organisms/NavBar';
import Footer from './Footer';
import MembersBlock from './reusables/MembersBlock';
import Button from '../reusables/Button';
import mesaspdf from '../../assets/Mesas-directivas-1935-2019.pdf';

export function DirectivesTable() {
  const { Title, Text } = Typography;
  const data = [
    {
      year: '2019',
      members: [
        { name: 'Dr. Felipe Zamarripa Dorsey', position: 'Presidente'  },
        { name: 'Dra. María Eugenia Icaza Chávez', position: 'Vicepresidente'  },
        { name: 'Dr. Mario César Peláez Luna', position: 'Secretario'  },
        { name: 'Dr. Louis Francois De Giau Triulzi', position: 'Tesorero'  },
        { name: 'Dr. Fernando Rojas Mendoza', position: 'Protesorero'  },
        { name: 'Dra. María F. Higuera de la Tijera', position: 'Secretario de Actos'  },
        { name: 'Dr. Miguel Morales Arámbula', position: 'Secretario de Relaciones'  },
      ],
      advice: [
        'Dr. Ramón I. Carmona Sánchez', 'Dr. Aurelio López Colombo', 'Dra. María Victoria Bielsa Fernández'
      ]
    },
    {
      year: '2018',
      members: [
        { name: 'Dr. Aurelio López Colombo', position: 'Presidente'  },
        { name: 'Dr. Ramón I. Carmona Sánchez', position: 'Vicepresidente'  },
        { name: 'Dr. Felipe Zamarripa Dorsey', position: 'Secretario'  },
        { name: 'Dr. Enrique Coss Adame', position: 'Tesorero'  },
        { name: 'Dr. Octavio Gómez Escudera', position: 'Protesorero'  },
        { name: 'Dr. Eduardo Prado Orozco', position: 'Secretario de Actas'  },
        { name: 'Dr. Louis François De Giau Triulzi', position: 'Secretario de Relaciones'  },
      ]
    },
    {
      year: '2017',
      members: [
        { name: 'Dr. Ramón I. Carmona Sánchez', position: 'Presidente'  },
        { name: 'Dr. Felipe Zamarripa Dorsey', position: 'Vicepresidente'  },
        { name: 'Dr. José Antonio Chávez Barrera', position: 'Secretario'  },
        { name: 'Dr. Octavio Gómez Escudero', position: 'Tesorero'  },
        { name: 'Dr. Louis Francois De Giau Triulzi', position: 'Protesorero'  },
        { name: 'Dr. Miguel Morales Arámbula', position: 'Secretario de Actas'  },
        { name: 'Dr. Louis François De Giau Triulzi', position: 'Secretario de Relaciones'  },
      ]
    },
    {
      year: '2016',
      members: [
        { name: 'Dra. María Victoria Bielsa Fernández', position: 'Presidente'  },
        { name: 'Dr. Aurelio López Colombo', position: 'Vicepresidente'  },
        { name: 'Dra. Alejandra Noble Lugo', position: 'Secretario'  },
        { name: 'Dr. Jesús K. Yamamoto Furusho', position: 'Tesorero'  },
        { name: 'Dr. Enrique Coss Adame', position: 'Protesorero'  },
        { name: 'Dr. Louis François De Giau Triulzi', position: 'Secretario de Actos'  },
        { name: 'Dr. Marco A. Lira Pedrín', position: 'Secretario de Relaciones'  },
      ],
      advice: [
        'Dr. Francisco J. Bosques padilla', 'Dr. Miguel A. Valdovinos Díaz', 'Dr. Francisco Esquivel Ayanegui'
      ]
    },
  ]
  return (
    <div className="app home-tables">
      <NavBar className="home-tables-navbar" />
      <div className="home-tables-content">
        <Title>Mesas directivas</Title>
          <div>
            {
              data.map(block => {
                return (
                  <MembersBlock year={block.year} members={block.members} advice={block.advice} />
                )
              })
            }
          </div>
      </div>
      <div style={{
            textAlign: 'center', display: 'flex',
            flexFlow: 'column', alignItems: 'center',
            marginTop: '32px', backgroundColor: '#f5f8f9',
            padding: '32px', paddingBottom: '32px', width: '100%'
          }}>
            <Title level={3}>Mesas directivas</Title>
            <Text strong style={{ width: '400px', display: 'inline-block', textAlign: 'center' }}>
              Conoce todas las mesas directivas desde la fundación de la
              Asociación Mexicana de Gastroenterología, A. C.
            </Text>
            <a href={mesaspdf} target="_blank">
              <Button>Ver todas las mesas directivas</Button>
            </a>
          </div>
      <Footer />
    </div>
  )
}

export default DirectivesTable;