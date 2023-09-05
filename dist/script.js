// types
const SESSION = "Session";
const BREAK = "Break";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 0,
      breakLength: 5, // in min
      sessionLength: 25, // in min
      timeLeft: 25 * 60, // in sec
      timeStr: "25:00",
      timerType: SESSION,
      isRunning: false };


    // bind event handlers
    this.resetTimer = this.resetTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.toggleType = this.toggleType.bind(this);
    this.convertClock = this.convertClock.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // reset timer
  resetTimer() {
    console.log("reset");

    // clear the current inveral if there is one
    clearInterval(this.timer);

    // reset the app's state
    this.setState({
      timer: 0,
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      timeStr: "25:00",
      timerType: SESSION,
      isRunning: false });


    // stop sound in case it is playing
    this.playSound.pause();
    this.playSound.currentTime = 0;
  }

  // start running the countdown
  runTimer() {
    console.log("timer run");
    if (this.state.timeLeft > 0) {
      console.log("true");
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  // function that handles the count down process
  countDown() {
    console.log("count down");
    let seconds = this.state.timeLeft - 1;

    this.setState({
      timeStr: this.convertClock(seconds),
      timeLeft: seconds });

    console.log(seconds);

    if (this.state.timeLeft < 0) {
      console.log("PLAY SOUND");
      clearInterval(this.timer);
      this.playSound.play();
      this.toggleType();
    }
  }

  // toggle whether the timer is running
  toggleTimer() {
    if (!this.state.isRunning) {
      this.setState({
        isRunning: true });

      this.runTimer();
    } else
    {
      clearInterval(this.timer);
      this.setState({
        isRunning: false });

    }
  }

  // toggle whether the timer is a session or break timer
  // also updates the time left using what is currently in breakLength
  toggleType() {
    if (this.state.timerType === SESSION) {
      this.setState({
        timeLeft: this.state.breakLength * 60,
        timerType: BREAK });

      this.toggleTimer(); // turn timer off
      this.toggleTimer(); // turn timer back on
    } else
    {
      this.setState({
        timer: 0,
        breakLength: 5,
        sessionLength: 25,
        timeLeft: 25 * 60,
        timeStr: "25:00",
        timerType: SESSION,
        isRunning: false });

    }
  }

  // convert the seconds of the clock into a string with mm:ss
  convertClock() {
    let minutes = Math.floor(this.state.timeLeft / 60);
    let seconds = this.state.timeLeft - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let string = minutes + ":" + seconds;

    console.log("called " + string);

    return minutes + ":" + seconds;
  }

  // handle click events
  handleClick(event) {
    if (event.target.id === "break-decrement") {
      let decrement = parseFloat(this.state.breakLength);

      if (decrement <= 0) {
        decrement = decrement;
      } else
      if (decrement === 60) {
        decrement = decrement;
      } else
      if (decrement > 1) {
        decrement--;
      }

      this.setState({
        breakLength: decrement });

    }

    if (event.target.id === "break-increment") {
      let increment = parseFloat(this.state.breakLength);

      if (increment <= 0) {
        increment = increment;
      } else
      if (increment === 60) {
        increment = increment;
      } else
      if (increment > 0) {
        increment++;
      }

      this.setState({
        breakLength: increment });

    }

    if (event.target.id === "session-decrement") {
      let decrement = parseFloat(this.state.sessionLength);

      if (decrement <= 0) {
        decrement = decrement;
      } else
      if (decrement === 60) {
        decrement = decrement;
      } else
      if (decrement > 1) {
        decrement--;
      }

      this.setState({
        sessionLength: decrement,
        timeLeft: decrement * 60 });

    }

    if (event.target.id === "session-increment") {
      let increment = parseFloat(this.state.sessionLength);

      if (increment <= 0) {
        increment = increment;
      } else
      if (increment === 60) {
        increment = increment;
      } else
      if (increment > 0) {
        increment++;
      }

      this.setState({
        sessionLength: increment,
        timeLeft: increment * 60 });

    }
  }

  render() {
    let faIcon = this.state.isRunning ? "fa fa-solid fa-pause" : "fa fa-solid fa-play";

    return /*#__PURE__*/(
      React.createElement("div", { id: "Clock" }, /*#__PURE__*/
      React.createElement("h1", { id: "title" }, "25 + 5 Clock"), /*#__PURE__*/
      React.createElement("div", { id: "timeAdjusts" }, /*#__PURE__*/
      React.createElement(AdjustTime, {
        type: BREAK,
        labelId: "break-label",
        lengthId: "break-length",
        length: this.state.breakLength,
        handleClick: this.handleClick,
        incrementId: "break-increment",
        decrementId: "break-decrement" }), /*#__PURE__*/

      React.createElement(AdjustTime, {
        type: SESSION,
        labelId: "session-label",
        lengthId: "session-length",
        length: this.state.sessionLength,
        handleClick: this.handleClick,
        incrementId: "session-increment",
        decrementId: "session-decrement" })), /*#__PURE__*/


      React.createElement(Display, {
        timeLeft: this.convertClock(this.state.timeLeft),
        timerType: this.state.timerType }), /*#__PURE__*/

      React.createElement(Controls, {
        handleClick: this.handleClick,
        startTimer: this.toggleTimer,
        resetTimer: this.resetTimer,
        faIcon: faIcon }), /*#__PURE__*/

      React.createElement("audio", {
        id: "beep",
        load: "auto",
        ref: audio => {
          this.playSound = audio;
        },
        src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));



  }}


class AdjustTime extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "timeAdjust" }, /*#__PURE__*/
      React.createElement("label", { id: this.props.labelId }, this.props.type, " Length"), /*#__PURE__*/
      React.createElement("div", { id: "inc-dec" }, /*#__PURE__*/
      React.createElement("i", { id: this.props.decrementId, onClick: this.props.handleClick, class: "fa fa-solid fa-arrow-down" }), /*#__PURE__*/
      React.createElement("p", { id: this.props.lengthId }, this.props.length), /*#__PURE__*/
      React.createElement("i", { id: this.props.incrementId, onClick: this.props.handleClick, class: "fa fa-solid fa-arrow-up" }))));



  }}


class Display extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "display" }, /*#__PURE__*/
      React.createElement("label", { id: "timer-label" }, this.props.timerType), /*#__PURE__*/
      React.createElement("h1", { id: "time-left" }, this.props.timeLeft)));


  }}


class Controls extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "controls" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.props.startTimer }, /*#__PURE__*/
      React.createElement("i", { className: this.props.faIcon })), /*#__PURE__*/

      React.createElement("button", { id: "reset", onClick: this.props.resetTimer }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-solid fa-stop" }))));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));
