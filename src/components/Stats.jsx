import React from "react";
import { Col, Row } from "reactstrap";
import classes from "../styles/stats.module.css";

export default function Stats({ stats }) {
  const formatText = (text) => {
    if (text) {
      return text[0].toUpperCase() + text.slice(1);
    }
  };

  return stats?.map((item, idx) => {
    return (
      <Row key={idx} className={classes.row}>
        <Col xs={4}>
          <span>{formatText(item?.stat?.name)}</span>
        </Col>
        <Col xs={1}>
          <span>{item?.base_stat}</span>
        </Col>
        <Col xs={7}>
          <progress
            className={item?.base_stat > 50 ? classes.strong : classes.weak}
            value={item?.base_stat}
            max="100"
          />
        </Col>
      </Row>
    );
  });
}
