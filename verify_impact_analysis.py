
import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("http://localhost:3000")

        # Set language to English
        await page.get_by_role("button", name="Sistem Mühendisliği Lideri").click()
        await page.get_by_role("link", name="Settings").click()
        await page.get_by_label("Language").select_option("en")
        await page.get_by_role("button", name="Save").click()

        # Wait for the page to reload and the English text to be visible
        await expect(page.get_by_role("button", name="Analysis")).to_be_visible()

        # Navigate to Impact Analysis
        await page.get_by_role("button", name="Analysis").hover()
        await page.get_by_text("Impact Analysis").click()

        # Take screenshot
        await page.screenshot(path="/home/jules/verification/impact_analysis.png")

        await browser.close()

asyncio.run(main())
