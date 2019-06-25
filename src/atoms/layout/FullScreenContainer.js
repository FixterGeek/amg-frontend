import React from "react";
import PropTypes from "prop-types";
import { layout } from "../../styles/theme";

function FullScreenContainer({
  children,
  justifyContent,
  alignItems,
  lateralSpace,
  paddingTop,
  paddingBottom,
  flexWrap
}) {
  return (
    <div
      className="full-screen"
      style={{
        justifyContent,
        alignItems,
        paddingRight: lateralSpace,
        paddingLeft: lateralSpace,
        paddingTop,
        paddingBottom,
        flexWrap
      }}
    >
      {children}
    </div>
  );
}

export default FullScreenContainer;

FullScreenContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  lateralSpace: PropTypes.string,
  paddingTop: PropTypes.string,
  paddingBottom: PropTypes.string,
  flexWrap: PropTypes.string
};

FullScreenContainer.defaultProps = {
  justifyContent: "center",
  alignItems: "center",
  lateralSpace: layout.lateralSpace,
  paddingTop: layout.paddingTop,
  paddingBottom: layout.paddingBottom,
  flexWrap: "wrap"
};
