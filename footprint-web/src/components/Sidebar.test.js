import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import SideBar from "./Sidebar.js";

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

// it("renders emission type name and units", () => {
//   let emissionType = {
//     name: "Natural Gas",
//     units: "therms/year"
//   };

//   act(() => {
//     render(<EmissionRow emissionType={emissionType} />, container);
//   });
//   expect(container.textContent).toBe(emissionType.name);
//   expect(container.textContent).toBe(emissionType.units);
// });