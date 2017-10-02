import React from 'react';
import renderer from 'react-test-renderer';
import IncrementButton from './increment-button.component';

it('renders correctly', () => {
  const tree = renderer.create(
    <IncrementButton
      decrement={() => {}}
      increment={() => {}}
      initialMs={10000}
      duration={6}
      unit={'seconds'}
      markButtonForDeletion={() => {}}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
