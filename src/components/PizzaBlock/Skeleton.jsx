import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="141" cy="127" r="129" />
    <rect x="7" y="273" rx="14" ry="14" width="270" height="40" />
    <rect x="10" y="333" rx="0" ry="0" width="271" height="85" />
    <rect x="7" y="436" rx="0" ry="0" width="69" height="29" />
    <rect x="113" y="427" rx="0" ry="0" width="166" height="57" />
  </ContentLoader>
);

export default MyLoader;
