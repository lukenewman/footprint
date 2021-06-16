import React from "react";
import renderer from 'react-test-renderer';
import Sidebar from "./Sidebar.js";

test("<Sidebar /> matches snapshot", () => {
  let categories = [
    {
      id: 0,
      name: "Housing"
    },
    {
      id: 1,
      name: "Travel"
    },
    {
      id: 3,
      name: "Other"
    },
  ];

  const component = renderer.create(
    <Sidebar categories={categories} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});