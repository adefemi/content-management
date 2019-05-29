import React, { useState, Fragment } from "react";
import Layout from "../generics/layout";
import { productConfig } from "../generics/data";
import axios from "axios";

const audioFormats = Object.freeze(["mp3", "wav", "aff", "jpg", "jpeg"]);

const ContentCard = props => {
  return (
    <div className={`content-card ${props.className}`}>
      <div className="card-header">
        <h3>{props.heading}</h3>
      </div>

      <div className="card-content minmal">{props.children}</div>
    </div>
  );
};

const TextComponent = props => {
  const [content, setContent] = useState("");
  const totalCount = 160;

  const onChange = e => {
    setContent(e.target.value);
    props.onChange(e);
  };

  return (
    <div className="text-container">
      <textarea
        required={props.required}
        name={props.name}
        onChange={e => onChange(e)}
      />
      <div className="counter">
        {totalCount - (content.length % totalCount)} /{" "}
        {(content.length - (content.length % totalCount)) / totalCount + 1}
      </div>
      <div className="clear" />
    </div>
  );
};

class ContentManagement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: productConfig.productId,
      deliveryName: productConfig.deliveryMethod.name,
      smsType: productConfig.sources.sms.type,
      ussdType: productConfig.sources.ussd.type,
      ivrType: productConfig.sources.ivr.type,
      webType: productConfig.sources.web.type
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileChange = e => {
    if (!e.target.files[0]) {
      return;
    }
    let filename = e.target.files[0].name;
    let ext = filename.split(".").pop();
    let valid = audioFormats.filter(item => item === ext);

    if (valid.length < 1) {
      alert("Please provide valid audio format");
      e.target.value = "";
      return;
    }

    this.setState({ ivr: e.target.files[0] });
  };

  onSave = (type, props, submit) => {
    let data;
    let attribute;

    if (this.state.deliveryName.toLowerCase() === "daily") {
      if (!this.state["date"]) {
        alert("provide a delivery date");
        return;
      } else {
        attribute = {
          name: "daily",
          date: this.state["date"]
        };
      }
    } else {
      if (
        !this.state["age"] ||
        !this.state["metric"] ||
        !this.state["description"]
      ) {
        alert("provide a delivery info");
        return;
      } else {
        attribute = {
          name: this.state.deliveryName.toLowerCase(),
          age: this.state["age"],
          metric: this.state["metric"],
          description: this.state["description"]
        };
      }
    }

    this.setState({ [submit]: true });

    if (type === "sms") {
      data = {
        service_id: this.state.productId,
        content: this.state[props.content.toString()],
        type: "text",
        attribute: attribute
      };
    } else if (type === "web") {
      data = {
        service_id: this.state.productId,
        content: this.state[props.content.toString()],
        title: this.state[props.title.toString()],
        type: "web",
        attribute: attribute
      };
    } else {
      let file = new FormData();
      file.append("file_url", this.state["ivr"]);
      axios
        .post("https://tm30vascmsapi.herokuapp.com/api/v1/fileupload", file)
        .then(
          res => {
            console.log(res.data);
          },
          err => {}
        );
      data = {
        service_id: this.state.productId,
        content: "expected file ID",
        type: "ivr",
        attribute: attribute
      };
    }

    this.setState({ [submit]: false });
    alert("Saved successfully, check console for post result format");
    console.log(data);
  };

  render() {
    return (
      <Layout>
        <div className="max-width-1400 content-container">
          <ContentCard heading={"Quick Settings"}>
            <div className="form-group">
              <div className="content-form">
                <label htmlFor="">Delivery Name</label>
                <select
                  required
                  onChange={e =>
                    this.setState({ deliveryName: e.target.value })
                  }
                  name="metric"
                  id=""
                  value={this.state.deliveryName.toLowerCase()}
                >
                  <option value="daily">Daily</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div className="content-form">
                <label htmlFor="">Sms type</label>
                <select
                  required
                  onChange={e => this.setState({ smsType: e.target.value })}
                  name="metric"
                  id=""
                  value={this.state.smsType.toLowerCase()}
                >
                  <option value="default">default</option>
                  <option value="other">other</option>
                </select>
              </div>

              <div className="content-form">
                <label htmlFor="">Ussd type</label>
                <select
                  required
                  onChange={e => this.setState({ ussdType: e.target.value })}
                  name="metric"
                  id=""
                  value={this.state.ussdType.toLowerCase()}
                >
                  <option value="default">default</option>
                  <option value="content api">other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="content-form">
                <label htmlFor="">Ivr type</label>
                <select
                  required
                  onChange={e => this.setState({ ivrType: e.target.value })}
                  name="metric"
                  id=""
                  value={this.state.ivrType.toLowerCase()}
                >
                  <option value="default">default</option>
                  <option value="other">other</option>
                </select>
              </div>

              <div className="content-form">
                <label htmlFor="">Web type</label>
                <select
                  required
                  onChange={e => this.setState({ webType: e.target.value })}
                  name="metric"
                  id=""
                  value={this.state.webType.toLowerCase()}
                >
                  <option value="default">default</option>
                  <option value="content api">other</option>
                </select>
              </div>
            </div>
          </ContentCard>

          <h1 className="content-head">Content Creation</h1>

          <ContentCard
            heading={
              <Fragment>
                Delivery Method{" "}
                <span
                  className="header-type"
                  style={{ textTransform: "capitalize" }}
                >
                  {this.state.deliveryName}
                </span>
              </Fragment>
            }
          >
            {this.state.deliveryName.toLowerCase() === "daily" ? (
              <div className="form-group">
                <label htmlFor="date">Delivery Date</label>
                <input onChange={this.onChange} type="date" name="date" />
              </div>
            ) : (
              <Fragment>
                <div className="form-group custom-delivery">
                  <label htmlFor="age">Content Age</label>
                  <input onChange={this.onChange} type="text" name="age" />
                  <select required onChange={this.onChange} name="metric" id="">
                    <option value="">Select metric type</option>
                    <option value="years">years</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Body</label>
                  <textarea
                    onChange={this.onChange}
                    required
                    name="description"
                  />
                </div>
              </Fragment>
            )}
          </ContentCard>

          <ContentCard
            className={
              this.state.smsType.toLowerCase() !== "default" &&
              this.state.ussdType.toLowerCase() !== "default"
                ? "hide"
                : ""
            }
            heading={
              <Fragment>
                {this.state.smsType.toLowerCase() === "default" && "SMS"}
                {this.state.smsType.toLowerCase() === "default" &&
                  this.state.ussdType.toLowerCase() === "default" &&
                  " / "}
                {this.state.ussdType.toLowerCase() === "default" && "USSD"}
              </Fragment>
            }
          >
            <form
              onSubmit={e => {
                e.preventDefault();
                this.onSave(
                  "sms",
                  {
                    content: "content"
                  },
                  "btn-1"
                );
              }}
            >
              <div className="form-group">
                <label htmlFor="delivery-date">Content</label>
                <TextComponent
                  required
                  name="content"
                  onChange={this.onChange}
                />
              </div>
              <button
                className={`btn-main delivery_btn ${this.state["btn-1"] &&
                  "disabled"}`}
                disabled={this.state["btn-1"]}
              >
                {this.state["btn-1"] ? "saving" : "save"}
              </button>
              <div className="clear" />
            </form>
          </ContentCard>

          <ContentCard
            className={
              this.state.ivrType.toLowerCase() !== "default" &&
              this.state.ivrType.toLowerCase() !== "default"
                ? "hide"
                : ""
            }
            heading={<Fragment>IVR</Fragment>}
          >
            <form
              onSubmit={e => {
                e.preventDefault();
                this.onSave(
                  "ivr",
                  {
                    content: "content"
                  },
                  "btn-3"
                );
              }}
            >
              <div className="form-group">
                <label htmlFor="delivery-date">Content</label>
                <input
                  onChange={this.onFileChange}
                  required
                  type="file"
                  name="delivery-date"
                />
              </div>
              <div className="info">
                Supported types includes: Mp3, WAV and AFF
              </div>
              <button
                className={`btn-main delivery_btn ${this.state["btn-3"] &&
                  "disabled"}`}
                disabled={this.state["btn-3"]}
              >
                {this.state["btn-3"] ? "saving" : "save"}
              </button>
              <div className="clear" />
            </form>
          </ContentCard>

          <ContentCard
            className={
              this.state.webType.toLowerCase() !== "default" &&
              this.state.webType.toLowerCase() !== "default"
                ? "hide"
                : ""
            }
            heading={<Fragment>WEB</Fragment>}
          >
            <form
              onSubmit={e => {
                e.preventDefault();
                this.onSave(
                  "web",
                  {
                    content: "body",
                    title: "title"
                  },
                  "btn-2"
                );
              }}
            >
              <div className="form-group">
                <label htmlFor="delivery-date">Title</label>
                <input
                  onChange={this.onChange}
                  required
                  type="text"
                  name="title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="delivery-date">Body</label>
                <textarea onChange={this.onChange} required name="body" />
              </div>
              <button
                className={`btn-main delivery_btn ${this.state["btn-2"] &&
                  "disabled"}`}
                disabled={this.state["btn-2"]}
              >
                {this.state["btn-2"] ? "saving" : "save"}
              </button>
              <div className="clear" />
            </form>
          </ContentCard>
        </div>
      </Layout>
    );
  }
}

export default ContentManagement;
