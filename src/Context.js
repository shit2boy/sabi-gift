import React, { Component } from 'react'

const StateContext = React.createContext();

class ProductProvider extends Component {
  constructor(){
    super()
    this.state = {
      weddingQuestions: [
        "Yay, we love weddings! \n First off ... what's your name?",
        "Who's your lucky spouse to be?",
        " \n when is your Special day?",
        "How many guests are you inviting?",
      ],
      weddinganswers: ["", "", "", ""],
      intro: "",
      luckySpouse: "",
      eventDay: "",
      expectedGuests: 0,
      weddingcurrentIndex: 0,
      weddingformValue: "",
      eventDate : '',
      formField : {},
        questions: [
            "Yay, Someone is ready to \n celebrate ! Let's quickly get you started.",
            "Hello, when is your \n birthday celebration \n coimng up?",
            " About how many guests are \n you inviting ?",
          ],
          answers: ["", "", "", ],
          firstOff: "",
          specialDay: "",
          noOfGuests: 0,
          currentIndex: 0,
          formValue: "",
        };
      }
        handlerChange = (e)=> {
          let formField = this.state.formField;
          formField[e.target.name] = e.target.value;
          this.setState({
            formField,
          });
          console.log(formField)
        }

        weddingHandleChange= (e) =>{
          this.setState({ weddingformValue: e.target.value })
          console.log(this.state.weddingformValue);
        }
        birthdayHandleChange= (e) =>{
          this.setState({formValue: e.target.value })
          console.log(this.state.formValue);
        }
    
    mapValueAndNext = () => {
        console.log(this.state.formValue);
        console.log(this.state.currentIndex);
        let value = this.state.formValue;
        let currentIndex = this.state.currentIndex;
    
        if (this.state.currentIndex > 2) {
          this.setState({ currentIndex: currentIndex + 1, });
          return;
        }
    
        let answers = this.state.answers;
        answers[currentIndex] = value;
        this.setState({ answers: answers });
        // console.dir(this.state);
        console.log(answers);
        this.setState({ currentIndex: currentIndex + 1 });
        this.setState({ formValue: this.state.answers[currentIndex + 1] });
      };

      goBack = () => {
        console.log(this.state);
        console.log("current index " + this.state.currentIndex);
        console.log(
          "current index " + this.state.answers[this.state.currentIndex - 1]
        );
        let formValue = this.state.answers[this.state.currentIndex - 1];
        if (this.state.currentIndex <= 0) {
          return;
        }
    
        if (this.state.currentIndex <= 3) {
          this.setState({ currentIndex: this.state.currentIndex - 1 });
          this.setState({ formValue: formValue });
          console.log(this.state.formValue);
        }
    }
    mapEventValueAndNext = () => {
        // console.log(this.state.weddingformValue);
        // console.log(this.state.weddingcurrentIndex);
        let value = this.state.weddingformValue;
        let weddingcurrentIndex = this.state.weddingcurrentIndex;
    
        if (this.state.weddingcurrentIndex > 2) {
          this.setState({ weddingcurrentIndex: weddingcurrentIndex + 1});
          return;
        }
    
        let weddinganswers = this.state.weddinganswers;
        weddinganswers[weddingcurrentIndex] = value;
        this.setState({ weddinganswers: weddinganswers });
        // console.dir(this.state);
        console.log(weddinganswers);
        this.setState({ weddingcurrentIndex: weddingcurrentIndex + 1 });
        this.setState({ weddingformValue: this.state.weddinganswers[weddingcurrentIndex + 1] });
      };

      goBackbtn = () => {
        // console.log(this.state);
        // console.log("current index " + this.state.weddingcurrentIndex);
        // console.log(
        //   "current index " + this.state.weddinganswers[this.state.weddingcurrentIndex - 1]
        // );
        let weddingformValue = this.state.weddinganswers[this.state.weddingcurrentIndex - 1];
        if (this.state.weddingcurrentIndex <= 0) {
          return;
        }
    
        if (this.state.weddingcurrentIndex <= 3) {
          this.setState({ weddingcurrentIndex: this.state.weddingcurrentIndex - 1 });
          this.setState({ weddingformValue: weddingformValue });
          console.log(this.state.weddingformValue);
        }
    }
    


    
    render() {
        return (
            <StateContext.Provider 
            value={{...this.state,
            mapValueAndNext : this.mapValueAndNext,
            mapEventValueAndNext : this.mapEventValueAndNext,
            goBack: this.goBack,
            goBackbtn: this.goBackbtn,
            weddingHandleChange : this.weddingHandleChange,
            birthdayHandleChange : this.birthdayHandleChange,
            handlerChange : this.handlerChange,
            }}>
                {this.props.children}
            </StateContext.Provider>
        )
    }
}
const ProductConsumer = StateContext.Consumer;
export {ProductProvider, ProductConsumer, StateContext}
