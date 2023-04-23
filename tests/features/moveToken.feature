Feature: Player can move token

    As a player
    I want to be able to move my token
    So that I can get closer to the goal

    Background: Game Setup
        Given the game is started

    Scenario: Token is placed on game start
        When the token is placed on the board
        Then the token should be on square "1"

    Scenario: Token is moved once
        When the token is moved "3" spaces
        Then the token should be on square "4"

    Scenario: Token is moved twice
        When the token is moved "3" spaces
        And the token is moved "4" spaces
        Then the token should be on square "8"