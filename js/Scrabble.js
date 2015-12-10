/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * http://stackoverflow.com/questions/11590516/jquery-draggable-droppable-with-table
 * http://stackoverflow.com/questions/4959975/generate-random-value-between-two-numbers-in-javascript
 */

//scrabble tile array
var scrabbleTiles = [];
scrabbleTiles["A"] = {"value": 1, "originalDistribution": 9, "numberRemaining": 9, image: "img/Scrabble_Tile_A.jpg"};
scrabbleTiles["B"] = {"value": 3, "originalDistribution": 2, "numberRemaining": 2, image: "img/Scrabble_Tile_B.jpg"};
scrabbleTiles["C"] = {"value": 3, "originalDistribution": 2, "numberRemaining": 2, image: "img/Scrabble_Tile_C.jpg"};
scrabbleTiles["D"] = {"value": 2, "originalDistribution": 4, "numberRemaining": 4, image: "img/Scrabble_Tile_D.jpg"};
scrabbleTiles["E"] = {"value": 1, "originalDistribution": 12, "numberRemaining": 12, image: "img/Scrabble_Tile_E.jpg"};
scrabbleTiles["F"] = {"value": 4, "originalDistribution": 2, "numberRemaining": 2, image: "img/Scrabble_Tile_F.jpg"};
scrabbleTiles["G"] = {"value": 2, "originalDistribution": 3, "numberRemaining": 3, image: "img/Scrabble_Tile_G.jpg"};
scrabbleTiles["H"] = {"value": 4, "originalDistribution": 2, "numberRemaining": 2, image: "img/Scrabble_Tile_H.jpg"};
scrabbleTiles["I"] = {"value": 1, "originalDistribution": 9, "numberRemaining": 9, image: "img/Scrabble_Tile_I.jpg"};
scrabbleTiles["J"] = {"value": 8, "originalDistribution": 1, "numberRemaining": 1, image: "img/Scrabble_Tile_J.jpg"};
scrabbleTiles["K"] = {"value": 5, "originalDistribution": 1, "numberRemaining": 1, image: "img/Scrabble_Tile_K.jpg"};
scrabbleTiles["L"] = {"value": 1, "originalDistribution": 4, "numberRemaining": 4, image: "img/Scrabble_Tile_L.jpg"};
scrabbleTiles["M"] = {"value": 3, "originalDistribution": 2, "numberRemaining": 2, image: "img/Scrabble_Tile_M.jpg"};
scrabbleTiles["N"] = {"value": 1, "originalDistribution": 6, "numberRemaining": 6, image: "img/Scrabble_Tile_N.jpg"};
scrabbleTiles["O"] = {"value": 1, "originalDistribution": 8, "numberRemaining": 8, image: "img/Scrabble_Tile_O.jpg"};
scrabbleTiles["P"] = {"value": 3, "original-distribution": 2, "number-remaining": 2, image: "img/Scrabble_Tile_P.jpg"};
scrabbleTiles["Q"] = {"value": 10,"original-distribution": 1, "number-remaining": 1, image: "img/Scrabble_Tile_Q.jpg"};
scrabbleTiles["R"] = {"value": 1, "original-distribution": 6, "number-remaining": 6, image: "img/Scrabble_Tile_R.jpg"};
scrabbleTiles["S"] = {"value": 1, "original-distribution": 4, "number-remaining": 4, image: "img/Scrabble_Tile_S.jpg"};
scrabbleTiles["T"] = {"value": 1, "original-distribution": 6, "number-remaining": 6, image: "img/Scrabble_Tile_T.jpg"};
scrabbleTiles["U"] = {"value": 1, "original-distribution": 4, "number-remaining": 4, image: "img/Scrabble_Tile_U.jpg"};
scrabbleTiles["V"] = {"value": 4, "original-distribution": 2, "number-remaining": 2, image: "img/Scrabble_Tile_V.jpg"};
scrabbleTiles["W"] = {"value": 4, "original-distribution": 2, "number-remaining": 2, image: "img/Scrabble_Tile_W.jpg"};
scrabbleTiles["X"] = {"value": 8, "original-distribution": 1, "number-remaining": 1, image: "img/Scrabble_Tile_X.jpg"};
scrabbleTiles["Y"] = {"value": 4, "original-distribution": 2, "number-remaining": 2, image: "img/Scrabble_Tile_Y.jpg"};
scrabbleTiles["Z"] = {"value": 10, "original-distribution": 1, "number-remaining": 1, image: "img/Scrabble_Tile_Z.jpg"};
scrabbleTiles["_"] = {"value": 0, "original-distribution": 2, "number-remaining": 2, image: "img/Scrabble_Tile__.jpg"};

//total score variable
var scrabbleSum = 0;

//random number generator for randomly getting hand
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//deals new hand
function newHand() {
    for (var i = 1; i <= 7; i++){

        var letterAscii = getRandomInt(65, 91); // FIX THIS, should be 90 when all letters are added!!!!
        if (letterAscii === 91)
            var letterChar = "_";
        else {
            letterChar = String.fromCharCode(letterAscii);
            
        }

        while (scrabbleTiles[letterChar].numberRemaining === 0){
            letterAscii = getRandomInt(65, 91); // FIX THIS, should be 90 when all letters are added!!!!
            if (letterAscii === 91)
                var letterChar = "_";
            else
                letterChar = String.fromCharCode(letterAscii);
            console.log("This letter has 0 left!");
        }
       
            document.getElementById("letter-" + i).src = scrabbleTiles[letterChar].image;
    }
    scrabbleSum = 0;
     $('.scrabbleScore').html("Score: " + 0);
}

//function that determines drop behavior
 function drop() {

    //allows class 'hand-tile' to be droppable
    //disables dropping if tile is already on target area
    $(".hand-tile").droppable({
         drop: function (e, ui) {
            $(this).append(ui.draggable);

            ui.draggable.addClass( 'dropped' );

            ui.draggable.data('hand-tile',$(this));
            $(this).droppable('disable');


        }
    })

    //allows board square to be a drop zone
    $(".board-square").droppable({
        hoverClass: 'active',
        drop: function (e, ui) {
            $(this).append(ui.draggable);

            itemId = $(ui.draggable).attr("id");
            var imageURL = (document.getElementById(itemId).src); //Get image URL from item
            var numChars = imageURL.search(".jpg"); //Find where .jpg is, this is end of url
            var letter = imageURL.substring(numChars - 1, numChars); // gets letter based off .jpg ending

            ui.draggable.addClass( 'dropped' ); //shows tile has been dropped

            ui.draggable.data('board-square',$(this)); //makes the area not a drop zone when occupied
            $(this).droppable('disable');

            scrabbleSum += scrabbleTiles[letter].value; //updates sum
            scrabbleTiles[letter].numberRemaining -= 1; //removes tile form total tiles
             
             $('.scrabbleScore').html("Score: " +  scrabbleSum)

        },
    });   
}

$(document).ready(function () {
    
    // The dictionary lookup object
    var dict = {};
     
    // Do a jQuery Ajax request for the text dictionary
    $.get( "dict/dict.txt", function( txt ) {
        // Get an array of all the words
        var words = txt.split( "\n" );
     
        // And add them as properties to the dictionary lookup
        // This will allow for fast lookups later
        for ( var i = 0; i < words.length; i++ ) {
            dict[ words[i] ] = true;
        }
    });
     
    // Modified to only pass in one word, which can then be verified.
    function findWord( word ) {
        // See if it's in the dictionary
        if ( dict[ word ] ) {
            // If it is, return that word
            return word;
        }

        // Otherwise, it isn't in the dictionary.
        return "_____";
    }

    /*posts score to DOM */
    $('.scrabbleScore').html("Score: " + scrabbleSum);
    for (var i = 1; i <= 7; i++){

        var letterAscii = getRandomInt(65, 91); // FIX THIS, should be 90 when all letters are added!!!!
        if (letterAscii === 91)
            var letterChar = "_";
        else {
            letterChar = String.fromCharCode(letterAscii);
            
        }

        while (scrabbleTiles[letterChar].numberRemaining === 0){
            letterAscii = getRandomInt(65, 91); // FIX THIS, should be 90 when all letters are added!!!!
            if (letterAscii === 91)
                var letterChar = "_";
            else
                letterChar = String.fromCharCode(letterAscii);
            console.log("This letter has 0 left!");
        }
       
            document.getElementById("letter-" + i).src = scrabbleTiles[letterChar].image;
    }

        /*makes tiles in hand draggable */
        $("[id^='letter-']").draggable({
            revert: true,
            snap: ".board-square, .hand-tile",
            drag: function(event,ui){
             if($(this).data('board-square')){
                $(this).data('board-square').droppable('enable');
                $(this).data('board-square',null);
                $(this).removeClass( 'dropped' );

                }
              //  scrabbleSum = scrabbleSum - $(this);
            }

        }); 
    //drop functions to set drop behavior
    drop();

    //attempt to try to get tiles to reset 
     $('#new-hand').click(function(){
        $(".hand-tile").animate({
        "left": $("hand-tile").data("left"),
        "top": $("hand-tile").data("top")
         });
        newHand();
    });
});

