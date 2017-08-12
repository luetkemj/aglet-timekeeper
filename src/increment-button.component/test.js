import React from 'react';
import renderer from 'react-test-renderer';
import IncrementButton from '.';

it('renders correctly', () => {
  const tree = renderer.create(
    <IncrementButton
      decrement={() => {}}
      increment={() => {}}
      initialMs={10000}
      duration={6}
      unit={'seconds'}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
