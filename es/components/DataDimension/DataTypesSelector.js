import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import i18n from '@dhis2/d2-i18n';
import { dataTypes } from '../../modules/dataTypes';
import { styles } from './styles/DataTypesSelector.style';
export const DataTypes = ({
  currentDataType,
  onDataTypeChange
}) => React.createElement("div", {
  style: styles.container
}, React.createElement(InputLabel, {
  style: styles.titleText
}, i18n.t('Data Type')), React.createElement(Select, {
  value: currentDataType,
  onChange: event => onDataTypeChange(event.target.value),
  disableUnderline: true,
  SelectDisplayProps: {
    style: styles.dropDown
  }
}, Object.values(dataTypes).map(type => React.createElement(MenuItem, {
  style: styles.dropDownItem,
  key: type.id,
  value: type.id
}, type.name))));
DataTypes.propTypes = {
  currentDataType: PropTypes.string.isRequired,
  onDataTypeChange: PropTypes.func.isRequired
};
export default DataTypes;