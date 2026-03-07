import fs from 'fs';

async function scrapeCodolio() {
  try {
    const res = await fetch('https://codolio.com/profile/V_Patel', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }
    });
    const html = await res.text();
    const nextDataMatch = html.match(/id="__NEXT_DATA__" type="application\/json">({.*?})<\/script>/);
    if (nextDataMatch && nextDataMatch[1]) {
      const data = JSON.parse(nextDataMatch[1]);
      console.log("JSON DATA FOUND:", Object.keys(data.props.pageProps));
      fs.writeFileSync('codolio_data.json', JSON.stringify(data.props.pageProps, null, 2));
      console.log("Saved to codolio_data.json");
    } else {
      console.log("No Next Data found. HTML length:", html.length);
      console.log(html.substring(0, 500));
    }
  } catch (err) {
    console.error(err);
  }
}

scrapeCodolio();
