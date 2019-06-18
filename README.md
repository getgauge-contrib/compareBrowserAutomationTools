This project is for comparing Writing and maintaining costs associate with tools. 

Ideally, with functionality intact, the test code shouldn’t change. i.e when the user workflow hasn‘t changed, the test code shouldn’t have to change. 
Therefore, tools with lesser dependency on DOM is better for writing and maintaining tests!

Here the same react application is automated using 5 browser automation tools. All the tests are currently passing!
Let's see what happens to the tests if the application is re-written in angularJS instead of react. 
To do this find and replace all occurances of `http://todomvc.com/examples/react/#/`with `http://todomvc.com/examples/angularjs/#/` and execute the tests!

**To execute tests**
* Select the tool to run the test against
* `cd` into the corresponding directory
* `npm install`
* `npm test`
> Currently tests of all tools pass
* find and replace all occurances of `http://todomvc.com/examples/react/#/`with `http://todomvc.com/examples/angularjs/#/` and execute the tests!
* Save all
* Run the tests again `npm test`
> All tools except for Taiko fail when the DOM changed!
