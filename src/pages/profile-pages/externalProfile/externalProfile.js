import React from 'react';

import ExternalUserDetailComponent from './externalUserDetails';

class ExternalProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="p-profile">
        <ExternalUserDetailComponent
          externalUserId={this.props.externalUserId}
        />
      </div>
    );
  }
}

export default ExternalProfile;
