import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styled from "styled-components";

import Logo from "../Images/capsules.svg";

const LoginImage = styled.img`
  object-fit: cover;
  width: 80%;
`;

function LoginRegisterTemplate({ children }) {
  return (
    <Container>
      <Row className="align-items-center" style={{ marginTop: "20vh" }}>
        <Col md={6} className="text-center">
          <LoginImage src={Logo} alt="Logo"></LoginImage>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm p-3" style={{ borderRadius: "10px" }}>
            {children}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginRegisterTemplate;
