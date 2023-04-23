Feature: Player can win a game

    As a player
    I want to be able to win the game
    So that I can gloat to everyone around

    Background: Game Setup
        Given the game is started

    Scenario: Token is moved to winning square
        Given the token is on square "97"
        When the token is moved "3" spaces
        Then the token should be on square "100"
        And the player should have won the game

    Scenario: Token is not moved to a winning square
        Given the token is on square "97"
        When the token is moved "4" spaces
        Then the token should be on square "97"
        And the player should not have won the game