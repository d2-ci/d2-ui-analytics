import React from 'react';
import renderer from 'react-test-renderer';
import { PeriodDimension } from '../PeriodDimension';
jest.mock('@dhis2/d2-ui-period-selector-dialog', () => ({
  PeriodSelector: 'mockPeriodSelector'
}));
describe('The Period Dimension component', () => {
  const props = {
    selectedPeriods: [],
    onSelect: jest.fn(),
    onDeselect: jest.fn(),
    onReorder: jest.fn()
    /*
    ui: {
        itemsByDimension: {
            [peId]: [],
        },
    },
    metadata: {},
    addMetadata: jest.fn(),
    addUiItems: jest.fn(),
    removeUiItems: jest.fn(),
    setUiItems: jest.fn(),
    context: { d2: {} },
    */

  };
  it('renders correctly', () => {
    const tree = renderer.create(React.createElement(PeriodDimension, props)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});