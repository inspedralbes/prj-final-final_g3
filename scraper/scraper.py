import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Firefox browser options
firefox_options = webdriver.FirefoxOptions()
firefox_options.add_argument("-headless")  # Enable headless mode

# Initialize the browser with configured options
driver = webdriver.Firefox(options=firefox_options)

# Open the webpage
driver.get(
    "https://www.viagogo.com/Concert-Tickets?from=1707297433284&to=253402300799999&lat=NDEuMzg3Mzk3NA%3D%3D&lon=Mi4xNjg1Njg%3D"
)

# Check if the cookie consent modal is present
try:
    modal = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "sc-jcvYYV.eIxKeM"))
    )
    print("Cookie consent modal found.")

    # Find the "Allow All" button inside the modal and click it
    allow_all_button = modal.find_element(
        By.CSS_SELECTOR, "button.sc-fujyAs.fXyoiD.sc-cAUwBd.gncSNf"
    )
    allow_all_button.click()
    print("Clicked 'Allow All' button.")
except:
    print("Cookie consent modal not found or already accepted.")

# Check if the page has loaded correctly
try:
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, ".sc-kLSgde.jBovPd"))
    )
    print("Page loaded successfully.")
except:
    print("Error: The page did not load correctly.")

print("Collecting concert information...")

# Try to click the button until it is no longer present on the page
while True:
    try:
        button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, "div.sc-fZCMTr.fykqig button.sc-fujyAs.hxqYBp")
            )
        )
        print("The button is present on the page. Clicking...")
        button.click()
    except:
        print("The button is no longer present on the page.")
        break

# Extract information from the elements
concerts = driver.find_elements(
    By.CSS_SELECTOR, "div.sc-gzxLuW.drXbRz.sc-hgYZJX.ePKekz"
)

# List to store concerts as dictionaries
concerts_data = []

for concert in concerts:
    # Get concert information
    concert_info = concert.text.split("\n")
    concert_data = {
        "artist": concert_info[0],
        "date": concert_info[1],
        "venue": concert_info[2],
    }
    concerts_data.append(concert_data)

print("Finished collecting concert information.")

# Save the data to a JSON file without escaping special characters
with open("concerts.json", "w", encoding="utf-8") as json_file:
    json.dump(concerts_data, json_file, ensure_ascii=False, indent=4)

# Close the browser
driver.quit()
