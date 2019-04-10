import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Detail } from './Detail';
import { dataTypes } from '../../modules/dataTypes';
import { styles } from './styles/Groups.style';

const Groups = props => {
  const handleChange = event => {
    props.onGroupChange(event.target.value);
  };

  const renderDropDownItems = () => {
    const defaultGroup = dataTypes[props.dataType].defaultGroup;
    let optionItems = props.groups;

    if (defaultGroup) {
      optionItems = [defaultGroup, ...optionItems];
    }

    return optionItems.map(item => React.createElement(MenuItem, {
      key: item.id,
      value: item.id
    }, item.name));
  };

  const groupDetail = dataTypes[props.dataType].groupDetail;
  const havePlaceholder = Boolean(!props.groupId && dataTypes[props.dataType].placeholder);
  return React.createElement("div", {
    style: styles.container
  }, React.createElement("div", {
    style: styles.groupContainer
  }, React.createElement(InputLabel, {
    style: styles.titleText
  }, dataTypes[props.dataType].groupLabel), React.createElement(Select, {
    value: props.groupId,
    onChange: handleChange,
    renderValue: havePlaceholder ? dataTypes[props.dataType].placeholder : null,
    displayEmpty: havePlaceholder,
    disableUnderline: true,
    SelectDisplayProps: havePlaceholder ? {
      style: styles.placeholder
    } : {
      style: styles.dropDown
    }
  }, renderDropDownItems())), groupDetail && React.createElement(Detail, {
    value: props.detailValue,
    onDetailChange: props.onDetailChange,
    detailAlternatives: groupDetail.alternatives
  }));
};

Groups.propTypes = {
  dataType: PropTypes.string.isRequired,
  groups: PropTypes.array.isRequired,
  groupId: PropTypes.string.isRequired,
  onGroupChange: PropTypes.func.isRequired,
  onDetailChange: PropTypes.func.isRequired,
  detailValue: PropTypes.string.isRequired
};
export default Groups;