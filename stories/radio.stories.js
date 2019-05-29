import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Radio } from "../src/components/common";

import React from "react";

storiesOf("Radio Button", module)
  .add("unchecked", () => <Radio />)
  .add("checked", () => <Radio checked />)
  .add("disabled", () => <Radio disabled checked />)
  .add("with label", () => <Radio label={"My check box"} />)
  .add("onChange", () => <Radio onChange={action("Checkbox Changed")} />);
