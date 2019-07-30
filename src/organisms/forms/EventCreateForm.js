import React from "react";
import TextField from "../../molecules/TextFields";
import Label from "../../atoms/data_entry/Label";

function EventCreateForm() {
  return (
    <form className="signup-form" style={{ width: "445px" }}>
      <TextField
        //value={user.basicData.name}
        //onChange={onChangeBasicData}
        name="title"
        label="Nombre del evento"
        //error={error.name}
      />
      <Label>Fechas</Label>
      <div className="dates-inline">
        {/* <DatePicker className="date-field" /> */}
        <TextField
          //onChange={onChangeStudiesData}
          //value={user.studies.startDate}
          type="date"
          name="startDate"
          label="De"
          width="180px"
        />
        <TextField
          //onChange={onChangeStudiesData}
          //value={user.studies.endDate}
          type="date"
          name="endDate"
          label="A"
          width="180px"
        />
      </div>
      <TextField
        //value={user.basicData.name}
        //onChange={onChangeBasicData}
        name="street"
        label="Dirección"
        //error={error.name}
      />
      <TextField
        //value={user.basicData.name}
        //onChange={onChangeBasicData}
        name="street"
        label="Código postal"
        //error={error.name}
      />
      <TextField
        //value={user.basicData.name}
        //onChange={onChangeBasicData}
        name="street"
        label="Estado"
        //error={error.name}
      />
      <Label>Programa</Label>
    </form>
  );
}

export default EventCreateForm;
