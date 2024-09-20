import './App.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

const GetItems = props => {
  const {item, key, isShow, deleteItem, searchEle} = props
  const {id, webs, username, password} = item
  const first = webs[0]
  console.log(key)
  const deleteEle = () => {
    deleteItem(id)
  }
  return webs.toLowerCase().includes(searchEle.toLowerCase()) ? (
    <li className="list-item">
      <p className="first-letter">{first}</p>
      <div>
        <p>{webs}</p>
        <p>{username}</p>
        {isShow ? (
          <p>{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            className="star-image"
            alt="stars"
          />
        )}
      </div>
      <button className="del-button" data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-button-image"
          alt="delete"
          onClick={deleteEle}
        />
      </button>
    </li>
  ) : null
}

class App extends Component {
  state = {
    passList: [],
    web: '',
    user: '',
    pass: '',
    count: 0,
    isShow: false,
    searchEle: '',
  }

  addPassword = event => {
    event.preventDefault()
    this.setState(prevState => ({
      passList: [
        ...prevState.passList,
        {
          id: uuidv4(),
          webs: prevState.web,
          username: prevState.user,
          password: prevState.pass,
        },
      ],
      web: '',
      user: '',
      pass: '',
      count: prevState.count + 1,
    }))
  }

  getWebsite = event => {
    this.setState({web: event.target.value})
  }

  getUsername = event => {
    this.setState({user: event.target.value})
  }

  getPassword = event => {
    this.setState({pass: event.target.value})
  }

  deleteItem = id => {
    this.setState(prevState => ({
      passList: prevState.passList.filter(each => each.id !== id),
      count: prevState.count - 1,
    }))
  }

  getSearchEle = event => {
    this.setState({searchEle: event.target.value})
  }
  showPasswords = () => {
    this.setState(prevState => ({
      isShow: !prevState.isShow,
    }))
  }

  render() {
    const {web, user, pass, count, passList, isShow, searchEle} = this.state
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="top-con">
          <form className="top-card" onSubmit={this.addPassword}>
            <h1 className="input-head">Add New Password</h1>
            <div className="input-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <hr />
              <input
                type="text"
                placeholder="Enter Website"
                className="input-ele"
                onChange={this.getWebsite}
                value={web}
              />
            </div>

            <div className="input-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <hr />
              <input
                type="text"
                placeholder="Enter Username"
                className="input-ele"
                onChange={this.getUsername}
                value={user}
              />
            </div>

            <div className="input-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <hr />
              <input
                type="password"
                placeholder="Enter Password"
                className="input-ele"
                onChange={this.getPassword}
                value={pass}
              />
            </div>
            <div className="add-button-con">
              <button className="add-button">Add</button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="pass-mag"
            alt="password manager"
          />
        </div>

        <div className="bottom-con">
          <div className="bottom-top-con">
            <div className="pass-count">
              <h1 className="pass-head">Your Passwords</h1>
              <p className="pass-para">{count}</p>
            </div>
            <div className="bottom-input-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-image"
              />
              <hr />
              <input
                type="search"
                placeholder="Search"
                className="input-ele"
                onChange={this.getSearchEle}
              />
            </div>
          </div>
          <hr className="hori-line" />
          <div className="checkbox-input-con">
            <input
              type="checkbox"
              className="checkbox-input"
              id="checboxInput"
              onChange={this.showPasswords}
            />
            <label className="show-pass-para" htmlFor="checboxInput">
              Show Passwords
            </label>
          </div>
          {count === 0 ? (
            <div className="no-pass-image-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="no-pass-image"
                alt="no passwords"
              />
              <p className="no-pass-para">No Passwords</p>
            </div>
          ) : (
            <ul className="unordered-list">
              {passList.map(each => (
                <GetItems
                  item={each}
                  key={each.id}
                  isShow={isShow}
                  deleteItem={this.deleteItem}
                  searchEle={searchEle}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
