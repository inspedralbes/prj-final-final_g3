import scrapy
import re


class ConciertosSpider(scrapy.Spider):
    name = "conciertos"
    start_urls = [
        "https://www.elcorteingles.es/entradas/lo-mas-vendido/barcelona/?filters%5Bgenre%5D=conciertos"
    ]

    def start_requests(self):
        self.logger.info("Iniciando el Spider...")
        for url in self.start_urls:
            yield scrapy.Request(url, callback=self.parse, errback=self.error_handler)

    def parse(self, response):
        self.logger.info("Página accedida correctamente: %s", response.url)
        # for evento_link in response.css(".product-card a::attr(href)").getall():
        #     yield scrapy.Request(
        #         response.urljoin(evento_link), callback=self.parse_evento
        #     )

    # def parse_evento(self, response):
    #     titulo_raw = response.css(".product-header__main-title::text").get()
    #     patron_localizacion = r"\ben [A-Za-z]+(?: [A-Za-z]+)?\b"
    #     titulo_sin_concierto = titulo_raw.replace("Concierto ", "")
    #     titulo = re.sub(patron_localizacion, "", titulo_sin_concierto)

    #     fecha = response.css(".h5.product-header_text::text").get()
    #     recinto = response.css(
    #         ".product-header__bottom__item-link.link--underline.margintop0::text"
    #     ).get()
    #     lugar = response.css(".lugar::text").get()

    #     yield {
    #         "titulo": titulo,
    #         "fecha": fecha,
    #         "recinto": recinto,
    #         "lugar": lugar,
    #     }

    def error_handler(self, failure):
        self.logger.error("Error al acceder a la página: %s", failure.request.url)
