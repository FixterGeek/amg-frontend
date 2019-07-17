import React from "react";
import { connect } from "react-redux";

import TextField from "../../molecules/TextFields";
import Label from "../../atoms/data_entry/Label";
import { createUser } from "../../store/actions";

function InternshipDataForm(props) {
  const { user, dispatch } = props;

  const onChangeinternshipsData = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(
      createUser({ internships: { ...user.internships, [name]: value } })
    );
  };

  return (
    <form className="signup-form" style={{ width: "400px" }}>
      <TextField
        name="institution"
        label="Hospital"
        onChange={onChangeinternshipsData}
        value={user.internships.institution}
      />
      <Label>Fecha</Label>
      <div>
        <TextField
          name="startDate"
          label="De"
          width="121px"
          onChange={onChangeinternshipsData}
          value={user.internships.startDate}
        />
        <TextField
          name="endDate"
          label="A"
          width="121px"
          onChange={onChangeinternshipsData}
          value={user.internships.endDate}
        />
      </div>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(InternshipDataForm);
