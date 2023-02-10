import React from "react";
import { Col, Row } from "reactstrap";
import classes from "../styles/about.module.css";

export default function About({ data }) {
  const formatText = (text) => {
    if (text) {
      return text[0].toUpperCase() + text.slice(1);
    }
  };

  return (
    <div>
      <Row className={classes.row}>
        <Col xs={4}>
          <span>Species</span>
        </Col>
        <Col xs={8}>
          <span>{data?.species?.name}</span>
        </Col>
      </Row>
      <Row className={classes.row}>
        <Col xs={4}>
          <span>Height</span>
        </Col>
        <Col xs={8}>
          <span>{data?.height / 10} cm</span>
        </Col>
      </Row>
      <Row className={classes.row}>
        <Col xs={4}>
          <span>Weight</span>
        </Col>
        <Col xs={8}>
          <span>{data?.weight / 10} kg</span>
        </Col>
      </Row>
      <Row className={classes.row}>
        <Col xs={4}>
          <span>Abilities</span>
        </Col>
        <Col xs={8}>
          {data?.abilities?.map((item, idx) => {
            const last = idx === data?.abilities?.length - 1;
            return (
              <span key={item.slot}>
                {`${formatText(item?.ability?.name)}${last ? "" : ", "}`}
              </span>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}
