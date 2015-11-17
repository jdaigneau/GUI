/*
 * Created on  :  18 Oct, 2015, 8:34 PM
 Editted by     : Jeremy Daigneau
 email          : jeremy_daigneau@student.uml.edu
 Code based from: https://github.com/Pkthunder/GUI-Help/blob/gh-pages/Assignment6/mult_table.js
 Assignment 6 Javascript for creating multiplication table.
 Editted for Assignment 7
 */

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
      
      createTable(); //creates table
      return false; 
    },
    
    //inva;id form function
    invalidHandler: function () {
      
     $("#swap-warning").empty(); //clears warning
     $("#result").empty(); //clears table
    },
    
   //places the error messages after the input
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.appendTo( element.parent("div"));
    }
  });
}

//return an input tag's value as a number(or int)
jQuery.fn.numVal = function () {
  return parseInt($(this).val());
};