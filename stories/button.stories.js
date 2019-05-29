import React from "react";
import { storiesOf } from "@storybook/react";

import { Button } from "../src/components/common";

storiesOf("Button", module)
  .add("default button", () => <Button>Content</Button>)
  .add("button variations", () => (
    <React.Fragment>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button variant="solid">Content</Button>&nbsp; primary solid button
      </div>
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button variant="outlined">Content</Button>&nbsp; primary outlined
        button
      </div>
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button color="secondary" variant="solid">
          Content
        </Button>
        &nbsp; secondary solid button
      </div>
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button color="secondary" variant="outlined">
          Content
        </Button>
        &nbsp; secondary outlined button
      </div>
    </React.Fragment>
  ))
  .add("Loading button", () => <Button loading>Content</Button>)
  .add("Danger button", () => <Button color="danger">Content</Button>)
  .add("Success button", () => <Button color="success">Content</Button>);
