import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import UserService from '../../services/user-service';
import AnnouncementsService from '../../services/announcements-service';

const styles = {
  margin: -8
};

class VotingComponent extends Component {
  user;
  upvotes;
  downvotes;

  constructor(props) {
    super(props);

    this.user = UserService.getCurrentUser();
    this.upvotes = this.upvotesArray;
    this.downvotes = this.downvotesArray;

    this.state = {
      isUpvoted: this.isUpvotedByCurrentUser,
      isDownvoted: this.isDownvotedByCurrentUser
    };
  }

  get isUpvotedByCurrentUser() {
    if (this.upvotes.length > 0) {
      return this.currentUserVotesIndex(this.upvotes) !== -1;
    } else {
      return false;
    }
  }

  get isDownvotedByCurrentUser() {
    if (this.downvotes.length > 0) {
      return this.currentUserVotesIndex(this.downvotes) !== -1;
    } else {
      return false;
    }
  }

  get upvotesArray() {
    const votes = this.props.announcement.votes.filter(voter => {
      return voter.vote === 'up';
    });
    return votes;
  }

  get downvotesArray() {
    const votes = this.props.announcement.votes.filter(
      voter => voter.vote === 'down'
    );
    return votes;
  }

  currentUserVotesIndex(votes) {
    const object = votes.find(voter => {
      return voter.user === this.user.id;
    });
    return votes.indexOf(object);
  }

  voteUp = event => {
    if (this.state.isUpvoted) {
      AnnouncementsService.deleteVote(this.props.announcement)
        .then(() => {
          this.props.updateAnnouncements();
        })
        .catch(error => console.error(error));
    } else {
      AnnouncementsService.downvote(this.props.announcement)
        .then(() => {
          this.props.updateAnnouncements();
        })
        .catch(error => console.error(error));
    }
    this.genericVote(this.upvotes, this.downvotes, true);
  };

  voteDown = event => {
    if (this.state.isDownvoted) {
      AnnouncementsService.deleteVote(this.props.announcement)
        .then(() => {
          this.props.updateAnnouncements();
        })
        .catch(error => console.error(error));
    } else {
      AnnouncementsService.downvote(this.props.announcement)
        .then(() => {
          this.props.updateAnnouncements();
        })
        .catch(error => console.error(error));
    }

    this.genericVote(this.downvotes, this.upvotes, false);
  };

  genericVote(plus, minus, up) {
    const minusIndex = this.currentUserVotesIndex(minus);
    if (minusIndex !== -1) {
      minus.splice(minusIndex, 1);
    }

    const plusIndex = this.currentUserVotesIndex(plus);
    if (plusIndex !== -1) {
      plus.splice(plusIndex, 1);
    } else {
      plus.push({
        vote: up ? 'up' : 'down',
        user: this.user.id
      });
    }

    this.setState({
      isUpvoted: this.isUpvotedByCurrentUser,
      isDownvoted: this.isDownvotedByCurrentUser
    });
  }

  render() {
    return (
      <div>
        <div className="c-announcements-voting-item">
          <IconButton onClick={this.voteUp} style={styles}>
            {this.state.isUpvoted ? <ThumbUp /> : <ThumbUp color="#c8d4ea" />}
          </IconButton>
          <br />
          {this.upvotes.length}
        </div>
        <div>
          <IconButton onClick={this.voteDown} style={styles}>
            {this.state.isDownvoted ? (
              <ThumbDown />
            ) : (
              <ThumbDown color="#c8d4ea" />
            )}
          </IconButton>
          <br />
          {this.downvotes.length}
        </div>
      </div>
    );
  }
}

export default VotingComponent;
