import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TextField from "../../molecules/TextFields";
import AmgButton from "../../atoms/Button";
import { createUser } from "../../store/actions";
import Label from "../../atoms/data_entry/Label";

function CoursesDataForm(props) {
  const { history } = props;
  const { user, dispatch } = props;

  const onChangeResidenciesData = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(
      createUser({ residencies: { ...user.residencies, [name]: value } })
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push("laboral");
  };

  console.log(user);
  return (
    <form
      className="signup-form"
      style={{ width: "400px" }}
      onSubmit={handleSubmit}
    >
      <TextField
        value={user.residencies.institution}
        onChange={onChangeResidenciesData}
        name="institution"
        label="Institución"
      />
      <Label>Fecha</Label>
      <div>
        <TextField
          name="startDate"
          label="De"
          width="121px"
          onChange={onChangeResidenciesData}
          value={user.residencies.startDate}
        />
        <TextField
          name="endDate"
          label="A"
          width="121px"
          onChange={onChangeResidenciesData}
          value={user.residencies.endDate}
        />
      </div>
      <AmgButton width="100%" htmlType="submit">
        Siguiente
      </AmgButton>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps)(CoursesDataForm));
