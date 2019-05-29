import React from "react";

import { storiesOf } from "@storybook/react";
import { Icon } from "../src/components/common";

storiesOf("Icon", module)
  .add("with Font Awesome", () => <Icon type={"fa"} name={"spinner"} />)
  .add("with Feather icon", () => <Icon type={"feather"} name={"x"} />);
