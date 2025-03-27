var TOTAL_NUM_EVENTS = 6;


//third_channel.onmessage = event => { console.log("from the page.js page, event order:",event.data);
//var event_type_to_use = event.data;
//event_type_to_use = event_type_to_use.split(',').map(Number);
//}
/*
second_channel.addEventListener('ettu', (event)=>{console.log("from the page.js page, event order:",event.data)})
third_channel.addEventListener('event_type_to_use', (event) => {
  console.log("from the page.js page, event order:",event.data);
  var event_type_to_use = event.data;
  event_type_to_use = event_type_to_use.split(',').map(Number); 
});

fourth_channel.onmessage = event => { console.log("from the page.js page, random_indices:",event.data);
var random_indices = event.data;
random_indices = random_indices.split(',').map(Number);
}*/

var event_type_to_use =localStorage.getItem('event_type_to_use');
event_type_to_use = event_type_to_use.split(',').map(Number);
var random_indices = localStorage.getItem('random_indices');
random_indices = random_indices.split(',').map(Number);
/*second_channel.onmessage = event => { 
  aaab = event.data;
  event_type_to_use = aaab[0];
  random_indices = aaab[1];
}*/

console.log("from the page.js page, event order:", event_type_to_use);
console.log("from the page.js page, random indices:", random_indices );
////var the_event_index=localStorage.getItem('the_event_index');
//var the_current_index = 0;

//console.log("from local storage", the_event_index);
var file_name_to_be_processed = '';
if (Number(event_type_to_use[0])===1){
  file_name_to_be_processed = "crash_data.csv";
  console.log("idx,file name:", 0, "crash_data.csv");
} else if(Number(event_type_to_use[0])===2){
  file_name_to_be_processed = "near_crash_data.csv";
  console.log("idx,file name:", 0, "near crash_data.csv");

}else{
  file_name_to_be_processed = "baseline_data.csv";
  console.log("idx,file name:", 0, "baseline_data.csv");
}
var the_row_idx = random_indices[0];

console.log("random_indices", random_indices);
//random_indices

/*window.addEventListener('localdatachanged', () => {
  // handler
  the_current_index=localStorage.getItem('current_event_idx');
  console.log("the_current_index has changed", the_current_index);
  alert("the_current_index has changed");
});*/

/*window.addEventListener('current_event_idx', function(e){
  console.log("it was changed-------yaaayyyy");
  console.log(event.key, event.newValue);
});*/


$(document).ready( function() {

  window.onkeydown = function(event) {
    console.log("--------key event------", event.keyCode);
    //event.preventDefault();
    if (event.keyCode === 13) {
      masterControllerWizard.communicate_with_user();
      //document.getElementById("userqa").click();
      
    }
    
  };
  
  /*window.addEventListener('current_event_idx', function(e){
    console.log("it was changed-------yaaayyyy");
    console.log(event.key, event.newValue);
  });*/

    $.ajax({
        type: "GET",
        url: file_name_to_be_processed,
        dataType: "text",
        success: function(myDataWizard) {
        //var liness = myData.split(/\r\n|\n/);
        //masterController.$data.idx = Math.floor( Math.random() * liness.length);
        masterControllerWizard.processDataWizard(myDataWizard, Number(random_indices[0]));
        //metaData = myData;
        }
    });
    var message = '';
    channel.addEventListener('message', event => {
        document.getElementById('wizardd').focus();
        const message = event.data;
        masterControllerWizard.$data.userAsked = message;
        masterControllerWizard.addChatEntry(masterControllerWizard.$data.userAsked,'');
        console.log("message from index.html", message);

    });
    /*var the_event_index = '';
    second_channel.addEventListener('the_event_index', event => {
      the_event_index = event.data;
      
      console.log("the event number from index.html:", the_event_index);

    });*/
    second_channel.onmessage = event => { 
      console.log("the event number from index.html:",event.data);
      
      if (Number(event_type_to_use[event.data])===1){
        masterControllerWizard.read_the_next_data("crash_data.csv",Number(random_indices[event.data]));
        console.log("idx,file name:", event.data, "crash_data.csv");
        
      } else if(Number(event_type_to_use[0])===2){
        masterControllerWizard.read_the_next_data("near_crash_data.csv",Number(random_indices[event.data]));
        console.log("idx,file name:", event.data, "near crash_data.csv");
      
      }else{
        masterControllerWizard.read_the_next_data("baseline_data.csv",Number(random_indices[event.data]));
        console.log("idx,file name:", event.data, "baseline_data.csv");
      }

    };
    ////  INIT VUE CONTROLLERS  ////
    var masterControllerWizard = new Vue({
        el: '#dynamicWizard',
        data: {
        /* Object Controller elements */
        
        iidx               : 0,
        realEventCategory  : '',
        eventDescription   : '',
        incidentType1      : '',
        incidentType2      : '',
        areIntheScene      : '',
        userAsked          : '',
        userQuestion       : '',
        eventNature1        : 'conflict with the lead vehicle',
        eventNature2        : 'conflict with the lead vehicle',
        eventSeverity1      : '',
        crashSeverity1      : '',
        eventSeverity2      : '',
        crashSeverity2      : '',
        vehicle1EvasiveManeuver1 : '',
        vehicle1EvasiveManeuver2 : '',
        vehicle1PostManeuver1 : '',
        vehicle1PostManeuver2 : '',
        vehicleRollover    : '',
        driverBehavior1     : '',
        driverBehavior2     : '',
        driverBehavior3     : '',
        frontSeatPassengers : '',
        rearSeatPassengers : '',
        vehicleContributingFactors: '',
        visualObstructions : '',
        throughTravelLanes : '',
        infrastructure     : '',
        vehicle1LaneOccupied: '',
        trafficDensity: '',
        trafficControl: '',
        relationToJunction: '',
        alignment: '',
        constructionZone: '',
        numberOfOtherMotorists: '',
        numberOfObjectsAnimals: '',
        motorist2Location: '',
        motorist2Type: '',
        motorist2Maneuver: '',
        motorist2Reaction: '',
        motorist3Location: '',
        motorist3Type: '',
        motorist3Maneuver: '',
        motorist3Reaction: '',
        finalNarrative: '',
        intersectionInfluence: '',
        maneuverJudgment : '',
        airBag             : 'yes',
        construction       : 'not construction zone related',
        lighting   : 'distracted',
        trafficFlow       : 'rear-end, strike',
        contigTravelLanes       : 'rear-end, strike',
        judgement          : 'safe and legal',
        surfaceCondition   : 'dry',
        weather   : 'adverse conditions',
        preIncidentMan     : 'going stright, constant speed',
        fault              : 'subject vehicle',
        eventID : '',
        
        },
        methods: {
            processDataWizard: function(dataa, this_iiddxx) {
                var lines = dataa.split(/\r\n|\n/);
                //console.log("lines:",lines, "num lines:", lines.length);
        
                //Set up the data arrays
                //third_channel.onmessage = event => {
                //console.log("event row from index.html", event.data); 
                //console.log("the event number from index.html:",event.data);
                var headings = lines[0].split(','); // Splice up the first row to get the headings
                
                String.prototype.splitCSV = function() {

                  //var regex = /(\s*'[^']+'|\s*[^,]+)(?=,|$)/g;
                  //return matches = this.match(regex);  
                  var matches = this.match(/(\s*"[^"]+"\s*|\s*[^,]+|,)(?=,|$)/g);
                  if(!matches || matches.length === 0 ){
                    masterControllerWizard.processDataWizard(dataa, this_iiddxx);
      
                  }else{
                    for (var n = 0; n < matches.length; ++n) {
                      matches[n] = matches[n].trim();
                      if (matches[n] == ',') matches[n] = '';
                    }
                    if (this[0] == ',') matches.unshift("");
                    return matches;
      
                    }
                    
                }
                  
                  
                  //------------------------------------------
                let values = lines[this_iiddxx].splitCSV(); // Split up the comma seperated values
                if (values.length<headings.length){
                  masterControllerWizard.processDataWizard(dataa, this_iiddxx);
      
                } else{
          
                    //masterController.$data.event_id = values[1];
                    //masterController.$data.video_name = values[2];
                    //const video = document.getElementById("instructvid");
                    //video.disablePictureInPicture = true
                    //video.src = "media/"+values[2];
                    
                  
                    masterControllerWizard.$data.realEventCategory= values[5]; 
                    masterControllerWizard.$data.finalNarrative= values[42]; 
                    
                    //var num_things_in_the_scene = Number(values[31])+ Number(values[32]);
                    //console.log("num_things_in_the_scene", num_things_in_the_scene);



                    masterControllerWizard.$data.eventID = values[1];
                    masterControllerWizard.$data.eventNature1 = values[3];
                    masterControllerWizard.$data.incidentType1 = values[4];
                    masterControllerWizard.$data.eventSeverity1 = values[5];
                    masterControllerWizard.$data.crashSeverity1 = values[6];
                    masterControllerWizard.$data.vehicle1EvasiveManeuver1 = values[7];
                    masterControllerWizard.$data.vehicle1PostManeuver1 = values[8];
                    masterControllerWizard.$data.eventNature2 = values[9];
                    masterControllerWizard.$data.incidentType2 = values[10];
                    masterControllerWizard.$data.eventSeverity2 = values[11];


                    masterControllerWizard.$data.crashSeverity2 = values[12];
                    masterControllerWizard.$data.vehicle1EvasiveManeuver2 = values[13];
                    masterControllerWizard.$data.vehicle1PostManeuver2 = values[14];
                    masterControllerWizard.$data.airBag = values[15];
                    masterControllerWizard.$data.vehicleRollover = values[16];
                    masterControllerWizard.$data.driverBehavior1 = values[17];
                    masterControllerWizard.$data.driverBehavior2 = values[18];
                    masterControllerWizard.$data.driverBehavior3 = values[19];
                    masterControllerWizard.$data.frontSeatPassengers = values[20];
                    masterControllerWizard.$data.rearSeatPassengers = values[21];

                    masterControllerWizard.$data.vehicleContributingFactors = values[22];
                    masterControllerWizard.$data.visualObstructions = values[23];
                    masterControllerWizard.$data.lighting = values[24];
                    masterControllerWizard.$data.weather = values[25];
                    masterControllerWizard.$data.surfaceCondition = values[26];
                    masterControllerWizard.$data.trafficFlow = values[27];
                    masterControllerWizard.$data.contigTravelLanes = values[28];
                    masterControllerWizard.$data.throughTravelLanes = values[29];
                    masterControllerWizard.$data.infrastructure = values[30];
                    masterControllerWizard.$data.vehicle1LaneOccupied = values[31];

                    masterControllerWizard.$data.trafficDensity = values[32];
                    masterControllerWizard.$data.trafficControl = values[33];
                    masterControllerWizard.$data.relationToJunction = values[34];
                    masterControllerWizard.$data.alignment = values[35];
                    masterControllerWizard.$data.construction = values[36];
                    masterControllerWizard.$data.numberOfOtherMotorists = values[37];
                    masterControllerWizard.$data.numberOfObjectsAnimals = values[38];
                    masterControllerWizard.$data.fault = values[39];
                    masterControllerWizard.$data.motorist2Location = values[40];
                    masterControllerWizard.$data.motorist2Type = values[41];

                    masterControllerWizard.$data.motorist2Maneuver = values[42];
                    masterControllerWizard.$data.motorist2Reaction = values[43];
                    masterControllerWizard.$data.motorist3Location = values[44];
                    masterControllerWizard.$data.motorist3Type = values[45];
                    masterControllerWizard.$data.motorist3Maneuver = values[46];
                    masterControllerWizard.$data.motorist3Reaction = values[47];
                    masterControllerWizard.$data.finalNarrative = values[48];
                    masterControllerWizard.$data.intersectionInfluence = values[49];
                    masterControllerWizard.$data.maneuverJudgment = values[50];
                      
        
                  }

                //}
                
            
              },
              read_the_next_data: function(this_file_name, this_idx_row){
                $.ajax({
                  type: "GET",
                  url: this_file_name,
                  dataType: "text",
                  success: function(myData) {
                    //var liness = myData.split(/\r\n|\n/);
                    //masterController.$data.idx = Math.floor( Math.random() * liness.length);
                    //masterController.$data.crash_data=myData;
                    masterControllerWizard.processDataWizard(myData, this_idx_row);
                    //metaData = myData;
                  }
                });
      
              },
              next_event: function(){

                let next_file_name = masterControllerWizard.get_the_next_data(masterControllerWizard.$data.iidx);
                masterControllerWizard.read_the_next_data(next_file_name);

              },
              get_the_next_data: function(for_this_index) {
                if (Number(event_type_to_use[for_this_index])===1){
                  file_name_to_be_processed = "crash_data.csv";
                } else if(Number(event_type_to_use[for_this_index])===2){
                  file_name_to_be_processed = "near_crash_data.csv";
            
                }else{
                  file_name_to_be_processed = "baseline_data.csv";
                }
                return file_name_to_be_processed;
              },
              
              communicate_with_user: function(){
                const inputField1 = document.getElementById("wizardd");
                let u_input = inputField1.value;
                inputField1.value = "";
                channel.postMessage(u_input);
                //console.log("just sent the message to index.html", u_input);
                masterControllerWizard.addChatEntry('',u_input);
                
                masterControllerWizard.$data.userQuestion='';
                //masterControllerWizard.output(u_input);
                
              },
              
              output: function(input) {
                //let product;
                let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
                //channel.postMessage(input);
                
                product = function() {};
                product.ans = masterControllerWizard.$data.userQuestion;
                console.log("input, product",input,masterControllerWizard.$data.userAsked);
                masterControllerWizard.addChatEntry(masterControllerWizard.$data.userAsked,input);
                
                masterControllerWizard.$data.userQuestion='';
                
              },
              addChatEntry: function(input, product) {
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
              get_nonExcisting_types_wizard: function(vals, possible_vals){
                let pv_copy = possible_vals;
                for (k = 1; k<vals.length; k++){
                  replaced = vals[k].replace(/[^a-z0-9]/gi, '');
                  const indexx = pv_copy.indexOf(replaced);
                  //console.log("indexx",indexx);
                  //console.log("before", pv_copy);
                  if(indexx > -1){
                    console.log("not found");
                    pv_copy.splice(indexx, 1); // 2nd parameter means remove one item only
                    console.log("after:", pv_copy)
                  }
                }
                //console.log(pv_copy);
                return pv_copy;
              },

        }
    });
});