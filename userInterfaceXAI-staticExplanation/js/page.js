/**
 * PAGE.JS
 *
 * TODO: Documentation
 * Written by Somayeh Molaei, Feb 2022
 */

history.scrollRestoration = "manual";
//const bc = new window.BroadcastChannel('wizard_communication');

$(window).on('beforeunload', function () {
  $(window).scrollTop(0);
});
var TOTAL_NUM_EVENTS = 6;
var TOTAL_NUM_QUESTIONS = 5;
var USER = Math.floor(10000000 + Math.random() * 90000000);
console.log("USER:", USER);
var metaData;
var file_name_to_be_processed = '';
var current_line_number = '';

var event_type_to_use = [1, 1, 1, 2, 2, 2];
// 1: crash event, 2: near crash event, 3: baseline.
event_type_to_use.sort(() => .5 - Math.random());

//nltk.download('punkt');

//var random_indices = [Math.floor( Math.random() * 41),Math.floor( Math.random() * 41), Math.floor( Math.random() * 41), Math.floor( Math.random() * 41), Math.floor( Math.random() * 41), Math.floor( Math.random() * 41) ];
//second_channel.postMessage("hey, hey");
////second_channel.postMessage([event_type_to_use, random_indices]);
var arr = [];
while (arr.length < 6) {
  var r = Math.floor(Math.random() * 6) + 1;
  if (arr.indexOf(r) === -1) arr.push(r);
}
var random_indices = arr;
console.log("unique random numbers:", arr);
localStorage.setItem('event_type_to_use', event_type_to_use);
localStorage.setItem('random_indices', random_indices);

console.log("random_indices", random_indices);


var SESSION = 0;
var ASSIGNMENTID = 0;
//var HITID= gup('hitId');

let userResponses = new Array();



console.log("random order of event types", event_type_to_use);

$(document).ready(function () {

  window.onkeydown = function (event) {
    //console.log("--------key event------", event.keyCode);
    //event.preventDefault();
    if (event.keyCode === 13) {
      //document.getElementById("askVehicle").click();
      masterController.askWizard();

    }

  };

  var if_ended = false;
  var the_video = document.getElementById('instructvid');

  the_video.addEventListener('if_ended', event => {
    if_ended = event.data;

    //console.log("the video has ended playing", if_ended, event.ended);

  });

  let start = new Date();
  let duration = new Array();
  duration.push(start);
  var userObservationValidation = new Array();
  var userObservationValidationAfter = new Array();
  var userIdx = 0;
  var otherType = '';
  if (event_type_to_use[0] === 1) {
    file_name_to_be_processed = "crash_data.csv";
  } else if (event_type_to_use[0] === 2) {
    file_name_to_be_processed = "near_crash_data.csv";

  } else {
    file_name_to_be_processed = "baseline_data.csv";
  }

  // AJAX in the data file
  $.ajax({
    type: "GET",
    url: file_name_to_be_processed,
    dataType: "text",
    success: function (myData) {

      masterController.processData(myData);
      metaData = myData;
    }
  });
  var message_user = '';
  channel.addEventListener('message_user', event => {
    message_user = event.data;
    masterControllerWizard.$data.wizardAnswer = message_user;
    //console.log("message from wizard.html", message_user);

  });




  ////  INIT VUE CONTROLLERS  ////
  var masterController = new Vue({
    el: '#dynamic',
    data: {
      /* Object Controller elements */


      idx: 0,
      prompt_info: '',
      eventDescription: '',
      wizardAnswer: '',
      event_id: '',
      video_name: '',
      objMessage: " Driving event " + 1 + " of " + TOTAL_NUM_EVENTS + "        ",
      q1_correct: "",
      q1_user: "",
      q1_incorrect1: "",
      q1_incorrect2: "",
      q2_correct: "",
      q2_user: "",
      q2_incorrect: "",
      q3_correct: "",
      q3_incorrect: "",
      q4_correct: "",
      q4_user: "",
      q4_incorrect1: "",
      q4_incorrect2: "",
      q4_incorrect3: "",
      q5_correct: "",
      q5_user: "",
      q5_incorrect1: "",
      q5_incorrect2: "",
      q5_incorrect3: "",
      q6_correct: "",
      q6_user: "",
      q6_incorrect1: "",
      q6_incorrect2: "",
      q6_incorrect3: "",
      q7_correct: "",
      q7_user: "",
      q7_incorrect1: "",
      q7_incorrect2: "",
      q7_incorrect3: "",
      q8_correct: "",
      q8_user: "",
      q8_incorrect1: "",
      q8_incorrect2: "",
      q8_incorrect3: "",
      q9_correct: "",
      q9_user: "",
      q9_incorrect1: "",
      q9_incorrect2: "",
      q9_incorrect3: "",
      q10_correct: "",
      q10_user: "",
      q10_incorrect1: "",
      q10_incorrect2: "",
      q10_incorrect3: "",
      q11_correct: "",
      q11_user: "",
      q11_incorrect1: "",
      q11_incorrect2: "",
      q11_incorrect3: "",
      q12_correct: "",
      q12_user: "",
      q12_incorrect1: "",
      q12_incorrect2: "",
      q12_incorrect3: "",
      q13_correct: "",
      q13_user: "",
      q13_incorrect1: "",
      q13_incorrect2: "",
      q13_incorrect3: "",
      q14_correct: "",
      q14_user: "",
      q14_incorrect1: "",
      q14_incorrect2: "",
      q14_incorrect3: "",
      q15_correct: "",
      q15_user: "",
      q15_incorrect1: "",
      q15_incorrect2: "",
      q15_incorrect3: "",
      q16_correct: "",
      q16_user: "",
      q16_incorrect1: "",
      q16_incorrect2: "",
      q16_incorrect3: "",
      q17_correct: "",
      q17_user: "",
      q17_incorrect1: "",
      q17_incorrect2: "",
      q17_incorrect3: "",
      q18_correct: "",
      q18_user: "",
      q18_incorrect1: "",
      q18_incorrect2: "",
      q18_incorrect3: "",
      q19_correct: "",
      q19_user: "",
      q19_incorrect: "",
      q20_correct: "",
      q20_user: "",
      q20_incorrect1: "",
      q20_incorrect2: "",
      q20_incorrect3: "",
      q21_correct: "",
      q21_user: "",
      q21_incorrect1: "",
      q21_incorrect2: "",
      q21_incorrect3: "",
      q22_correct: "",
      q22_user: "",
      q22_incorrect1: "",
      q22_incorrect2: "",
      q22_incorrect3: "",
      q23_correct: "",
      q23_user: "",
      q23_incorrect1: "",
      q23_incorrect2: "",
      q23_incorrect3: "",
      q24_correct: "",
      q24_user: "",
      q24_incorrect1: "",
      q24_incorrect2: "",
      q24_incorrect3: "",

    },
    methods: {
      /*Object Controller Methods */

      logResponse: function () {

        let userRespObj = {};

        //console.log(USER, SESSION);  // DEBUG
        var choices_q1 = document.getElementsByName('q1After');
        //console.log("choices_q1", choices_q1);
        // loop through all the radio inputs
        for (i = 0; i < choices_q1.length; i++) {
          // if the radio is checked c2 always correct
          if (choices_q1[i].checked) {
            // add 1 to that choice's score
            if (choices_q1[i].value == 'c1') {
              masterController.$data.q1_user = masterController.$data.q1_incorrect1;
            }
            if (choices_q1[i].value == 'c2') {
              masterController.$data.q1_user = masterController.$data.q1_correct;
            }
            if (choices_q1[i].value == 'c3') {
              masterController.$data.q1_user = masterController.$data.q1_incorrect2;
            }
            if (choices_q1[i].value == 'c4') {
              masterController.$data.q1_user = masterController.$data.q1_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }

        var choices_q2_After = document.getElementsByName('q2After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q2_After.length; i++) {
          // if the radio is checked..
          if (choices_q2_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q2_After[i].value == 'c1') {
              masterController.$data.q2_user = masterController.$data.q2_incorrect;
            }
            if (choices_q2_After[i].value == 'c2') {
              masterController.$data.q2_user = masterController.$data.q2_correct;
            }


            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q3------------------------------
        var choices_q3_After = document.getElementsByName('q3After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q3_After.length; i++) {
          // if the radio is checked..
          if (choices_q3_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q3_After[i].value == 'c1') {
              masterController.$data.q3_user = masterController.$data.q3_correct;
            }
            if (choices_q3_After[i].value == 'c2') {
              masterController.$data.q3_user = masterController.$data.q3_incorrect;
            }


            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q4------------------------------
        var choices_q4_After = document.getElementsByName('q4After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q4_After.length; i++) {
          // if the radio is checked..
          if (choices_q4_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q4_After[i].value == 'c1') {
              masterController.$data.q4_user = masterController.$data.q4_incorrect1;
            }
            if (choices_q4_After[i].value == 'c2') {
              masterController.$data.q4_user = masterController.$data.q4_incorrect2;
            }
            if (choices_q4_After[i].value == 'c3') {
              masterController.$data.q4_user = masterController.$data.q4_incorrect3;
            }
            if (choices_q4_After[i].value == 'c4') {
              masterController.$data.q4_user = masterController.$data.q4_correct;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q5------------------------------
        var choices_q5_After = document.getElementsByName('q5After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q5_After.length; i++) {
          // if the radio is checked..
          if (choices_q5_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q5_After[i].value == 'c1') {
              masterController.$data.q5_user = masterController.$data.q5_correct;
            }
            if (choices_q5_After[i].value == 'c2') {
              masterController.$data.q5_user = masterController.$data.q5_incorrect1;
            }
            if (choices_q5_After[i].value == 'c3') {
              masterController.$data.q5_user = masterController.$data.q5_incorrect2;
            }
            if (choices_q5_After[i].value == 'c4') {
              masterController.$data.q5_user = masterController.$data.q5_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q6------------------------------
        var choices_q6_After = document.getElementsByName('q6After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q6_After.length; i++) {
          // if the radio is checked..
          if (choices_q6_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q6_After[i].value == 'c1') {
              masterController.$data.q6_user = masterController.$data.q6_incorrect1;
            }
            if (choices_q6_After[i].value == 'c2') {
              masterController.$data.q6_user = masterController.$data.q6_correct;
            }
            if (choices_q6_After[i].value == 'c3') {
              masterController.$data.q6_user = masterController.$data.q6_incorrect2;
            }
            if (choices_q6_After[i].value == 'c4') {
              masterController.$data.q6_user = masterController.$data.q6_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q7------------------------------
        var choices_q7_After = document.getElementsByName('q7After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q7_After.length; i++) {
          // if the radio is checked..
          if (choices_q7_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q7_After[i].value == 'c1') {
              masterController.$data.q7_user = masterController.$data.q7_incorrect1;
            }
            if (choices_q7_After[i].value == 'c2') {
              masterController.$data.q7_user = masterController.$data.q7_incorrect2;
            }
            if (choices_q7_After[i].value == 'c3') {
              masterController.$data.q7_user = masterController.$data.q7_incorrect3;
            }
            if (choices_q7_After[i].value == 'c4') {
              masterController.$data.q7_user = masterController.$data.q7_correct;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q8------------------------------
        var choices_q8_After = document.getElementsByName('q8After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q8_After.length; i++) {
          // if the radio is checked..
          if (choices_q8_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q8_After[i].value == 'c1') {
              masterController.$data.q8_user = masterController.$data.q8_incorrect1;
            }
            if (choices_q8_After[i].value == 'c2') {
              masterController.$data.q8_user = masterController.$data.q8_correct;
            }
            if (choices_q8_After[i].value == 'c3') {
              masterController.$data.q8_user = masterController.$data.q8_incorrect2;
            }
            if (choices_q8_After[i].value == 'c4') {
              masterController.$data.q8_user = masterController.$data.q8_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q9------------------------------
        var choices_q9_After = document.getElementsByName('q9After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q9_After.length; i++) {
          // if the radio is checked..
          if (choices_q9_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q9_After[i].value == 'c1') {
              masterController.$data.q9_user = masterController.$data.q9_correct;
            }
            if (choices_q9_After[i].value == 'c2') {
              masterController.$data.q9_user = masterController.$data.q9_incorrect1;
            }
            if (choices_q9_After[i].value == 'c3') {
              masterController.$data.q9_user = masterController.$data.q9_incorrect2;
            }
            if (choices_q9_After[i].value == 'c4') {
              masterController.$data.q9_user = masterController.$data.q9_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }

        //--------q10------------------------------
        var choices_q10_After = document.getElementsByName('q10After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q10_After.length; i++) {
          // if the radio is checked..
          if (choices_q10_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q10_After[i].value == 'c1') {
              masterController.$data.q10_user = masterController.$data.q10_incorrect1;
            }
            if (choices_q10_After[i].value == 'c2') {
              masterController.$data.q10_user = masterController.$data.q10_incorrect2;
            }
            if (choices_q10_After[i].value == 'c3') {
              masterController.$data.q10_user = masterController.$data.q10_correct;
            }
            if (choices_q10_After[i].value == 'c4') {
              masterController.$data.q10_user = masterController.$data.q10_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q11------------------------------
        var choices_q11_After = document.getElementsByName('q11After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q11_After.length; i++) {
          // if the radio is checked..
          if (choices_q11_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q11_After[i].value == 'c1') {
              masterController.$data.q11_user = masterController.$data.q11_incorrect1;
            }
            if (choices_q11_After[i].value == 'c2') {
              masterController.$data.q11_user = masterController.$data.q11_incorrect2;
            }
            if (choices_q11_After[i].value == 'c3') {
              masterController.$data.q11_user = masterController.$data.q11_incorrect3;
            }
            if (choices_q11_After[i].value == 'c4') {
              masterController.$data.q11_user = masterController.$data.q11_correct;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q12------------------------------
        var choices_q12_After = document.getElementsByName('q9After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q12_After.length; i++) {
          // if the radio is checked..
          if (choices_q12_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q12_After[i].value == 'c1') {
              masterController.$data.q12_user = masterController.$data.q12_incorrect1;
            }
            if (choices_q12_After[i].value == 'c2') {
              masterController.$data.q12_user = masterController.$data.q12_correct;
            }
            if (choices_q12_After[i].value == 'c3') {
              masterController.$data.q12_user = masterController.$data.q12_incorrect2;
            }
            if (choices_q12_After[i].value == 'c4') {
              masterController.$data.q12_user = masterController.$data.q12_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q13------------------------------
        var choices_q13_After = document.getElementsByName('q13After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q13_After.length; i++) {
          // if the radio is checked..
          if (choices_q13_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q13_After[i].value == 'c1') {
              masterController.$data.q13_user = masterController.$data.q13_correct;
            }
            if (choices_q13_After[i].value == 'c2') {
              masterController.$data.q13_user = masterController.$data.q13_incorrect1;
            }
            if (choices_q13_After[i].value == 'c3') {
              masterController.$data.q13_user = masterController.$data.q13_incorrect2;
            }
            if (choices_q13_After[i].value == 'c4') {
              masterController.$data.q13_user = masterController.$data.q13_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q14------------------------------
        var choices_q14_After = document.getElementsByName('q9After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q14_After.length; i++) {
          // if the radio is checked..
          if (choices_q14_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q14_After[i].value == 'c1') {
              masterController.$data.q14_user = masterController.$data.q14_incorrect1;
            }
            if (choices_q14_After[i].value == 'c2') {
              masterController.$data.q14_user = masterController.$data.q14_incorrect2;
            }
            if (choices_q14_After[i].value == 'c3') {
              masterController.$data.q14_user = masterController.$data.q14_incorrect3;
            }
            if (choices_q14_After[i].value == 'c4') {
              masterController.$data.q14_user = masterController.$data.q14_correct;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q15------------------------------
        var choices_q15_After = document.getElementsByName('q15After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q15_After.length; i++) {
          // if the radio is checked..
          if (choices_q15_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q15_After[i].value == 'c1') {
              masterController.$data.q15_user = masterController.$data.q15_correct;
            }
            if (choices_q15_After[i].value == 'c2') {
              masterController.$data.q15_user = masterController.$data.q15_incorrect1;
            }
            if (choices_q15_After[i].value == 'c3') {
              masterController.$data.q15_user = masterController.$data.q15_incorrect2;
            }
            if (choices_q15_After[i].value == 'c4') {
              masterController.$data.q15_user = masterController.$data.q15_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q16------------------------------
        var choices_q16_After = document.getElementsByName('q16After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q16_After.length; i++) {
          // if the radio is checked..
          if (choices_q16_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q16_After[i].value == 'c1') {
              masterController.$data.q16_user = masterController.$data.q16_incorrect1;
            }
            if (choices_q16_After[i].value == 'c2') {
              masterController.$data.q16_user = masterController.$data.q16_incorrect2;
            }
            if (choices_q16_After[i].value == 'c3') {
              masterController.$data.q16_user = masterController.$data.q16_correct;
            }
            if (choices_q16_After[i].value == 'c4') {
              masterController.$data.q16_user = masterController.$data.q16_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q17------------------------------
        var choices_q17_After = document.getElementsByName('q17After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q17_After.length; i++) {
          // if the radio is checked..
          if (choices_q17_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q17_After[i].value == 'c1') {
              masterController.$data.q17_user = masterController.$data.q17_incorrect1;
            }
            if (choices_q17_After[i].value == 'c2') {
              masterController.$data.q17_user = masterController.$data.q17_incorrect2;
            }
            if (choices_q17_After[i].value == 'c3') {
              masterController.$data.q17_user = masterController.$data.q17_correct;
            }
            if (choices_q17_After[i].value == 'c4') {
              masterController.$data.q17_user = masterController.$data.q17_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q18------------------------------
        var choices_q18_After = document.getElementsByName('q18After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q18_After.length; i++) {
          // if the radio is checked..
          if (choices_q18_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q18_After[i].value == 'c1') {
              masterController.$data.q18_user = masterController.$data.q18_correct;
            }
            if (choices_q18_After[i].value == 'c2') {
              masterController.$data.q18_user = masterController.$data.q18_incorrect1;
            }
            if (choices_q18_After[i].value == 'c3') {
              masterController.$data.q18_user = masterController.$data.q18_incorrect2;
            }
            if (choices_q18_After[i].value == 'c4') {
              masterController.$data.q18_user = masterController.$data.q18_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q19------------------------------
        var choices_q19_After = document.getElementsByName('q19After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q19_After.length; i++) {
          // if the radio is checked..
          if (choices_q19_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q19_After[i].value == 'c1') {
              masterController.$data.q19_user = masterController.$data.q19_correct;
            }
            if (choices_q19_After[i].value == 'c2') {
              masterController.$data.q19_user = masterController.$data.q19_incorrect;
            }


            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q20------------------------------
        var choices_q20_After = document.getElementsByName('q20After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q20_After.length; i++) {
          // if the radio is checked..
          if (choices_q20_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q20_After[i].value == 'c1') {
              masterController.$data.q20_user = masterController.$data.q20_incorrect1;
            }
            if (choices_q20_After[i].value == 'c2') {
              masterController.$data.q20_user = masterController.$data.q20_incorrect2;
            }
            if (choices_q20_After[i].value == 'c3') {
              masterController.$data.q20_user = masterController.$data.q20_incorrect3;
            }
            if (choices_q20_After[i].value == 'c4') {
              masterController.$data.q20_user = masterController.$data.q20_correct;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        //--------q21------------------------------
        var choices_q21_After = document.getElementsByName('q21After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q21_After.length; i++) {
          // if the radio is checked..
          if (choices_q21_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q21_After[i].value == 'c1') {
              masterController.$data.q21_user = masterController.$data.q21_incorrect1;
            }
            if (choices_q21_After[i].value == 'c2') {
              masterController.$data.q21_user = masterController.$data.q21_correct;
            }
            if (choices_q21_After[i].value == 'c3') {
              masterController.$data.q21_user = masterController.$data.q21_incorrect2;
            }
            if (choices_q21_After[i].value == 'c4') {
              masterController.$data.q21_user = masterController.$data.q21_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }

        //--------q22------------------------------
        var choices_q22_After = document.getElementsByName('q22After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q22_After.length; i++) {
          // if the radio is checked..
          if (choices_q22_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q22_After[i].value == 'c1') {
              masterController.$data.q22_user = masterController.$data.q22_incorrect1;
            }
            if (choices_q22_After[i].value == 'c2') {
              masterController.$data.q22_user = masterController.$data.q22_correct;
            }
            if (choices_q22_After[i].value == 'c3') {
              masterController.$data.q22_user = masterController.$data.q22_incorrect2;
            }
            if (choices_q22_After[i].value == 'c4') {
              masterController.$data.q22_user = masterController.$data.q22_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }

        //--------q23------------------------------
        var choices_q23_After = document.getElementsByName('q23After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q23_After.length; i++) {
          // if the radio is checked..
          if (choices_q23_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q23_After[i].value == 'c1') {
              masterController.$data.q23_user = masterController.$data.q23_incorrect1;
            }
            if (choices_q23_After[i].value == 'c2') {
              masterController.$data.q23_user = masterController.$data.q23_correct;
            }
            if (choices_q23_After[i].value == 'c3') {
              masterController.$data.q23_user = masterController.$data.q23_incorrect2;
            }
            if (choices_q23_After[i].value == 'c4') {
              masterController.$data.q23_user = masterController.$data.q23_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }

        //--------q24------------------------------
        var choices_q24_After = document.getElementsByName('q24After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q24_After.length; i++) {
          // if the radio is checked..
          if (choices_q24_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q24_After[i].value == 'c1') {
              masterController.$data.q24_user = masterController.$data.q24_incorrect1;
            }
            if (choices_q24_After[i].value == 'c2') {
              masterController.$data.q24_user = masterController.$data.q24_correct;
            }
            if (choices_q24_After[i].value == 'c3') {
              masterController.$data.q24_user = masterController.$data.q24_incorrect2;
            }
            if (choices_q24_After[i].value == 'c4') {
              masterController.$data.q24_user = masterController.$data.q24_incorrect3;
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }


        userRespObj = {
          event_id: masterController.$data.event_id,

        };
        userResponses.push(userRespObj);
        masterController.submitTask();

      },

      noMoreQuestion: function () {
        document.getElementById("quiz3").style.display = 'none';
        document.getElementById("quiz2After").style.display = '';
        document.getElementById("submit").style.display = '';

      },


      wideoWatched: function () {

        document.getElementById("theVidDiv").style.pointerEvents = 'none';
        document.getElementById("theVidDiv").style.opacity = '0.4';
        document.getElementById("robot-container").style.width = "38%";
        document.getElementById("robot-container").style.display = '';
        document.getElementById("static-prompt").style.display = '';
        document.getElementById("quiz2").style.display = 'none';
        document.getElementById("prompt").innerHTML = masterController.$data.eventDescription;

      },

      waitForAnswer: function (resolve, reject) {
        //console.log("we are in waitForAnswer", message_user);
        channel.onmessage = event => {
          //console.log("from wizard:", event.data);
          masterController.$data.wizardAnswer = event.data;
        }

        var timeout = 10000000000; // 1000000ms = 1000 seconds

        if (masterController.$data.wizardAnswer !== '') {
          //console.log("in the wait for answer", masterController.$data.wizardAnswer);

          resolve(masterController.$data.wizardAnswer);
        }
        else if (timeout && (Date.now() - start) >= timeout) {
          //console.log("Timed Out");
          reject(new Error("timeout"));
        }
        else
          setTimeout(masterController.waitForAnswer.bind(this, resolve, reject), 30);
      },
      // This is the promise code, so this is the useful bit
      ensureAnswerIsSet: function (timeout) {
        var start = Date.now();
        return new Promise(masterController.waitForAnswer); // set the promise object within the ensureFooIsSet object

      },

      get_the_next_data: function (for_this_index) {
        if (event_type_to_use[for_this_index] === 1) {
          file_name_to_be_processed = "crash_data.csv";
        } else if (event_type_to_use[for_this_index] === 2) {
          file_name_to_be_processed = "near_crash_data.csv";

        } else {
          file_name_to_be_processed = "baseline_data.csv";
        }
        return file_name_to_be_processed;
      },
      read_the_next_data: function (this_file_name_) {
        $.ajax({
          type: "GET",
          url: this_file_name_,
          dataType: "text",
          success: function (myData) {

            masterController.processData(myData);
            metaData = myData;
          }
        });

      },
      nextEvent: function () {
        if (this.$data.idx < TOTAL_NUM_EVENTS - 1) {
          // Get the next event
          let end_of_this_event = Date.now();

          duration.push(start - end_of_this_event);
          //console.log("time taken for this event:", start, end_of_this_event, start - end_of_this_event);



          //console.log("now the idx is", masterController.$data.idx + 1);
          var ele1 = document.getElementsByName("q1");
          for (var i = 0; i < ele1.length; i++)
            ele1[i].checked = false;
          var eleq1 = document.getElementsByName("q1After");
          for (var i = 0; i < eleq1.length; i++)
            eleq1[i].checked = false;
          var eleq2 = document.getElementsByName("q2After");
          for (var i = 0; i < eleq2.length; i++)
            eleq2[i].checked = false;
          var eleq3 = document.getElementsByName("q3After");
          for (var i = 0; i < eleq3.length; i++)
            eleq3[i].checked = false;
          var eleq4 = document.getElementsByName("q4After");
          for (var i = 0; i < eleq4.length; i++)
            eleq4[i].checked = false;
          var eleq5 = document.getElementsByName("q5After");
          for (var i = 0; i < eleq5.length; i++)
            eleq5[i].checked = false;
          var eleq6 = document.getElementsByName("q6After");
          for (var i = 0; i < eleq6.length; i++)
            eleq6[i].checked = false;
          var eleq7 = document.getElementsByName("q7After");
          for (var i = 0; i < eleq7.length; i++)
            eleq7[i].checked = false;
          var eleq8 = document.getElementsByName("q8After");
          for (var i = 0; i < eleq8.length; i++)
            eleq8[i].checked = false;


          var eleq9 = document.getElementsByName("q9After");
          for (var i = 0; i < eleq9.length; i++)
            eleq9[i].checked = false;
          var eleq10 = document.getElementsByName("q10After");
          for (var i = 0; i < eleq10.length; i++)
            eleq10[i].checked = false;
          var eleq11 = document.getElementsByName("q11After");
          for (var i = 0; i < eleq11.length; i++)
            eleq11[i].checked = false;
          var eleq12 = document.getElementsByName("q12After");
          for (var i = 0; i < eleq12.length; i++)
            eleq12[i].checked = false;
          var eleq13 = document.getElementsByName("q13After");
          for (var i = 0; i < eleq13.length; i++)
            eleq13[i].checked = false;
          var eleq14 = document.getElementsByName("q14After");
          for (var i = 0; i < eleq14.length; i++)
            eleq14[i].checked = false;
          var eleq15 = document.getElementsByName("q15After");
          for (var i = 0; i < eleq15.length; i++)
            eleq15[i].checked = false;
          var eleq16 = document.getElementsByName("q16After");
          for (var i = 0; i < eleq16.length; i++)
            eleq16[i].checked = false;

          var eleq17 = document.getElementsByName("q17After");
          for (var i = 0; i < eleq17.length; i++)
            eleq17[i].checked = false;
          var eleq18 = document.getElementsByName("q18After");
          for (var i = 0; i < eleq18.length; i++)
            eleq18[i].checked = false;
          var eleq19 = document.getElementsByName("q19After");
          for (var i = 0; i < eleq19.length; i++)
            eleq19[i].checked = false;
          var eleq20 = document.getElementsByName("q20After");
          for (var i = 0; i < eleq20.length; i++)
            eleq20[i].checked = false;
          var eleq21 = document.getElementsByName("q21After");
          for (var i = 0; i < eleq21.length; i++)
            eleq21[i].checked = false;

          var eleq22 = document.getElementsByName("q22After");
          for (var i = 0; i < eleq22.length; i++)
            eleq22[i].checked = false;

          var eleq23 = document.getElementsByName("q23After");
          for (var i = 0; i < eleq23.length; i++)
            eleq23[i].checked = false;

          var eleq24 = document.getElementsByName("q24After");
          for (var i = 0; i < eleq24.length; i++)
            eleq24[i].checked = false;


          var ele3 = document.getElementsByName("q1After");
          for (var i = 0; i < ele3.length; i++)
            ele3[i].checked = false;

          document.getElementById("object-container").style.display = '';
          document.getElementById("theVidDiv").style.display = '';
          document.getElementById("theVidDiv").style.pointerEvents = '';
          document.getElementById("theVidDiv").style.opacity = '1.0';

          document.getElementById("robot-container").style.display = 'none';


          //reset all the values that are event specific:

          masterController.$data.q1_correct = "",
            masterController.$data.q1_user = "",
            masterController.$data.q1_incorrect1 = "",
            masterController.$data.q1_incorrect2 = "",
            masterController.$data.q2_correct = "",
            masterController.$data.q2_user = "",
            masterController.$data.q2_incorrect = "",
            masterController.$data.q3_correct = "",
            masterController.$data.q3_incorrect = "",
            masterController.$data.q4_correct = "",
            masterController.$data.q4_user = "",
            masterController.$data.q4_incorrect1 = "",
            masterController.$data.q4_incorrect2 = "",
            masterController.$data.q4_incorrect3 = "",
            masterController.$data.q5_correct = "",
            masterController.$data.q5_user = "",
            masterController.$data.q5_incorrect1 = "",
            masterController.$data.q5_incorrect2 = "",
            masterController.$data.q5_incorrect3 = "",
            masterController.$data.q6_correct = "",
            masterController.$data.q6_user = "",
            masterController.$data.q6_incorrect1 = "",
            masterController.$data.q6_incorrect2 = "",
            masterController.$data.q6_incorrect3 = "",
            masterController.$data.q7_correct = "",
            masterController.$data.q7_user = "",
            masterController.$data.q7_incorrect1 = "",
            masterController.$data.q7_incorrect2 = "",
            masterController.$data.q7_incorrect3 = "",
            masterController.$data.q8_correct = "",
            masterController.$data.q8_user = "",
            masterController.$data.q8_incorrect1 = "",
            masterController.$data.q8_incorrect2 = "",
            masterController.$data.q8_incorrect3 = "",
            masterController.$data.q9_correct = "",
            masterController.$data.q9_user = "",
            masterController.$data.q9_incorrect1 = "",
            masterController.$data.q9_incorrect2 = "",
            masterController.$data.q9_incorrect3 = "",
            masterController.$data.q10_correct = "",
            masterController.$data.q10_user = "",
            masterController.$data.q10_incorrect1 = "",
            masterController.$data.q10_incorrect2 = "",
            masterController.$data.q10_incorrect3 = "",
            masterController.$data.q11_correct = "",
            masterController.$data.q11_user = "",
            masterController.$data.q11_incorrect1 = "",
            masterController.$data.q11_incorrect2 = "",
            masterController.$data.q11_incorrect3 = "",
            masterController.$data.q12_correct = "",
            masterController.$data.q12_user = "",
            masterController.$data.q12_incorrect1 = "",
            masterController.$data.q12_incorrect2 = "",
            masterController.$data.q12_incorrect3 = "",
            masterController.$data.q13_correct = "",
            masterController.$data.q13_user = "",
            masterController.$data.q13_incorrect1 = "",
            masterController.$data.q13_incorrect2 = "",
            masterController.$data.q13_incorrect3 = "",
            masterController.$data.q14_correct = "",
            masterController.$data.q14_user = "",
            masterController.$data.q14_incorrect1 = "",
            masterController.$data.q14_incorrect2 = "",
            masterController.$data.q14_incorrect3 = "",
            masterController.$data.q15_correct = "",
            masterController.$data.q15_user = "",
            masterController.$data.q15_incorrect1 = "",
            masterController.$data.q15_incorrect2 = "",
            masterController.$data.q15_incorrect3 = "",
            masterController.$data.q16_correct = "",
            masterController.$data.q16_user = "",
            masterController.$data.q16_incorrect1 = "",
            masterController.$data.q16_incorrect2 = "",
            masterController.$data.q16_incorrect3 = "",
            masterController.$data.q17_correct = "",
            masterController.$data.q17_user = "",
            masterController.$data.q17_incorrect1 = "",
            masterController.$data.q17_incorrect2 = "",
            masterController.$data.q17_incorrect3 = "",
            masterController.$data.q18_correct = "",
            masterController.$data.q18_user = "",
            masterController.$data.q18_incorrect1 = "",
            masterController.$data.q18_incorrect2 = "",
            masterController.$data.q18_incorrect3 = "",
            masterController.$data.q19_correct = "",
            masterController.$data.q19_user = "",
            masterController.$data.q19_incorrect = "",
            masterController.$data.q20_correct = "",
            masterController.$data.q20_user = "",
            masterController.$data.q20_incorrect1 = "",
            masterController.$data.q20_incorrect2 = "",
            masterController.$data.q20_incorrect3 = "",
            masterController.$data.q21_correct = "",
            masterController.$data.q21_user = "",
            masterController.$data.q21_incorrect1 = "",
            masterController.$data.q21_incorrect2 = "",
            masterController.$data.q21_incorrect3 = "",

            masterController.$data.q22_user = "",
            masterController.$data.q22_incorrect1 = "",
            masterController.$data.q22_incorrect2 = "",
            masterController.$data.q22_incorrect3 = "",

            masterController.$data.q23_user = "",
            masterController.$data.q23_incorrect1 = "",
            masterController.$data.q23_incorrect2 = "",
            masterController.$data.q23_incorrect3 = "",

            masterController.$data.q24_user = "",
            masterController.$data.q24_incorrect1 = "",
            masterController.$data.q24_incorrect2 = "",
            masterController.$data.q24_incorrect3 = "",

            masterController.$data.wizardAnswer = '';
          masterController.$data.event_id = '';

          masterController.$data.video_name = '';

          masterController.$data.objMessage = "[ Driving event " + (masterController.$data.idx + 2).toString() + " of " + TOTAL_NUM_EVENTS + " ]";


          //console.log("done with reseting text areas");
          // reset all the data that comes from the metadata
          //console.log("the idx for the next event:", masterController.$data.idx + 1);
          let next_file_name = masterController.get_the_next_data(masterController.$data.idx + 1);
          //console.log("next file name is:", next_file_name);
          masterController.read_the_next_data(next_file_name);
          this.$data.idx++;
          //grab the videos for the new event

        } else {
          // already seen all the events
          //console.log("No more events to display.All tasks have been submitted")
          //masterController.submitTask();
          let url_params = jQuery.param({
            workerId: USER,
            event_id: masterController.$data.event_id,
          });
          window.location.href = "survey.html?" + url_params;



        }
      },
      get_nonExcisting_types: function (val_in, possible_vals) {
        val_in = val_in.replace(/"/g, '');
        new_poss_vals = []
        for (var item = 0; item < possible_vals.length; ++item) {
          new_item = possible_vals[item].replace(/"/g, '');
          new_poss_vals.push(new_item);
        }

        const index = new_poss_vals.indexOf(val_in);
        //console.log("before", val_in, typeof (val_in), index, index > -1, possible_vals);
        if (index > -1) { // only splice array when item is found
          new_poss_vals.splice(index, 1); // 2nd parameter means remove one item only

        }
        //console.log("after", new_poss_vals);
        new_poss_vals.sort(() => Math.random() - 0.5);
        return new_poss_vals;
      },
      // Function to find the furthest strings
      /*findFurthestStrings: function (strings, inputString) {
        // Access the nltk namespace
        const nltk = window.nltk;

        // Preprocess the input string
        const preprocessedInput = nltk.tokenize.word_tokenize(inputString.toLowerCase());

        // Calculate the cosine similarity
        const similarities = [];

        for (const string of strings) {
          const preprocessedString = nltk.tokenize.word_tokenize(string.toLowerCase());
          const similarity = nltk.metrics.distance.cosine(preprocessedInput, preprocessedString);
          similarities.push({ string, similarity });
        }

        // Sort the similarities in descending order
        similarities.sort((a, b) => b.similarity - a.similarity);

        // Get the furthest three strings
        const furthestStrings = similarities.slice(0, 3).map((entry) => entry.string);

        return furthestStrings;
      },*/

      async loadModel() {
        const model = await use.load();
        return model;
      },
      async findFurthestStrings(strings, inputString) {
        console.log("just entered")
        const model = await masterController.loadModel();
        console.log("after loading model")


        const inputEmbedding = await model.embed([inputString.toLowerCase()]);
        const stringEmbeddings = await model.embed(strings.map((string) => string.toLowerCase()));
        console.log("inputEmbedding", inputEmbedding);
        const similarities = [];
        for (let i = 0; i < strings.length; i++) {
          const similarity = tf.dot(inputEmbedding, stringEmbeddings.slice([i, 0], [1, -1]).transpose()).dataSync()[0];
          similarities.push({ string: strings[i], similarity });
        }
        console.log("similarities", similarities);
        similarities.sort((a, b) => b.similarity - a.similarity);

        let furthestStrings = similarities.slice(0, 3).map((entry) => entry.string);
        return furthestStrings;
      },


      processData: async function (dataa) {

        //var lines = dataa.split(/\r\n|\n/);
        var lines = dataa.split(/\r/);

        let this_idx = random_indices[masterController.$data.idx];

        //console.log("idx, event row", masterController.$data.idx, this_idx);

        var headings = lines[0].split(','); // Splice up the first row to get the headings

        //console.log("headings", headings);
        var possible_values = ["pedestrian", "ambulence", "police", "truck", "cyclist", "animal", "object"];


        String.prototype.splitCSV = function () {

          var matches = this.match(/(\s*"[^"]+"\s*|\s*[^,]+|,)(?=,|$)/g);
          if (!matches || matches.length === 0) {
            masterController.processData(dataa);

          } else {
            for (var n = 0; n < matches.length; ++n) {
              matches[n] = matches[n].trim();
              if (matches[n] == ',') matches[n] = '';
            }
            if (this[0] == ',') matches.unshift("");
            return matches;

          }

        }

        //------------------------------------------
        let values = lines[this_idx].splitCSV(); // Split up the comma seperated values
        //console.log("---this row---", this_idx, values.length, values);
        if (values.length < headings.length) {
          masterController.processData(dataa);

        } else if (values.length > headings.length) {
          masterController.processData(dataa);

        } else {


          masterController.$data.event_id = values[1];
          masterController.$data.video_name = values[2];
          const video = document.getElementById("instructvid");
          video.disablePictureInPicture = true
          //console.log("video file name", "media/"+values[2]);
          video.src = "media/subset_videos/" + values[2];
          masterController.$data.video_name = values[2];
          //video.play();

          masterController.$data.realEventCategory = values[5];
          masterController.$data.eventDescription = values[52];
          //nonExistingTypes = masterController.get_nonExcisting_types(values[1], possible_values);
          var num_things_in_the_scene = Number(values[37]) + Number(values[38]);
          //console.log("num_things_in_the_scene", values[23]);
          //1.How do you category the driving event?
          let incorrects_q1 = masterController.get_nonExcisting_types(values[5], ['Crash', 'Near-Crash', 'I can not identify']);
          masterController.$data.q1_correct = values[5];
          masterController.$data.q1_incorrect1 = incorrects_q1[0];
          masterController.$data.q1_incorrect2 = incorrects_q1[1];

          //2. Did the vehicle roll over? (yes, no no
          if (values[16] === "No" || values[16] === "Not Applicable") {
            masterController.$data.q2_correct = "No";
            masterController.$data.q2_incorrect = "Yes";

          } else {
            masterController.$data.q2_correct = "Yes";
            masterController.$data.q2_incorrect = "No";

          }
          //3. Did the break system of the vehicle contributed to this incidence? Yes, no
          if (values[22] === "Brake System") {
            masterController.$data.q3_correct = "Yes";
            masterController.$data.q3_incorrect = "No";

          } else {
            masterController.$data.q3_correct = "No";
            masterController.$data.q3_incorrect = "Yes";

          }


          //4. Is there anything that obstructs the given vehicle’s view? Yes, no ('Moving vehicle (with or without load)', 'No obstruction')
          let all_vals_q4 = ['Moving vehicle (with or without load)', 'Rain, snow, fog, smoke, sand, dust', 'Building, billboard, or other roadway infrastructure design features', 'Sunlight', 'Curve or hill', 'No obstruction interfered with the autonomous vehicle ability to drive', 'Parked vehicle', 'Trees, crops, vegetation']
          let incorrect_vals_q4 = masterController.get_nonExcisting_types(values[23], all_vals_q4)
          masterController.$data.q4_correct = values[23]
          masterController.$data.q4_incorrect1 = incorrect_vals_q4[0]
          masterController.$data.q4_incorrect2 = incorrect_vals_q4[1]
          masterController.$data.q4_incorrect3 = incorrect_vals_q4[2]
          masterController.$data.prompt_info = values[52];

          let incorrects_q5 = masterController.get_nonExcisting_types(values[24], ['Dawn', 'Darkness, lighted', 'Daylight', 'Darkness, not lighted', 'Dusk']);
          masterController.$data.q5_correct = values[24];
          masterController.$data.q5_incorrect1 = incorrects_q5[0];
          masterController.$data.q5_incorrect2 = incorrects_q5[1];
          masterController.$data.q5_incorrect3 = incorrects_q5[2];
          //6.	In this driving incident, what was the vehicle’s pre-incident maneuver? ['Going straight, but with unintentional "drifting" within lane or across lanes', 'Changing lanes', 'Going straight, accelerating', 'Backing up (other than for parking purposes)', 'Starting in traffic lane', 'Turning left', 'Turning right', 'Entering a parking position', 'Stopped in traffic lane', 'Decelerating in traffic lane', 'Going straight, constant speed', 'Negotiating a curve']
          let all_vals_q6 = ['Changing lanes', 'Merging', 'Starting in traffic lane', 'Disabled or parked in travel lane', 'Stopped in traffic lane', 'Turning left', 'Turning right', 'Passing or overtaking another vehicle', 'Going straight, constant speed', 'Decelerating in traffic lane', 'Going straight, but with unintentional "drifting" within lane or across lanes', 'Negotiating a curve', 'Going straight, accelerating', 'Making U-turn', 'Backing up (other than for parking purposes)', 'Entering a parking position'];
          let all_incorrect_q6 = masterController.get_nonExcisting_types(values[50], all_vals_q6);
          masterController.$data.q6_correct = values[50];
          masterController.$data.q6_incorrect1 = all_incorrect_q6[0];
          masterController.$data.q6_incorrect2 = all_incorrect_q6[1];
          masterController.$data.q6_incorrect3 = all_incorrect_q6[2];

          //7.	How do you describe the nature of this event?
          let all_vals_q7 = ['Conflict with vehicle in adjacent lane', 'Conflict with obstacle/object in roadway', 'Conflict with a following vehicle', 'Conflict with vehicle turning into another vehicle path (opposite direction)', 'The autonomous vehicle itself was the only one involved', 'Conflict with parked vehicle', 'Conflict with vehicle moving across another vehicle path (through intersection)', 'Conflict with pedestrian', 'Single vehicle conflict', 'Conflict with vehicle turning across another vehicle path (same direction)', 'Conflict with animal', 'Conflict with a lead vehicle', 'Conflict with vehicle turning into another vehicle path (same direction)', 'Conflict with oncoming traffic', 'Conflict with vehicle turning across another vehicle path (opposite direction)'];
          let all_incorrect_q7 = masterController.get_nonExcisting_types(values[3], all_vals_q7);
          masterController.$data.q7_correct = values[3];
          masterController.$data.q7_incorrect1 = all_incorrect_q7[0];
          masterController.$data.q7_incorrect2 = all_incorrect_q7[1];
          masterController.$data.q7_incorrect3 = all_incorrect_q7[2];
          //8.	(If applicable)how do you describe the severity of this driving incident?
          let all_vals_q8 = ['Low-risk Tire Strike', 'Most Severe', 'Minor Crash', 'Police-reportable Crash', 'Not a Crash'];
          let all_incorrect_q8 = masterController.get_nonExcisting_types(values[6], all_vals_q8);
          masterController.$data.q8_correct = values[6];
          masterController.$data.q8_incorrect1 = all_incorrect_q8[0];
          masterController.$data.q8_incorrect2 = all_incorrect_q8[1];
          masterController.$data.q8_incorrect3 = all_incorrect_q8[2];
          //9.	Which one of the following evasive behaviors did you observe from the vehicle in the given driving event?
          let all_vals_q9 = ['Braked and steered right', 'No reaction', 'Braked (no lockup)', 'Released brakes', 'Braked and steered left', 'Steered to left', 'Braked (lockup)', 'Steered to right'];
          let all_incorrect_q9 = masterController.get_nonExcisting_types(values[7], all_vals_q9);
          masterController.$data.q9_correct = values[7];
          masterController.$data.q9_incorrect1 = all_incorrect_q9[0];
          masterController.$data.q9_incorrect2 = all_incorrect_q9[1];
          masterController.$data.q9_incorrect3 = all_incorrect_q9[2];

          //10.	What was the vehicle’s post-maneuver? 
          let all_vals_q10 = ['Control maintained', 'Combination of previous', 'Skidded longitudinally', 'Rotated clockwise'];
          let all_incorrect_q10 = masterController.get_nonExcisting_types(values[8], all_vals_q10);
          masterController.$data.q10_correct = values[8];
          masterController.$data.q10_incorrect1 = all_incorrect_q10[0];
          masterController.$data.q10_incorrect2 = all_incorrect_q10[1];
          masterController.$data.q10_incorrect3 = all_incorrect_q10[2];
          //11.	How was the weather condition in the given driving event?
          let all_vals_q11 = ['No Adverse Conditions', 'Raining', 'Fog', 'Snowing', 'Mist/Light Rain'];
          let all_incorrect_q11 = masterController.get_nonExcisting_types(values[25], all_vals_q11);
          masterController.$data.q11_correct = values[25];
          masterController.$data.q11_incorrect1 = all_incorrect_q11[0];
          masterController.$data.q11_incorrect2 = all_incorrect_q11[1];
          masterController.$data.q11_incorrect3 = all_incorrect_q11[2];
          //12.	How was the road surface condition in the given driving event?
          let all_vals_q12 = ['Dry', 'Snowy', 'Wet', 'Dirt road']
          let all_incorrect_q12 = masterController.get_nonExcisting_types(values[26], all_vals_q12);
          masterController.$data.q12_correct = values[26];
          masterController.$data.q12_incorrect1 = all_incorrect_q12[0];
          masterController.$data.q12_incorrect2 = all_incorrect_q12[1];
          masterController.$data.q12_incorrect3 = all_incorrect_q12[2];

          //13.	How was the traffic flow in the given driving event?
          let all_vals_q13 = ['Not divided - center 2-way left turn lane', 'Not divided - simple 2-way trafficway', 'Divided (median strip or barrier)', 'No lanes', 'One-way traffic'];
          let all_incorrect_q13 = masterController.get_nonExcisting_types(values[27], all_vals_q13);
          masterController.$data.q13_correct = values[27];
          masterController.$data.q13_incorrect1 = all_incorrect_q13[0];
          masterController.$data.q13_incorrect2 = all_incorrect_q13[1];
          masterController.$data.q13_incorrect3 = all_incorrect_q13[2];
          //14.	How was traffic density in the given driving event?
          let all_vals_q14 = ['Unknown', 'Unstable flow - temporary restrictions substantially slow driver', 'Free flow, no lead traffic', 'Free flow, leading traffic present', 'Flow is unstable, vehicles are unable to pass, temporary stoppages, etc.', 'Stable flow, maneuverability and speed are more restricted', 'Flow with some restrictions'];
          let all_incorrect_q14 = masterController.get_nonExcisting_types(values[32], all_vals_q14);
          masterController.$data.q14_correct = values[32];
          masterController.$data.q14_incorrect1 = all_incorrect_q14[0];
          masterController.$data.q14_incorrect2 = all_incorrect_q14[1];
          masterController.$data.q14_incorrect3 = all_incorrect_q14[2];
          //15.	Which one of the following traffic controls did you see in the given driving event?
          let all_vals_q15 = ['Stop sign', 'No traffic control', 'Construction signs/warnings', 'Traffic lanes marked', 'Slow or warning sign, other', 'Traffic signal', 'Railroad crossing with markings or signs', 'Yield sign', 'School zone related sign'];
          let all_incorrect_q15 = masterController.get_nonExcisting_types(values[33], all_vals_q15);
          masterController.$data.q15_correct = values[33];
          masterController.$data.q15_incorrect1 = all_incorrect_q15[0];
          masterController.$data.q15_incorrect2 = all_incorrect_q15[1]
          masterController.$data.q15_incorrect3 = all_incorrect_q15[2];

          //16.	How do you describe the alignment of the car to the road in the given driving event?
          let all_vals_q16 = ['Curve right', 'Straight', 'Curve left', 'None of the above'];
          let all_incorrect_q16 = masterController.get_nonExcisting_types(values[35], all_vals_q16);
          masterController.$data.q16_correct = values[35];
          masterController.$data.q16_incorrect1 = all_incorrect_q16[0];
          masterController.$data.q16_incorrect2 = all_incorrect_q16[1];
          masterController.$data.q16_incorrect3 = all_incorrect_q16[2];
          //17.	Do you think the construction zone had anything to do with what happened in the given driving event?
          let all_vals_q17 = ['Not construction zone-related', 'Construction Zone (occurred in zone)', 'Construction zone-related (occurred in approach or otherwise related to zone)', 'I can not determine'];
          let all_incorrect_q17 = masterController.get_nonExcisting_types(values[36], all_vals_q17);
          masterController.$data.q17_correct = values[36];//yes-no
          masterController.$data.q17_incorrect1 = all_incorrect_q17[0];
          masterController.$data.q17_incorrect2 = all_incorrect_q17[1];
          masterController.$data.q17_incorrect3 = all_incorrect_q17[2];
          //18.	Were there any other motorists(vehicles)on the road that were involved in what happened in the given driving event?
          let all_vals_q18 = ["0", "1", "2"]
          let all_incorrect_q18 = masterController.get_nonExcisting_types(values[37], all_vals_q18);
          masterController.$data.q18_correct = values[37];
          masterController.$data.q18_incorrect1 = all_incorrect_q18[0];
          masterController.$data.q18_incorrect2 = all_incorrect_q18[1];
          masterController.$data.q18_incorrect3 = all_incorrect_q18[2];
          //19.	Were there any other objects or animals on the road that were involved in what happened in the given driving event?
          //yes-no values[38]
          //console.log("checking the correctness of this question-19", values[38] == "0", values[38] == 0);
          if (values[38] === "0") {
            masterController.$data.q19_correct = "No";
            masterController.$data.q19_incorrect = "Yes";

          } else {
            masterController.$data.q19_correct = "Yes";
            masterController.$data.q19_incorrect = "No";

          }
          //20.	Who do you think was at fault in the given driving event?
          let all_vals_q20 = ['Not applicable', 'Unable to determine', 'Driver of the other car', 'The autonomous car']
          let all_incorrect_q20 = masterController.get_nonExcisting_types(values[39], all_vals_q20);
          masterController.$data.q20_correct = values[39];//yes-no values[38]
          masterController.$data.q20_incorrect1 = all_incorrect_q20[0];
          masterController.$data.q20_incorrect2 = all_incorrect_q20[1];
          masterController.$data.q20_incorrect3 = all_incorrect_q20[2];
          //21. How was the car's manuver judgment?
          let all_vals_q21 = ['Unsafe but legal', 'Unsafe and illegal', 'Safe and legal', 'Safe but illegal'];
          let all_incorrect_q21 = masterController.get_nonExcisting_types(values[51], all_vals_q21);
          masterController.$data.q21_correct = values[51];
          masterController.$data.q21_incorrect1 = all_incorrect_q21[0];
          masterController.$data.q21_incorrect2 = all_incorrect_q21[1];
          masterController.$data.q21_incorrect3 = all_incorrect_q21[2];

          //22. How was the car's manuver judgment?
          let all_vals_q22 = ["Not noticing the other vehicle's decelration in time.", " It noticed the other vehicle's stop belatedly.", 'Taking a turn that was too sharp.', 'The right turn was too wide. ', 'The autonomous car was driving too fast on a snowy road.', 'Taking a turn that was too sharp for a road with median.'];
          //let all_incorrect_q22 = masterController.get_nonExcisting_types(values[53], all_vals_q22);
          let all_incorrect_q22 = await masterController.findFurthestStrings(all_vals_q22, values[53]);
          masterController.$data.q22_correct = values[53].replace(/"/g, '');
          masterController.$data.q22_incorrect1 = all_incorrect_q22[0];
          masterController.$data.q22_incorrect2 = all_incorrect_q22[1];
          masterController.$data.q22_incorrect3 = all_incorrect_q22[2];
          //23. How was the car's manuver judgment?
          let all_vals_q23 = ['paying attention to the median of the destination road and taking a wider turn.', 'By making a turn wide enough to stay in one approperiate lane.', "By noticing and responding to the other vehicle's turn signal in time.", 'Slowing down before taking the turn.', 'Taking a wider turn to avoid hitting the curb.', "A better perfomance of the recognition sytem and noticing the other car's decelartion in time."];
          //let all_incorrect_q23 = masterController.get_nonExcisting_types(values[54], all_vals_q23);
          let all_incorrect_q23 = await masterController.findFurthestStrings(all_vals_q23, values[54]);
          masterController.$data.q23_correct = values[54].replace(/"/g, '');
          masterController.$data.q23_incorrect1 = all_incorrect_q23[0];
          masterController.$data.q23_incorrect2 = all_incorrect_q23[1];
          masterController.$data.q23_incorrect3 = all_incorrect_q23[2];
          //24. How was the car's manuver judgment?
          let all_vals_q24 = ['Driving too fast.', ' Veering into the adjacent lane on the other side as the result of a too wide turn.', "Didn't notice the median in the road in time.", 'Because of the rain and the night time, the vehicle failed to take the turn correctly.', "All of its computational power was used by its communication sub-system, and this delayed the car's recognition system.", "Its sensor sub-system was impaired (it wasn't getting input data), as a result the recognition system was impired."];
          //let all_incorrect_q24 = masterController.get_nonExcisting_types(values[55], all_vals_q24);
          let all_incorrect_q24 = await masterController.findFurthestStrings(all_vals_q24, values[55]);

          console.log("cosine similarity:--", values[55], all_incorrect_q24);
          masterController.$data.q24_correct = values[55].replace(/"/g, '');
          masterController.$data.q24_incorrect1 = all_incorrect_q24[0];
          masterController.$data.q24_incorrect2 = all_incorrect_q24[1];
          masterController.$data.q24_incorrect3 = all_incorrect_q24[2];


        }
      },

      responseList: function () {
        return POSSIBLE_RESPONSES;
      },
      validateUserSelection: function () {
        var checkboxes = document.getElementsByName("userValidation");

        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked)
            console.log("checkboxes[i]", checkboxes[i]);
        }
        return 12;
      },
      checkUserInput: function (q_id_in) {
        var ckbx_arr = document.getElementsByName(q_id_in);
        let this_flag = true;
        for (var i = 0; i < ckbx_arr.length; i++) {

          if (ckbx_arr[i].checked) {
            this_flag = false;

          }

        }

        return this_flag;

      },
      submitTask: function () {

        if (masterController.checkUserInput("q1After") || masterController.checkUserInput("q2After") || masterController.checkUserInput("q3After") || masterController.checkUserInput("q4After") || masterController.checkUserInput("q5After") || masterController.checkUserInput("q6After") || masterController.checkUserInput("q7After") || masterController.checkUserInput("q8After") || masterController.checkUserInput("q9After") || masterController.checkUserInput("q10After") || masterController.checkUserInput("q11After") || masterController.checkUserInput("q12After") || masterController.checkUserInput("q13After") || masterController.checkUserInput("q14After") || masterController.checkUserInput("q15After") || masterController.checkUserInput("q16After") || masterController.checkUserInput("q17After") || masterController.checkUserInput("q18After") || masterController.checkUserInput("q19After") || masterController.checkUserInput("q20After") || masterController.checkUserInput("q21After")) {
          alert("Please answer all the questions before submitting.");

        } else {

          // Log user responses in the DB before allowing MTurk task submission
          $.ajax({
            url: "php/logResponses.php",
            type: "POST",
            dataType: "text",
            data: {
              workerId: Number(USER),
              event_id: Number(masterController.$data.event_id),
              idx: Number(masterController.$data.idx),
              file_name_to_be_processed: file_name_to_be_processed,
              vid_name: masterController.$data.video_name,
              q1_correct: masterController.$data.q1_correct,
              q1_user: masterController.$data.q1_user,
              q2_correct: masterController.$data.q3_correct,
              q2_user: masterController.$data.q2_user,
              q3_correct: masterController.$data.q3_correct,
              q3_user: masterController.$data.q3_user,
              q4_correct: masterController.$data.q4_correct,
              q4_user: masterController.$data.q4_user,
              q5_correct: masterController.$data.q5_correct,
              q5_user: masterController.$data.q5_user,
              q6_correct: masterController.$data.q6_correct,
              q6_user: masterController.$data.q6_user,
              q7_correct: masterController.$data.q7_correct,
              q7_user: masterController.$data.q7_user,
              q8_correct: masterController.$data.q8_correct,
              q8_user: masterController.$data.q8_user,
              q9_correct: masterController.$data.q9_correct,
              q9_user: masterController.$data.q9_user,
              q10_correct: masterController.$data.q10_correct,
              q10_user: masterController.$data.q10_user,
              q11_correct: masterController.$data.q11_correct,
              q11_user: masterController.$data.q11_user,
              q12_correct: masterController.$data.q12_correct,
              q12_user: masterController.$data.q12_user,
              q13_correct: masterController.$data.q13_correct,
              q13_user: masterController.$data.q13_user,
              q14_correct: masterController.$data.q14_correct,
              q14_user: masterController.$data.q14_user,
              q15_correct: masterController.$data.q15_correct,
              q15_user: masterController.$data.q15_user,
              q16_correct: masterController.$data.q16_correct,
              q16_user: masterController.$data.q16_user,
              q17_correct: masterController.$data.q17_correct,
              q17_user: masterController.$data.q17_user,
              q18_correct: masterController.$data.q18_correct,
              q18_user: masterController.$data.q18_user,
              q19_correct: masterController.$data.q19_correct,
              q19_user: masterController.$data.q19_user,
              q20_correct: masterController.$data.q20_correct,
              q20_user: masterController.$data.q20_user,
              q21_correct: masterController.$data.q21_correct,
              q21_user: masterController.$data.q21_user,
              q22_correct: masterController.$data.q22_correct,
              q22_user: masterController.$data.q22_user,
              q23_correct: masterController.$data.q23_correct,
              q23_user: masterController.$data.q23_user,
              q24_correct: masterController.$data.q24_correct,
              q24_user: masterController.$data.q24_user,

              prompt_info: masterController.$data.prompt_info,

            },

            success: function (d) {
              console.log("task", masterController.$data.idx, "out of 6 was logged sucssessfully! ", d);
              masterController.nextEvent();

            }
          });
        }
      },
    }
  });
});
