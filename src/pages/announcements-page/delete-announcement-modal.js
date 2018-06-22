import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const contentStyle = {
  maxWidth: '500px',
  width: '90%'
};

export default class DeleteAnnouncementConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  deleteAnnouncement = () => {
    this.props.deleteAnnouncement();
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        style={{ marginRight: '7px' }}
        onClick={this.props.close}
      />,
      <RaisedButton
        label="Yes, Delete"
        primary={true}
        onClick={this.props.deleteAnnouncement}
      />
    ];

    return (
      <div>
        <Dialog
          contentStyle={contentStyle}
          actions={actions}
          modal={true}
          style={{ padding: 0 }}
          open={this.props.open}
        >
          <div className="c-warning__content">
            <i className="c-icon-warning material-icons">warning</i>
            <h4> Are you sure you want to delete this announcement?</h4>
          </div>
        </Dialog>
      </div>
    );
  }
}
