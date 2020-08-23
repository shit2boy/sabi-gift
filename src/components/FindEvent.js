import React, { Component } from "react";
import axios from "axios";
import util from "../util/util";
export class FindEvent extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      searchedValue: "",
    };
  }

  onSearch = (event) => {
    this.setState({ searchedValue: event.target.value });
    console.log(this.state.searchedValue);
  };
  async handleSearch() {
    let searchWord = this.state.searchedValue;
    try {
      axios
        .get(`${util.API_BASE_URL}events/?search=${searchWord}`)
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    // const filteredItems = items.filter((item) =>
    //   item.includes(this.state.searchedValue)
    // );
    return (
      <div>
        <form className="container">
          <div class="form-group row">
            <div class="col-sm-8 br-1">
              <input
                type="text"
                class="form-control"
                onChange={this.onSearch}
                value={this.state.searchedValue}
                placeholder="Victor's Birthday"
              />
            </div>
            <button
              type="submit"
              class="btn p-2"
              style={{ backgroundColor: "#6F64F8" }}
            >
              Find
            </button>
          </div>
        </form>
        <p class="text-center">We found 50 event registries</p>
      </div>
    );
  }
}

export default FindEvent;
