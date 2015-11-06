/*
 * Created on  :  18 Oct, 2015, 8:34 PM
 Editted by     : Jeremy Daigneau
 email          : jeremy_daigneau@student.uml.edu
 Code based from: https://github.com/Pkthunder/GUI-Help/blob/gh-pages/Assignment6/mult_table.js
 Assignment 6 Javascript for creating multiplication table.
 */

$(document).ready(function () {
  
  $("#form").submit(function () {

   $("#form").validate({
    // Rules for validating the form.
    rules: {
      max_multiplicand: {
        number: true,
        min: -100,
        max: 100,
        required: true
      },
      min_multiplicand: {
        number: true,
        min: -100,
        max: 100,
        required: true
      },
      max_multiplier: {
        number: true,
        min: -100,
        max: 100,
        required: true
      },
      min_multiplier: {
        number: true,
        min: -100,
        max: 100,
        required: true
      }
    },

    // Error messages
    messages: {
      max_multiplicand: {
        number: "Max Multiplicand Error: Please enter a number between -100 and 100. <br>",
        min: "Max Multiplicand Error: Number is too small. Please enter a number greater than -100. <br>",
        max: "Max Multiplicand Error: Number is too large. Please enter a number less than 100. <br>",
        required: "Max Multiplicand Error: Please enter a number between -100 and 100.<br>"
      },
      min_multiplicand: {
        number: "Min Multiplicand Error: Please enter a number between -100 and 100.<br>",
        min: "Min Multiplicand Error: Number is too small. Please enter a number greater than -100. <br>",
        max: "Min Multiplicand Error: Number is too large. Please enter a number less than 100.<br>",
        required: "Min Multiplicand Error: Please enter a number between -100 and 100.<br>"
      },
      max_multiplier: {
        number: "Max Multiplier Error: Please enter a number between -100 and 100.<br>",
        min: "Max Multiplier Error: Number is too small. Please enter a number greater than -100.<br>",
        max: "Max Multiplier Error: Number is too large. Please enter a number less than 100.<br>",
        required: "Max Multiplier Error: Please enter a number between -100 and 100.<br>"
      },
      min_multiplier: {
        number: "Min Multiplier Error: Please enter a number between -100 and 100.<br>",
        min: "Min Multiplier Error: Number is too small. Please enter a number greater than -100.<br>",
        max: "Min Multiplier Error: Number is too large. Please enter a number less than 100.<br>",
        required: "Min Multiplier Error: Please enter a number between -100 and 100.<br>"
      }
    },
    
   errorPlacement : function( error, element ) {
      $(error).insertAfter( $("#form") ) ;
     },
    
     invalidHandler: function() {
      // Wipe the previous table / error messages
      // This way nothing will show up if a user tries to submit with an error.
      $(".error").empty();
      $("#result").empty();
    }
    
  });

    $("#result").empty(); //if table is empty, submit resets it

    //gets column and row values from forms
    var columns = ($("#max_multiplicand").numVal() - $("#min_multiplicand").numVal()) + 2;
    var rows = ($("#max_multiplier").numVal() - $("#min_multiplier").numVal()) + 2;

    var appendStr = ""; //assign appendStr as a string which will store the table

    //loop for rows and loop for columns which will be appended to the DOM
    for (var i = 0; i < Math.abs(rows); i++) { //loop for rows

      appendStr = appendStr.concat("<tr>"); //adds table row

      for (var j = 0; j < Math.abs(columns); j++) { //loops through columns

        if (i === 0 && j === 0) {
          //top left corner, put place holder
          appendStr = appendStr.concat("<th> * </th>");
        }

        else if (i === 0) {
          //get value of j for multiplicand on side
          appendStr = appendStr.concat("<th>");
          appendStr = appendStr.concat((j - 1 + $("#min_multiplicand").numVal()).toString());
          appendStr = appendStr.concat("</th>");
        }

        else if (j === 0) {
          //get value for i for multiplier on top
          appendStr = appendStr.concat("<th>");
          appendStr = appendStr.concat((i - 1 + $("#min_multiplier").numVal()).toString());
          appendStr = appendStr.concat("</th>");
        }

        else {
          //populate the table
          appendStr = appendStr.concat("<td>");
          appendStr = appendStr.concat(((i - 1 + $("#min_multiplier").numVal()) * (j - 1 + $("#min_multiplicand").numVal())).toString());
          appendStr = appendStr.concat("</td>");
        }

      }
      appendStr = appendStr.concat("</tr>"); //ends the table row
    }

    $("#result").append(appendStr); //append the DOM
    $(".error").empty();
  });
});

//return an input tag's value as a number(or int)
jQuery.fn.numVal = function () {
  return parseInt($(this).val());
};