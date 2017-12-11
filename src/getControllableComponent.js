import React, { Component } from 'react';

const getControllableComponent = WrapperdComponent => class ControllableComponent extends Component {

  defaultValue = '';

  constructor(props) {
    super(props);
    this.defaultValue = props.defaultValue || this.defaultValue;
    this.state = {
      value: props.value || this.defaultValue
    };
  }

  componentWillReceiveProps(nextProps) {
    if (Reflect.has(nextProps, 'value') && this.isValueChanged(nextProps.value, this.props.value)) {
      this.setState({ value: nextProps.value });
    }
  }

  isValueChanged(nextValue, prevValue) {
    return nextValue !== prevValue;
  }

  getValue() {
    return this.state.value;
  }

  onRequestChange = (nextValue) => {
    console.log('[change] ', nextValue, Reflect.has(this.props, 'value'), this.state.value);
    const { onChange } = this.props;
    if (Reflect.has(this.props, 'value')) { // 受控
      if (typeof onChange === 'function') {
        onChange(nextValue);
      }
    } else { // 非受控
      this.setState({ value: nextValue }, () => {
        if (typeof onChange === 'function') {
          onChange(nextValue);
        }
      });
    }
  };

  render() {
    return (
      <WrapperdComponent
        value={this.state.value}
        onRequestChange={this.onRequestChange}
      />
    );
  }
};

export default getControllableComponent;
