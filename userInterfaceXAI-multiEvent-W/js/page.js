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

var event_type_to_use = [1, 1, 2, 2, 3, 3];
// 1: crash event, 2: near crash event, 3: baseline.
event_type_to_use.sort(() => .5 - Math.random());

//var random_indices = [Math.floor( Math.random() * 41),Math.floor( Math.random() * 41), Math.floor( Math.random() * 41), Math.floor( Math.random() * 41), Math.floor( Math.random() * 41), Math.floor( Math.random() * 41) ];
//second_channel.postMessage("hey, hey");
////second_channel.postMessage([event_type_to_use, random_indices]);
var arr = [];
while (arr.length < 6) {
  var r = Math.floor(Math.random() * 41) + 1;
  if (arr.indexOf(r) === -1) arr.push(r);
}
var random_indices = arr;
console.log("unique random numbers:", arr);
localStorage.setItem('event_type_to_use', event_type_to_use);
localStorage.setItem('random_indices', random_indices);
//second_channel.postMessage("ettu",event_type_to_use);
//third_channel.postMessage('event_type_to_use',event_type_to_use);
//fourth_channel.postMessage('random_indices',random_indices);


console.log("random_indices", random_indices);
//random_indices
//-------------------------------





// Local tracking variable for all user and agent responses
//var USER = parseInt(gup(workerId));
//var SESSION = parseInt(gup(session));
//var ASSIGNMENTID = parseInt(gup(assignmentId));
//var USER= gup('workerId');
//var SESSION= gup('session');
//var ASSIGNMENTID= gup('assignmentId');

var SESSION = 0;
var ASSIGNMENTID = 0;
//var HITID= gup('hitId');

let userResponses = new Array();
let userVehicleChat = new Array();

//var event_type_to_use = [1,1,2,2,3,3];
// 1: crash event, 2: near crash event, 3: baseline.
//event_type_to_use.sort( () => .5 - Math.random() );
console.log("random order of event types", event_type_to_use);




$(document).ready(function () {

  window.onkeydown = function (event) {
    console.log("--------key event------", event.keyCode);
    //event.preventDefault();
    if (event.keyCode === 13) {
      //document.getElementById("askVehicle").click();
      masterController.askWizard();

    }

  };

  //var textareaElement = document.createElement("TEXTAREA");
  //document.body.appendChild(textareaElement); //Add the element to the document
  /* document.getElementsByName("inputText")[0].addEventListener('keypress', function(event) {
     console.log("hmmmmm", event.key, event.keyCode);
     if (event.keyCode === 36) {
       event.preventDefault();
       console.log("here");
       document.getElementById("askVehicle").click();
     }
   });*/

  var if_ended = false;
  var the_video = document.getElementById('instructvid');

  the_video.addEventListener('if_ended', event => {
    if_ended = event.data;

    console.log("the video has ended playing", if_ended, event.ended);

  });

  //document.getElementById('instructvid').addEventListener('ended',myHandler,false);
  //function myHandler(e) {
  // What you want to do after the event
  //     console.log("video was ended");
  //}

  // Initialize the task timer
  //var timer = new easytimer.Timer();
  //timer.start();
  //timer.addEventListener('secondsUpdated', function (e) {
  //    $('#keep-time').html(timer.getTimeValues().toString());
  //});
  //
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
      //var liness = myData.split(/\r\n|\n/);
      //masterController.$data.idx = Math.floor( Math.random() * liness.length);
      //masterController.$data.crash_data=myData;
      masterController.processData(myData);
      metaData = myData;
    }
  });
  var message_user = '';
  channel.addEventListener('message_user', event => {
    message_user = event.data;
    masterControllerWizard.$data.wizardAnswer = message_user;
    console.log("message from wizard.html", message_user);

  });


  // ---------------Start of chatbot-----------


  //----------------End of chatbot--------------



  // Let's process the data from the data file

  ////  INIT VUE CONTROLLERS  ////
  var masterController = new Vue({
    el: '#dynamic',
    data: {
      /* Object Controller elements */

      idx: 0,
      eventTypeText: '',
      eventTypeTextAfter: '',
      userEventCategory: '',
      userEventCategoryAfter: '',
      realEventCategory: '',
      eventDescription: '',
      wizardAnswer: '',
      event_id: '',
      video_name: '',
      objMessage: " Driving event " + 1 + " of " + TOTAL_NUM_EVENTS + "        ",

    },
    methods: {
      /*Object Controller Methods */

      logResponse: function () {

        let userRespObj = {};

        console.log(USER, SESSION);  // DEBUG
        var choices_q1 = document.getElementsByName('q1');
        // loop through all the radio inputs
        for (i = 0; i < choices_q1.length; i++) {
          // if the radio is checked..
          if (choices_q1[i].checked) {
            // add 1 to that choice's score
            if (choices_q1[i].value == 'c1') {
              masterController.$data.userEventCategory = 'crash';
            }
            if (choices_q1[i].value == 'c2') {
              masterController.$data.userEventCategory = 'nearCrash';
            }
            if (choices_q1[i].value == 'c3') {
              masterController.$data.userEventCategory = 'noCrashRelated';
            }
            if (choices_q1[i].value == 'c4') {
              masterController.$data.userEventCategory = 'other';
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }

        var choices_q1_After = document.getElementsByName('q1After');
        // loop through all the radio inputs
        for (i = 0; i < choices_q1_After.length; i++) {
          // if the radio is checked..
          if (choices_q1_After[i].checked) {
            // add 1 to that choice's score
            if (choices_q1_After[i].value == 'c1') {
              masterController.$data.userEventCategoryAfter = 'crash';
            }
            if (choices_q1_After[i].value == 'c2') {
              masterController.$data.userEventCategoryAfter = 'nearCrash';
            }
            if (choices_q1_After[i].value == 'c3') {
              masterController.$data.userEventCategoryAfter = 'noCrashRelated';
            }
            if (choices_q1_After[i].value == 'c4') {
              masterController.$data.userEventCategoryAfter = 'other';
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }

        var checkedValue = null;
        var inputElements = document.getElementsByName('userValidation');
        var userSelection = '';
        let num_selections = 0;
        for (var i = 0; i < inputElements.length; ++i) {
          if (inputElements[i].checked) {
            num_selections = num_selections + 1;
            // add 1 to that choice's score
            if (inputElements[i].value == 'grass') {
              userSelection = 'invalid';
            }
            if (inputElements[i].value == 'sky') {
              userSelection = 'invalid';
            }
            if (inputElements[i].value == 'road') {
              userSelection = 'valid';
            }
            if (inputElements[i].value == 'visualOB') {
              userSelection = 'Yes';
            }
            if (inputElements[i].value == 'lighSB') {
              userSelection = 'Yes';
            }
            if (inputElements[i].value == 'dryWetB') {
              userSelection = 'Yes';
            }
            if (inputElements[i].value == 'trafficFB') {
              userSelection = 'Yes';
            }
            if (inputElements[i].value == 'laneB') {
              userSelection = 'Yes';
            }
            if (inputElements[i].value == 'speedB') {
              userSelection = 'Yes';
            }
            if (inputElements[i].value == 'traffLB') {
              userSelection = 'Yes';
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }
            if (inputElements[i].value == 'nearJuncB') {
              userSelection = 'Yes';
            }
            if (inputElements[i].value == 'constructionB') {
              userSelection = 'Yes';
            }
            if (inputElements[i].value == 'vManuverB') {
              userSelection = 'Yes';
            }
            if (inputElements[i].value == 'densetrafficB') {
              userSelection = 'Yes';
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }
            userObservationValidation.push(userSelection);
            // If you add more choices and outcomes, you must add another if statement below.
          } else {
            userObservationValidation.push('No');
          }

        }


        var inputElementsAfter = document.getElementsByName('userValidationAfter');
        var userSelectionAfter = '';
        for (var i = 0; i < inputElementsAfter.length; ++i) {
          if (inputElementsAfter[i].checked) {
            // add 1 to that choice's score
            if (inputElementsAfter[i].value == 'grass') {
              userSelectionAfter = 'invalid';
            }
            if (inputElementsAfter[i].value == 'sky') {
              userSelectionAfter = 'invalid';
            }
            if (inputElementsAfter[i].value == 'road') {
              userSelectionAfter = 'valid';
            }
            if (inputElementsAfter[i].value == 'visualO') {
              userSelectionAfter = 'Yes';
            }
            if (inputElementsAfter[i].value == 'lighS') {
              userSelectionAfter = 'Yes';
            }
            if (inputElementsAfter[i].value == 'dryWet') {
              userSelectionAfter = 'Yes';
            }
            if (inputElementsAfter[i].value == 'trafficF') {
              userSelectionAfter = 'Yes';
            }
            if (inputElementsAfter[i].value == 'lane') {
              userSelectionAfter = 'Yes';
            }
            if (inputElementsAfter[i].value == 'speed') {
              userSelectionAfter = 'Yes';
            }
            if (inputElementsAfter[i].value == 'traffL') {
              userSelectionAfter = 'Yes';

            }
            if (inputElementsAfter[i].value == 'nearJunc') {
              userSelectionAfter = 'Yes';
            }
            if (inputElementsAfter[i].value == 'construction') {
              userSelectionAfter = 'Yes';
            }
            if (inputElementsAfter[i].value == 'vManuver') {
              userSelectionAfter = 'Yes';
            }
            if (inputElementsAfter[i].value == 'densetraffic') {
              userSelectionAfter = 'Yes';
              //formController.$data.genderMMText = document.getElementById("genderMMText").value;
            }
            userObservationValidationAfter.push(userSelectionAfter);
            // If you add more choices and outcomes, you must add another if statement below.
          }
          else {
            userObservationValidationAfter.push('No');
          }

        }


        /*for (let prop in masterController.$data) {
          if((prop ==='eventTypeText') || (prop ==='eventTypeTextAfter') || (prop ==='idx') || (prop ==='realEventCategory') || (prop ==='wizardAnswer')||(prop ==='eventDescription')){
            continue;

          }
          else {
            if(masterController.$data[prop] === ''){
              console.log("the empty prop", prop);
            alert("Please answer all questions before submitting");
            return;
            }
          }
        }*/
        if (userObservationValidation.length === 0) {
          alert("Please answer all questions before submitting");
          return;
        }
        if (userObservationValidationAfter.length === 0) {
          alert("Please answer all questions before submitting");
          return;
        }
        userRespObj = {
          event_id: masterController.$data.event_id, otherType1: masterController.$data.otherType1, otherType2: masterController.$data.otherType2,
          otherType3: masterController.$data.otherType3, type1Label: masterController.$data.type1Label,
          type2Label: masterController.$data.type2Label, type3Label: masterController.$data.type3Label,
          userObservationValidation: userObservationValidation,
        };
        userResponses.push(userRespObj);
        masterController.submitTask();

      },
      noMoreQuestion: function () {
        document.getElementById("quiz3").style.display = 'none';
        document.getElementById("quiz2After").style.display = '';
        document.getElementById("submit").style.display = '';

      },
      askWizard: function () {
        console.log("we are in askWizard function");

        document.getElementById("quiz2").style.display = 'none';
        const inputField = document.getElementById("uq1");
        let input = inputField.value;
        inputField.value = "";
        masterController.output(input);

      },
      wideoWatched: function () {
        //document.getElementById("theVidDiv").style.display = 'none';
        document.getElementById("theVidDiv").style.pointerEvents = 'none';
        document.getElementById("theVidDiv").style.opacity = '0.4';
        //pointer-events: none;
        //opacity: 0.4;
        document.getElementById("robot-container").style.display = '';
        document.getElementById("quiz2After").style.display = 'none';
        //document.getElementById("continueChat").style.display = '';
      },
      // waitForFoo makes the decision whether the condition is met
      // or not met or the timeout has been exceeded which means
      // this promise will be rejected
      waitForAnswer: function (resolve, reject) {
        console.log("we are in waitForAnswer", message_user);
        channel.onmessage = event => {
          console.log("from wizard:", event.data);
          masterController.$data.wizardAnswer = event.data;
        }

        var timeout = 10000000000; // 1000000ms = 1000 seconds
        //if (window.product && window.product.ans)
        if (masterController.$data.wizardAnswer !== '') {
          console.log("in the wait for answer", masterController.$data.wizardAnswer);
          //resolve(window.product.ans);
          resolve(masterController.$data.wizardAnswer);
        }
        else if (timeout && (Date.now() - start) >= timeout) {
          console.log("Timed Out");
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
      output: function (input) {
        //let product;
        let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
        text = text
          .replace(/ a /g, " ")
          .replace(/whats/g, "what is")
          .replace(/please /g, "")
          .replace(/ please/g, "")
          .replace(/r u/g, "are you");
        console.log("text", text);

        channel.postMessage(input);

        product = function () { };
        product.ans = masterController.$data.wizardAnswer;
        console.log("product, ans", product, product.ans);
        //+++++++++++++++++++++++++++++++++++++++++++++

        var timeout = 1000000; // 1000000ms = 1000 seconds
        // This runs the promise code
        masterController.ensureAnswerIsSet(timeout).then(function () {
          document.getElementById('uq1').focus();
          masterController.addChatEntry(input, masterController.$data.wizardAnswer);
          console.log("from wizard:", masterController.$data.wizardAnswer);
          //if(input.slice(0, 2)==="/n"){
          let removeAll = input.replaceAll("\n", '');
          input = removeAll;
          //}
          //if(masterController.$data.wizardAnswer.slice(0, 2)==="/n"){
          let rmvd = masterController.$data.wizardAnswer.replaceAll("\n", '');
          masterController.$data.wizardAnswer = rmvd
          //}
          userVehicleChat.push(input + '/*/' + masterController.$data.wizardAnswer);
          //reset the value
          masterController.$data.wizardAnswer = '';
          console.log("first chat is done");
        });

        //++++++++++++++++++++++++++++++++++++++++++++++

        masterController.$data.wizardAnswer = '';

      },

      compare: function (utterancesArray, answersArray, string) {
        let reply;
        let replyFound = false;
        for (let x = 0; x < utterancesArray.length; x++) {
          for (let y = 0; y < utterancesArray[x].length; y++) {
            if (utterancesArray[x][y] === string) {
              let replies = answersArray[x];
              reply = replies[Math.floor(Math.random() * replies.length)];
              replyFound = true;
              break;
            }
          }
          if (replyFound) {
            break;
          }
        }
        return reply;
      },

      addChatEntry: function (input, product) {
        const messagesContainer = document.getElementById("messages");
        let userDiv = document.createElement("div");
        userDiv.id = "user";
        userDiv.className = "user response";
        userDiv.innerHTML = `<span>${input}</span>`;
        messagesContainer.appendChild(userDiv);

        let botDiv = document.createElement("div");
        let botText = document.createElement("span");
        botDiv.id = "bot";
        botDiv.className = "bot response";
        botText.innerText = "Typing...";
        botDiv.appendChild(botText);
        messagesContainer.appendChild(botDiv);

        messagesContainer.scrollTop =
          messagesContainer.scrollHeight - messagesContainer.clientHeight;

        setTimeout(() => {
          botText.innerText = `${product}`;
        }, 2000);
      },
      continueToTheChat: function () {

        var ckbx_arr = document.getElementsByName("q1");
        let this_flag = true;
        for (var i = 0; i < ckbx_arr.length; i++) {

          if (ckbx_arr[i].checked) {
            this_flag = false;

          }
          console.log(ckbx_arr[i], "is it checked?", ckbx_arr[i].checked);

        }
        if (this_flag === true) {
          alert("Please Fill All Required Fields.");
          return false;

        }
        if ((document.getElementById('grs').checked) || (document.getElementById('sk').checked) || (document.getElementById('rd').checked) || (document.getElementById('VisOB').checked) || (document.getElementById('LightB').checked) || ((document.getElementById('dryOrWetB').checked)) || ((document.getElementById('trafficFLB').checked)) || ((document.getElementById('occLaneB').checked)) || ((document.getElementById('speedingB').checked)) || ((document.getElementById('trafflightB').checked)) || ((document.getElementById('nearJunctionB').checked)) || ((document.getElementById('constructionZB').checked)) || ((document.getElementById('VmanuverB').checked)) || ((document.getElementById('densetrafficB').checked))) {
          console.log("good to go");
        } else {
          alert("Please Fill All Required Fields.");
          return false;
        }

        document.getElementById("quiz2").style.display = 'none';
        document.getElementById("continueChat").style.display = 'none';
        document.getElementById("quiz3").style.display = '';
        document.getElementById('uq1').focus();
        //window.alert("");

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
            //var liness = myData.split(/\r\n|\n/);
            //masterController.$data.idx = Math.floor( Math.random() * liness.length);
            //masterController.$data.crash_data=myData;
            masterController.processData(myData);
            metaData = myData;
          }
        });

      },
      nextEvent: function () {
        if (this.$data.idx < TOTAL_NUM_EVENTS - 1) {
          // Get the next event
          this.$data.idx++;

          // As you update localStorage, update the state as well
          //localStorage.setItem('current_event_idx', masterController.$data.idx);
          second_channel.postMessage(masterController.$data.idx);

          console.log("now the idx is", masterController.$data.idx);
          var ele1 = document.getElementsByName("q1");
          for (var i = 0; i < ele1.length; i++)
            ele1[i].checked = false;
          var ele2 = document.getElementsByName("userValidation");
          for (var i = 0; i < ele2.length; i++)
            ele2[i].checked = false;

          var ele3 = document.getElementsByName("q1After");
          for (var i = 0; i < ele3.length; i++)
            ele3[i].checked = false;
          var ele4 = document.getElementsByName("userValidationAfter");
          for (var i = 0; i < ele4.length; i++)
            ele4[i].checked = false;
          document.getElementById("theVidDiv").style.display = '';
          document.getElementById("theVidDiv").style.pointerEvents = '';
          document.getElementById("theVidDiv").style.opacity = '1.0';
          document.getElementById("quiz2").style.display = '';
          document.getElementById("continueChat").style.display = '';
          //document.getElementById("theone").style.marginLeft = '-10';
          document.getElementById("robot-container").style.display = 'none';
          //document.getElementById("quiz2").style.display = 'none';
          //document.getElementById("continueChat").style.display = 'none';
          //document.getElementById("quiz2After").style.display = 'none';

          //reset all the values that are event specific:

          masterController.$data.eventTypeText = '';
          masterController.$data.eventTypeTextAfter = '';
          masterController.$data.userEventCategory = '';
          masterController.$data.userEventCategoryAfter = '';
          masterController.$data.realEventCategory = '';
          masterController.$data.eventDescription = '';
          masterController.$data.wizardAnswer = '';
          masterController.$data.event_id = '';
          userVehicleChat = new Array();
          masterController.$data.video_name = '';
          document.getElementById('messages').innerHTML = "";

          masterController.$data.objMessage = "[ Driving event " + (masterController.$data.idx + 1).toString() + " of " + TOTAL_NUM_EVENTS + " ]";


          console.log("done with reseting text areas");
          // reset all the data that comes from the metadata
          console.log("the idx for the next event:", masterController.$data.idx);
          let next_file_name = masterController.get_the_next_data(masterController.$data.idx);
          console.log("next file name is:", next_file_name);
          masterController.read_the_next_data(next_file_name);
          //grab the videos for the new event

        } else {
          // already seen all the events
          console.log("No more events to display.All tasks have been submitted")
          //masterController.submitTask();
          let url_params = jQuery.param({
            workerId: USER,
            event_id: masterController.$data.event_id,
          });
          window.location.href = "survey.html?" + url_params;



        }
      },
      get_nonExcisting_types: function (vals, possible_vals) {
        let pv_copy = possible_vals;
        for (k = 1; k < vals.length; k++) {
          replaced = vals[k].replace(/[^a-z0-9]/gi, '');
          const indexx = pv_copy.indexOf(replaced);
          //console.log("indexx",indexx);
          //console.log("before", pv_copy);
          if (indexx > -1) {
            //console.log("not found");
            pv_copy.splice(indexx, 1); // 2nd parameter means remove one item only
            //console.log("after:", pv_copy)
          }
        }
        //console.log(pv_copy);
        return pv_copy;
      },

      processData: function (dataa) {

        var lines = dataa.split(/\r\n|\n/);

        let this_idx = random_indices[masterController.$data.idx];

        console.log("idx, event row", masterController.$data.idx, this_idx);

        var headings = lines[0].split(','); // Splice up the first row to get the headings

        console.log("headings", headings);
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
        console.log("---this row---", values.length, values);
        if (values.length < headings.length) {
          masterController.processData(dataa);

        } else {

          //}
          //console.log("this_idx", this_idx, "values", values);
          masterController.$data.event_id = values[1];
          masterController.$data.video_name = values[2];
          const video = document.getElementById("instructvid");
          video.disablePictureInPicture = true
          //console.log("video file name", "media/"+values[2]);
          video.src = "media/subset_videos/" + values[2];
          masterController.$data.video_name = values[2];
          //video.play();

          masterController.$data.realEventCategory = values[5];
          masterController.$data.eventDescription = values[48];
          nonExistingTypes = masterController.get_nonExcisting_types(values[1], possible_values);
          var num_things_in_the_scene = Number(values[37]) + Number(values[38]);
          console.log("num_things_in_the_scene", num_things_in_the_scene);


        }
      },
      checkAgentDec: function () {
        for (let i = 0; i < masterController.robots.length; i++) {
          if (masterController.$data.robots[i].userdec == '') {
            return false;
          }
        }
        return true;
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
      submitTask: function () {

        var ckbx_arr = document.getElementsByName("q1After");
        let this_flag = true;
        for (var i = 0; i < ckbx_arr.length; i++) {

          if (ckbx_arr[i].checked) {
            this_flag = false;

          }

        }
        if (this_flag === true) {
          alert("we've got problems");
          return false;

        }

        // check for 
        if ((document.getElementById('grsAfter').checked) || (document.getElementById('skAfter').checked) || (document.getElementById('rdAfter').checked) || (document.getElementById('VisO').checked) || (document.getElementById('Light').checked) || ((document.getElementById('dryOrWet').checked)) || ((document.getElementById('trafficFL').checked)) || ((document.getElementById('occLane').checked)) || ((document.getElementById('speeding').checked)) || ((document.getElementById('trafflight').checked)) || ((document.getElementById('nearJunction').checked)) || ((document.getElementById('constructionZ').checked)) || ((document.getElementById('Vmanuver').checked)) || ((document.getElementById('densetraffic').checked))) {
          console.log("good to go");
        } else {
          alert("Please Fill All Required Field");
          return false;
        }


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
            eventTypeText: masterController.$data.eventTypeText,
            eventTypeTextAfter: masterController.$data.eventTypeTextAfter,
            userEventCategory: masterController.$data.userEventCategory,
            userEventCategoryAfter: masterController.$data.userEventCategoryAfter,
            realEventCategory: masterController.$data.realEventCategory,
            eventDescription: masterController.$data.eventDescription,
            userObservationValidation: userObservationValidation,
            userObservationValidationAfter: userObservationValidationAfter,
            userVehicleChat: userVehicleChat,
            vid_name: masterController.$data.video_name,

          },
          success: function (d) {
            console.log("task", masterController.$data.idx, "out of 6 was logged sucssessfully! ");
            masterController.nextEvent();

          }
        });
      },
    }
  });
});
