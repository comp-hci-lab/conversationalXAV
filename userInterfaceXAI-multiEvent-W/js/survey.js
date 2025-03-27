// Written by Somayeh Molaei, Feb 2022.

//const SESSION = gup('session');
window.onload = function() {

  let INTERNET_LITERACY_SCALE = ['Advanced Search', 'PDF', 'Spyware', 'Wiki', 'Cache', 'Phishing'];
  //console.log("Running Survey.js");
  
  var formController = new Vue({
    el   : '#formBody',
    data : {
      workerAge : '',
      workerGender: '',
      genderMMText     : '',
      workerRace : '',
      workerEtnicity : '',
      workerFeedback : '',
      driverLicense : '',
      driverLicenseAge : '',
      country : '',
      leftOrRight : '',
    },
    methods: {
      internalScaleVals: function() {
        return INTERNET_LITERACY_SCALE;
      },
      finalSubmit: function() {
	console.log("Running finalSubmit.js");

  //-------------------do you have a driver licens?------------------------------------------------
  var choices_q5 = document.getElementsByName('q5');
  // loop through all the radio inputs
  for (i=0; i<choices_q5.length; i++) {
    // if the radio is checked..
    if (choices_q5[i].checked) {
      // add 1 to that choice's score
      if (choices_q5[i].value == 'c1') {
        formController.$data.driverLicense = 1;
      }
      if (choices_q5[i].value == 'c2') {
        formController.$data.driverLicense = 0;
      }
      
      // If you add more choices and outcomes, you must add another if statement below.
    }
  }
  //--------------------------------how long for driver license----------------------
  
  //----------------------------left handed or right handed------------------------------------------------------
  var choices_q6 = document.getElementsByName('q6');
  // loop through all the radio inputs
  for (i=0; i<choices_q6.length; i++) {
    // if the radio is checked..
    if (choices_q6[i].checked) {
      // add 1 to that choice's score
      if (choices_q6[i].value == 'c1') {
        formController.$data.leftOrRight = 1;
      }
      if (choices_q6[i].value == 'c2') {
        formController.$data.leftOrRight = 0;
      }
      
      // If you add more choices and outcomes, you must add another if statement below.
    }
  }
  //------demographic questions q1 to q4--------------------------------------------

  var choices_q1 = document.getElementsByName('q1');
  // loop through all the radio inputs
  for (i=0; i<choices_q1.length; i++) {
    // if the radio is checked..
    if (choices_q1[i].checked) {
      // add 1 to that choice's score
      if (choices_q1[i].value == 'c1') {
        formController.$data.workerAge = 1;
      }
      if (choices_q1[i].value == 'c2') {
        formController.$data.workerAge = 2;
      }
      if (choices_q1[i].value == 'c3') {
        formController.$data.workerAge = 3;
      }
      if (choices_q1[i].value == 'c4') {
        formController.$data.workerAge = 4;
      }
      if (choices_q1[i].value == 'c5') {
        formController.$data.workerAge = 5;
      }
      // If you add more choices and outcomes, you must add another if statement below.
    }
  }

  var choices_q2 = document.getElementsByName('q2');
  // loop through all the radio inputs
  for (i=0; i<choices_q2.length; i++) {
    // if the radio is checked..
    if (choices_q2[i].checked) {
      // add 1 to that choice's score
      if (choices_q2[i].value == 'c1') {
        formController.$data.workerGender = 1;
      }
      if (choices_q2[i].value == 'c2') {
        formController.$data.workerGender = 2;
      }
      if (choices_q2[i].value == 'c3') {
        formController.$data.workerGender = 3;
      }
      if (choices_q2[i].value == 'c4') {
        formController.$data.workerGender = 4;
        //formController.$data.genderMMText = document.getElementById("genderMMText").value;
      }
      
      // If you add more choices and outcomes, you must add another if statement below.
    }
  }
  var choices_q3 = document.getElementsByName('q3');
  // loop through all the radio inputs
  for (i=0; i<choices_q3.length; i++) {
    // if the radio is checked..
    if (choices_q3[i].checked) {
      // add 1 to that choice's score
      if (choices_q3[i].value == 'c1') {
        formController.$data.workerRace = 1;
      }
      if (choices_q3[i].value == 'c2') {
        formController.$data.workerRace = 2;
      }
      if (choices_q3[i].value == 'c3') {
        formController.$data.workerRace = 3;
      }
      
      // If you add more choices and outcomes, you must add another if statement below.
    }
  }

  var choices_q4 = document.getElementsByName('q4');
  // loop through all the radio inputs
  for (i=0; i<choices_q4.length; i++) {
    // if the radio is checked..
    if (choices_q4[i].checked) {
      // add 1 to that choice's score
      if (choices_q4[i].value == 'c1') {
        formController.$data.workerEtnicity = 1;
      }
      if (choices_q4[i].value == 'c2') {
        formController.$data.workerEtnicity= 2;
      }
      if (choices_q4[i].value == 'c3') {
        formController.$data.workerEtnicity = 3;
      }
      if (choices_q4[i].value == 'c4') {
        formController.$data.workerEtnicity = 4;
      }
      if (choices_q4[i].value == 'c5') {
        formController.$data.workerEtnicity = 5;
      }
      if (choices_q4[i].value == 'c6') {
        formController.$data.workerEtnicity = 6;
      }
      
      // If you add more choices and outcomes, you must add another if statement below.
    }
  }
  
   for (let prop in formController.$data) {
    console.log("prop:",prop, formController.$data[prop]);
    //if any other data other than the optional stuff is missing, alert.
    //TODO: Uncomment before launching!!!
    if (( (prop ==='workerFeedback') ||(prop ==='genderMMText'))) {
       continue;
    }else{
        if(formController.$data[prop] === ''){

            alert("Please answer all questions before submitting");
            return;
        }
      
    }
  }

        //log survey data
        //console.log(formController.$data);
        
        // Log user responses in the DB before allowing MTurk task submission
        $.ajax({
          url: "php/logSurveyResponses.php",
          type: "POST",
          dataType: "text",
          data: {
            workerId         : gup('workerId'),
            event_id         : gup('event_id'),
            driverLicense    : Number(formController.$data.driverLicense),
            driverLicenseAge : Number(formController.$data.driverLicenseAge),
            country          : formController.$data.country,
            genderMMText     : formController.$data.genderMMText,
            workerAge        : Number(formController.$data.workerAge),
            workerRace       : Number(formController.$data.workerRace),
            workerFeedback   : Number(formController.$data.workerFeedback),
            workerEtnicity   : Number(formController.$data.workerEtnicity),
            workerGender     : Number(formController.$data.workerGender),
            leftOrRight      : Number(formController.$data.leftOrRight),
        },
        success: function(d) {
   	  //console.log("Running success after loging survey responses.js");
          window.alert("Thank you for participating in this study.");
          //if (!DEBUG) {
            // Submit task to MTurk (if possible)
            //$('#mturk_form').submit();
          //}
        }
      });
    }

  }
  });
}


