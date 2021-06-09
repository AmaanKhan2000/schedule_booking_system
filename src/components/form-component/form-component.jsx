import React from 'react';

import './form-component.styles.scss';

class Form extends React.Component{
  constructor(){
    super();

    this.state = {
      summary:'',
      description:'',
      location:'',
      date:'',
      time:''
    }
  }


          // Initializing the credentials
           gapi = window.gapi;
          CLIENT_ID = '158527669361-2jkq7m1ph64f8njklpcr6r8up316gckj.apps.googleusercontent.com';
          // API_KEY = 'AIzaSyD6kWOPmtNFs0Ejoor9poiZ6fOVkDosMKc';
          DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
          SCOPES = "https://www.googleapis.com/auth/calendar";


handleChange = (e) => {
e.preventDefault();

const {name,value}=e.target;
this.setState({[name]:value}, () => {
  console.log(this.state)
})
}
 



handleClick = () =>
{
  this.gapi.load('client:auth2', ()=>
  {
    console.log('loaded client')
    this.gapi.client.init(
      {
        // apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES,
      }
    )
    this.gapi.client.load('calendar', 'v3', ()=> console.log('calendar loaded!'))
    this.gapi.auth2.getAuthInstance().signIn()
    .then(() =>
    {
      const event = {
        'summary': this.state.summary,
        'location': this.state.location,
        'description': this.state.description,
        'start': {
          'dateTime': `${this.state.date}T${this.state.time}:00+05:30`,
          'timeZone': 'Asia/Kolkata'
        },
        'end': {
          'dateTime': `${this.state.date}T${this.state.time}:00+05:30`,
          'timeZone': 'Asia/Kolkata'
        },
        'recurrence': [
          'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
          {'email': 'dr.someone@example.com'},
          {'email': 'nurse.someone@example.com'}
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 5},
            {'method': 'popup', 'minutes': 5}
          ]
        }
      };

      var request = this.gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });

      request.execute(event =>
        {
          window.open(event.htmlLink)
        })
    })
  })
}

render(){

  return (
    <div className='viewport'>
      <div className="row">
        <div className="col-md-6 center">
        <div class="login-box">
        <h1>Schedule your Appointments</h1>
        <div class="textbox">
        <i class="fas fa-pencil-alt"></i>
          <input
          name='description'
          value={this.state.description}
          onChange={this.handleChange} 
          type="text" 
          placeholder="Description"/>
        </div>
  
        <div class="textbox">
        <i class="fas fa-book-open"></i>
          <input 
          name='summary'
          value={this.state.summary} 
          onChange={this.handleChange} 
          type="text" 
          placeholder="Summary"/>
        </div>
        <div class="textbox">
        <i class="fas fa-map-marker-alt"></i>
          <input 
          name='location'
          value={this.state.location}
          onChange={this.handleChange}  
          type="text" 
          placeholder="Location"/>
        </div>
  
        <div class="textbox">
        <i class="fas fa-calendar-week"></i>
          <input 
          name='date'
          value={this.state.date}
          onChange={this.handleChange} 
          type="date" 
          placeholder="Date"/>
        </div>
  
        <div class="textbox">
        <i class="far fa-clock"></i>
          <input 
          name='time'
          value={this.state.time}
          onChange={this.handleChange} 
          type="time" 
          placeholder="Time"/>
        </div>
  
        <button className='buttn from-left' onClick={this.handleClick}>Schedule your Appointments/Bookings</button>
      </div>
        </div>
        <div className="col-md-6 center">
        <div className='about'>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati libero voluptatum, soluta aspernatur sint dignissimos qui commodi iusto consequatur odit! Architecto et laborum, eaque dolorem totam ad rem maxime expedita quam quibusdam doloremque? Explicabo dolores consectetur nesciunt voluptate natus quam provident in doloremque ipsam, laborum, accusamus quaerat? Id ipsum, unde facere dolorum illum velit rem repudiandae inventore laudantium quasi praesentium ea cumque quod aspernatur magni minima nemo magnam dolor quam saepe quidem amet. Rerum recusandae quisquam rem sequi fuga consequatur iusto ratione nostrum quo repellat labore atque dignissimos perspiciatis at, officia minus? Sapiente fugiat nostrum cupiditate, tempora sint, numquam rem, beatae harum dignissimos dolor molestias non dolorum enim aliquam architecto suscipit veritatis cumque fugit minus! Rerum nihil deserunt, numquam id iusto deleniti doloremque sequi, nostrum beatae, tenetur culpa officiis quasi architecto hic consequatur voluptas totam velit pariatur non ipsa eligendi quos. Voluptatum earum exercitationem praesentium cum necessitatibus fuga, aut laudantium dolor consectetur veniam, atque, quibusdam eum? Quod, alias ipsum rem quia earum tempora explicabo! Porro animi cupiditate consequatur eum blanditiis? Fugiat obcaecati, odit est suscipit consequatur tenetur quos accusantium quo dolorum ad nam commodi! Suscipit, omnis minima aliquid, illum nemo ab hic doloremque, aliquam quidem tempore veritatis debitis qui impedit.</p>
      </div>
        </div>
      </div>
      
  
      
    </div>
  )
}



}



export default Form;