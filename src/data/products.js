import cobaltElastic from "../assets/images/cobalt elastic strap journal.webp";
import crimsonRedElastic from "../assets/images/red elastic strap journal.webp";
import orbitBronze from "../assets/images/orbit bronze gift set journal.png";
import orbitNavy from "../assets/images/orbit navy gift set journal.png";
import orbitOnyx from "../assets/images/orbit onyx black gift set journal.png";
import orbitPine from "../assets/images/orbit pine green gift set journal.png";
import orbitScarlet from "../assets/images/orbit crimson red gift set journal.png";
import ridgeBronze from "../assets/images/ridge bronze journal.webp";
import ridgeNavy from "../assets/images/ridge navy journal.webp";
import ridgeOnyx from "../assets/images/ridge onyx journal.webp";
import ridgeScarlet from "../assets/images/ridge scarlet journal.webp";
import ridgeTeal from "../assets/images/ridge teal journal.webp";
import skyBlueElastic from "../assets/images/sky blue elastic strap journal.webp";
import jetBlackElastic from "../assets/images/jet black elastic strap journal.webp";
import slateGreyElastic from "../assets/images/slate grey elastic strap journal.webp";
import charcoalGreyAxis from "../assets/images/charcoal grey y-axis journal.webp";
import crimsonRedAxis from "../assets/images/crimson red y-axis journal.webp";
import emeraldGreenAxis from "../assets/images/emerald green y-axis journal.webp";
import royalBlueAxis from "../assets/images/royal blue y-axis journal.webp";
import saddleBrownAxis from "../assets/images/saddle brown y-axis journal.webp";
import crimsonRedLoom from "../assets/images/crimson red loom journal.webp";
import emeraldGreenLoom from "../assets/images/emerald forest green loom journal.webp";
import graphiteBlackLoom from "../assets/images/graphite black loom journal.webp";
import royalSapphireLoom from "../assets/images/royal sapphire loom journal.webp";
import cognacBrownHorizon from "../assets/images/cognac brown horizon journal.webp";
import crimsonRedHorizon from "../assets/images/crimson red horizon journal.webp";
import midnightBlackHorizon from "../assets/images/midnight black horizon journal.webp";
import navyBlueHorizon from "../assets/images/navy blue horizon journal.webp";
import sageGreenHorizon from "../assets/images/sage green horizon journal.webp";
import cognacBrownFrame from "../assets/images/cognac brown frame journal.webp";
import crimsonRedFrame from "../assets/images/crimson red frame journal.webp";
import graphiteBlackFrame from "../assets/images/graphite black frame journal.webp";
import sageGreenFrame from "../assets/images/sage green frame journal.webp";
import royalBlueFrame from "../assets/images/royal blue frame journal.webp";
import cognacBrownSlate from "../assets/images/cognac brown slate journal.webp";
import crimsonRedSlate from "../assets/images/crimson red slate journal.webp";
import forestGreenSlate from "../assets/images/forest green slate journal.webp";
import navyBlueSlate from "../assets/images/navy blue slate journal.webp";
import onyxBlackSlate from "../assets/images/onyx black slate journal.webp";
import desertSandArchive from "../assets/images/desert sand archive journal.webp";
import expressoBrownArchive from "../assets/images/expresso brown archive journal.webp";
import mahoganyBrownArchive from "../assets/images/mahogany brown archive journal.webp";
import midnightBlueArchive from "../assets/images/midnight blue archive journal.webp";
import vintageChestnutArchive from "../assets/images/vintage chestnut archive journal.webp";
import crimsonRedSteadySuede from "../assets/images/crimson red suede journal.webp";
import forestGreenSteadySuede from "../assets/images/forest green suede journal.webp";
import iceBlueSteadySuede from "../assets/images/ice blue suede journal.webp";
import charcoalBlackSteadySuede from "../assets/images/charcoal black suede journal.webp";
import chestnutBrownSteadySuede from "../assets/images/chestnut brown suede journal.webp";
import ridgeBronzeGiftSet from "../assets/images/ridge bronze gift set journal.webp";
import ridgeNavyGiftSet from "../assets/images/ridge navy gift set journal.webp";
import ridgeOnyxGiftSet from "../assets/images/ridge onyx gift set journal.webp";
import ridgeScarletGiftSet from "../assets/images/ridge scarlet gift set journal.webp";
import ridgeTealGiftSet from "../assets/images/ridge teal gift set journal.webp";
import charcoalBlackGrain from "../assets/images/grain charcoal black gift set journal.webp";
import royalBlueGrain from "../assets/images/grain royal blue gift set journal.webp";
import coffeeBrownGrain from "../assets/images/grain coffee brown gift set journal.webp";

const products = [
  {
    id: 1,
    name: "Loom Journal",
    collection: "Loom Collection",
    collectionSlug: "loom",
    price: "₦6,000",
    description:
      "Woven texture meets premium faux leather. The Loom collection is where craftsmanship and intentionality come together.",
    defaultVariant: "crimson-red",
    variants: [
         {
        color: "Crimson Red",
        slug: "crimson-red",
        image: crimsonRedLoom,
        inStock: true,
      },
      {
        color: "Royal Sapphire",
        slug: "royal-sapphire",
        image: royalSapphireLoom,
        inStock: true,
      },
      {
        color: "Graphite Black",
        slug: "graphite-black",
        image: graphiteBlackLoom,
        inStock: true,
      },
      {
        color: "Emerald Green",
        slug: "emerald-green",
        image: emeraldGreenLoom,
        inStock: true,
      },
    ],
  },
  {
    id: 2,
    name: "Ridge Journal (Gift Set)",
    collection: "Ridge Collection",
    collectionSlug: "ridge",
    price: "N/A",
    description:
      "Diagonal line detailing on premium faux leather. The Ridge collection is where structure meets soul.",
    defaultVariant: "bronze",
    variants: [
      {
        color: "Bronze",
        slug: "bronze",
        image: ridgeBronzeGiftSet,
        inStock: false,
      },
      {
        color: "Navy",
        slug: "navy",
        image: ridgeNavyGiftSet,
        inStock: false,
      },
      {
        color: "Onyx",
        slug: "onyx",
        image: ridgeOnyxGiftSet,
        inStock: false,
      },
      {
        color: "Scarlet",
        slug: "scarlet",
        image: ridgeScarletGiftSet,
        inStock: false,
      },
      {
        color: "Teal",
        slug: "teal",
        image: ridgeTealGiftSet,
        inStock: false,
      },
    ],
  },
  {
    id: 3,
    name: "Y-Axis Journal",
    collection: "Axis Collection",
    collectionSlug: "axis",
    price: "₦6,000",
    description:
      "Y-strap panel journals with a stunning 2-tone panel design. Bold, structured and made for the writer who moves with intention.",
    defaultVariant: "charcoal-grey",
    variants: [
      {
        color: "Charcoal Grey",
        slug: "charcoal-grey",
        image: charcoalGreyAxis,
        inStock: true,
      },
      {
        color: "Crimson Red",
        slug: "crimson-red",
        image: crimsonRedAxis,
        inStock: true,
      },
      {
        color: "Emerald Green",
        slug: "emerald-green",
        image: emeraldGreenAxis,
        inStock: true,
      },
      {
        color: "Royal Blue",
        slug: "royal-blue",
        image: royalBlueAxis,
        inStock: true,
      },
      {
        color: "Saddle Brown",
        slug: "saddle-brown",
        image: saddleBrownAxis,
        inStock: true,
      },
    ],
  },

  {
    id: 4,
    name: "Elastic Strap Journal",
    collection: "Elastic Strap Journals",
    collectionSlug: "elastic-strap",
    price: "₦5,000",
    description:
      "Smooth cover journal with elastic strap closure. Minimal and secure — built for thoughts that need to stay close.",
    defaultVariant: "sky-blue",
    variants: [
      {
        color: "Sky Blue",
        slug: "sky-blue",
        image: skyBlueElastic,
        inStock: true,
      },
      {
        color: "Crimson Red",
        slug: "crimson-red",
        image: crimsonRedElastic,
        inStock: true,
      },
      {
        color: "Cobalt Blue",
        slug: "cobalt-blue",
        image: cobaltElastic,
        inStock: true,
      },
      {
        color: "Jet Black",
        slug: "jet-black",
        image: jetBlackElastic,
        inStock: true,
      },
      {
        color: "Slate Grey",
        slug: "slate-grey",
        image: slateGreyElastic,
        inStock: true,
      },
    ],
  },
  {
    id: 5,
    name: "Ridge Journal",
    collection: "Ridge Collection",
    collectionSlug: "ridge",
    price: "₦6,000",
    description:
      "Diagonal line detailing on premium faux leather. The Ridge collection is where structure meets soul.",
    defaultVariant: "crimson-red",
    variants: [
      {
        color: "Crimson Red",
        slug: "crimson-red",
        image: ridgeScarlet,
        inStock: true,
      },
      {
        color: "Teal",
        slug: "teal",
        image: ridgeTeal,
        inStock: true,
      },
      {
        color: "Bronze",
        slug: "bronze",
        image: ridgeBronze,
        inStock: true,
      },
      {
        color: "Onyx",
        slug: "onyx",
        image: ridgeOnyx,
        inStock: true,
      },
      {
        color: "Navy",
        slug: "navy",
        image: ridgeNavy,
        inStock: true,
      },
    ],
  },
  {
    id: 6,
    name: "Orbit Journal (Gift Set)",
    collection: "Orbit Journal",
    collectionSlug: "orbit",
    price: "N/A",
    description:
      "A refined circle of intention. The Orbit journal moves with you — purposeful, elegant and deeply personal.",
    defaultVariant: "pine-green",
    variants: [
      {
        color: "Pine Green",
        slug: "pine-green",
        image: orbitPine,
        inStock: false,
      },
      {
        color: "Onyx Black",
        slug: "onyx-black",
        image: orbitOnyx,
        inStock: false,
      },
      {
        color: "Crimson Red",
        slug: "crimson-red",
        image: orbitScarlet,
        inStock: false,
      },
      {
        color: "Navy Blue",
        slug: "navy-blue",
        image: orbitNavy,
        inStock: false,
      },
      {
        color: "Bronze",
        slug: "bronze",
        image: orbitBronze,
        inStock: false,
      },
    ],
  },

  {
    id: 7,
    name: "Horizon Journal",
    collection: "Horizon Collection",
    collectionSlug: "horizon",
    price: "₦6,000",
    description:
      "2-tone suede with a circular snap button. Soft, premium and made for quiet moments of reflection.",
    defaultVariant: "cognac-brown",
    variants: [
      {
        color: "Cognac Brown",
        slug: "cognac-brown",
        image: cognacBrownHorizon,
        inStock: true,
      },
      {
        color: "Crimson Red",
        slug: "crimson-red",
        image: crimsonRedHorizon,
        inStock: true,
      },
      {
        color: "Midnight Black",
        slug: "midnight-black",
        image: midnightBlackHorizon,
        inStock: true,
      },
      {
        color: "Navy Blue",
        slug: "navy-blue",
        image: navyBlueHorizon,
        inStock: true,
      },
      {
        color: "Sage Green",
        slug: "sage-green",
        image: sageGreenHorizon,
        inStock: true,
      },
    ],
  },
  {
    id: 8,
    name: "Frame Journal",
    collection: "Frame Collection",
    collectionSlug: "frame",
    price: "₦6,000",
    description:
      "Panel faux leather with a gold rectangular clasp. Elegant, refined and crafted for the writer who values the details.",
    defaultVariant: "graphite-black",
    variants: [
      {
        color: "Graphite Black",
        slug: "graphite-black",
        image: graphiteBlackFrame,
        inStock: true,
      },
      {
        color: "Cognac Brown",
        slug: "cognac-brown",
        image: cognacBrownFrame,
        inStock: true,
      },
      {
        color: "Crimson Red",
        slug: "crimson-red",
        image: crimsonRedFrame,
        inStock: true,
      },
      {
        color: "Sage Green",
        slug: "sage-green",
        image: sageGreenFrame,
        inStock: true,
      },
      {
        color: "Royal Blue",
        slug: "royal-blue",
        image: royalBlueFrame,
        inStock: true,
      },
    ],
  },
  {
    id: 9,
    name: "Slate Journal",
    collection: "Slate Collection",
    collectionSlug: "slate",
    price: "₦6,000",
    description:
      "Clean, minimal and deeply purposeful. The Slate collection is for the writer who lets their words do the talking.",
    defaultVariant: "forest-green",
    variants: [
      {
        color: "Forest Green",
        slug: "forest-green",
        image: forestGreenSlate,
        inStock: true,
      },
      {
        color: "Cognac Brown",
        slug: "cognac-brown",
        image: cognacBrownSlate,
        inStock: true,
      },
      {
        color: "Crimson Red",
        slug: "crimson-red",
        image: crimsonRedSlate,
        inStock: true,
      },
      {
        color: "Navy Blue",
        slug: "navy-blue",
        image: navyBlueSlate,
        inStock: true,
      },
      {
        color: "Onyx Black",
        slug: "onyx-black",
        image: onyxBlackSlate,
        inStock: true,
      },
    ],
  },
  {
    id: 10,
    name: "Archive Journal",
    collection: "Archive Collection",
    collectionSlug: "archive",
    price: "₦6,000",
    description:
      "2-tone faux leather with a button strap and ribbon marker. Classic, timeless and built to last through every season.",
    defaultVariant: "desert-sand",
    variants: [
      {
        color: "Desert Sand",
        slug: "desert-sand",
        image: desertSandArchive,
        inStock: true,
      },
      {
        color: "Expresso Brown",
        slug: "expresso-brown",
        image: expressoBrownArchive,
        inStock: true,
      },
      {
        color: "Mahogany Brown",
        slug: "mahogany-brown",
        image: mahoganyBrownArchive,
        inStock: true,
      },
      {
        color: "Midnight Blue",
        slug: "midnight-blue",
        image: midnightBlueArchive,
        inStock: true,
      },
      {
        color: "Vintage Chestnut",
        slug: "vintage-chestnut",
        image: vintageChestnutArchive,
        inStock: true,
      },
    ],
  },
  {
    id: 11,
    name: "Steady Suede Journal",
    collection: "Steady Suede Set",
    collectionSlug: "steady-suede",
    price: "₦6,000",
    description:
      "A premium suede set for the writer who values consistency. Soft to the touch, steady in purpose — made for the long haul.",
    defaultVariant: "ice-blue",
    variants: [
      {
        color: "Ice Blue",
        slug: "ice-blue",
        image: iceBlueSteadySuede,
        inStock: true,
      },
      {
        color: "Crimson Red",
        slug: "crimson-red",
        image: crimsonRedSteadySuede,
        inStock: true,
      },
      {
        color: "Forest Green",
        slug: "forest-green",
        image: forestGreenSteadySuede,
        inStock: true,
      },
      {
        color: "Charcoal Black",
        slug: "charcoal-black",
        image: charcoalBlackSteadySuede,
        inStock: true,
      },
      {
        color: "Chestnut Brown",
        slug: "chestnut-brown",
        image: chestnutBrownSteadySuede,
        inStock: true,
      },
    ],
  },
  {
    id: 12,
    name: "Grain Journal (Gift Set)",
    collection: "Grain Collection",
    collectionSlug: "grain",
    price: "₦6,000",
    description:
      "Woodgrain textured cover — a gift set collection perfect for the writer in your life. Beautiful, warm and deeply intentional.",
    defaultVariant: "charcoal-black",
    variants: [
      {
        color: "Charcoal Black",
        slug: "charcoal-black",
        image: charcoalBlackGrain,
        inStock: true,
      },
      {
        color: "Royal Blue",
        slug: "royal-blue",
        image: royalBlueGrain,
        inStock: true,
      },
      {
        color: "Coffee Brown",
        slug: "coffee-brown",
        image: coffeeBrownGrain,
        inStock: true,
      },
    ],
  },
];

export default products;

// shop page with all products

// import cobaltElastic from '../assets/images/cobalt elastic strap journal.webp'
// import orbitBronze from '../assets/images/orbit bronze journal.webp'
// import orbitNavy from '../assets/images/orbit navy journal.webp'
// import orbitOnyx from '../assets/images/orbit onyx journal.webp'
// import orbitPine from '../assets/images/orbit pine journal.webp'
// import orbitScarlet from '../assets/images/orbit scarlet journal.webp'
// import redElastic from '../assets/images/red elastic strap journal.webp'
// import ridgeBronze from '../assets/images/ridge bronze journal.webp'
// import ridgeNavy from '../assets/images/ridge navy journal.webp'
// import ridgeOnyx from '../assets/images/ridge onyx journal.webp'
// import ridgeScarlet from '../assets/images/ridge scarlet journal.webp'
// import ridgeTeal from '../assets/images/ridge teal journal.webp'
// import skyBlueElastic from '../assets/images/sky blue elastic strap journal.webp'
// import jetBlackElastic from '../assets/images/jet black elastic strap journal.webp'
// import slateGreyElastic from '../assets/images/slate grey elastic strap journal.webp'
// import charcoalGreyAxis from '../assets/images/charcoal grey y-axis journal.webp'
// import crimsonRedAxis from '../assets/images/crimson red y-axis journal.webp'
// import emeraldGreenAxis from '../assets/images/emerald green y-axis journal.webp'
// import royalBlueAxis from '../assets/images/royal blue y-axis journal.webp'
// import saddleBrownAxis from '../assets/images/saddle brown y-axis journal.webp'
// import crimsonRedLoom from '../assets/images/crimson red loom journal.webp'
// import emeraldGreenLoom from '../assets/images/emerald forest green loom journal.webp'
// import graphiteBlackLoom from '../assets/images/graphite black loom journal.webp'
// import royalSapphireLoom from '../assets/images/royal sapphire loom journal.webp'
// import cognacBrownHorizon from '../assets/images/cognac brown horizon journal.webp'
// import crimsonRedHorizon from '../assets/images/crimson red horizon journal.webp'
// import midnightBlackHorizon from '../assets/images/midnight black horizon journal.webp'
// import navyBlueHorizon from '../assets/images/navy blue horizon journal.webp'
// import sageGreenHorizon from '../assets/images/sage green horizon journal.webp'
// import cognacBrownFrame from '../assets/images/cognac brown frame journal.webp'
// import crimsonRedFrame from '../assets/images/crimson red frame journal.webp'
// import graphiteBlackFrame from '../assets/images/graphite black frame journal.webp'
// import sageGreenFrame from '../assets/images/sage green frame journal.webp'
// import royalBlueFrame from '../assets/images/royal blue frame journal.webp'
// import cognacBrownSlate from '../assets/images/cognac brown slate journal.webp'
// import crimsonRedSlate from '../assets/images/crimson red slate journal.webp'
// import forestGreenSlate from '../assets/images/forest green slate journal.webp'
// import navyBlueSlate from '../assets/images/navy blue slate journal.webp'
// import onyxBlackSlate from '../assets/images/onyx black slate journal.webp'
// import desertSandArchive from '../assets/images/desert sand archive journal.webp'
// import expressoBrownArchive from '../assets/images/expresso brown archive journal.webp'
// import mahoganyBrownArchive from '../assets/images/mahogany brown archive journal.webp'
// import midnightBlueArchive from '../assets/images/midnight blue archive journal.webp'
// import vintageChestnutArchive from '../assets/images/vintage chestnut archive journal.webp'
// import crimsonRedSteadySuede from '../assets/images/crimson red suede journal.webp'
// import forestGreenSteadySuede from '../assets/images/forest green suede journal.webp'
// import iceBlueSteadySuede from '../assets/images/ice blue suede journal.webp'
// import charcoalBlackSteadySuede from '../assets/images/charcoal black suede journal.webp'
// import chestnutBrownSteadySuede from '../assets/images/chestnut brown suede journal.webp'

// const products = [
//   {
//     id: 1,
//     name: "Cobalt Elastic Strap Journal",
//     collection: "Elastic Strap Journals",
//     collectionSlug: "elastic-strap",
//     price: "₦5,000",
//     inStock: true,
//     image: cobaltElastic,
//     description: "Smooth cover journal with elastic strap closure. Minimal and secure — built for thoughts that need to stay close.",
//   },
//   {
//     id: 2,
//     name: "Red Elastic Strap Journal",
//     collection: "Elastic Strap Journals",
//     collectionSlug: "elastic-strap",
//     price: "₦5,000",
//     inStock: false,
//     image: redElastic,
//     description: "Smooth cover journal with elastic strap closure. Bold in color, quiet in purpose — a journal that means business.",
//   },
//   {
//     id: 3,
//     name: "Ridge Teal Journal",
//     collection: "Ridge Collection",
//     collectionSlug: "ridge",
//     price: "₦6,000",
//     inStock: false,
//     image: ridgeTeal,
//     description: "Diagonal line detailing on premium faux leather. The Ridge collection is where structure meets soul.",
//   },
//   {
//     id: 4,
//     name: "Ridge Bronze Journal",
//     collection: "Ridge Collection",
//     collectionSlug: "ridge",
//     price: "₦6,000",
//     inStock: false,
//     image: ridgeBronze,
//     description: "Diagonal line detailing on premium faux leather. Warm tones for warm thoughts — write what matters.",
//   },
//   {
//     id: 5,
//     name: "Ridge Onyx Journal",
//     collection: "Ridge Collection",
//     collectionSlug: "ridge",
//     price: "₦6,000",
//     inStock: false,
//     image: ridgeOnyx,
//     description: "Diagonal line detailing on premium faux leather. Classic onyx finish for the writer who keeps it timeless.",
//   },
//   {
//     id: 6,
//     name: "Ridge Scarlet Journal",
//     collection: "Ridge Collection",
//     collectionSlug: "ridge",
//     price: "₦6,000",
//     inStock: false,
//     image: ridgeScarlet,
//     description: "Diagonal line detailing on premium faux leather. Bold, intentional and made for visions that demand to be written.",
//   },
//   {
//     id: 7,
//     name: "Ridge Navy Journal",
//     collection: "Ridge Collection",
//     collectionSlug: "ridge",
//     price: "₦6,000",
//     inStock: false,
//     image: ridgeNavy,
//     description: "Diagonal line detailing on premium faux leather. Deep navy for deep thoughts — your quiet companion.",
//   },
//   {
//     id: 8,
//     name: "Orbit Onyx Journal",
//     collection: "Orbit Journals",
//     collectionSlug: "orbit",
//     price: "₦6,000",
//     inStock: false,
//     image: orbitOnyx,
//     description: "The Orbit journal — a refined circle of intention. Onyx finish for the writer who moves with purpose.",
//   },
//   {
//     id: 9,
//     name: "Orbit Scarlet Journal",
//     collection: "Orbit Journals",
//     collectionSlug: "orbit",
//     price: "₦6,000",
//     inStock: false,
//     image: orbitScarlet,
//     description: "The Orbit journal — a refined circle of intention. Scarlet for the bold vision that refuses to stay silent.",
//   },
//   {
//     id: 10,
//     name: "Orbit Navy Journal",
//     collection: "Orbit Journals",
//     collectionSlug: "orbit",
//     price: "₦6,000",
//     inStock: false,
//     image: orbitNavy,
//     description: "The Orbit journal — a refined circle of intention. Navy blue for steady, faithful, daily writing.",
//   },
//   {
//     id: 11,
//     name: "Orbit Bronze Journal",
//     collection: "Orbit Journals",
//     collectionSlug: "orbit",
//     price: "₦6,000",
//     inStock: false,
//     image: orbitBronze,
//     description: "The Orbit journal — a refined circle of intention. Bronze tones that echo the ancient and the timeless.",
//   },
//   {
//     id: 12,
//     name: "Orbit Pine Journal",
//     collection: "Orbit Journals",
//     collectionSlug: "orbit",
//     price: "₦6,000",
//     inStock: false,
//     image: orbitPine,
//     description: "The Orbit journal — a refined circle of intention. Pine green for the writer rooted in quiet, steady purpose.",
//   },
//    {
//     id: 13,
//     name: "Sky Blue Elastic Strap Journal",
//     collection: "Elastic Strap Journals",
//     collectionSlug: "elastic-strap",
//     price: "₦5,000",
//     inStock: true,
//     image: skyBlueElastic,
//     description: "Smooth cover journal with elastic strap closure. Minimal and secure — built for thoughts that need to stay close.",
//   },
//    {
//     id: 14,
//     name: "Jet Black Elastic Strap Journal",
//     collection: "Elastic Strap Journals",
//     collectionSlug: "elastic-strap",
//     price: "₦5,000",
//     inStock: true,
//     image: jetBlackElastic,
//     description: "Smooth cover journal with elastic strap closure. Minimal and secure — built for thoughts that need to stay close.",
//   },
//    {
//     id: 15,
//     name: "Slate Grey Elastic Strap Journal",
//     collection: "Elastic Strap Journals",
//     collectionSlug: "elastic-strap",
//     price: "₦5,000",
//     inStock: true,
//     image: slateGreyElastic,
//     description: "Smooth cover journal with elastic strap closure. Minimal and secure — built for thoughts that need to stay close.",
//   },
//    {
//     id: 16,
//     name: "Charcoal Grey Y-Axis Journal",
//     collection: "Y-Axis Collection",
//     collectionSlug: "y-axis",
//     price: "₦5,000",
//     inStock: true,
//     image: charcoalGreyAxis,
//     description: "Y-strap panel journals with a stunning 2-tone panel design. Bold, structured and made for the writer who moves with intention.",
//   },
//    {
//     id: 17,
//     name: "Crimson Red Y-Axis Journal",
//     collection: "Y-Axis Collection",
//     collectionSlug: "y-axis",
//     price: "₦5,000",
//     inStock: true,
//     image: crimsonRedAxis,
//     description: "Y-strap panel journals with a stunning 2-tone panel design. Bold, structured and made for the writer who moves with intention.",
//   },
//    {
//     id: 18,
//     name: "Emerald Green Y-Axis Journal",
//     collection: "Y-Axis Collection",
//     collectionSlug: "y-axis",
//     price: "₦5,000",
//     inStock: true,
//     image: emeraldGreenAxis,
//     description: "Y-strap panel journals with a stunning 2-tone panel design. Bold, structured and made for the writer who moves with intention.",
//   },
//   {
//     id: 19,
//     name: "Royal Blue Y-Axis Journal",
//     collection: "Y-Axis Collection",
//     collectionSlug: "y-axis",
//     price: "₦5,000",
//     inStock: true,
//     image: royalBlueAxis,
//     description: "Y-strap panel journals with a stunning 2-tone panel design. Bold, structured and made for the writer who moves with intention.",
//   },
//   {
//     id: 20,
//     name: "Saddle Brown Y-Axis Journal",
//     collection: "Y-Axis Collection",
//     collectionSlug: "y-axis",
//     price: "₦5,000",
//     inStock: true,
//     image: saddleBrownAxis,
//     description: "Y-strap panel journals with a stunning 2-tone panel design. Bold, structured and made for the writer who moves with intention.",
//   },
//   {
//     id: 21,
//     name: "Crimson Red Loom Journal",
//     collection: "Loom Collection",
//     collectionSlug: "loom",
//     price: "₦5,000",
//     inStock: true,
//     image: crimsonRedLoom,
//     description: "Woven texture meets premium faux leather. The Loom collection is where craftsmanship and intentionality come together.",

//   },
//   {
//     id: 22,
//     name: "Emerald Forest Green Loom Journal",
//     collection: "Loom Collection",
//     collectionSlug: "loom",
//     price: "₦5,000",
//     inStock: true,
//     image: emeraldGreenLoom,
//     description: "Woven texture meets premium faux leather. The Loom collection is where craftsmanship and intentionality come together.",
//   },
//   {
//     id: 23,
//     name: "Graphite Black Loom Journal",
//     collection: "Loom Collection",
//     collectionSlug: "loom",
//     price: "₦5,000",
//     inStock: true,
//     image: graphiteBlackLoom,
//     description: "Woven texture meets premium faux leather. The Loom collection is where craftsmanship and intentionality come together.",
//   },
//   {
//     id: 24,
//     name: "Royal Sapphire Loom Journal",
//     collection: "Loom Collection",
//     collectionSlug: "loom",
//     price: "₦5,000",
//     inStock: true,
//     image: royalSapphireLoom,
//     description: "Woven texture meets premium faux leather. The Loom collection is where craftsmanship and intentionality come together.",
//   },
//    {
//     id: 25,
//     name: "Cognac Brown Horizon Journal",
//     collection: "Horizon Collection",
//     collectionSlug: "horizon",
//     price: "₦5,000",
//     inStock: true,
//     image: cognacBrownHorizon,
//     description: "2-tone suede with a circular snap button. Soft, premium and made for quiet moments of reflection.",
//   },
//    {
//     id: 26,
//     name: "Crimson Red Horizon Journal",
//     collection: "Horizon Collection",
//     collectionSlug: "horizon",
//     price: "₦5,000",
//     inStock: true,
//     image: crimsonRedHorizon,
//     description: "2-tone suede with a circular snap button. Soft, premium and made for quiet moments of reflection.",
//   },
//    {
//     id: 27,
//     name: "Midnight Black Horizon Journal",
//     collection: "Horizon Collection",
//     collectionSlug: "horizon",
//     price: "₦5,000",
//     inStock: true,
//     image: midnightBlackHorizon,
//     description: "2-tone suede with a circular snap button. Soft, premium and made for quiet moments of reflection.",
//   },
//    {
//     id: 28,
//     name: "Navy Blue Horizon Journal",
//     collection: "Horizon Collection",
//     collectionSlug: "horizon",
//     price: "₦5,000",
//     inStock: true,
//     image: navyBlueHorizon,
//     description: "2-tone suede with a circular snap button. Soft, premium and made for quiet moments of reflection.",
//   },
//    {
//     id: 29,
//     name: "Sage Green Horizon Journal",
//     collection: "Horizon Collection",
//     collectionSlug: "horizon",
//     price: "₦5,000",
//     inStock: true,
//     image: sageGreenHorizon,
//     description: "2-tone suede with a circular snap button. Soft, premium and made for quiet moments of reflection.",
//   },
//    {
//     id: 30,
//     name: "Cognac Brown Frame Journal",
//     collection: "Frame Collection",
//     collectionSlug: "frame",
//     price: "₦5,000",
//     inStock: true,
//     image: cognacBrownFrame,
//     description: "2-tone suede with a circular snap button. Soft, premium and made for quiet moments of reflection.",
//   },
//    {
//     id: 31,
//     name: "Crimson Red Frame Journal",
//     collection: "Frame Collection",
//     collectionSlug: "frame",
//     price: "₦5,000",
//     inStock: true,
//     image: crimsonRedFrame,
//     description: "2-tone suede with a circular snap button. Soft, premium and made for quiet moments of reflection.",
//   },
//    {
//     id: 32,
//     name: "Graphite Black Frame Journal",
//     collection: "Frame Collection",
//     collectionSlug: "frame",
//     price: "₦5,000",
//     inStock: true,
//     image: graphiteBlackFrame,
//     description: "2-tone suede with a circular snap button. Soft, premium and made for quiet moments of reflection.",
//   },
//    {
//     id: 33,
//     name: "Sage Green Frame Journal",
//     collection: "Frame Collection",
//     collectionSlug: "frame",
//     price: "₦5,000",
//     inStock: true,
//     image: sageGreenFrame,
//     description: "2-tone suede with a circular snap button. Soft, premium and made for quiet moments of reflection.",
//   },
//    {
//     id: 34,
//     name: "Royal Blue Frame Journal",
//     collection: "Frame Collection",
//     collectionSlug: "frame",
//     price: "₦5,000",
//     inStock: true,
//     image: royalBlueFrame,
//     description: "2-tone suede with a circular snap button. Soft, premium and made for quiet moments of reflection.",
//   },
//    {
//     id: 35,
//     name: "Cognac Brown Slate Journal",
//     collection: "Slate Collection",
//     collectionSlug: "slate",
//     price: "₦5,000",
//     inStock: true,
//     image: cognacBrownSlate,
//     description: "Clean, minimal and deeply purposeful. The Slate collection is for the writer who lets their words do the talking.",
//   },
//    {
//     id: 36,
//     name: "Crimson Red Slate Journal",
//     collection: "Slate Collection",
//     collectionSlug: "slate",
//     price: "₦5,000",
//     inStock: true,
//     image: crimsonRedSlate,
//     description: "Clean, minimal and deeply purposeful. The Slate collection is for the writer who lets their words do the talking.",
//   },
//    {
//     id: 37,
//     name: "Forest Green Slate Journal",
//     collection: "Slate Collection",
//     collectionSlug: "slate",
//     price: "₦5,000",
//     inStock: true,
//     image: forestGreenSlate,
//     description: "Clean, minimal and deeply purposeful. The Slate collection is for the writer who lets their words do the talking.",
//   },
//    {
//     id: 38,
//     name: "Navy Blue Slate Journal",
//     collection: "Slate Collection",
//     collectionSlug: "slate",
//     price: "₦5,000",
//     inStock: true,
//     image: navyBlueSlate,
//     description: "Clean, minimal and deeply purposeful. The Slate collection is for the writer who lets their words do the talking.",
//   },
//    {
//     id: 39,
//     name: "Onyx Black Slate Journal",
//     collection: "Slate Collection",
//     collectionSlug: "slate",
//     price: "₦5,000",
//     inStock: true,
//     image: onyxBlackSlate,
//     description: "Clean, minimal and deeply purposeful. The Slate collection is for the writer who lets their words do the talking.",
//   },
//    {
//     id: 40,
//     name: "Desert Sand Archive Journal",
//     collection: "Archive Collection",
//     collectionSlug: "archive",
//     price: "₦5,000",
//     inStock: true,
//     image: desertSandArchive,
//     description: "2-tone faux leather with a button strap and ribbon marker. Classic, timeless and built to last through every season.",
//   },
//    {
//     id: 41,
//     name: "Expresso Brown Archive Journal",
//     collection: "Archive Collection",
//     collectionSlug: "archive",
//     price: "₦5,000",
//     inStock: true,
//     image: expressoBrownArchive,
//     description: "2-tone faux leather with a button strap and ribbon marker. Classic, timeless and built to last through every season.",
//   },
//    {
//     id: 42,
//     name: "Mahogany Brown Archive Journal",
//     collection: "Archive Collection",
//     collectionSlug: "archive",
//     price: "₦5,000",
//     inStock: true,
//     image: mahoganyBrownArchive,
//     description: "2-tone faux leather with a button strap and ribbon marker. Classic, timeless and built to last through every season.",
//   },
//    {
//     id: 43,
//     name: "Midnight Blue Archive Journal",
//     collection: "Archive Collection",
//     collectionSlug: "archive",
//     price: "₦5,000",
//     inStock: true,
//     image: midnightBlueArchive,
//     description: "2-tone faux leather with a button strap and ribbon marker. Classic, timeless and built to last through every season.",
//   },
//    {
//     id: 44,
//     name: "Vintage Chestnut Archive Journal",
//     collection: "Archive Collection",
//     collectionSlug: "archive",
//     price: "₦5,000",
//     inStock: true,
//     image: vintageChestnutArchive,
//     description: "2-tone faux leather with a button strap and ribbon marker. Classic, timeless and built to last through every season.",
//   },
//      {
//     id: 45,
//     name: "Crimson Red Steady Suede Journal",
//     collection: "Steady Suede Set",
//     collectionSlug: "steady-suede",
//     price: "₦5,000",
//     inStock: true,
//     image: crimsonRedSteadySuede,
//     description: "A premium suede set for the writer who values consistency. Soft to the touch, steady in purpose — made for the long haul.",
//   },
//   {
//     id: 46,
//     name: "Forest Green Steady Suede Journal",
//     collection: "Steady Suede Set",
//     collectionSlug: "steady-suede",
//     price: "₦5,000",
//     inStock: true,
//     image: forestGreenSteadySuede,
//     description: "A premium suede set for the writer who values consistency. Soft to the touch, steady in purpose — made for the long haul.",
//   },
//   {
//     id: 47,
//     name: "Ice Blue Steady Suede Journal",
//     collection: "Steady Suede Set",
//     collectionSlug: "steady-suede",
//     price: "₦5,000",
//     inStock: true,
//     image: iceBlueSteadySuede,
//     description: "A premium suede set for the writer who values consistency. Soft to the touch, steady in purpose — made for the long haul.",
//   },
//   {
//     id: 48,
//     name: "Charcoal Black Steady Suede Journal",
//     collection: "Steady Suede Set",
//     collectionSlug: "steady-suede",
//     price: "₦5,000",
//     inStock: true,
//     image: charcoalBlackSteadySuede,
//     description: "A premium suede set for the writer who values consistency. Soft to the touch, steady in purpose — made for the long haul.",
//   },
//   {
//     id: 49,
//     name: "Chestnut Brown Steady Suede Journal",
//     collection: "Steady Suede Set",
//     collectionSlug: "steady-suede",
//     price: "₦5,000",
//     inStock: true,
//     image: chestnutBrownSteadySuede,
//     description: "A premium suede set for the writer who values consistency. Soft to the touch, steady in purpose — made for the long haul.",
//   },

// ]

// export default products
