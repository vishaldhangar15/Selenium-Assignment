const { Builder, By, Key, until } = require('selenium-webdriver');

async function searchOnFlipkart() {
  // Initialize Chrome WebDriver
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Open Flipkart website
    await driver.get('https://www.flipkart.com/');
    // maximize window
    await driver.manage().window().maximize();

    // Wait for search bar to be visible
    let searchInput = await driver.wait(
      until.elementLocated(By.name('q')),
      10000
    );

    // Search for "Samsung Galaxy S10"
    await searchInput.sendKeys('Samsung Galaxy S10', Key.RETURN);

    // Click on "Mobiles" under Categories
    await driver
      .wait(until.elementLocated(By.linkText('Mobiles')), 10000)
      .click();

    // click on flipkar assured
    let input = await driver.wait(
      until.elementLocated(By.xpath('//label[@class="tJjCVx cnLG4I"]')),
      10000
    );
    // clicking on input label
    await input.click();

    // locate the element using xpath and having text "Price -- High to Low "
    let element = await driver.wait(
      until.elementLocated(
        By.xpath(' //div[@class="sHCOk2"]/div[text()="Price -- High to Low"] ')
      ),
      10000
    );

    await element.click();

    // refresh the page
    await driver.navigate().refresh();
    // creating list of web elements using xpath
    let list = await driver.wait(
      until.elementsLocated(By.xpath("//div[@class='KzDlHZ'] ")),
      10000
    );

    // creating list of product prices using xpath
    let price = await driver.wait(
      until.elementsLocated(By.xpath("//div[@class='Nx9bqj _4b5DiR'] ")),
      1000
    );

    let links = await driver.wait(
      until.elementsLocated(By.xpath(" //a[@class='CGtC98'] ")),
      1000
    );

    // printing list of product prices, names and links

    // creating an array of object Product Name , Display Price ,
    //  Link to Product Details Page

    let arr = [];
    // adding objects to arr
    for (let i = 0; i < list.length; i++) {
      arr.push({
        Product_Name: await list[i].getText(),
        Display_Price: await price[i].getText(),
        Link_to_Product_Details_Page: await links[i].getAttribute('href'),
      });
    }

    // printing arr
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }

    // print arr
  } catch (error) {
    // ignoring StaleElementReferenceError:
    if (error.name === 'StaleElementReferenceError') {
      console.log('Element reference not found. Skipping. ');
    } else console.log('An error occurred: ', error);
  } finally {
    // Close the browser
    await driver.quit();
  }
}

searchOnFlipkart();
