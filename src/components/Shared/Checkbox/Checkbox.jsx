import React from 'react';

import './Checkbox.css';

const Checkbox = () => {
  return (
    <label className="checkbox__container" htmlFor="checkbox">
      <input id="checkbox" className="checkbox__invisible" type="checkbox" />
      <span className="checkbox__visible"></span>
    </label>
  );
};

export default Checkbox;