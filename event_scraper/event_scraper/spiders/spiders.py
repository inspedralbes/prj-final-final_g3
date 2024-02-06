import scrapy
import re


class ConciertosSpider(scrapy.Spider):
    name = "elcorteingles_concerts"
    start_urls = [
        "https://www.elcorteingles.es/entradas/lo-mas-vendido/barcelona/?filters%5Bgenre%5D=conciertos"
    ]

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url,
                callback=self.parse,
                errback=self.error_handler,
            )

    def parse(self, response):
        self.logger.info("Page accessed successfully: %s", response.url)
        for enlace in response.css(
            'div[data-module="product-list"] a.product-card::attr(href)'
        ).getall():
            yield scrapy.Request(
                response.urljoin(enlace),
                callback=self.parse_evento,
                errback=self.error_handler,
            )

        # Verificar si hay un enlace a la siguiente página y seguirlo
        next_page = response.css(
            "a.icon-sm-arrow-right-2.paginator__link.icon.c-primary-text::attr(href)"
        ).get()
        if next_page and next_page != "#":
            yield scrapy.Request(
                response.urljoin(next_page),
                callback=self.parse,
                errback=self.error_handler,
            )

    def parse_evento(self, response):
        title = response.css("h1::text").get()
        clean_title = re.sub(r"\bConcierto\b\s*(?=.*\ben\b)", "", title).strip()
        clean_title = re.sub(r"\ben.*", "", clean_title).strip()

        dates = response.css(".h5.product-header_text::text").getall()
        unique_dates = list(set(dates))
        enclosure = response.css('a[href="#recinto"]::text').get()
        artist = response.css('a[data-gtm-event-action="click artist"]::text').get()
        genre = response.css('span[itemprop="title"]::text').getall()
        yield {
            "concierto": clean_title,
            "artist": artist,
            "genre": genre[2],
            "dates": unique_dates[0],
            "hour": unique_dates[1],
            "enclosure": enclosure,
        }

    def error_handler(self, failure):
        self.logger.error("Error accessing page: %s", failure.request.url)
