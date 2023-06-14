import { ChangeEvent, useState } from "react";
import { InputCheckbox } from "./styled/Forms";
import { BsSquare, BsCheckSquare } from "react-icons/bs";

export const CheckBox = () => {
  const [checked, setChecked] = useState(false);
  const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
  };
  return (
    <>
      <label htmlFor="checkbox">
        <InputCheckbox
          type="checkbox"
          onChange={checkHandler}
          id="checkbox"
          style={{ opacity: 0 }}
          required
        />
        {!checked && <BsSquare fill={"white"} size={24} />}
        {checked && (
          <BsCheckSquare
            fill={"white"}
            style={{ background: "#4b5f7b" }}
            size={24}
          />
        )}
      </label>
    </>
  );
};
