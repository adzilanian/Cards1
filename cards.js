"use strict";
//diamonds-бубны,clubs -крести,hearts - черви,spades - пики,suit-масть
let deck = [{rank: "6", suit: "diamonds"}, {rank: "6", suit: "hearts"}, {rank: "6", suit: "spades"}, {
    rank: "6",
    suit: "clubs"
},
    {rank: "7", suit: "diamonds"}, {rank: "7", suit: "hearts"}, {rank: "7", suit: "spades"}, {rank: "7", suit: "clubs"},
    {rank: "8", suit: "diamonds"}, {rank: "8", suit: "hearts"}, {rank: "8", suit: "spades"}, {rank: "8", suit: "clubs"},
    {rank: "9", suit: "diamonds"}, {rank: "9", suit: "hearts"}, {rank: "9", suit: "spades"}, {rank: "9", suit: "clubs"},
    {rank: "10", suit: "diamonds"}, {rank: "10", suit: "hearts"}, {rank: "10", suit: "spades"}, {
        rank: "10",
        suit: "clubs"
    },
    {rank: "J", suit: "diamonds"}, {rank: "J", suit: "hearts"}, {rank: "J", suit: "spades"}, {rank: "J", suit: "clubs"},
    {rank: "Q", suit: "diamonds"}, {rank: "Q", suit: "hearts"}, {rank: "Q", suit: "spades"}, {rank: "Q", suit: "clubs"},
    {rank: "K", suit: "diamonds"}, {rank: "K", suit: "hearts"}, {rank: "K", suit: "spades"}, {rank: "K", suit: "clubs"},
    {rank: "A", suit: "diamonds"}, {rank: "A", suit: "hearts"}, {rank: "A", suit: "spades"}, {rank: "A", suit: "clubs"}
];

let player1 = [];
let player2 = [];
let cardsInGame = [];
let player = 0;
let mainSuit = "";
let priority = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];

//todo: - Обработать оперделённую карту. -Посмотреть, что такое "use strict";

function compareCards(card1, card2, mainSuit) {

    let index1Main = false;
    let index2Main = false;
    let index1 = -1;
    let index2 = -1;

    //Проверка явлются ли карты козырными
    if (card1.suit === mainSuit) {
        index1Main = true;
    }
    if (card2.suit === mainSuit) {
        index2Main = true;
    }

    for (let i = 0; i < priority.length; i++) {

        if (card1.rank === priority[i]) {
            index1 = i;
        }

        if (card2.rank === priority[i]) {
            index2 = i;
        }
    }

    if ((index1Main && index2Main) || (index1Main === false && index2Main === false)) {//todo: как сделать через "!"(!index1Main...)
        if (index1 > index2) {
            return 1;
        } else if (index1 < index2) {
            return -1;
        } else {
            return 0;
        }
    } else {
        /*  if (index1Main) {
              return  1
          } else {
              return -1;
          }*/
        return (index1Main) ? (1) : (-1);
    }


}


$(function () {
    $("#btnMess").click(function () {
        mess();
    });


    $("#btnGetCard").click(function () {
        if (deck.length !== 0) {
            let card = deck.pop();
            console.log(card.rank + " " + card.suit);
            for (let i = 0; i < deck.length; i++) {
                if (deck[i].rank === "6" && deck[i].suit === "spades") {
                    console.log(deck[i].rank + " " + deck[i].suit + " находиться на " + i + " позиции");
                    break;
                }
            }
        } else {
            console.log("ОШИБББКААААА!");
        }
    });

//Раздача карт игрокам
    $("#btnStart").click(function () {
        for (let i = 0; i < 6; i++) {
            player1.push(deck.pop());
            $(".cardsOfPlayer1").append("<img id=" + i + "card1 src=\"img/" + player1[i].rank + "_" + player1[i].suit + ".svg\">");
            player2.push(deck.pop());
            $(".cardsOfPlayer2").append("<img id=" + i + "card2 src=\"img/" + player2[i].rank + "_" + player2[i].suit + ".svg\">");
        }
        mainSuit = deck[deck.length - 1].suit;

    });



    //Обработка хода первого игрока
    $("#btnOk").click(function () {
        let rankTmp = document.getElementById("rankTmp").value;
        // Второй способ достать значение инпута и сохранить в переменную через JQuery:  let rankTmp2= $("#rankTmp").val();
        let suitTmp = document.getElementById("suitTmp").value;
        console.log(rankTmp + "" + suitTmp);

        //Ищем индекс выбранной карты
        let cardInGame1 = [];
        for (let i = 0; i < player1.length; i++) {
            if (player1[i].rank === rankTmp && player1[i].suit === suitTmp) {
                cardInGame1 = player1.splice(i, 1);
                cardsInGame.push(cardInGame1[0]);
            }
        }

//Обработка хода второго игрока
        let rankTmp1 = document.getElementById("rankTmp1").value;
        // Второй способ достать значение инпута и сохранить в переменную через JQuery:  let rankTmp2= $("#rankTmp").val();
        let suitTmp1 = document.getElementById("suitTmp1").value;
        console.log(rankTmp1 + "" + suitTmp1);

        //Ищем индекс выбранной карты
        let cardInGame2 = [];
        for (let i = 0; i < player2.length; i++) {
            if (player2[i].rank === rankTmp1 && player2[i].suit === suitTmp1) {
                cardInGame2 = player2.splice(i, 1);
                cardsInGame.push(cardInGame2[0]);
            }
        }


        let result = compareCards(cardInGame2[0], cardInGame1[0], mainSuit);
        console.log(result);
        if (result === 1) {
            console.log("correct");
        } else {
            console.log("no correct");
        }

    });


});

//Перемешивает колоду кард перед раздачей!
function mess() {
    let count = 0;
    while (count !== deck.length) {
        let rndIndex = Math.floor(Math.random() * (deck.length - 1));
        let tmp = deck[rndIndex];
        deck[rndIndex] = deck[deck.length - 1];
        deck[deck.length - 1] = tmp;
        count++;
    }
}


/*let student = {};
student.name="Andrej";
student.age = 20;*/