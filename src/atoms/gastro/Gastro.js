import React from "react";
import { Row, Col } from "antd";

export default () => {
  return (
    <div>
      <Row>
        <Col span={8} offset={8}>
          <p className="gastro">
            GASTR<span className="gastro text-style-1">O</span>
          </p>
        </Col>
      </Row>
    </div>
  );
};
