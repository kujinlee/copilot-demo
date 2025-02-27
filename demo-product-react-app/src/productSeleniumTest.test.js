const { Builder, By, until, logging } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

const options = new chrome.Options();
const prefs = new logging.Preferences();
prefs.setLevel(logging.Type.BROWSER, logging.Level.ALL);
options.setLoggingPrefs(prefs);

let driver;

beforeAll(async () => {
  driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
});

afterAll(async () => {
  await driver.quit();
});

jest.setTimeout(30000); // Set timeout to 30 seconds

async function navigateToApp() {
  await driver.get('http://localhost:3000'); // Replace with your application URL
  await driver.sleep(2000); // Add a delay to ensure the page has fully loaded
}

async function waitForElement(locator, timeout = 20000) {
  await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(driver.findElement(locator)), timeout);
}

async function scrollToElement(element) {
  await driver.executeScript("arguments[0].scrollIntoView(true);", element);
  await driver.sleep(500); // Add a delay to ensure the element is in view
}

async function createProduct(name, description, price, quantity) {
  console.log('Creating product...');
  const addProductLink = await driver.findElement(By.linkText('Add Product'));
  await driver.wait(until.elementIsVisible(addProductLink), 10000);
  await driver.wait(until.elementIsEnabled(addProductLink), 10000);
  await addProductLink.click(); // Click on the Link component
  console.log('Clicked Add Product link');
  
  // Wait for the form to be displayed
  try {
    await waitForElement(By.css('form'));
    const formDisplayed = await driver.findElement(By.css('form')).isDisplayed();
    console.log('Form displayed:', formDisplayed);
  } catch (error) {
    console.error('Error waiting for form:', error);
    await captureScreenshot('form_not_found.png');
    throw error;
  }
  
  await waitForElement(By.name('name')); // Wait for the product name input field
  await driver.sleep(1000); // Add a delay for observation
  
  const nameField = await driver.findElement(By.name('name'));
  console.log('Name field found:', nameField);
  await nameField.sendKeys(name);
  await driver.findElement(By.name('description')).sendKeys(description);
  await driver.findElement(By.name('price')).sendKeys(price);
  await driver.findElement(By.name('quantity')).sendKeys(quantity);
  
  await driver.sleep(1000); // Add a delay for observation
  await driver.findElement(By.css('form .btn.btn-primary.mt-3')).click(); // Click the submit button within the form
  console.log('Product form submitted');
}

async function readProduct(name) {
  console.log('Reading product...');
  await waitForElement(By.xpath(`//td/a[text()='${name}']`));
  const productRow = await driver.findElement(By.xpath(`//td/a[text()='${name}']`));
  return productRow;
}

async function updateProduct(oldName, newName, newDescription, newPrice, newQuantity) {
  console.log('Updating product...');
  const productRow = await readProduct(oldName);
  
  const productLink = await productRow.getAttribute('href');
  const productId = productLink.split('/').pop();
  console.log('Product ID:', productId);

  const editButton = await driver.findElement(By.xpath(`//a[contains(@href, '/products/${productId}/edit')]`));
  await scrollToElement(editButton); // Scroll to the element
  await driver.wait(until.elementIsVisible(editButton), 10000);
  await driver.wait(until.elementIsEnabled(editButton), 10000);
  await editButton.click(); // Click the edit button
  console.log('Clicked Edit button');
  
  await waitForElement(By.name('name')); // Wait for the product name input field
  await driver.sleep(1000); // Add a delay for observation
  
  const nameField = await driver.findElement(By.name('name'));
  nameField.clear();
  nameField.sendKeys(newName);
  
  const descriptionField = await driver.findElement(By.name('description'));
  descriptionField.clear();
  descriptionField.sendKeys(newDescription);
  
  const priceField = await driver.findElement(By.name('price'));
  priceField.clear();
  priceField.sendKeys(newPrice);
  
  const quantityField = await driver.findElement(By.name('quantity'));
  quantityField.clear();
  quantityField.sendKeys(newQuantity);
  
  await driver.sleep(1000); // Add a delay for observation
  await driver.findElement(By.css('form .btn.btn-primary.mt-3')).click(); // Click the submit button within the form
  console.log('Product update form submitted');
  
  // Verify the updated product exists
  await waitForElement(By.xpath(`//td/a[text()='${newName}']`), 20000);
  console.log('Updated product found');
}

async function deleteProduct(name) {
  console.log('Deleting product...');
  const productRow = await readProduct(name);
  
  const productLink = await productRow.getAttribute('href');
  const productId = productLink.split('/').pop();
  console.log('Deleting product with ID:', productId);

  const deleteButton = await driver.findElement(By.xpath(`//a[contains(@href, '/products/${productId}/edit')]/following-sibling::button`));
  await scrollToElement(deleteButton); // Scroll to the element
  await driver.wait(until.elementIsVisible(deleteButton), 10000);
  await driver.wait(until.elementIsEnabled(deleteButton), 10000);
  await captureScreenshot('before_delete_click.png'); // Capture screenshot before clicking delete
  await deleteButton.click(); // Click the delete button
  console.log('Clicked Delete button');
  
  try {
    await driver.switchTo().alert().accept(); // Handle confirmation alert
    console.log('Alert accepted');
  } catch (error) {
    console.error('No alert found:', error);
  }
  
  await driver.sleep(1000); // Add a delay for observation
  await captureScreenshot('after_delete_click.png'); // Capture screenshot after clicking delete
  console.log('Product deleted');
}

async function captureScreenshot(filename) {
  const image = await driver.takeScreenshot();
  fs.writeFileSync(filename, image, 'base64');
  console.log(`Screenshot saved as ${filename}`);
}

describe('Product Selenium Tests', () => {
  it('should create, read, update, and delete a product', async () => {
    await navigateToApp();
    
    // Create Product
    await createProduct('Product 1', 'Description 1', '10', '100');
    console.log('Product created successfully');
    await driver.sleep(2000); // Add a delay for observation
    
    // Capture screenshot after creating product
    await captureScreenshot('after_create_product.png');
    
    // Read Product
    const product = await readProduct('Product 1');
    expect(product).toBeTruthy();
    console.log('Product read successfully');
    await driver.sleep(2000); // Add a delay for observation
    
    // Update Product
    await updateProduct('Product 1', 'Updated Product 1', 'Updated Description 1', '15', '150');
    console.log('Product updated successfully');
    await driver.sleep(2000); // Add a delay for observation
    
    // Delete Product
    await deleteProduct('Updated Product 1');
    console.log('Product deleted successfully');
    await driver.sleep(2000); // Add a delay for observation
    
    // Capture and print browser console logs
    const logs = await driver.manage().logs().get(logging.Type.BROWSER);
    logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
  });
});