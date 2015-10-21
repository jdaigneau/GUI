  /*
   * Created on  :  18 Oct, 2015, 8:34 PM
     Editted by     : Jeremy Daigneau
     email          : jeremy_daigneau@student.uml.edu
     Code based from: https://github.com/Pkthunder/GUI-Help/blob/gh-pages/Assignment6/mult_table.js
     Assignment 6 Javascript for creating multiplication table.
  
   */
  
$(document).ready( function() {
  $("#form").submit( function() {
    
  	$("#result").empty(); //if table is empty, submit resets it
  	$("#error").css("visibility", "hidden"); //hides error if it was showing

  	//gets column and row values from forms
    var columns = ($("#max_multiplicand").numVal() - $("#min_multiplicand").numVal()) + 2;
    var rows = ($("#max_multiplier").numVal() - $("#min_multiplier").numVal()) + 2;

    //check for illegal values
    if ( $("#max_multiplicand").numVal() < $("#min_multiplicand").numVal() || $("#max_multiplicand").numVal() < $("#min_multiplicand").numVal() ) {
    	$("#error").css("visibility", "visible");
    	return;
    }
    
    var appendStr = ""; //assign appendStr as a string which will store the table

    //loop for rows and loop for columns which will be appended to the DOM
    for( var i = 0; i < Math.abs(rows); i++){ //loop for rows
    	
    	appendStr = appendStr.concat("<tr>"); //adds table row
	     
		for( var j = 0; j < Math.abs(columns); j++){ //loops through columns

			if ( i === 0 && j === 0 ) {
				//top left corner, put place holder
				appendStr = appendStr.concat("<th> * </th>");
			}

			else if ( i === 0 ) {
              //get value of j for multiplicand on side
				appendStr = appendStr.concat("<th>");
				appendStr = appendStr.concat( ( j-1 + $("#min_multiplicand").numVal() ).toString() );
				appendStr = appendStr.concat("</th>");
			}

			else if ( j === 0 ) {
              //get value for i for multiplier on top
				appendStr = appendStr.concat("<th>");
				appendStr = appendStr.concat( (i-1 + $("#min_multiplier").numVal() ).toString() );
				appendStr = appendStr.concat("</th>");
			}

			else {
                //populate the table
				appendStr = appendStr.concat("<td>");
				appendStr = appendStr.concat( ((i-1 + $("#min_multiplier").numVal() ) * (j-1 + $("#min_multiplicand").numVal() )).toString() );
				appendStr = appendStr.concat("</td>");
			}

		}
     	appendStr = appendStr.concat("</tr>"); //ends the table row
    }

    $("#result").append(appendStr); //append the DOM

  });
  
});

//return an input tag's value as a number(or int)
jQuery.fn.numVal = function() {
	return parseInt($(this).val());
};