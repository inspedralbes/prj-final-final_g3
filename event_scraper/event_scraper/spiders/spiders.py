import scrapy

class MiSpider(scrapy.Spider):
    name = 'mi_spider'
    start_urls = ['https://www.ticketmaster.es/musica/todos-musica/10001/events?cities=158715']  # Cambia esta URL por la que desees hacer scraping

    def parse(self, response):
        # Extraer los elementos <h1>
        for h1_tag in response.css('h1'):
            yield {
                'h1_text': h1_tag.get()  # Obtener el texto dentro de <h1>
            }
