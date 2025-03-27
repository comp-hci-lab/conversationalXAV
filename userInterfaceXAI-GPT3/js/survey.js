// Written by Somayeh Molaei, Feb 2022.
var data_object = {
  "button_clicks": new_filled_array(demands.length, 0),
  "slider_value": []
};
var final_result = [];
function new_filled_array(length, value) {
  var array = new Array(length);
  while (--length >= 0) {
    array[length] = value;
  }
  return array;
}

// step 3 button
console.log("the check", $('.step_3').length);
/*$(document).ready(function () {
  $(document).on('click', '.step_3 button', function () {
    console.log('Button clicked!');
    // Your code to handle button click event
  });
});*/
$('body').on('click', '.step_3 button', function () {

  console.log("outside vue", "here1");
  // if a pair button is clicked (start button hasn't got class attribute)
  console.log("outside vue", $(this), $(this).attr("class"));
  if ($(this)) {
    //if ($(this).attr("class")) {
    console.log("here2");
    console.log("before:", pairs_length, counter);
    pairs_length--;
    counter++;
    console.log("after:", pairs_length, counter);
    // count clicks for corresponding demand
    for (var i = 0; i < demands.length; i++) {
      if ($(this).attr("class") === demands[i][0]) {
        data_object["button_clicks"][i] += 1;
        break;
      }
    }
  }

  console.log("data_object:", data_object);
  // continue as long as there are reaming pairs to be clicked
  if (pairs_length) {
    // show the next pair
    console.log("outside vue", "here4");
    $(this)
      .parent()
      .html("<button class='" + random_pairs[counter][0][0] + "'>" + random_pairs[counter][0][1] + "</button> or " + "<button class='" + random_pairs[counter][1][0] + "'>" + random_pairs[counter][1][1] + "</button>");
    // "to go" counter
    console.log("up to here was run");
    if (!$(".step_3").find(".to_go").length) {
      console.log("up to here");
      $(".step_3").append("<p class='highlight to_go'></p>");
    }
    $(".step_3 .to_go").html("<strong>" + pairs_length + "</strong> to go!");
    console.log("up to here also was run");
  } else {
    $(".step_3").hide();
    document.getElementById("AIliteracy").style.display = "";
    document.getElementById("AIliteracy").style.visibility = "visible";
    //showLayer('page22');
    //document.getElementById("endOfTLX").style.display = '';
    console.log("we got in here,pairs_length ", pairs_length);
    var sum = 0,
      weights = 0,
      output = "<table><thead><tr><th>Demand</th><th>Rating</th><th>Weight</th><th>Product</th></tr></thead><tbody>";
    for (var j = 0; j < demands.length; j++) {
      output += "<tr><td>" + demands[j][1] + "</td><td>" + data_object["slider_value"][j] + "</td><td>" + data_object["button_clicks"][j] + "</td><td>" + data_object["slider_value"][j] * data_object["button_clicks"][j] + "</td></tr>";
      sum += data_object["slider_value"][j] * data_object["button_clicks"][j];
      weights += data_object["button_clicks"][j];
    }
    output += "<tr><th colspan='3'>Product sum</th><td>" + sum + "</td></tr>";
    output += "<tr><th colspan='3'>Total weights</th><td>" + weights + "</td></tr>";
    output += "<tr><th colspan='3'>Rounded TLX score</th><td><strong>" + Math.round(sum / weights) + "</strong></td></tr></tbody></table>";
    console.log("we got in here 2");
    $(".step_4 div").html(output);

    // save computed data to array

    // iterate probands
    for (var i = 0; i < final_result.length; i++) {
      // if proband already saved
      if (final_result[i].proband === settings[0]) {
        // iterate tasks
        for (var j = 0; j < final_result[i].tasks.length; j++) {
          if (final_result[i].tasks[j].name === settings[2]) {
            final_result[i].tasks[j].data = data_object;
            final_result[i].tasks[j].tlx = Math.round(sum / weights);
            final_result[i].tasks[j].output = output;
            break;
          }
        }
        break;
      }
    }
    console.log("we got in here 3");
    // table output for overview page

  }
});
//$(".step_3").hide();


//const SESSION = gup('session');
window.onload = function () {

  let INTERNET_LITERACY_SCALE = ['Advanced Search', 'PDF', 'Spyware', 'Wiki', 'Cache', 'Phishing'];
  //console.log("Running Survey.js");

  var formController = new Vue({
    el: '#formBody',
    data: {
      workerAge: '',
      workerGender: '',
      genderMMText: '',
      workerRace: '',
      workerEtnicity: '',
      workerFeedback: '',
      driverLicense: '',
      driverLicenseAge: '',
      country: '',
      leftOrRight: '  ',
      NASA_TLX: new Array(),
      literacy_q1: '',
      literacy_q2: '',
      literacy_q3: [],
      literacy_q4: '',
      literacy_q5: '',
      literacy_q6: '',
      literacy_q7: '',
      literacy_q8: '',
      literacy_q9: '',
      literacy_q10: '',
      literacy_q11: '',
      literacy_q12: '',
      literacy_q13: '',
      literacy_q14: '',
      literacy_q15: '',
      literacy_q16: '',
      literacy_q17: [],
      literacy_q18: [],
      literacy_q19: '',
      literacy_q20: '',
      literacy_q21: '',
      literacy_q22: '',
      literacy_q23: '',
      literacy_q24: '',
      literacy_q25: [],
      literacy_q26: '',

    },
    methods: {
      internalScaleVals: function () {
        return INTERNET_LITERACY_SCALE;
      },
      startPairComparison: function () {
        console.log("here1");
        // if a pair button is clicked (start button hasn't got class attribute)
        console.log($(this), $(this).attr("class"));
        if ($(this).attr("class")) {
          console.log("here2");
          pairs_length--;
          counter++;
          // count clicks for corresponding demand
          for (var i = 0; i < demands.length; i++) {
            if ($(this).attr("class") === demands[i][0]) {
              data_object["button_clicks"][i] += 1;
              break;
            }
          }
        }
        console.log("here3");
        // continue as long as there are reaming pairs to be clicked
        if (pairs_length) {
          // show the next pair
          console.log("here4");
          $(this)
            .parent()
            .html("<button class='" + random_pairs[counter][0][0] + "'>" + random_pairs[counter][0][1] + "</button> or " + "<button class='" + random_pairs[counter][1][0] + "'>" + random_pairs[counter][1][1] + "</button>");
          // "to go" counter
          if (!$(".step_3").find(".to_go").length) {
            $(".step_3").append("<p class='highlight to_go'></p>");
          }
          $(".step_3 .to_go").html("<strong>" + pairs_length + "</strong> to go!");

        } else {
          var sum = 0,
            weights = 0,
            output = "<table><thead><tr><th>Demand</th><th>Rating</th><th>Weight</th><th>Product</th></tr></thead><tbody>";
          for (var j = 0; j < demands.length; j++) {
            output += "<tr><td>" + demands[j][1] + "</td><td>" + data_object["slider_value"][j] + "</td><td>" + data_object["button_clicks"][j] + "</td><td>" + data_object["slider_value"][j] * data_object["button_clicks"][j] + "</td></tr>";
            sum += data_object["slider_value"][j] * data_object["button_clicks"][j];
            weights += data_object["button_clicks"][j];
          }
          output += "<tr><th colspan='3'>Product sum</th><td>" + sum + "</td></tr>";
          output += "<tr><th colspan='3'>Total weights</th><td>" + weights + "</td></tr>";
          output += "<tr><th colspan='3'>Rounded TLX score</th><td><strong>" + Math.round(sum / weights) + "</strong></td></tr></tbody></table>";

          $(".step_4 div").html(output);

          // save computed data to array

          // iterate probands
          for (var i = 0; i < final_result.length; i++) {
            // if proband already saved
            if (final_result[i].proband === settings[0]) {
              // iterate tasks
              for (var j = 0; j < final_result[i].tasks.length; j++) {
                if (final_result[i].tasks[j].name === settings[2]) {
                  final_result[i].tasks[j].data = data_object;
                  final_result[i].tasks[j].tlx = Math.round(sum / weights);
                  final_result[i].tasks[j].output = output;
                  break;
                }
              }
              break;
            }
          }

          // table output for overview page

          tableoutput = "<thead><tr><th>Probands</th>";

          $(".step_1 .second .list label").each(function (i) {
            tableoutput += "<th>" + $(this).html() + "</th>";
          });

          tableoutput += "</thead><tbody>";

          for (var i = 0; i < final_result.length; i++) {
            tableoutput += "<tr><th>" + $(".step_1 label[for='" + final_result[i].proband + "']").html() + "</th>";
            $(".step_1 .second form label").each(function () {
              var flaggy = false;
              for (var j = 0; j < final_result[i].tasks.length; j++) {
                if ($(this).attr("for") === final_result[i].tasks[j].name) {
                  tableoutput += "<td>" + final_result[i].tasks[j].tlx + "</td>";
                  flaggy = true;
                  break;
                }
              }
              if (!flaggy) {
                tableoutput += "<td>" + no_score + "</td>";
              }

            });

          }
          console.log("we are before here");

          console.log("we are after here");
          $(".step_3").hide();
          document.getElementById("AIliteracy").style.display = "";
          $(".step_4").show();

        }


      },
      finalSubmit: function () {
        console.log("Running finalSubmit.js");

        NASA_IDs = ["mentalDemand-1", "physicalDemand-1", "temporalDemand-1", "effort", "performance-1", "frustration-1"];
        for (let idd in NASA_IDs) {
          //console.log("idd in NASA:", idd);
          let q_obj = {};
          q_obj[NASA_IDs[idd]] = document.getElementById(NASA_IDs[idd]).value;
          formController.$data.NASA_TLX.push(JSON.stringify(q_obj));
        }
        console.log("NASA_TLX:", formController.$data.NASA_TLX);



        //-------------------do you have a driver licens?------------------------------------------------
        var choices_q5 = document.getElementsByName('q5');
        // loop through all the radio inputs
        for (i = 0; i < choices_q5.length; i++) {
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
        for (i = 0; i < choices_q6.length; i++) {
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
        for (i = 0; i < choices_q1.length; i++) {
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
        for (i = 0; i < choices_q2.length; i++) {
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
        for (i = 0; i < choices_q3.length; i++) {
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
        for (i = 0; i < choices_q4.length; i++) {
          // if the radio is checked..
          if (choices_q4[i].checked) {
            // add 1 to that choice's score
            if (choices_q4[i].value == 'c1') {
              formController.$data.workerEtnicity = 1;
            }
            if (choices_q4[i].value == 'c2') {
              formController.$data.workerEtnicity = 2;
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
        //////// All the literacy questions are handeled here//////////////////

        var choices_q1_1 = document.getElementsByName('q1-1');
        // loop through all the radio inputs
        for (i = 0; i < choices_q1_1.length; i++) {
          // if the radio is checked..
          if (choices_q1_1[i].checked) {
            // add 1 to that choice's score
            if (choices_q1_1[i].value == 'c1') {
              formController.$data.literacy_q1 = 1;
            }
            if (choices_q1_1[i].value == 'c2') {
              formController.$data.literacy_q1 = 2;
            }
            if (choices_q1_1[i].value == 'c3') {
              formController.$data.literacy_q1 = 3;
            }
            if (choices_q1_1[i].value == 'c4') {
              formController.$data.literacy_q1 = 4;
            }

            // If you add more choices and outcomes, you must add another if statement below.
          }
        }
        var choices_q2_1 = document.getElementsByName('q2-1');
        // loop through all the radio inputs
        for (i = 0; i < choices_q2_1.length; i++) {
          // if the radio is checked..
          if (choices_q2_1[i].checked) {
            // add 1 to that choice's score
            if (choices_q2_1[i].value == 'c1') {
              formController.$data.literacy_q2 = 1;
            }
            if (choices_q2_1[i].value == 'c2') {
              formController.$data.literacy_q2 = 2;
            }
            if (choices_q2_1[i].value == 'c3') {
              formController.$data.literacy_q2 = 3;
            }
            if (choices_q2_1[i].value == 'c4') {
              formController.$data.literacy_q2 = 4;
            }
          }
        }

        var checkedValue = null;
        var inputElementsQ3 = document.getElementsByName('q3-1');
        var userSelection_1 = '';
        let num_selections_1 = 0;
        for (var i = 0; i < inputElementsQ3.length; ++i) {
          if (inputElementsQ3[i].checked) {
            num_selections_1 = num_selections_1 + 1;
            // add 1 to that choice's score
            if (inputElementsQ3[i].value == 'RB') {
              userSelection_1 = 'RB';
            }
            if (inputElementsQ3[i].value == 'NN') {
              userSelection_1 = 'NN';
            }
            if (inputElementsQ3[i].value == 'MC') {
              userSelection_1 = 'MC';
            }
            if (inputElementsQ3[i].value == 'GM') {
              userSelection_1 = 'GM';
            }

            formController.$data.literacy_q3.push(userSelection_1);
            // If you add more choices and outcomes, you must add another if statement below.
          } else {
            formController.$data.literacy_q3.push('No');
          }

        }

        var choices_q4_1 = document.getElementsByName('q4-1');
        // loop through all the radio inputs
        for (i = 0; i < choices_q4_1.length; i++) {
          // if the radio is checked..
          if (choices_q4_1[i].checked) {
            // add 1 to that choice's score
            if (choices_q4_1[i].value == 'c1') {
              formController.$data.literacy_q4 = 1;
            }
            if (choices_q4_1[i].value == 'c2') {
              formController.$data.literacy_q4 = 2;
            }
            if (choices_q4_1[i].value == 'c3') {
              formController.$data.literacy_q4 = 3;
            }
            if (choices_q4_1[i].value == 'c4') {
              formController.$data.literacy_q4 = 4;
            }
          }
        }

        var choices_q5_1 = document.getElementsByName('q5-1');
        // loop through all the radio inputs
        for (i = 0; i < choices_q5_1.length; i++) {
          // if the radio is checked..
          if (choices_q5_1[i].checked) {
            // add 1 to that choice's score
            if (choices_q5_1[i].value == 'c1') {
              formController.$data.literacy_q5 = 1;
            }
            if (choices_q5_1[i].value == 'c2') {
              formController.$data.literacy_q5 = 2;
            }
            if (choices_q5_1[i].value == 'c3') {
              formController.$data.literacy_q5 = 3;
            }
            if (choices_q5_1[i].value == 'c4') {
              formController.$data.literacy_q5 = 4;
            }
          }
        }

        var choices_q6_1 = document.getElementsByName('q6-1');
        // loop through all the radio inputs
        for (i = 0; i < choices_q6_1.length; i++) {
          // if the radio is checked..
          if (choices_q6_1[i].checked) {
            // add 1 to that choice's score
            if (choices_q6_1[i].value == 'c1') {
              formController.$data.literacy_q6 = 1;
            }
            if (choices_q6_1[i].value == 'c2') {
              formController.$data.literacy_q6 = 2;
            }
            if (choices_q6_1[i].value == 'c3') {
              formController.$data.literacy_q6 = 3;
            }
            if (choices_q6_1[i].value == 'c4') {
              formController.$data.literacy_q6 = 4;
            }
          }
        }

        var choices_q7_1 = document.getElementsByName('q7-1');
        // loop through all the radio inputs
        for (i = 0; i < choices_q7_1.length; i++) {
          // if the radio is checked..
          if (choices_q7_1[i].checked) {
            // add 1 to that choice's score
            if (choices_q7_1[i].value == 'c1') {
              formController.$data.literacy_q7 = 1;
            }
            if (choices_q7_1[i].value == 'c2') {
              formController.$data.literacy_q7 = 2;
            }
            if (choices_q7_1[i].value == 'c3') {
              formController.$data.literacy_q7 = 3;
            }
            if (choices_q7_1[i].value == 'c4') {
              formController.$data.literacy_q7 = 4;
            }
          }
        }
        var choices_q8 = document.getElementsByName('q8');
        // loop through all the radio inputs
        for (i = 0; i < choices_q8.length; i++) {
          // if the radio is checked..
          if (choices_q8[i].checked) {
            // add 1 to that choice's score
            if (choices_q8[i].value == 'c1') {
              formController.$data.literacy_q8 = 1;
            }
            if (choices_q8[i].value == 'c2') {
              formController.$data.literacy_q8 = 2;
            }
            if (choices_q8[i].value == 'c3') {
              formController.$data.literacy_q8 = 3;
            }
            if (choices_q8[i].value == 'c4') {
              formController.$data.literacy_q8 = 4;
            }
          }
        }

        var choices_q9 = document.getElementsByName('q9');
        // loop through all the radio inputs
        for (i = 0; i < choices_q9.length; i++) {
          // if the radio is checked..
          if (choices_q9[i].checked) {
            // add 1 to that choice's score
            if (choices_q9[i].value == 'c1') {
              formController.$data.literacy_q9 = 1;
            }
            if (choices_q9[i].value == 'c2') {
              formController.$data.literacy_q9 = 2;
            }
            if (choices_q9[i].value == 'c3') {
              formController.$data.literacy_q9 = 3;
            }
            if (choices_q9[i].value == 'c4') {
              formController.$data.literacy_q9 = 4;
            }
          }
        }

        var choices_q10 = document.getElementsByName('q10');
        // loop through all the radio inputs
        for (i = 0; i < choices_q10.length; i++) {
          // if the radio is checked..
          if (choices_q10[i].checked) {
            // add 1 to that choice's score
            if (choices_q10[i].value == 'c1') {
              formController.$data.literacy_q10 = 1;
            }
            if (choices_q10[i].value == 'c2') {
              formController.$data.literacy_q10 = 2;
            }
            if (choices_q10[i].value == 'c3') {
              formController.$data.literacy_q10 = 3;
            }
            if (choices_q10[i].value == 'c4') {
              formController.$data.literacy_q10 = 4;
            }
          }
        }

        var choices_q11 = document.getElementsByName('q11');
        // loop through all the radio inputs
        for (i = 0; i < choices_q11.length; i++) {
          // if the radio is checked..
          if (choices_q11[i].checked) {
            // add 1 to that choice's score
            if (choices_q11[i].value == 'c1') {
              formController.$data.literacy_q11 = 1;
            }
            if (choices_q11[i].value == 'c2') {
              formController.$data.literacy_q11 = 2;
            }
            if (choices_q11[i].value == 'c3') {
              formController.$data.literacy_q11 = 3;
            }
            if (choices_q11[i].value == 'c4') {
              formController.$data.literacy_q11 = 4;
            }
          }
        }

        var choices_q12 = document.getElementsByName('q12');
        // loop through all the radio inputs
        for (i = 0; i < choices_q12.length; i++) {
          // if the radio is checked..
          if (choices_q12[i].checked) {
            // add 1 to that choice's score
            if (choices_q12[i].value == 'c1') {
              formController.$data.literacy_q12 = 1;
            }
            if (choices_q12[i].value == 'c2') {
              formController.$data.literacy_q12 = 2;
            }
            if (choices_q12[i].value == 'c3') {
              formController.$data.literacy_q12 = 3;
            }
            if (choices_q12[i].value == 'c4') {
              formController.$data.literacy_q12 = 4;
            }
          }
        }

        var choices_q13 = document.getElementsByName('q13');
        // loop through all the radio inputs
        for (i = 0; i < choices_q13.length; i++) {
          // if the radio is checked..
          if (choices_q13[i].checked) {
            // add 1 to that choice's score
            if (choices_q13[i].value == 'c1') {
              formController.$data.literacy_q13 = 1;
            }
            if (choices_q13[i].value == 'c2') {
              formController.$data.literacy_q13 = 2;
            }
            if (choices_q13[i].value == 'c3') {
              formController.$data.literacy_q13 = 3;
            }
            if (choices_q13[i].value == 'c4') {
              formController.$data.literacy_q13 = 4;
            }
          }
        }

        var choices_q14 = document.getElementsByName('q14');
        // loop through all the radio inputs
        for (i = 0; i < choices_q14.length; i++) {
          // if the radio is checked..
          if (choices_q14[i].checked) {
            // add 1 to that choice's score
            if (choices_q14[i].value == 'c1') {
              formController.$data.literacy_q14 = 1;
            }
            if (choices_q14[i].value == 'c2') {
              formController.$data.literacy_q14 = 2;
            }
            if (choices_q14[i].value == 'c3') {
              formController.$data.literacy_q14 = 3;
            }
            if (choices_q14[i].value == 'c4') {
              formController.$data.literacy_q14 = 4;
            }
          }
        }

        var choices_q15 = document.getElementsByName('q15');
        // loop through all the radio inputs
        for (i = 0; i < choices_q15.length; i++) {
          // if the radio is checked..
          if (choices_q15[i].checked) {
            // add 1 to that choice's score
            if (choices_q15[i].value == 'c1') {
              formController.$data.literacy_q15 = 1;
            }
            if (choices_q15[i].value == 'c2') {
              formController.$data.literacy_q15 = 2;
            }
            if (choices_q15[i].value == 'c3') {
              formController.$data.literacy_q15 = 3;
            }
            if (choices_q15[i].value == 'c4') {
              formController.$data.literacy_q15 = 4;
            }
          }
        }

        var choices_q16 = document.getElementsByName('q16');
        // loop through all the radio inputs
        for (i = 0; i < choices_q16.length; i++) {
          // if the radio is checked..
          if (choices_q16[i].checked) {
            // add 1 to that choice's score
            if (choices_q16[i].value == 'c1') {
              formController.$data.literacy_q16 = 1;
            }
            if (choices_q16[i].value == 'c2') {
              formController.$data.literacy_q16 = 2;
            }
            if (choices_q16[i].value == 'c3') {
              formController.$data.literacy_q16 = 3;
            }
            if (choices_q16[i].value == 'c4') {
              formController.$data.literacy_q16 = 4;
            }
          }
        }

        var checkedValue = null;
        var inputElementsQ17 = document.getElementsByName('q17');
        var userSelection_3 = '';
        let num_selections_3 = 0;
        for (var i = 0; i < inputElementsQ17.length; ++i) {
          if (inputElementsQ17[i].checked) {
            num_selections_3 = num_selections_3 + 1;
            // add 1 to that choice's score
            if (inputElementsQ17[i].value == 'DT') {
              userSelection_3 = 'DT';
            }
            if (inputElementsQ17[i].value == 'MS') {
              userSelection_3 = 'MS';
            }
            if (inputElementsQ17[i].value == 'SA') {
              userSelection_3 = 'SA';
            }
            if (inputElementsQ17[i].value == 'PO') {
              userSelection_3 = 'PO';
            }

            formController.$data.literacy_q17.push(userSelection_3);
            // If you add more choices and outcomes, you must add another if statement below.
          } else {
            formController.$data.literacy_q17.push('No');
          }

        }

        var inputElementsQ18 = document.getElementsByName('q18');
        var userSelection_4 = '';
        let num_selections_4 = 0;
        for (var i = 0; i < inputElementsQ18.length; ++i) {
          if (inputElementsQ18[i].checked) {
            num_selections_4 = num_selections_4 + 1;
            // add 1 to that choice's score
            if (inputElementsQ18[i].value == 'laser') {
              userSelection_4 = 'laser';
            }
            if (inputElementsQ18[i].value == 'magnetic') {
              userSelection_4 = 'magnetic';
            }
            if (inputElementsQ18[i].value == 'sound') {
              userSelection_4 = 'sound';
            }
            if (inputElementsQ18[i].value == 'passenger') {
              userSelection_4 = 'passenger';
            }

            formController.$data.literacy_q18.push(userSelection_4);
            // If you add more choices and outcomes, you must add another if statement below.
          } else {
            formController.$data.literacy_q18.push('No');
          }

        }


        var choices_q19 = document.getElementsByName('q19');
        // loop through all the radio inputs
        for (i = 0; i < choices_q19.length; i++) {
          // if the radio is checked..
          if (choices_q19[i].checked) {
            // add 1 to that choice's score
            if (choices_q19[i].value == 'c1') {
              formController.$data.literacy_q19 = 1;
            }
            if (choices_q19[i].value == 'c2') {
              formController.$data.literacy_q19 = 2;
            }
            if (choices_q19[i].value == 'c3') {
              formController.$data.literacy_q19 = 3;
            }
            if (choices_q19[i].value == 'c4') {
              formController.$data.literacy_q19 = 4;
            }
          }
        }
        var choices_q20 = document.getElementsByName('q20');
        // loop through all the radio inputs
        for (i = 0; i < choices_q20.length; i++) {
          // if the radio is checked..
          if (choices_q20[i].checked) {
            // add 1 to that choice's score
            if (choices_q20[i].value == 'c1') {
              formController.$data.literacy_q20 = 1;
            }
            if (choices_q20[i].value == 'c2') {
              formController.$data.literacy_q20 = 2;
            }
            if (choices_q20[i].value == 'c3') {
              formController.$data.literacy_q20 = 3;
            }
            if (choices_q20[i].value == 'c4') {
              formController.$data.literacy_q20 = 4;
            }
          }
        }

        var choices_q21 = document.getElementsByName('q21');
        // loop through all the radio inputs
        for (i = 0; i < choices_q21.length; i++) {
          // if the radio is checked..
          if (choices_q21[i].checked) {
            // add 1 to that choice's score
            if (choices_q21[i].value == 'c1') {
              formController.$data.literacy_q21 = 1;
            }
            if (choices_q21[i].value == 'c2') {
              formController.$data.literacy_q21 = 2;
            }
            if (choices_q21[i].value == 'c3') {
              formController.$data.literacy_q21 = 3;
            }
            if (choices_q21[i].value == 'c4') {
              formController.$data.literacy_q21 = 4;
            }
          }
        }

        var choices_q22 = document.getElementsByName('q22');
        // loop through all the radio inputs
        for (i = 0; i < choices_q22.length; i++) {
          // if the radio is checked..
          if (choices_q22[i].checked) {
            // add 1 to that choice's score
            if (choices_q22[i].value == 'c1') {
              formController.$data.literacy_q22 = 1;
            }
            if (choices_q22[i].value == 'c2') {
              formController.$data.literacy_q22 = 2;
            }
            if (choices_q22[i].value == 'c3') {
              formController.$data.literacy_q22 = 3;
            }
            if (choices_q22[i].value == 'c4') {
              formController.$data.literacy_q22 = 4;
            }
          }
        }

        var choices_q23 = document.getElementsByName('q23');
        // loop through all the radio inputs
        for (i = 0; i < choices_q23.length; i++) {
          // if the radio is checked..
          if (choices_q23[i].checked) {
            // add 1 to that choice's score
            if (choices_q23[i].value == 'c1') {
              formController.$data.literacy_q23 = 1;
            }
            if (choices_q23[i].value == 'c2') {
              formController.$data.literacy_q23 = 2;
            }
            if (choices_q23[i].value == 'c3') {
              formController.$data.literacy_q23 = 3;
            }
            if (choices_q23[i].value == 'c4') {
              formController.$data.literacy_q23 = 4;
            }
          }
        }

        var choices_q24 = document.getElementsByName('q24');
        // loop through all the radio inputs
        for (i = 0; i < choices_q24.length; i++) {
          // if the radio is checked..
          if (choices_q24[i].checked) {
            // add 1 to that choice's score
            if (choices_q24[i].value == 'c1') {
              formController.$data.literacy_q24 = 1;
            }
            if (choices_q24[i].value == 'c2') {
              formController.$data.literacy_q24 = 2;
            }
            if (choices_q24[i].value == 'c3') {
              formController.$data.literacy_q24 = 3;
            }
            if (choices_q24[i].value == 'c4') {
              formController.$data.literacy_q24 = 4;
            }
          }
        }

        var inputElementsQ25 = document.getElementsByName('q25');
        var userSelection_5 = '';
        let num_selections_5 = 0;
        for (var i = 0; i < inputElementsQ25.length; ++i) {
          if (inputElementsQ25[i].checked) {
            num_selections_5 = num_selections_5 + 1;
            // add 1 to that choice's score
            if (inputElementsQ25[i].value == 'privacy') {
              userSelection_5 = 'privacy';
            }
            if (inputElementsQ25[i].value == 'employment') {
              userSelection_5 = 'employment';
            }
            if (inputElementsQ25[i].value == 'accountability') {
              userSelection_5 = 'accountability';
            }
            if (inputElementsQ25[i].value == 'bias') {
              userSelection_5 = 'bias';
            }

            formController.$data.literacy_q25.push(userSelection_5);
            // If you add more choices and outcomes, you must add another if statement below.
          } else {
            formController.$data.literacy_q25.push('No');
          }

        }

        var choices_q26 = document.getElementsByName('q26');
        // loop through all the radio inputs
        for (i = 0; i < choices_q26.length; i++) {
          // if the radio is checked..
          if (choices_q26[i].checked) {
            // add 1 to that choice's score
            if (choices_q26[i].value == 'c1') {
              formController.$data.literacy_q26 = 1;
            }
            if (choices_q26[i].value == 'c2') {
              formController.$data.literacy_q26 = 2;
            }

          }
        }

        /////end of literacy questions/////////



        for (let prop in formController.$data) {
          console.log("prop:", prop, formController.$data[prop]);
          //if any other data other than the optional stuff is missing, alert.
          //TODO: Uncomment before launching!!!
          if (((prop === 'workerFeedback') || (prop === 'genderMMText'))) {
            continue;
          } else {
            if (formController.$data[prop] === '') {
              console.log("this prop is empty", prop, formController.$data[prop]);
              arr = ['literacy_q1', 'literacy_q2', 'literacy_q3', 'literacy_q4', 'literacy_q5', 'literacy_q6', 'literacy_q7', 'literacy_q8', 'literacy_q9', 'literacy_q10', 'literacy_q11', 'literacy_q12', 'literacy_q13', 'literacy_q14', 'literacy_q15', 'literacy_q16', 'literacy_q17', 'literacy_q19', 'literacy_q20', 'literacy_q21', 'literacy_q22', 'literacy_q23', 'literacy_q24', 'literacy_q25', 'literacy_q26']
              console.log("is it catching it?", arr.filter(str => str.includes(prop)).length);
              if (arr.filter(str => str.includes(prop)).length) { console.log("if is true") }
              alert("Please answer all questions before submitting" + prop);

              if (arr.filter(str => str.includes(prop)).length) {
                document.getElementById("AIliteracy").style.display = "";
                document.getElementById("AIliteracy").style.visibility = 'visible';

                document.getElementById("page22").style.display = 'none';
                document.getElementById("page22").style.visibility = 'hidden';

              }



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
            workerId: gup('workerId'),
            event_id: gup('event_id'),
            driverLicense: Number(formController.$data.driverLicense),
            driverLicenseAge: formController.$data.driverLicenseAge,
            country: formController.$data.country,
            genderMMText: formController.$data.genderMMText,
            workerAge: Number(formController.$data.workerAge),
            workerRace: Number(formController.$data.workerRace),
            workerFeedback: Number(formController.$data.workerFeedback),
            workerEtnicity: Number(formController.$data.workerEtnicity),
            workerGender: Number(formController.$data.workerGender),
            leftOrRight: Number(formController.$data.leftOrRight),
            NASA_TLX: formController.$data.NASA_TLX, //text
            NASA_weights: data_object.button_clicks,
            literacy_q1: formController.$data.literacy_q1,
            literacy_q2: formController.$data.literacy_q2,
            literacy_q3: formController.$data.literacy_q3,
            literacy_q4: formController.$data.literacy_q4,
            literacy_q5: formController.$data.literacy_q5,
            literacy_q6: formController.$data.literacy_q6,
            literacy_q7: formController.$data.literacy_q7,
            literacy_q8: formController.$data.literacy_q8,
            literacy_q9: formController.$data.literacy_q9,
            literacy_q10: formController.$data.literacy_q10,
            literacy_q11: formController.$data.literacy_q11,
            literacy_q12: formController.$data.literacy_q12,
            literacy_q13: formController.$data.literacy_q13,
            literacy_q14: formController.$data.literacy_q14,
            literacy_q15: formController.$data.literacy_q15,
            literacy_q16: formController.$data.literacy_q16,
            literacy_q17: formController.$data.literacy_q17,
            literacy_q18: formController.$data.literacy_q18,
            literacy_q19: formController.$data.literacy_q19,
            literacy_q20: formController.$data.literacy_q20,
            literacy_q21: formController.$data.literacy_q21,
            literacy_q22: formController.$data.literacy_q22,
            literacy_q23: formController.$data.literacy_q23,
            literacy_q24: formController.$data.literacy_q24,
            literacy_q25: formController.$data.literacy_q25,
            literacy_q26: formController.$data.literacy_q26,

          },
          success: function (d) {
            console.log("Running success after loging survey responses.js", d);
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


