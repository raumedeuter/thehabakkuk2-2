import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'What is H22?',
    answer:
      'H22 is primarily a journal shop, but preferably described as a write-kit shop — a shop where you get what you need to develop and practise the mindful practice of writing.',
  },
  {
    id: 2,
    question: 'Why does H22 exist?',
    answer:
      'We seek to urge humans to sit still and discover the beauty there in. To sit with themselves, to sit with their thoughts and to sit with God. We seek to encourage mindful living by promoting the mindful and healthy practice of writing.',
  },
  {
    id: 3,
    question: 'Why do you believe in writing?',
    answer:
      'We believe the mindful practice of writing helps maintain a sound mind, ultimately fostering the growth of a human.',
  },
    {
    id: 4,
    question: 'Who is H22 for?',
    answer:
      'H22 is for anyone who desires to slow down, sit with their thoughts, write, reflect and cultivate a more intentional way of living.',
  },
  {
    id: 5,
    question: 'Can I customize my journal?',
    answer:
      'Yes. Selected journals can be customised to make your writing experience more personal.\nYou can choose from the available customisation options, including your preferred font style and the message you would like written on your journal.\nSimply select the customisation option when purchasing an eligible journal and follow the steps in the custom journal builder.',
  },
  {
    id: 6,
    question: 'How do I place an order?',
    answer:
      'Browse through our journals and select the one you\'d like. From the product page, you can choose to purchase the journal as it is or personalise it if customisation is available.\nAdd your journal(s) to your cart, proceed to checkout, provide your delivery details and complete your payment.\nOnce your order has been successfully placed, you\'ll receive an order confirmation.',
  },
  {
    id: 7,
    question: 'Do you deliver?',
    answer:
      'Yes. H22 offers delivery to customers across Nigeria.\nDuring checkout, select your state and preferred delivery option to see the applicable delivery details and complete your order.\nIf you have any questions about delivery, you can reach out to us through our Contact Us page.',
  }
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-brand-gold border-opacity-20 last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-opacity-50 rounded-sm"
      >
        <span className="text-brand-brown font-semibold text-sm md:text-base leading-snug pr-2">
          {faq.question}
        </span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full border border-brand-gold border-opacity-40 flex items-center justify-center text-brand-gold">
          {isOpen
            ? <Minus className="w-3 h-3" />
            : <Plus className="w-3 h-3" />
          }
        </span>
      </button>

      {/* Answer — CSS max-height transition, no JS animation library needed */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? '400px' : '0px' }}
        aria-hidden={!isOpen}
      >
        <p className="text-brand-brown opacity-70 text-sm md:text-base leading-relaxed pb-5 md:pb-6 pr-10">
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

function FAQAccordion() {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => {
    setOpenId(prev => prev === id ? null : id)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm px-5 md:px-8 max-w-3xl mx-auto">
      {faqs.map((faq) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          isOpen={openId === faq.id}
          onToggle={() => toggle(faq.id)}
        />
      ))}
    </div>
  )
}

export default FAQAccordion