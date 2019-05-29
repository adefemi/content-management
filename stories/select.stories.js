import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Select, Icon } from "../src/components/common";

storiesOf("Select", module)
  .add("default select", () => (
    <Select value="female">
      <Select.Option value="female">Male</Select.Option>
      {[].map((item, id) => "Hello")}
    </Select>
  ))
  .add("with options", () => (
    <React.Fragment>
      <Select>
        <Select.Option value="male">Male</Select.Option>
      </Select>
      <Select value="">
        <Select.Option value="">Select Something</Select.Option>
        <Select.Option value="male">Male</Select.Option>
        <Select.Option value="female">Female</Select.Option>
        <Select.Option value="prefer not to say">
          Prefer not to say
        </Select.Option>
      </Select>
      <Select>
        <Select.Option value="male">Male</Select.Option>
        <Select.Option value="female">Female</Select.Option>
        <Select.Option value="prefer not to say">
          Prefer not to say
        </Select.Option>
      </Select>
    </React.Fragment>
  ))
  .add("with default value", () => (
    <Select value="male">
      <Select.Option value="male">Male</Select.Option>
      <Select.Option value="female">Female</Select.Option>
      <Select.Option value="prefer not to say">Prefer not to say</Select.Option>
    </Select>
  ))
  .add("with icons", () => (
    <Select value="male" iconLeft={<Icon type="fa" name={"user"} />}>
      <Select.Option value="male">Male</Select.Option>
      <Select.Option value="female">Female</Select.Option>
      <Select.Option value="prefer not to say">Prefer not to say</Select.Option>
    </Select>
  ))
  .add("with error", () => (
    <Select
      value="male"
      iconLeft={<Icon type="fa" name={"user"} />}
      error={true}
    >
      <Select.Option value="male">Male</Select.Option>
      <Select.Option value="female">Female</Select.Option>
      <Select.Option value="prefer not to say">Prefer not to say</Select.Option>
    </Select>
  ))
  .add("with placeholder", () => (
    <Select placeholder="choose your gender">
      <Select.Option value="male">Male</Select.Option>
      <Select.Option value="female">Female</Select.Option>
      <Select.Option value="prefer not to say">Prefer not to say</Select.Option>
    </Select>
  ))
  .add("with onchange event", () => (
    <Select
      placeholder="choose your gender"
      onChange={action("select changed")}
    >
      <Select.Option value="male">Male</Select.Option>
      <Select.Option value="female">Female</Select.Option>
      <Select.Option value="prefer not to say">Prefer not to say</Select.Option>
    </Select>
  ));
