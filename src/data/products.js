// The VSC Interiors concept-demo catalogue (10 products, grouped by category).
//
// Sources: the four named suites and their prices come from the public Google listing for VSC Interiors.
// The other six are generic style placeholders based on the kinds of suites on their public Facebook page.
// Replace them with the real range, photos and prices once the owner supplies them.
//
// To add or change a product, edit this file. Fields:
//   id        unique, lowercase, no spaces
//   name      shown to customers
//   category  one of CATEGORIES below
//   price     current price in USD (null = "message us for the price"); was = the crossed-out price
//   model     which demo 3D model draws the piece (see src/showroom/models.js)
//   params    options passed to that model
//   photo     optional product photo, /public/products/<id>.webp. Without one, a 3D thumbnail is drawn.
//   showroom  where the piece stands in the 3D showroom (leave it out for gallery-only pieces)

export const CATEGORIES = [
  { id: 'recliners', label: 'Recliner Suites' },
  { id: 'suites', label: 'Lounge Suites' },
  { id: 'corners', label: 'Corner & L-Shaped' },
];

// The 3D showroom has three rooms.
export const ROOMS = {
  living: { label: 'Leather lounge', p: [-9.0, 1.6, 3.6], l: [-9.6, 0.9, -3] },
  bedroom: { label: 'Fabric lounge', p: [0, 1.6, 3.2], l: [0, 1, -3.5] },
  dining: { label: 'Recliner lounge', p: [9.0, 1.6, 3.6], l: [11.2, 0.9, -2.5] },
};
export const ROOM_OF_CATEGORY = {
  recliners: 'dining',
  suites: 'living',
  corners: 'living',
};

// [id, name, category, price, was, model, params, description]
const RAW = [
  // Named on the public Google listing
  ['sentosa-7-recliner', 'Sentosa 7-seater recliner suite', 'recliners', 1530, 1700, 'reclinerSuite', { mat: 'leatherTan' },
    'Seven-seater recliner lounge suite in leather: a three-seater and two double seats, each with reclining seats.'],
  ['lagos-7-recliner', 'Lagos 7-seater recliner suite', 'recliners', 1530, 1700, 'reclinerSuite', { mat: 'leatherBlk' },
    'Seven-seater recliner lounge suite in black leather with a deep, supportive back.'],
  ['jasmine-6-seater', 'Jasmine 6-seater lounge suite', 'suites', 855, 950, 'suite', { mat: 'fabricGrey', high: true },
    'Six-seater lounge suite: a three-seater, a two-seater and a single, in a soft grey fabric.'],
  ['kirsty-6-seater', 'Kirsty 6-seater lounge suite', 'suites', null, null, 'suite', { mat: 'leatherBrown', high: true },
    'Non-recliner six-seater lounge suite in genuine and bonded leather.'],
  // Style placeholders
  ['black-3-recliner', 'Black leather 3-seater recliner', 'recliners', null, null, 'recliner', { seats: 3, mat: 'leatherBlk' },
    'Three-seater recliner sofa in black leather.'],
  ['cream-2-recliner', 'Cream leather 2-seater recliner', 'recliners', null, null, 'recliner', { seats: 2, mat: 'leatherCream' },
    'Two-seater recliner sofa in cream leather.'],
  ['white-leather-suite', 'White leather lounge suite', 'suites', null, null, 'suite', { mat: 'white', high: false },
    'Lounge suite in white leather, shown with a glass coffee table.'],
  ['cream-corner-suite', 'Cream leather corner suite', 'corners', null, null, 'lshape', { mat: 'leatherCream', pillows: false },
    'Corner suite in cream leather with a long chaise.'],
  ['grey-fabric-l-couch', 'Grey fabric L-shaped couch', 'corners', null, null, 'lshape', { mat: 'fabricDk', pillows: true },
    'L-shaped couch in grey fabric with scatter cushions.'],
  ['black-leather-l-couch', 'Black leather L-shaped couch', 'corners', null, null, 'lshape', { mat: 'leatherBlk', pillows: false },
    'L-shaped couch in black leather.'],
];

// Where the pieces stand in the 3D showroom. Pieces not listed here are gallery-only.
const SHOWROOM = {
  'kirsty-6-seater': { pos: [-13.7, 0.1], ry: Math.PI / 2, sh: [4.6, 2.2], dist: 3.8, ly: 0.6, hy: 1.4, cam: [-9.4, 1.8, 0.1], look: [-13.5, 0.6, 0.1] },
  'cream-corner-suite': { pos: [-8.6, -3.45], ry: 0, sh: [3.0, 2.0], dist: 3.8, ly: 0.65, hy: 1.35 },
  'jasmine-6-seater': { room: 'bedroom', pos: [0, -3.2], ry: 0, sh: [4.4, 2.4], dist: 4.4, ly: 0.7, hy: 1.5 },
  'sentosa-7-recliner': { room: 'dining', pos: [13.7, 0.2], ry: -Math.PI / 2, sh: [4.6, 2.6], dist: 3.8, ly: 0.6, hy: 1.5, cam: [9.4, 1.8, 0.2], look: [13.5, 0.6, 0.2] },
  'lagos-7-recliner': { room: 'dining', pos: [8.6, -3.2], ry: 0, sh: [4.6, 2.6], dist: 4.2, ly: 0.7, hy: 1.5 },
};

export const PRODUCTS = RAW.map(([id, name, category, price, was, model, params, description]) => {
  const cat = CATEGORIES.find((c) => c.id === category);
  return {
    id,
    name,
    listed: '',
    category,
    categoryLabel: cat.label,
    price,
    was,
    model,
    params,
    photo: null,
    description,
    details: [],
    showroom: SHOWROOM[id] ? { ...SHOWROOM[id], room: SHOWROOM[id].room || ROOM_OF_CATEGORY[category] } : null,
  };
});

export const BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
export const FEATURED = PRODUCTS.filter((p) => p.showroom);
