import React from "react";
import { storiesOf } from "@storybook/react";

import { Spinner } from "../src/components/common";

storiesOf("Spinner", module)
  .add("basic", () => <Spinner color="#000000" />)
  .add("size 30", () => <Spinner size={30} color="#000000" />)
  .add("color red", () => <Spinner size={30} color="red" />);
