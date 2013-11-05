var mongoose = require('mongoose');

var Genre = mongoose.Schema({
  name: { type: String,
          required: [true, 'Name is required.'],
          match: [/^[a-zA-Z ]+[a-zA-Z ]$/, '{VALUE} is an invalid name.'] },
  songids:     [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Genre', Genre);