const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: {type: String, required: true},
    gender: {type: String},
    id: {type: String, required: true},
    last_name: {type: String, required: true},
    link: {type: String, required: true},
    name: {type: String, required: true}
})

userSchema.methods.apiRepr = function () {
  return {
    first_name: this.first_name,
    gender: this.gender,
    id: this.id,
    last_name: this.last_name,
    link: this.link,
    name: this.name
  };
};

const eventSchema = mongoose.Schema({
    eventName: {type: String, required: true},
    eventType: {type: String, required: true},
    eventOrganizer: {
        first_name: {type: String, required: true},
        gender: {type: String},
        id: {type: String, required: true},
        last_name: {type: String, required: true},
        link: {type: String, required: true},
        name: {type: String, required: true},
        picture: {
            data: {
                url: {stype: String}
            }
        }
    },
    eventAttendees: [{
        first_name: {type: String},
        gender: {type: String},
        id: {type: String},
        last_name: {type: String},
        link: {type: String},
        name: {type: String},
        picture: {
            data: {
                url: {type: String}
            }
        }
    }],
    eventFacilityName: {type: String, required: true},
    eventDescription: {type: String, required: true},
    eventDate: {type: String, required: true},
    eventStartTime: {type: Date, required: true},
    eventDuration: {type: Number, required: true},
    eventChat:    [{
        _id: {type: Number},
        text: {type: String},
        createdAt: {type: Date},
        user: {
            _id: {type: Number},
            name: {type: String}
        }
    }]
})

userSchema.methods.apiRepr = function () {
  return {
    eventName: this.eventName,
    eventType: this.eventType,
    eventOrganizer: this.eventOrganizer,
    eventAttendees: this.eventAttendees,
    eventFacilityName: this.eventFacilityName,
    eventDate: this.eventDate,
    eventTime: this.eventTime,
    eventChat: this.eventChat,
  };
};


const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);

module.exports = { User , Event};