import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Input, Icon } from "../src/components/common";

storiesOf("Input", module)
  .add("default input", () => <Input />)
  .add("with icons", () => (
    <Input
      iconLeft={<Icon type="fa" name={"user"} />}
      iconRight={<Icon type="fa" name={"user"} />}
    />
  ))
  .add("with error", () => (
    <Input error={true} errorText="Input cannot be empty" />
  ))
  .add("with error and icons", () => (
    <Input error={true} iconLeft={<Icon type="fa" name={"user"} />} />
  ))
  .add("with placeholder", () => <Input placeholder="Enter your username" />)
  .add("with value", () => <Input value="username" />)
  .add("with onchange event", () => <Input onChange={action("changed")} />);
