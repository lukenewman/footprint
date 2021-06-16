import React from "react";
import renderer from 'react-test-renderer';
import EmissionRow from "./EmissionRow.js";

test("<EmissionRow /> matches snapshot", () => {
  let emissionType = {
    name: "Natural Gas",
    units: "therms/year"
  };

  const component = renderer.create(
    <EmissionRow emissionType={emissionType} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});