import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Opciones del navegador Firefox
firefox_options = webdriver.FirefoxOptions()
firefox_options.headless = True  # Modo headless activado

# Inicializar el navegador con las opciones configuradas
driver = webdriver.Firefox(options=firefox_options)

# Abrir la página web
driver.get(
    "https://www.viagogo.com/Concert-Tickets?from=1707297433284&to=253402300799999&lat=NDEuMzg3Mzk3NA%3D%3D&lon=Mi4xNjg1Njg%3D"
)

# Verificar si el modal de aceptar cookies está presente
try:
    modal = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "sc-jcvYYV.eIxKeM"))
    )
    print("Modal de aceptar cookies encontrado.")

    # Encontrar el botón "Permitir todas" dentro del modal y hacer clic en él
    boton_permitir_todas = modal.find_element(
        By.CSS_SELECTOR, "button.sc-fujyAs.fXyoiD.sc-cAUwBd.gncSNf"
    )
    boton_permitir_todas.click()
    print("Botón 'Permitir todas' clicado.")
except:
    print("Modal de aceptar cookies no encontrado o ya aceptado.")

# Verificar si la página se ha cargado correctamente
try:
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, ".sc-kLSgde.jBovPd"))
    )
    print("Página cargada correctamente.")
except:
    print("Error: La página no se cargó correctamente.")

# Intentar hacer clic en el botón hasta que ya no esté presente en la página
while True:
    try:
        boton = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, "div.sc-fZCMTr.fykqig button.sc-fujyAs.hxqYBp")
            )
        )
        print("El botón está presente en la página. Presionando...")
        boton.click()
    except:
        print("El botón ya no está presente en la página.")
        break

# Extraer la información de los elementos
concerts = driver.find_elements(
    By.CSS_SELECTOR, "div.sc-gzxLuW.drXbRz.sc-hgYZJX.ePKekz"
)

# Lista para almacenar los conciertos como diccionarios
concerts_data = []

for concert in concerts:
    # Obtener la información del concierto
    concert_info = concert.text.split("\n")
    concert_data = {
        "artist": concert_info[0],
        "date": concert_info[1],
        "venue": concert_info[2],
    }
    concerts_data.append(concert_data)

# Guardar los datos en un archivo JSON sin escapar caracteres especiales
with open("concerts.json", "w", encoding="utf-8") as json_file:
    json.dump(concerts_data, json_file, ensure_ascii=False, indent=4)

# Cerrar el navegador
driver.quit()
