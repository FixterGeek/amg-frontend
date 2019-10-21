import React, { useState, useEffect } from 'react'
import { Table, Icon, Divider, Tag, Switch, Input, Popconfirm } from 'antd';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faFilter
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import UserFilter from './reusables/UserFilter';

let { Search } = Input;

const data = [
    {
        _id: '1',
        name: 'John Brown',
        age: "Gastroenterología",
        address: 'Emérito',
        tags: ['activa'],
    },
    {
        _id: '2',
        name: 'Jim Green',
        age: "Endoscopía",
        address: 'Titular',
        tags: ['pendiente'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: "Motricidad",
        address: 'Presidente',
        tags: ['activa', 'nuevo'],
    },
];

function AdminUsersList({ list = data, fetching, deleteAction }) {

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Link to={`/admin/users/${record._id}`}>{text}</Link>,
        },
        {
            title: 'Especialidad',
            dataIndex: 'speciality',
            key: 'speciality',
        },
        {
            title: 'Rango',
            dataIndex: 'userType',
            key: 'userType',
        },
        {
            title: 'Estado membresía',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags = []) => {
                console.log('A tag', tags)
                return (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 6 ? 'volcano' : 'green';
                            if (tag === 'nuevo') {
                                color = 'blue';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                )
            },
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (text, record) => {
                const { tags = [] } = record;
                return (
                    <span>
                        Cuenta activa <Switch defaultChecked={tags[0] === "activa"} />
                        <Divider type="vertical" />
                        <Popconfirm
                            title={`¿Eliminar a ${record.basicData.name} ${record.basicData.dadSurname}?`}
                            cancelText="NO"
                            okText="SI"
                            placement="left"
                            onConfirm={() => deleteAction(record._id)}
                        >
                            <span style={{ color: '#e24c4c', cursor: 'pointer' }}>Eliminar</span>
                        </Popconfirm>
                    </span>
                )
            },
        },
    ];

    let [searchButton, setButton] = useState(true)
    let [filtered, setFiltered] = useState(list);
    useEffect(() => {
        setFiltered(list)
    }, [list])
    //effect

    function onSearch(value) {
        let regex = new RegExp(value, 'i')
        let f = list.filter(u => regex.test(u.name))
        setFiltered(f)
    }
    function onChange({ target: { value } }) {
        let regex = new RegExp(value, 'i')
        let f = list.filter(u => regex.test(u.name) || regex.test(u.email))
        setFiltered(f)
    }

    const handleFilterResults = (resultsArray) => {
        setFiltered(resultsArray);
    }

    console.log(list);

    return (
        <section>
            <div className="admin-users-list-bar-buttons">
                <div className="admin-list-bar-icon-group">
                    <Icon
                        onClick={() => setButton(true)}
                        className={searchButton ? "bar-button-active" : 'bar-button-not-active'}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Icon>
                    <Icon
                        onClick={() => setButton(false)}
                        className={!searchButton ? "bar-button-active" : 'bar-button-not-active'}>
                        <FontAwesomeIcon icon={faFilter} />
                    </Icon>
                </div>

            </div>
            <div className="admin-users-list-bar">
                {
                    searchButton ? <Search
                    onSearch={onSearch}
                    onChange={onChange}
                    size="large"
                    placeholder="Ingresa nombre" allowClear />
                    : <UserFilter usersArray={list} onResults={handleFilterResults} />
                }
            </div>
            <div>
                <Table
                    loading={fetching}
                    // locale={{ emptyText: "Da enter para una busqueda profunda" }}
                    columns={columns} dataSource={filtered} />
            </div>

        </section>
    )
}

function mapState({ users }) {
    let list = users.array.map(u => {
        let user = {
            name: u.basicData.name + " " + u.basicData.dadSurname,
            speciality: u.basicData.speciality || "Gastroenterología",
            address: 'Emérito',
            tags: ['activa'],
        }
        user = { ...user, ...u }
        return user
    })
    return { list, fetching: users.fetching }
}

export default connect(mapState)(AdminUsersList)