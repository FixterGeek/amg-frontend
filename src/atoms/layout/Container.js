import React from "react";
import PropTypes from "prop-types";

function Container({
  children,
  justifyContent,
  alignItems,
  lateralSpace,
  paddingTop,
  paddingBottom,
  flexWrap,
  height,
  width,
  className,
  bgColor,
  style,
  flexGrow,
  boxSizing
}) {
  return (
    <div
      className={`container ${className}`}
      style={{
        justifyContent,
        alignItems,
        paddingRight: lateralSpace,
        paddingLeft: lateralSpace,
        paddingTop,
        paddingBottom,
        flexWrap,
        height,
        width,
        flexGrow,
        backgroundColor: bgColor,
        boxSizing,
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default Container;

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  lateralSpace: PropTypes.string,
  paddingTop: PropTypes.string,
  paddingBottom: PropTypes.string,
  flexWrap: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  bgColor: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  flexGrow: PropTypes.number,
  boxSizing: PropTypes.string
};

Container.defaultProps = {
  justifyContent: "center",
  alignItems: "center",
  lateralSpace: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",
  flexWrap: "wrap",
  height: "100%",
  width: "100%",
  className: "",
  bgColor: "transparent",
  style: {},
  flexGrow: 1,
  boxSizing: "border-box"
};
