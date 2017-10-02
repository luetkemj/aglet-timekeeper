import React from 'react';
import renderer from 'react-test-renderer';
import Sundial from './sundial.component';

it('renders correctly', () => {
  const tree = renderer.create(
    <Sundial
      phaseOfMoon={1}
      sky={'day'}
      rotation={360}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
