import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Checkbox } from "../src/components/common";

import React from "react";

storiesOf("Checkbox", module)
  .add("unchecked", () => <Checkbox />)
  .add("checked", () => <Checkbox checked />)
  .add("disabled", () => <Checkbox disabled checked />)
  .add("with label", () => <Checkbox label={"My check box"} />)
  .add("onChange", () => <Checkbox onChange={action("Checkbox Changed")} />);
