import asyncio
import aiohttp
from bs4 import BeautifulSoup

async def fetch_song_data(session, song_link):
    async with session.get(song_link) as response:
        content = await response.text()
        soup = BeautifulSoup(content, "html.parser")
        song_name = soup.find("div", class_="singer-name").b.text
        artists_name = soup.find("div", class_="col-lg-9 col-md-9 col-sm-6 col-xs-8").text.replace("\n","")
        song_icon = soup.find("div", class_="col-lg-3 col-md-3 col-sm-12 col-xs-12").img["src"]
        download_link = soup.find("a", class_="btn-download")["href"]
        return {"song_name": song_name,"artists_name":artists_name, "song_icon":song_icon, "download_link": download_link}

async def search(query):
    url = f"https://pagalfree.com/search/{query}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            content = await response.text()
            soup = BeautifulSoup(content, "html.parser")
            links = soup.find_all("a", href=True)
            tasks = []
            existing_links = set()
            for link in links:
                if "/music/" in link["href"]:
                    song_link = link["href"]
                    if song_link not in existing_links:
                        existing_links.add(song_link)
                        task = asyncio.ensure_future(fetch_song_data(session, song_link))
                        tasks.append(task)
            return await asyncio.gather(*tasks)

async def main():
    result = await search("tum")
    # print(result)

if __name__ == "__main__":
    asyncio.run(main())
