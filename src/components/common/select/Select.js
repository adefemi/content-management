import React, { useState, useEffect } from "react";
import Icon from "react-icons-kit";
import PropTypes from "prop-types";
import { arrows_down as arrowDown } from "react-icons-kit/linea/arrows_down";
import { arrows_up as arrowUp } from "react-icons-kit/linea/arrows_up";

import "./Select.css";
import { getNewProps } from "../input/Input";

let selectCount = 0;

const defaultPropList = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["default", "small", "large"]),
  disabled: PropTypes.bool,
  iconLeft: PropTypes.any,
  placeholder: PropTypes.string,
  showDropDown: PropTypes.bool,
  displayed: PropTypes.any,
  children: PropTypes.any
};

// function to check if an element has a class
export const hasClass = (el, className) => {
  if (!el) {
    return;
  }
  return el.classList.contains(className);
};

// function to add a class to an element
export const addClass = (el, className) => {
  if (!el) {
    return;
  }
  el.classList.add(className);
};

const removeSelectList = () => {
  let selectList = document.querySelectorAll(".select-list");
  let selectIconUp = document.querySelectorAll(".select-icon-up");
  let selectIconDown = document.querySelectorAll(".select-icon-down");

  for (let i = 0; i < selectList.length; i++) {
    if (!hasClass(selectList[parseInt(i, 10)], "closed")) {
      addClass(selectList[parseInt(i, 10)], "closed");
      addClass(selectIconUp[parseInt(i, 10)], "closed");
      removeClass(selectIconDown[parseInt(i, 10)], "closed");
    }
  }
};

// function to remove a class from an element
export const removeClass = (ele, cls) => {
  if (!ele) {
    return;
  }
  if (hasClass(ele, cls)) {
    ele.classList.remove(cls);
  }
};

const removeAllClass = e => {
  let target = e.target;

  if (
    target.classList.contains("select-button") ||
    (target.parentElement &&
      target.parentElement.classList.contains("select-button"))
  ) {
    return;
  }

  removeSelectList();
};

// function to get active value and label for the select component
const getActive = (props, value, children, setLabel, setValue, displayed) => {
  if (!children || children.length < 1) {
    setLabel(props.placeholder);
    return;
  }
  let child = children;
  if (!children.length) {
    child = [children];
  }
  let checkValue = child.filter((item, ind) => item.props.value === value)[0];

  if (checkValue) {
    setLabel(displayed || checkValue.props.children);
    setValue(checkValue.props.value);
  } else {
    setLabel(props.placeholder);
  }
};

const removeSpecificClass = count => {
  let selectList = document.querySelectorAll(".select-list");
  let selectIconUp = document.querySelectorAll(".select-icon-up");
  let selectIconDown = document.querySelectorAll(".select-icon-down");
  for (let i = 0; i < selectList.length; i++) {
    if (!hasClass(selectList[parseInt(i, 10)], `.select${count}`)) {
      addClass(selectList[parseInt(i, 10)], "closed");
      addClass(selectIconUp[parseInt(i, 10)], "closed");
      removeClass(selectIconDown[parseInt(i, 10)], "closed");
    }
  }
};

// function to toggle select options list
const toggleSelect = count => {
  let mainSelectCon = document.querySelector(`.select-control.select${count}`);
  let selectCon = document.querySelector(`.select-list.select${count}`);
  let selectIconUp = document.querySelector(`.select-icon-up.select${count}`);
  let selectIconDown = document.querySelector(
    `.select-icon-down.select${count}`
  );

  if (hasClass(selectCon, "closed")) {
    removeSpecificClass(count);
    removeClass(selectCon, "closed");
    removeClass(selectIconUp, "closed");
    addClass(selectIconDown, "closed");
  } else {
    addClass(selectCon, "closed");
    addClass(selectIconUp, "closed");
    removeClass(selectIconDown, "closed");
  }

  let space =
    window.innerHeight - mainSelectCon.offsetTop + mainSelectCon.offsetHeight;

  let allSelectControl = document.getElementsByClassName("select-control");
  for (let i = 0; i < allSelectControl.length; i++) {
    allSelectControl[parseInt(i, 10)].style.zIndex = "1000";
  }

  if (space < 450) {
    mainSelectCon.style.zIndex = "10000";
    selectCon.style.bottom = "100%";
    selectCon.style.top = "unset";
  } else {
    mainSelectCon.style.zIndex = "10000";
  }
};

const getOptionList = (props, setLabel, setValue, count, children) => {
  if (!children || children.length < 1) {
    return;
  }
  let contents = children;
  if (!children.length) {
    contents = [children];
  }

  return (
    contents &&
    contents.map((item, ind) => (
      <li
        key={ind}
        onClick={() => {
          getActive(
            props,
            item.props.value,
            contents,
            setLabel,
            setValue,
            item.props.displayed
          );
          const input = document.querySelector(`.selectInput${count}`);
          input.value = item.props.value;
          props.onChange({
            target: input
          });
        }}
      >
        {item.props.children || item.props.value || item.props.children}
      </li>
    ))
  );
};

const fixChildren = children => {
  if (typeof children !== "object") {
    return null;
  }

  if (!children || children.length < 1) {
    return null;
  }

  let newChildren = children;
  if (!children.length) {
    newChildren = [children];
  }
  newChildren = newChildren.filter(item => {
    if (typeof item !== "object") {
      return null;
    } else if (!item || item.length < 1) {
      return null;
    } else if (!item.length) {
      return item;
    } else {
      for (let i = 0; i < item.length; i++) {
        return item[parseInt(i, 10)];
      }
    }
    return null;
  });
  return newChildren;
};

// base functional component for select, makes use of react hooks...
const Select = props => {
  let newProps = getNewProps(props, defaultPropList);
  let children = fixChildren(props.children);

  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [count, setCount] = useState(selectCount);

  useEffect(() => {
    setCount(selectCount++);
    document.onclick = e => removeAllClass(e);
    getActive(
      props,
      props.value,
      children,
      setLabel,
      setValue,
      props.displayed
    );
  }, []);

  let input = {};

  return (
    <div
      className={
        props.error
          ? props.className +
            ` select-control select${count}  error ` +
            props.size
          : props.className + ` select-control select${count} ` + props.size
      }
      style={{ ...props.style }}
    >
      <div
        onClick={() => (!props.disabled ? toggleSelect(count) : null)}
        className={`select-button select${count} ${
          props.disabled ? "disabled" : ""
        }`}
      >
        {props.iconLeft}
        <input
          type="text"
          className={`selectInput${count} ${props.disabled ? "disabled" : ""}`}
          onChange={() => {}}
          disabled={props.disabled}
          readOnly={props.disabled}
          placeholder={label}
          value={value && label}
          name={props.name}
          autoComplete={"new"}
          ref={ref => (input = ref)}
          {...newProps}
        />
        {props.showDropDown && (
          <Icon
            onClick={() => toggleSelect(count)}
            className={`select-icon-up select${count} closed`}
            icon={arrowUp}
          />
        )}

        {props.showDropDown && (
          <Icon
            onClick={() => null}
            className={`select-icon-down select${count}`}
            icon={arrowDown}
          />
        )}
      </div>

      <ul className={`select-list select${count} closed`}>
        {getOptionList(props, setLabel, setValue, count, children)}
      </ul>

      {props.error && (
        <div className={`select-error-text select${count}`}>
          {props.errorText}
        </div>
      )}
    </div>
  );
};

// select component extension to handle option...
Select.Option = ({ value, displayed }) => null;

Select.propTypes = defaultPropList;

Select.defaultProps = {
  value: "Hello",
  onChange: () => null,
  error: false,
  errorText: "Invalid selection",
  className: "",
  size: "default",
  disabled: false,
  placeholder: "Make a selection",
  showDropDown: true
};

export default Select;
