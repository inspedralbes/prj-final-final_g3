import scrapy


class ConciertosSpider(scrapy.Spider):
    name = "conciertos"
    start_urls = ["https://www.ticketmaster.es/musica/todos-musica/10001/events"]

    def start_requests(self):
        self.logger.info("Iniciando el Spider...")
        for url in self.start_urls:
            yield scrapy.Request(url, callback=self.parse, errback=self.error_handler)

    def parse(self, response):
        self.logger.info("Página accedida correctamente: %s", response.url)
        titulo = response.css("h1::text").get()
        yield {"titulo_pagina": titulo}

    def error_handler(self, failure):
        self.logger.error("Error al acceder a la página: %s", failure.request.url)
