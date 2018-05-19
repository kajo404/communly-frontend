import React from 'react';
import AnnouncementComponent from './../components/announcement';

class Announcements extends React.Component {
  render() {
    return (
      <div className="p-task-boards">
        <AnnouncementComponent />
      </div>
    );
  }
}

export default Announcements;
