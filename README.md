# snakes-and-ladders

Snakes and Ladders demonstration in Typescript.

Based off of: https://agilekatas.co.uk/katas/SnakesAndLadders-Kata

## SCRIPTS

`npm install` - **run this first before any other scripts**

`npm run test` - runs all test suites

`npm run test:watch` - runs all test suites with reload

## TESTING

For testing I used Jest and Cucumber. To make this work with Typescript I used a few other libraries that allow Jest to run the tests without building / enable it to work properly with Cucumber.

Whilst Cucumber wasn't specifically mentioned in the spec, the format of the UAC and my prior experience of cucumber prompted me to set it up that way.

A few of the scenarios have been reworded / adjusted to fit best practices / conventions I'm familiar with. Personally I struggled a bit with the way the UAC were written, but I'll chalk that up to the fact my previous employer was pretty strict about how the UAC were communicated (for ease of development).

_**TODO:** The test around rolling the random die is close to useless, since the test gets a random number each time. This basically means that any potential issues could be only revealed occasionally (flaky test). Granted, the code it's running is insignificant but potentially some mocking of Math.random could be used to truely test the function._

I based my reusable step definition code off of this md, although I feel with more time there could be a more convenient way of doing this:
https://github.com/bencompton/jest-cucumber/blob/master/docs/ReusingStepDefinitions.md

## DESIGN DECISIONS

For the most part, I went for a more OOP style approach. I considered using a functional approach, whereby I would sort of run the game as a pipeline of interactions (functions) on a board data type, but thought that the OOP approach was more flexible and fit the UAC a bit easier. This is entirely up for debate of course - I imagine there are a number of ways my approach can adjusted to fit a mix of both.

Whilst designing this, I tried to focus on the first set of UAC without trying to overengineer it for the others. As a result, it's not got fully fleshed systems for things like the snakes / ladders, or multiplayer. However, I think my approach is generic enough to give allowance for those to be added in later.
