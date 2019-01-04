# Selenium

### Integration testing

Selenium tests are used to test all of the individual units together inside of the web browser.
Because of this, the selenium tests are sensitive to changes in the User Inferface, however, they are able to
test functionality within a web browser such as cookie storage, form interactions, and more.

Note: Some tests require the user to be able to login to the application. In order to set the username and password
for the application, set your environment variables.

Execute `set telport_username=username` and `set telport_password=password`<br/>
This is automatically done for Travis-CI.

[Webdriver Documentation](https://w3c.github.io/webdriver/)<br/>
[Selenium Documentation](https://www.seleniumhq.org/docs/) 