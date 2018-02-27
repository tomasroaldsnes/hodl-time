import React from 'react';

export default function Greeting(props) {
    return (
      <div>
        <p>
          Welcome to HODLtime. You do not currently have a time-locked savings account.
        </p>
        <p>
          To create one, press the "Set Time" button and specify how many minutes you would like your account to be
          locked for. You can always increase the time, but you cannot decrease it without penalty.
        </p>
      </div>
    );
};
