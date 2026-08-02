const fonts = [
  // ===== RECOMMENDED =====
  {
    id: 'classic-serif',
    name: 'Classic Serif',
    category: 'Recommended',
    description: 'Elegant and traditional',
    style: { fontFamily: 'Georgia, serif', fontSize: '1.1rem' },
  },
  {
    id: 'modern-script',
    name: 'Modern Script',
    category: 'Recommended',
    description: 'Flowing and personal',
    style: { fontFamily: 'Brush Script MT, cursive', fontSize: '1.3rem' },
  },
  {
    id: 'bold-print',
    name: 'Bold Print',
    category: 'Recommended',
    description: 'Clean and strong',
    style: { fontFamily: 'Arial Black, sans-serif', fontSize: '0.9rem', fontWeight: 'bold' },
  },

  // ===== ELEGANT SCRIPT =====
  {
    id: 'palatino',
    name: 'Palatino',
    category: 'Elegant Script',
    description: 'Refined and literary',
    style: { fontFamily: 'Palatino Linotype, serif', fontSize: '1.1rem' },
  },
  {
    id: 'times-new-roman',
    name: 'Times New Roman',
    category: 'Elegant Script',
    description: 'Classic and authoritative',
    style: { fontFamily: 'Times New Roman, serif', fontSize: '1.1rem' },
  },
  {
    id: 'garamond',
    name: 'Garamond',
    category: 'Elegant Script',
    description: 'Old world charm',
    style: { fontFamily: 'Garamond, serif', fontSize: '1.2rem' },
  },
  {
    id: 'book-antiqua',
    name: 'Book Antiqua',
    category: 'Elegant Script',
    description: 'Warm and inviting',
    style: { fontFamily: 'Book Antiqua, serif', fontSize: '1.1rem' },
  },

  // ===== MODERN SANS =====
  {
    id: 'helvetica',
    name: 'Helvetica',
    category: 'Modern Sans',
    description: 'Clean and contemporary',
    style: { fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '1rem' },
  },
  {
    id: 'futura',
    name: 'Futura',
    category: 'Modern Sans',
    description: 'Geometric and forward',
    style: { fontFamily: 'Futura, Century Gothic, sans-serif', fontSize: '1rem' },
  },
  {
    id: 'gill-sans',
    name: 'Gill Sans',
    category: 'Modern Sans',
    description: 'Friendly and approachable',
    style: { fontFamily: 'Gill Sans, sans-serif', fontSize: '1rem' },
  },
  {
    id: 'century-gothic',
    name: 'Century Gothic',
    category: 'Modern Sans',
    description: 'Light and airy',
    style: { fontFamily: 'Century Gothic, sans-serif', fontSize: '1rem' },
  },

  // ===== CLASSIC SERIF =====
  {
    id: 'baskerville',
    name: 'Baskerville',
    category: 'Classic Serif',
    description: 'Timeless and distinguished',
    style: { fontFamily: 'Baskerville, serif', fontSize: '1.1rem' },
  },
  {
    id: 'didot',
    name: 'Didot',
    category: 'Classic Serif',
    description: 'High fashion elegance',
    style: { fontFamily: 'Didot, serif', fontSize: '1.1rem' },
  },
  {
    id: 'caslon',
    name: 'Caslon',
    category: 'Classic Serif',
    description: 'Historic and trustworthy',
    style: { fontFamily: 'Adobe Caslon Pro, serif', fontSize: '1.1rem' },
  },
  {
    id: 'bodoni',
    name: 'Bodoni',
    category: 'Classic Serif',
    description: 'Bold and dramatic',
    style: { fontFamily: 'Bodoni MT, serif', fontSize: '1.1rem' },
  },

  // ===== HANDWRITTEN =====
  {
    id: 'comic-sans',
    name: 'Casual Hand',
    category: 'Handwritten',
    description: 'Relaxed and friendly',
    style: { fontFamily: 'Comic Sans MS, cursive', fontSize: '1rem' },
  },
  {
    id: 'segoe-script',
    name: 'Segoe Script',
    category: 'Handwritten',
    description: 'Natural and flowing',
    style: { fontFamily: 'Segoe Script, cursive', fontSize: '1.1rem' },
  },
  {
    id: 'lucida-handwriting',
    name: 'Lucida Handwriting',
    category: 'Handwritten',
    description: 'Graceful and personal',
    style: { fontFamily: 'Lucida Handwriting, cursive', fontSize: '1rem' },
  },
  {
    id: 'bradley-hand',
    name: 'Bradley Hand',
    category: 'Handwritten',
    description: 'Warm and genuine',
    style: { fontFamily: 'Bradley Hand ITC, cursive', fontSize: '1.1rem' },
  },
]

export const recommended = fonts.filter(f => f.category === 'Recommended')

export const categories = [...new Set(
  fonts.filter(f => f.category !== 'Recommended').map(f => f.category)
)]

export const fontsByCategory = (category) =>
  fonts.filter(f => f.category === category)

export default fonts