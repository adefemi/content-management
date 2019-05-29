import React from "react";
import { storiesOf } from "@storybook/react";

import { Button } from "../src/components/common";

storiesOf("Button", module)
  .add("default input", () => <Button>Content</Button>)
  .add("Loading button", () => <Button loading>Content</Button>)
  .add("Danger button", () => <Button color="danger">Content</Button>)
  .add("Success button", () => <Button color="success">Content</Button>);
