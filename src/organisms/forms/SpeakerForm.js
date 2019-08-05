import React from "react";
import TextField from "../../molecules/TextFields";
import AmgButton from "../../atoms/Button";

function SpeakerForm() {
  return (
    <form className="signup-form" style={{ width: "445px" }}>
      <TextField
        //value={user.basicData.name}
        //onChange={onChangeBasicData}
        name="fullName"
        label="Nombre del ponente"
        //error={error.name}
      />
      <AmgButton width="100%" htmlType="submit">
        Subir evento
      </AmgButton>
    </form>
  );
}

export default SpeakerForm;
