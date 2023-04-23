Feature: Player can roll the dice

    As a player
    I want to move my token based on the roll of a die
    So that there is an element of chance in the game

    Background: Game Setup
        Given the game is started

    Scenario: Dice is rolled
        When the player rolls a "die"
        Then the dice roll should be between "1" and "6" inclusive

    Scenario: Dice roll decides the movement of the token
        Given the player rolls a "4"
        When the player moves their token
        Then the token should move "4" spaces