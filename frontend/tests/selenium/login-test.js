let driver = null;
let chai = require('chai');
let expect = chai.expect;
let until = require('selenium-webdriver').until;


// Create a new test suite
describe("Login Tests", function(){

    before(function(done){
        this.timeout(5000);

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
            .then(() => {
                // Wait until the function returns true. This will wait until the login form is displayed.
                return driver.wait(function(){
                    return driver.findElement({id: "LoginForm"}).isDisplayed();
                });
            }).then(done());
    });

    it("login input should update after text is input", function(done){
        this.timeout(10000);
        // Input text into the password element
        driver.findElement({id: "username"}).sendKeys("3067190074")
            .then(function(){
                // Get the text from the password field.
                return driver.findElement({id: "username"}).getAttribute('value');
            }).then(inputText => {
                expect(inputText).to.be.equal("(306)-719-0074");
                done();
        });
    });

    it("login input should not accept characters", function(done){
        this.timeout(10000);
        // Input text into the password element
        driver.findElement({id: "username"}).sendKeys("asdfg1234")
            .then(function(){
                // Get the text from the password field.
                return driver.findElement({id: "username"}).getAttribute('value');
            }).then(inputText => {
                expect(inputText).to.be.equal("(123)-4__-____");
                done()
        });
    });

    it("password input should update after text is input", function(done){
        this.timeout(10000);
        // Input text into the password element
        driver.findElement({id: "password"}).sendKeys("asdfg12345!@#$%~`\'\"+_)([]{}:/?\\<>")
            .then(function(){
                // Get the text from the password field.
                return driver.findElement({id: "password"}).getAttribute('value');
            }).then(inputText => {
                expect(inputText).to.be.equal("asdfg12345!@#$%~`\'\"+_)([]{}:/?\\<>");
                done()
        });
    });


    it("should show alert if no username entered on login", function(done){
        this.timeout(5000);

        // Input text into the password element
        driver.findElement({id: "password"}).sendKeys("asdf")
            .then(function(){
                // Get the text from the password field.
                return driver.findElement({id: "password"}).getAttribute('value')
            }).then(inputText => {
                expect(inputText).to.be.equal("asdf");
                 // Click the login button and ensure and error is returned
                return driver.findElement({id: "LoginButton"}).click()
        }).then(() => {
            return driver.wait(() => {
                return driver.findElement({id: "usernameAlert"});
            });
        }).then(() => {
            return driver.findElement({id: "usernameAlert"}).isDisplayed()
        }).then(isDisplayed => {
            expect(isDisplayed).to.be.true;
            done();
        });
    });

    it("should show alert if no password entered on login", function(done){
        this.timeout(5000);

        // Get the password element.
        driver.findElement({id: "username"}).sendKeys("3067190074")
            .then(function(){
                return driver.findElement({id: "username"}).getAttribute('value')
            }).then(inputText => {
                expect(inputText).to.be.equal("(306)-719-0074");

                return driver.findElement({id: "LoginButton"}).click()
        }).then(() => {
            return  driver.findElement({id: "passwordAlert"}).isDisplayed()
        }).then(isDisplayed => {
            expect(isDisplayed).to.be.true;
            done();
        });
    });

    it("should not allow login if incorrect credentials", function(done){
        this.timeout(10000);

        // Send input to the username input
        driver.findElement({id: "username"}).sendKeys("3069999999")
            .then(() => {
                // Get the username value
                return driver.findElement({id: "username"}).getAttribute('value');
            }).then(inputText => {
            //Ensure username value is as expected
            expect(inputText).to.be.equal("(306)-999-9999");
            // Send password to the password input
            return driver.findElement({id: "password"}).sendKeys("asdf")
        }).then(() => {
            // Get the password value
            return driver.findElement({id: "password"}).getAttribute('value')
        }).then(inputText => {
            // Ensure the password value is as expected
            expect(inputText).to.be.equal("asdf");
            // Click the login button
            return driver.findElement({id: "LoginButton"}).click()
        }).then(()=>{
            // Expect an alert to display
            return driver.wait(until.elementLocated({id: "alert"}), 5000)
        }).then(() => {
            done()
        });
    });

    it("login button should be clickable after invalid login", function(done){
        this.timeout(10000);

        // Send input to the password input
        driver.findElement({id: "username"}).sendKeys("3069999999")
            .then(() => {
                // Get the value of the input box
                return driver.findElement({id: "username"}).getAttribute('value');
            }).then((inputText) => {
            // Check that the value is the expected value
            expect(inputText).to.be.equal("(306)-999-9999");
            // Send input to the password input
            return driver.findElement({id: "password"}).sendKeys("asdf");
        }).then(() => {
            // Get the text from the password field.
            return driver.findElement({id: "password"}).getAttribute('value')
        }).then((inputText) => {
            // Check the input is the expected value
            expect(inputText).to.be.equal("asdf");
            // Click the login button
            return driver.findElement({id: "LoginButton"}).click();
        }).then(() => {
            // Wait for the alert to appear.
            return driver.wait(until.elementLocated({id: "alert"}), 5000)
        }).then(() => {
            // Get the login button's className
            return driver.findElement({id: "LoginButton"}).getAttribute("class")
        }).then(attributeValue => {
            // Ensure the login button's class is not a loading button
            expect(attributeValue).to.not.contain("loading");
            done();
        });
    });

    it("successful login shows dashboard", function(done){
        this.timeout(20000);

        // Send input to the password input
        driver.findElement({id: "username"}).sendKeys(process.env.telport_username)
            .then(() => {
                return driver.findElement({id: "password"}).sendKeys(process.env.telport_password);
        }).then(() => {
            return driver.findElement({id: "LoginButton"}).click();
        }).then(() => {
            // Wait for the dashboard to appear.
            return driver.wait(until.elementLocated({xpath: '//a[@href="/login"]'}), 10000)
        }).then(() => {
            done();
        });
    });

    after(function(){
        // Exit the driver
        driver.quit();
    });

});