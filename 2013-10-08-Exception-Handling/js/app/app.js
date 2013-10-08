'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  try {
    console.log(b);
  } catch(e) {
    console.log(e.message);
  }

  var o;
  try {
    o.doesntExist();
  } catch (e) {
    console.log(e.message);
  }

}
