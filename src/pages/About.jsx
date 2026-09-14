import lifestyleHero from '../assets/images/lifestyle-hero.png'
import lifestyleAbout from '../assets/images/lifestyle-about.png'
import lifestyleShop from '../assets/images/lifestyle-shop.png'

function About() {
  return (
    <div className="bg-brand-cream">

      {/* ===== HERO ===== */}
      {/*
        Full-bleed image with overlay — gives the hero a strong visual identity
        distinct from the plain sections below. The image communicates journaling
        lifestyle immediately. Text sits bottom-left for an editorial feel.
      */}
      <section
        className="relative min-h-[420px] md:min-h-[520px] flex flex-col justify-end overflow-hidden"
        style={{
          backgroundImage: `url(${lifestyleShop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay — darker at bottom so text is always legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-brand-brown/40 to-transparent" />

        <div className="relative z-10 px-6 md:px-16 pb-10 md:pb-16 max-w-2xl">
          <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-3">
            Our Story
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Write It! Make It Plain.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed">
            Born out of a desire to help people live intentionally —
            one page at a time.
          </p>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center py-4 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20" />
      </div>

      {/* ===== SECTION 1 — WHAT IS H22? ===== */}
      {/*
        Two-column: text left, image right.
        Uses items-center so image and text align vertically.
        On mobile the image drops below the text naturally.
      */}
      <section className="px-6 md:px-16 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl mx-auto">

          {/* Text */}
          <div>
            <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-3">
              What is H22?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-brown mb-5 leading-snug">
              A Write-Kit Shop.
            </h2>
            <p className="text-brand-brown/70 leading-relaxed text-sm md:text-base mb-3">
              H22 is primarily a journal shop — but preferably described as a{' '}
              <span className="text-brand-green font-medium">write-kit shop</span>.
            </p>
            <p className="text-brand-brown/70 leading-relaxed text-sm md:text-base">
              A shop where you get what you need to develop and practise the
              mindful practice of writing.
            </p>
          </div>

          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <img
              src={lifestyleHero}
              alt="Journals and writing accessories laid out on grass"
              className="w-full h-56 md:h-80 object-cover"
            />
          </div>

        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center py-4 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20" />
      </div>

      {/* ===== SECTION 2 — OUR WHY ===== */}
      {/*
        Two-column: image left, text right — alternates from Section 1.
        md:order classes handle the alternation cleanly without duplicating markup.
      */}
      <section className="px-6 md:px-16 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl mx-auto">

          {/* Image — visually first on desktop (order-1), second on mobile (default) */}
          <div className="rounded-2xl overflow-hidden shadow-sm md:order-1 order-2">
            <img
              src={lifestyleAbout}
              alt="A person journaling in a calm setting"
              className="w-full h-56 md:h-80 object-cover"
            />
          </div>

          {/* Text — visually second on desktop (order-2), first on mobile (default) */}
          <div className="md:order-2 order-1">
            <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-3">
              Our Why
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-brown mb-5 leading-snug">
              Why Does H22 Exist?
            </h2>
            <p className="text-brand-brown/70 leading-relaxed text-sm md:text-base mb-3">
              We seek to encourage mindful living by promoting the mindful and
              healthy practice of{' '}
              <span className="text-brand-green font-medium">writing</span>.
            </p>
            <p className="text-brand-brown/70 leading-relaxed text-sm md:text-base mb-3">
              We believe the mindful practice of writing helps maintain a sound mind,
              ultimately fostering the growth of a human.
            </p>
             <p className="text-brand-brown/70 leading-relaxed text-sm md:text-base mb-3">
              We seek to urge humans to sit still and discover the beauty therein.
              To sit with themselves, to sit with their thoughts and to sit with God.
            </p>
          </div>

        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center py-4 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20" />
      </div>

      {/* ===== SECTION 3 — THE HEART BEHIND H22 ===== */}
      {/*
        Emotional conclusion — centred, max-w-2xl prose column.
        Narrower than the two-column sections above so it feels more intimate.
        Pull quote and closing card give subtle typographic variety without
        breaking the calm, continuous reading experience.
      */}
      <section className="px-6 md:px-16 py-10 md:py-16">
        <div className="max-w-2xl mx-auto">

          <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-3">
            The Founder's Story
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-brown mb-6 leading-snug">
            The Heart BeHind H22..
          </h2>

          <p className="text-brand-brown/80 leading-relaxed text-sm md:text-base mb-3">
            At seed level it was an idea from my Friend{' '}
            <span className="text-brand-gold">⋆TheHolySpirit⋆</span>
          </p>

          <p className="text-brand-brown/70 leading-relaxed text-sm md:text-base mb-3">
            I believe My Friend trusted me with this idea because of my
            experiential understanding of the beauty that is uncovered in
            pouring on pages with ink{' '}
            <span className="text-brand-green italic font-medium">⋆writing⋆</span> —
            it is one of those things one can only fully understand through experience.
          </p>

          <p className="text-brand-brown/70 leading-relaxed text-sm md:text-base mb-3">
            In our world today{' '}
            <span className="text-brand-brown font-semibold">stillness</span>{' '}
            has become a rarity, with mindfulness practices being drowned out by
            digital noise. Acts of stillness like{' '}
            <span className="text-brand-green font-medium">journaling</span>{' '}
            are getting lost in today's saturated digital space.
          </p>

          {/* Pull quote — subtle left border emphasis */}
          <p className="text-brand-brown font-semibold italic text-sm md:text-base mb-3 pl-4 border-l-2 border-brand-gold/40">
            Stillness is now a lost art — like a very good thing that was
            neglected and now it is hard to get back.
          </p>

          <p className="text-brand-brown/70 leading-relaxed text-sm md:text-base mb-3">
            But intentional quiet moments like{' '}
            <span className="text-brand-green font-medium">journaling</span>{' '}
            help one to{' '}
            <span className="text-brand-brown font-semibold">connect to themselves</span>,{' '}
            <span className="text-brand-brown font-semibold">connect to God</span>,{' '}
            connect to their minds, stay grounded and function better.
            Journaling helps one process emotions, reduce stress, and boost
            self awareness.
          </p>

          <p className="text-brand-brown/70 leading-relaxed text-sm md:text-base mb-4">
            In journaling one finds himself: you sit with your thoughts,
            opinions, and views and own and evaluate them. You draw closer
            to yourself and become a better version of yourself — as opposed
            to a life characterised by noise and not a single moment of stillness.
          </p>

          {/* Closing card — visually distinct conclusion */}
          <div className="bg-white rounded-2xl px-5 py-5 border border-brand-gold/20 mb-5">
            <p className="text-brand-brown font-semibold italic text-sm md:text-base leading-relaxed mb-2">
              For the best you — still moments have to be part of you.
              You have to pause and pour on paper.
            </p>
            <p className="text-brand-brown/70 text-sm md:text-base leading-relaxed">
              And{' '}
              <span className="text-brand-green font-medium">journaling</span>{' '}
              is a good place to start — and the{' '}
              <span className="text-brand-brown font-semibold">H ✶2.2</span>{' '}
              has just the right page for you to pour on.
            </p>
          </div>

          <p className="text-brand-gold text-center text-base tracking-widest opacity-50">
            ⋆✶⋆
          </p>

        </div>
      </section>

    </div>
  )
}

export default About