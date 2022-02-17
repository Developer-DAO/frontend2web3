const playwright = require(`playwright-aws-lambda`);
const { createHash } = require(`crypto`);
const fs = require(`fs`);

async function getOgImage(
  path: string,
  baseUrl = `https://og-generator.netlify.app`,
  generateOg = !true, //set to true to generate og (this is because og generation slows down development)
) {
  const url = `${baseUrl}${path}`;
  const hash = createHash(`md5`).update(url).digest(`hex`);
  const browser = await playwright.launchChromium({ headless: true });
  const ogImageDir = `./public/images/og`;
  const imagePath = `${ogImageDir}/${hash}.png`;
  const publicPath = `${process.env.NEXT_PUBLIC_BASE_URL}/images/og/${hash}.png`;

  try {
    fs.statSync(imagePath);
    return publicPath;
  } catch (error) {
    // file does not exists, so we create it
  }
  //OG image is not generated in production
  if (process.env.NODE_ENV === `production`) {
    return `og image will be generated in development`;
  }

  // OG Image is generated in development if it's allowed this is because og generation slows down development
  if (process.env.NODE_ENV === `development` && generateOg) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1200, height: 630 });
    await page.goto(url, { waitUntil: `networkidle` });
    const buffer = await page.screenshot({ type: `png` });
    await browser.close();

    fs.mkdirSync(ogImageDir, { recursive: true });
    fs.writeFileSync(imagePath, buffer);

    return publicPath;
  } else {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/images/og/defaultOg.png`; //returns default og image
  }
}
true;
export default getOgImage;
