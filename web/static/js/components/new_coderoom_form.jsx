import React, {Component} from 'react'
import { createCoderoom }  from '../utils/api'

export default class NewCoderoomForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      privateChecked: true,
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const {name, language} = this.refs
    const isPrivate = this.state.privateChecked
    createCoderoom({
      name:     name.value,
      language: language.value,
      private:  this.state.privateChecked
    }).then(response => {
      const { data } = response
      if (data.error) {
        this.handleError(response.error)
      } else {
        const route = `/coderooms/${isPrivate ? 'private' : 'public'}/${data.name}`
        this.props.route.browserHistory.replace(route)
      }
    })
  }

  handleError(error) {
    console.log(error)
  }

  handleCheckboxChange() {
    this.setState({
      privateChecked: !this.state.privateChecked
    })
  }

  render() {
    return (
      <form
        style={{paddingTop: 200, marginLeft: 250, marginRight: 250}}
        className="ui form"
        onSubmit={this.handleSubmit.bind(this)}
        >
        <div className="three fields  ui raised segment">
          <div className="eight wide field">
            <input
              autoFocus={true}
              ref="name"
              style={{textAlign: 'center'}}
              type="text"
              placeholder='Name'
            />
          </div>
          <div className=" eight wide field">
            <select
              ref='language'
              className="ui fluid search dropdown"
              name="card[expire-month]"
              >
              <option value="">Language</option>
              <option value="ruby">Ruby</option>
            </select>
          </div>
          <div style={{marginTop: 10}} className="ui three wide field checked checkbox">
            <input
              ref='isPrivate'
              type="checkbox"
              onChange={this.handleCheckboxChange.bind(this)}
              checked={this.state.privateChecked}
              />
            <label>Private</label>
          </div>
          <input className="ui button" value="Create Coderoom" type="submit"/>
        </div>
      </form>
    )
  }
}
