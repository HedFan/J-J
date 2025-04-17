# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```
## J-J
#### Current application uses 
  - vue3
  - nuxt 3v
  - tailwind for css
  - Node 20v

#### Things that could be added or improved (just a few, as there’s always room for improvement):
- Add BlurHash for optimized image placeholders (faster perceived loading);
- Integrate SCSS (or similar preprocessor) for better structure, especially as custom styles grow;
- Consider rearranging the product list to avoid empty gaps when promotional items are inserted;
- Add useful content to the footer (links, company info, contact details, etc);
- Implement a language selector (for english and for danish - right now it's mix of languages, but main data that's taking from json file is on Danish);
- Add shopping cart logic, including stock calculation for available items;
- Use all data for promo that data.json file provides.


#### Notes:
- If a product has a variant, the first item in the array usually shares most of the same properties as the main product - except for the images, which are completely different.
Because of this, I decided to keep both the main product and all of its variants when displaying product data.
However, if we assumed that only the variant data should be used, it would actually be much simpler: we could just rely on the variant array entirely - using it for color, size, stock, and images - instead of merging it with the main product like I currently do.