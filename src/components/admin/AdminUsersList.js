import React, { useState } from 'react'
import { Table, Icon, Divider, Tag, Switch, Input } from 'antd';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faFilter
} from '@fortawesome/free-solid-svg-icons';

let { Search } = Input

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

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        render: text => <Link to="/admin/users">{text}</Link>,
    },
    {
        title: 'Especialidad',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Rango',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Estado membresía',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
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
        ),
    },
    {
        title: 'Acciones',
        key: 'action',
        render: (text, record) => (
            <span>
                Cuenta activa <Switch defaultChecked={record.tags[0] === "activa"} />
                <Divider type="vertical" />
                <a style={{ color: "red" }}>Eliminar</a>
            </span>
        ),
    },
];
export default function AdminUsersList({ list = data }) {

    let [searchButton, setButton] = useState(true)
    let [filtered, setFiltered] = useState(list)

    function onSearch(value) {
        let regex = new RegExp(value, 'i')
        let f = list.filter(u => regex.test(u.name))
        setFiltered(f)
    }
    function onChange({ target: { value } }) {
        let regex = new RegExp(value, 'i')
        let f = list.filter(u => regex.test(u.name))
        setFiltered(f)
    }

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
                {searchButton ? <Search
                    onSearch={onSearch}
                    onChange={onChange}
                    size="large"
                    placeholder="Ingresa nombre" allowClear />
                    : null}
            </div>
            <div>
                <Table
                    // locale={{ emptyText: "Da enter para una busqueda profunda" }}
                    columns={columns} dataSource={filtered} />
            </div>

        </section>
    )
}