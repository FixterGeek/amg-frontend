import React, {useState, useEffect} from 'react'
import { Checkbox } from 'antd';

const UsersFilters = ({handleFilter}) => {


    return (
        <div>
            <div>
                <span>search</span>
                <span>filters</span>
            </div>
            <div>
                <div>
                    <p>Especialidad</p>
                    <Checkbox onChange={handleFilter} name="Gastroenterología" value="Gastroenterología">
                        Gastroenterología
                    </Checkbox>
                    <Checkbox onChange={handleFilter} name="Endoscopía" value="Endoscopía">
                        Endoscopía
                    </Checkbox>
                    <Checkbox onChange={handleFilter} name="Motilidad" value="Motilidad">
                        Motilidad
                    </Checkbox>
                    <Checkbox onChange={handleFilter} name="Medicina Interna" value="Medicina Interna">
                        Medicina Interna
                    </Checkbox>
                    <Checkbox onChange={handleFilter} name="Cirujano" value="Cirujano">
                        Cirujano
                    </Checkbox>
                    <Checkbox onChange={handleFilter} name="Otra" value="Otra">
                        Otra
                    </Checkbox>
                </div>
            </div>
        </div>
    )
}

export default UsersFilters
