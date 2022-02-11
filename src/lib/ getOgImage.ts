const playwright = require(`playwright-aws-lambda`);
const { createHash } = require(`crypto`);
const fs = require(`fs`);

async function getOgImage(path: string, baseUrl = `http://localhost:3000`) {
  // if (process.env.NODE_ENV === `development`) {
  //   return `og image will be generated in production`;
  // }

  const url = `${baseUrl}${path}`;
  const hash = createHash(`md5`).update(url).digest(`hex`);
  const browser = await playwright.launchChromium({ headless: true });
  const ogImageDir = `./public/images/og`;
  const imagePath = `${ogImageDir}/${hash}.png`;
  const publicPath = `${process.env.BASE_URL}/images/og/${hash}.png`;

  try {
    fs.statSync(imagePath);
    return publicPath;
  } catch (error) {
    // file does not exists, so we create it
  }

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(url, { waitUntil: `networkidle` });
  const buffer = await page.screenshot({ type: `png` });
  await browser.close();

  fs.mkdirSync(ogImageDir, { recursive: true });
  fs.writeFileSync(imagePath, buffer);

  return publicPath;
}

export default getOgImage;
