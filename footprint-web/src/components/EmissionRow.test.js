import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { InputNumber } from 'antd';

import EmissionRow from "./EmissionRow.js";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

let emissionType = {
  name: "Natural Gas",
  units: "therms/year"
};

it("renders emission type name and units", () => {
  act(() => {
    render(<EmissionRow emissionType={emissionType} />, container);
  });
  expect(container.textContent).toBe(emissionType.name + emissionType.units);
});

it("renders an InputNumber", () => {
  act(() => {
    render(<EmissionRow emissionType={emissionType} />, container);
  });
  expect(container.contains(<InputNumber />).exists()).toBeTruthy();
});