/*
 * Created on  :  18 Oct, 2015, 8:34 PM
 Editted by     : Jeremy Daigneau
 email          : jeremy_daigneau@student.uml.edu
 Code based from: https://github.com/Pkthunder/GUI-Help/blob/gh-pages/Assignment6/mult_table.js
 Assignment 6 Javascript for creating multiplication table.
 Editted for Assignment 7 to include jQuery Validation
 Edditted for Assignment 8 to use tabs and sliders
   
 */

//Validator
$(document).ready(function () {

  validate();    // Runs the validate code as soon as the body is ready.
});

$(function () {

  //1st slider
  $("#max-multiplier-slider").slider({
    range: "max", //slider type
    min: -10, //min value
    max: 10, //max value
    value: 0, //starting value
    slide: function (event, ui) {
      $("#max_multiplier").val(ui.value); //updates text box
    }
  });
  //updates slider
  $("#max_multiplier").val($("#max-multiplier-slider").slider("value"));

  //second slider
  $("#min-multiplicand-slider").slider({
    range: "max", //slider type 
    min: -10, //min value
    max: 10, //max value
    value: 0, //starting value
    slide: function (event, ui) {
      $("#min_multiplicand").val(ui.value); //updates text box
    }
  });
  //updates slider
  $("#min_multiplicand").val($("#min-multiplicand-slider").slider("value"));

  //thirds slider
  $("#min-multiplier-slider").slider({
    range: "max", //slider type
    min: -10, //min value
    max: 10, //max value
    value: 0, //starting value
    slide: function (event, ui) {
      $("#min_multiplier").val(ui.value); //updates text box
    }
  });
  //updates slider
  $("#min_multiplier").val($("#min-multiplier-slider").slider("value"));

  //4th slider slider
  $("#max-multiplicand-slider").slider({
    range: "max", //slider type
    min: -10, //min value
    max: 10, //max value
    value: 0, //sarting value
    slide: function (event, ui) {
      $("#max_multiplicand").val(ui.value); //updates text box
    }
  });
  //updates slider
  $("#max_multiplicand").val($("#max-multiplcand-slider").slider("value"));

  //updates slider from text box
  $('#max_multiplier').change(function () {
    $('#max-multiplier-slider').slider('option', 'value', $('#max_multiplier').val());
  });

  //updates slider from text box
  $('#min_multiplier').change(function () {
    $('#min-multiplier-slider').slider('option', 'value', $('#min_multiplier').val());
  });

  //updates slider from text box
  $('#min_multiplicand').change(function () {
    $('#min-multiplicand-slider').slider('option', 'value', $('#min_multiplicand').val());
  });

  //updates slider from text box
  $('#max_multiplicand').change(function () {
    $('#max-multiplicand-slider').slider('option', 'value', $('#max_multiplicand').val());
  });
});

$(function () {

  //templates for all tabs
  var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
          tabCounter = 1;

  //initialize tabs
  var tabs = $("#tabs").tabs();

  // actual addTab function: adds new tab using the input from the form above
  window.addTab = function () {
    var label = "Result " + tabCounter, //tab title
            id = "tabs-" + tabCounter, //tab id
            li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label)), //new tab
            tabContentHtml = ""; 

    tabContentHtml += $("#result").prop('outerHTML'); //tab content
    tabs.find(".ui-tabs-nav").append(li); //add tab to DOM
    tabs.append("<div id='" + id + "'><p>" + tabContentHtml + "</p></div>");
    tabs.tabs("refresh");
    tabCounter++; //increase tab number
  };

  //creates table on submit
  $(".submit_button")
          .button()
          .click(function () {
            createTable();
          });

  // close icon: removing the tab on click
  // adds individual close functionality
  tabs.delegate("span.ui-icon-close", "click", function () {
    var panelId = $(this).closest("li").remove().attr("aria-controls");
    $("#" + panelId).remove();
    tabs.tabs("refresh");
  });

  tabs.bind("keyup", function (event) {
    if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
      var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
      $("#" + panelId).remove();
      tabs.tabs("refresh");
    }
  });

//deletes all tabs
$('#delete-button').click(function () {

    tabs.find('ul > li, div').remove();
    tabs.tabs('refresh');
 });
 
});

//function that calculates and generates the table
function createTable() {

  $("#result").empty(); //if table isn't empty, submit resets it
  $("#swap-warning").empty(); //clears the div that would contain a swap warning

  //stores the input values as variables
  var maxMultiplicand = $("#max_multiplicand").numVal();
  var minMultiplicand = $("#min_multiplicand").numVal();
  var maxMultiplier = $("#max_multiplier").numVal();
  var minMultiplier = $("#min_multiplier").numVal();

  //if the max is less than the min, swap them
  if (maxMultiplicand < minMultiplicand) {

    //prints messages saying values were swapped
    $("#swap-warning").append("<p> Swapped multiplicand values. </p>");

    var tmp = maxMultiplicand;
    maxMultiplicand = minMultiplicand;
    minMultiplicand = tmp;
  }

  //stores the input values as variables
  if (maxMultiplier < minMultiplier) {

    //prints messages saying values were swapped
    $("#swap-warning").append("<p> Swapped multiplier values. </p>");

    var tmp = maxMultiplier;
    maxMultiplier = minMultiplier;
    minMultiplier = tmp;
  }

  //gets column and row values from forms
  var columns = (maxMultiplicand - minMultiplicand) + 2;
  var rows = (maxMultiplier - minMultiplier) + 2;

  var appendStr = ""; //assign appendStr as a string which will store the table

  //loop for rows and loop for columns which will be appended to the DOM
  for (var i = 0; i < Math.abs(rows); i++) { //loop for rows

    appendStr = appendStr.concat("<tr>"); //adds table row

    for (var j = 0; j < Math.abs(columns); j++) { //loops through columns

      if (i === 0 && j === 0) {

        //top left corner, put place holder
        appendStr = appendStr.concat("<th> * </th>");

      } else if (i === 0) {

        //get value of j for multiplicand on side
        appendStr = appendStr.concat("<th>");
        appendStr = appendStr.concat((j - 1 + minMultiplicand).toString());
        appendStr = appendStr.concat("</th>");

      } else if (j === 0) {

        //get value for i for multiplier on top
        appendStr = appendStr.concat("<th>");
        appendStr = appendStr.concat((i - 1 + minMultiplier).toString());
        appendStr = appendStr.concat("</th>");

      } else {

        //populate the table
        appendStr = appendStr.concat("<td>");
        appendStr = appendStr.concat(((i - 1 + minMultiplier) * (j - 1 + minMultiplicand)).toString());
        appendStr = appendStr.concat("</td>");
      }

    }
    appendStr = appendStr.concat("</tr>"); //ends the table row
  }

  $("#result").append(appendStr); //append the DOM
  //addTab();
};



function validate() {

  //specifies the form to validate
  $("#form").validate({
    //form validation rules
    rules: {
      min_multiplicand: {
        number: true,
        min: -10,
        max: 10,
        required: true
      },
      max_multiplicand: {
        number: true,
        min: -10,
        max: 10,
        required: true
      },
      min_multiplier: {
        number: true,
        min: -10,
        max: 10,
        required: true
      },
      max_multiplier: {
        number: true,
        min: -10,
        max: 10,
        required: true
      }
    },
    // Error messages for invalid form inputs
    messages: {
      min_multiplicand: {
        number: "Min Multiplicand ERROR: Please enter a number between 1 and 10.",
        min: "Min Multiplicand ERROR: Number too small. Please enter a number between 1 and 10. ",
        max: "Min Multiplicand ERROR: Number too large. Please enter a number between 1 and 10.",
        required: "Min Multiplicand ERROR: Please enter a number between 1 and 10."
      },
      max_multiplicand: {
        number: "Max Multiplicand ERROR: Please enter a number between 1 and 10.",
        min: "Max Multiplicand ERROR: Number too small. Please enter a number between 1 and 10. ",
        max: "Max Multiplicand ERROR: Number too large. Please enter a number between 1 and 10.",
        required: "Max Multiplicand ERROR: Please enter a number between 1 and 10."
      },
      max_multiplier: {
        number: "Max Multiplier ERROR: Please enter a number between 1 and 10.",
        min: " Max Multiplier ERROR: Number too small. Please enter a number between 1 and 10. ",
        max: "Max Multiplier ERROR: Number too large. Please enter a number between 1 and 10.",
        required: "Max Multiplier ERROR: Please enter a number between 1 and 10."
      },
      min_multiplier: {
        number: "Min Multiplier ERROR: Please enter a number between 1 and 10.",
        min: "Min Multiplier ERROR: Number too small. Please enter a number between 1 and 10. ",
        max: "Min Multiplier ERROR: Number too large. Please enter a number between 1 and 10.",
        required: "Min Multiplier ERROR: Please enter a number between 1 and 10."
      }
    },
    // Valid form function
    submitHandler: function () {
      bool = true;
      createTable(); //creates table
      window.addTab();
      return false;
    },
    //inva;id form function
    invalidHandler: function () {

      bool = false;
      $("#swap-warning").empty(); //clears warning
      $("#result").empty(); //clears table
    },
    //places the error messages after the input
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.appendTo(element.parent("div"));
    }
  });
}



//return an input tag's value as a number(or int)
jQuery.fn.numVal = function () {
  return parseInt($(this).val());
};