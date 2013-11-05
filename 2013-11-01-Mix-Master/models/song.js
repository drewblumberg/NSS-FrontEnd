var mongoose = require('mongoose');

var Song = mongoose.Schema({
  title:     {type: String, required: [true, 'Title is required.']},
  duration:  {type: Number, min: [1, 'Song duration should be at least 1 second.'],
                            required: [true, 'Duration is required.'],
                            match:[/^[0-9]+$/, '{VALUE} must be a number.']},
  filename:  {type: String, required: [true, 'Song file is required.'],
                            match:[/^[a-zA-Z-]+\.mp3$/, 'Song must be an mp3.']},
  genres:    [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  coverArt:  {type: String, required: [true, 'Cover art is required.'],
                            match:[/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/, '{VALUE} must be a .png or .jpeg']},
  lyrics:    String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Song', Song);