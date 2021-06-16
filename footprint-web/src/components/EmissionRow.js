import React from 'react';
import { InputNumber, Row, Col, Typography } from 'antd';
import 'antd/dist/antd.css';

const { Title } = Typography;

/*
  EmissionRow consists of a title, InputNumber, and unit label

  Props:
    emissionType (EmissionType): the EmissionType represented by this row
    existingInput (Number | null): the previous value that the user may have entered already
    onInputChanged ((value, String) => ()): callback invoked each time the InputNumber value changes
*/
class EmissionRow extends React.Component {
  onInputChanged = (value) => {
    this.props.onInputChanged(value, this.props.emissionType.id);
  }

  render() {
    let emissionType = this.props.emissionType;
    return (
      <Row justify="center">
        <Col span={6}>
          <Title level={4}>{emissionType.name}</Title>
        </Col>
        <Col span={4}>
          <InputNumber defaultValue={this.props.existingInput} onChange={this.onInputChanged}></InputNumber>
        </Col>
        <Col span={4}>{emissionType.units}</Col>
      </Row>
    );
  }
}

export default EmissionRow;
