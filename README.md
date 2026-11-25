# VSC Interiors: concept demo website

A concept demo for VSC Interiors (Harare), built on the same framework as the Dirwa and Ac Furnitures demos:
React 18 + Vite 5 + three.js r128.

**This is not the official VSC Interiors website.** Nothing here has been confirmed with the business. The demo
notice in `src/config.js` (`DEMO_NOTICE`) and the notes on the landing page and gallery should stay until the
owner has seen and approved it.

## What is in it

- **3D showroom**: three rooms (leather lounge, fabric lounge, recliner lounge). Drag to look, tap the floor to
  walk, tap a dot to open a piece. Five suites stand in the showroom.
- **Catalogue**: 10 products in 3 categories (Recliner Suites, Lounge Suites, Corner & L-Shaped), with a
  generated 3D thumbnail for each, the listed price where one is known, and an "Enquire on WhatsApp" button.

## Where the details came from

From the public Google and Facebook listings for VSC Interiors, as shown in the screenshots supplied:

- Showroom: Pennywise Shopping Centre, Eastlea (41 Midlothian Ave, inside Nations Hardware, next to Bon Marche).
  A second showroom is listed in the city centre (1 Wynne Street, next to Farm & City).
- Phone 078 867 9624, email vscinteriorz@gmail.com, TikTok @vsc.interiors.zw.
- Hours: Google says it closes at 4:30 pm, Facebook says "always open". Confirm with the business.
- Products named on the listing: Sentosa and Lagos 7-seater recliner suites ($1,530, was $1,700), Jasmine 6-seater
  ($855, was $950) and Kirsty non-recliner 6-seater (no price shown).
- The other six products are generic style placeholders (black and cream recliners, white leather suite, three
  corner couches). Replace them with the real range.

The Facebook and Instagram icons open a search for the business name because no page addresses were available.
Put the real addresses in `src/config.js`.

## Using real photos

No product photos were supplied, so the cards draw a 3D thumbnail. To use photos: add `public/products/<id>.webp`
and its 480 px copy in `public/products/thumbs/`, then set `photo: BASE_URL + 'products/<id>.webp'` on the product
in `src/data/products.js` (see the Ac Furnitures project for the pattern). Photos need the owner's permission.

## Run it

```bash
npm install
npm run dev      # local
npm run build    # production build in dist/
```

## Edit it

- Business details and the demo notice: `src/config.js`
- Products and showroom positions: `src/data/products.js`
- Demo 3D models and materials: `src/showroom/models.js`, `src/showroom/materials.js`
- Colours: `src/styles.css` (`--brass` is the accent)

The preview was bundled with esbuild in a sandbox without npm access, so `npm run build` has not been run on
this project; run it once before deploying.
