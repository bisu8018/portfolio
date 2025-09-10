#!/usr/bin/env node
// Simple axe-core scan using Playwright
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'

async function run() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  try {
    await page.goto('http://localhost:5173') // dev server must be running
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    console.log(JSON.stringify(accessibilityScanResults, null, 2))
  } finally {
    await browser.close()
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
