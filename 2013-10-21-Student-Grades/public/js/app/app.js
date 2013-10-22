'use strict';

var schools = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('#add-school').click(clickAddSchool);
  $('#add-student').click(clickAddStudent);
  $('#add-subject').click(clickAddStudent);
}

// Click Handlers
function clickAddStudent() {
  var name = $('#student').val();
  var gpa = parseFloat($('#gpa').val());
  var schoolName = $('#pick-school').val();

  var school = _.find(schools, function (s) {
    return s.name === schoolName;
  });

  var student = new Student(name, gpa);
  school.students.push(student);

  htmlAddStudentToSelect(student);

}

function clickAddSchool() {
  var name = $('#school').val();
  var school = new School(name);
  schools.push(school);
  htmlAddSchoolToSelect(school);
  $('#school').val('').focus();
}

function clickAddSubject() {
  var subjectName = $('#subject').val();
  var studentName = $('#pick-student').val();

  var
}

// Classes

function School(name) {
  this.name = name;
  this.students = [];
  this.gpa = function() {
    var sum = _.reduce(this.students, function(memo, student) {
      return memo + student.gpa;
    },0);
    return sum / this.students.length;
  };
}

function Student(name, gpa) {
  this.name = name;
  this.gpa = gpa;
  this.subjects = [];
}

// Miscellaneous

function htmlAddStudentToSelect(school) {
  var $option = $('<option>');
  $option.text(school.name);
  $option.val(school.name);
  $('#pick-student').append($option);
}

function htmlAddSchoolToSelect(student) {
  var $option = $('<option>');
  $option.text(student.name);
  $option.val(student.name);
  $('#pick-school').append($option);
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}
