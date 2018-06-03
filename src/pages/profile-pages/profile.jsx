import React from 'react';

import UserDetailComponent from './userDetails';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="p-profile">
        <UserDetailComponent />
      </div>
    );
  }
}

export default Profile;
