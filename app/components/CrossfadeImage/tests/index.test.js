import React from 'react';
import { shallow } from 'enzyme';

import CrossfadeImage from '..';

describe('<CrossfadeImage />', () => {
  it('should three divs', () => {
    const pic = 'http://random.picture.com/not-existent.jpg';
    const wrapper = shallow((
      <CrossfadeImage src={pic} />
    ));

    expect(wrapper.find('div')).toHaveLength(3);
  });
});
