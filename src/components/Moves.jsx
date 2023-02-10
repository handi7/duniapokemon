import React from "react";
import { Col, Row } from "reactstrap";
import classes from "../styles/moves.module.css";

export default function Moves({ moves }) {
  return (
    <Row className={classes.container}>
      {moves?.map((item, idx) => {
        return (
          <Col>
            <span key={idx}>{item?.move?.name}</span>
          </Col>
        );
      })}
    </Row>
  );
}
