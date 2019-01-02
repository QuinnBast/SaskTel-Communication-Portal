let driver = null;
let chai = require('chai');
let expect = chai.expect;


// Create a new test suite
describe("Login Tests", function(){

    before(function(done){
        // Require selenium webdriver.
        let webdriver = require('selenium-webdriver');

        // Require the chrome driver from selenium.
        let chrome = require('selenium-webdriver/chrome');

        // Add the chromedriver to the path.
        let path = require('chromedriver').path;

        // Get the chrome service.
        let service = new chrome.ServiceBuilder(path).build();
        chrome.setDefaultService(service);

        // Create a chrome browser.
        driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

        //Ensure the done function is passed in and called at the end of each test.
        // This ensures that async functions are waited for completion when executing the tests.
        done();
    });

    // Function runs once before executing all of the tests.
    beforeEach(function(done){
        this.timeout(10000);
        // Access our website through the chrome browser.
        driver.get("http://127.0.0.1:5000/index.html")
            .then(function(){
                // Wait until the function returns true. This will wait until the login form is displayed.
                driver.wait(function(){
                    return driver.findElement({id: "LoginForm"}).isDisplayed();
                }).then(done());
            });
    });



    it("Invalid username alert", function(done){
        this.timeout(10000);

        // Input text into the password element
        driver.findElement({id: "password"})
            .sendKeys("asdf")
            .then(function(){
                // Get the text from the password field.
                driver.findElement({id: "password"})
                    .getAttribute('value')
                    .then(function(inputText){
                        expect(inputText).to.be.equal("asdf");
                    });
            });

        // Click the login button and ensure and error is returned
        driver.findElement({id: "LoginButton"})
            .click()
            .then(function(){
                // Check if an alert appeared
                driver.findElement({id: "usernameAlert"})
                    .isDisplayed()
                    .then(function(displayed){
                        expect(displayed).to.be.true;
                        done();
                    });
            });
    });

    it("No password alert", function(done){
        this.timeout(10000);

        // Get the password element.
        driver.findElement({id: "username"})
            .sendKeys("3067190074")
            .then(function(){
                driver.findElement({id: "username"})
                    .getAttribute('value')
                    .then(function(inputText){
                        expect(inputText).to.be.equal("(306)-719-0074");
                    });
            });

        // Click the login button.
        driver.findElement({id: "LoginButton"})
            .click()
            .then(function(){
                driver.findElement({id: "passwordAlert"})
                    .isDisplayed()
                    .then(function(displayed) {
                        expect(displayed).to.be.true;
                        done();
                    });
            });
    });


    after(function(){
        // Exit the driver
        driver.quit();
    })





});