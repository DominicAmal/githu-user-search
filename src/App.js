import React, { Component } from 'react';
import './App.css';
import Search from './components/Search'
import _ from 'lodash';
import axios from 'axios';
import UsersList from './components/UsersList'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      img: '',
    }
  }
  /**
   * API call to get users by search term
   * @param {*} term 
   */
  getSearchUsers(term) {
    axios.get(`https://api.github.com/search/users?q=${term}&client_id=654f9a53103d65be20cc&client_secret=86b567407617e67f8f19cba60dda62904dc7efb1`)
      .then((response) => {
        this.setState({
          users: response.data.items
        })
      })
  }
  /**
   * this method will be called
   */
  componentDidMount() {
    this.getSearchUsers('')
  }

  render() {
    /**
     * Destructuring the users and user image
     */
    const { users, img } = this.state

    /**
     * User Search
     */
    const userSearch = _.debounce(term => {
      if (term != '') {
        this.getSearchUsers(term)
      } else {
        this.setState({ users: [], img: '' });
      }
    }, 250, { 'maxWait': 1000 })
    /**
     * To set user details
     * @param {*} data 
     */
    const setUserDetail = (data) => {
      this.setState({
        img: data.avatar_url
      })
    }

    var myImage;
    if (users.length > 0 && img == '') {
      myImage = <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 295.996 295.996" width="512px" height="512px" class=""><g><g>
        <path d="M147.998,0C66.392,0,0,66.392,0,147.998s66.392,147.998,147.998,147.998s147.998-66.392,147.998-147.998   S229.605,0,147.998,0z M147.998,279.996c-36.256,0-69.143-14.696-93.022-38.44c-9.536-9.482-17.631-20.41-23.934-32.42   C21.442,190.847,16,170.047,16,147.998C16,75.214,75.214,16,147.998,16c34.523,0,65.987,13.328,89.533,35.102   c12.208,11.288,22.289,24.844,29.558,39.996c8.27,17.239,12.907,36.538,12.907,56.9   C279.996,220.782,220.782,279.996,147.998,279.996z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#808080" />
        <circle cx="99.666" cy="114.998" r="16" data-original="#000000" class="active-path" data-old_color="#000000" fill="#808080" />
        <circle cx="198.666" cy="114.998" r="16" data-original="#000000" class="active-path" data-old_color="#000000" fill="#808080" />
        <path d="M147.715,229.995c30.954,0,60.619-15.83,77.604-42.113l-13.439-8.684c-15.597,24.135-44.126,37.604-72.693,34.308   c-22.262-2.567-42.849-15.393-55.072-34.308l-13.438,8.684c14.79,22.889,39.716,38.409,66.676,41.519   C140.814,229.8,144.27,229.995,147.715,229.995z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#808080" />
      </g></g> </svg>
    } else {
      myImage = <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" width="512px" height="512px" class=""><g><g>
        <path d="M16.5,33C7.402,33,0,25.598,0,16.5S7.402,0,16.5,0S33,7.402,33,16.5S25.598,33,16.5,33z M16.5,1C7.953,1,1,7.953,1,16.5   S7.953,32,16.5,32S32,25.047,32,16.5S25.047,1,16.5,1z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#808080" />
        <circle cx="11.702" cy="11.93" r="2.125" data-original="#000000" class="active-path" data-old_color="#000000" fill="#808080" />
        <circle cx="21.827" cy="11.93" r="2.125" data-original="#000000" class="active-path" data-old_color="#000000" fill="#808080" />
        <path d="M10.326,23.918c-0.09,0-0.18-0.024-0.262-0.074c-0.235-0.146-0.308-0.453-0.163-0.688c1.429-2.314,3.905-3.696,6.623-3.696   c2.679,0,5.136,1.352,6.572,3.615c0.148,0.233,0.079,0.542-0.154,0.689c-0.234,0.147-0.542,0.08-0.69-0.154   c-1.251-1.973-3.393-3.15-5.727-3.15c-2.368,0-4.526,1.204-5.772,3.222C10.658,23.834,10.494,23.918,10.326,23.918z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#808080" />
      </g></g> </svg>
    }

    return (
      <div >
        <div className="split left">
          <Search onSearchTermChange={userSearch} />
          {
            users.length > 0 ?
              <UsersList users={users} userDetail={setUserDetail} />
              : <span className="no-records">No Records Found</span>
          }
        </div>
        <div className="split right">
          {
            img ?
              <img src={this.state.img} alt="" />
              :
              myImage
          }
        </div>
      </div >
    );
  }
}

export default App;