import { PenLine, Heart, Star } from 'lucide-react'
import lifestyleHero from '../assets/images/lifestyle-hero.png'

function About() {
  return (
    <div>

      {/* ===== HERO SECTION ===== */}
      <section className="bg-brand-cream px-6 md:px-16 py-16 md:py-24 text-center">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
          Our Story
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
          Write It! Make It Plain.
        </h1>
        <p className="text-brand-brown opacity-70 text-sm md:text-base max-w-2xl mx-auto">
          Born out of a desire to help people live intentionally —
          one page at a time.
        </p>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center py-4 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20"></div>
      </div>

      {/* ===== MISSION SECTION ===== */}
<section className="bg-brand-cream px-6 md:px-16 py-12 md:py-20">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">

    {/* Text Content */}
    <div className="flex flex-col items-start text-left justify-center min-h-[500px]">
      <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
        Our Mission
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-brand-brown mb-6">
        Why We Exist
      </h2>
      <p className="text-brand-brown opacity-70 leading-relaxed mb-4 text-sm md:text-base">
        At TheHabakkuk2&#58;2, we believe every person carries a vision
        worth writing down. Habakkuk 2:2 says —{' '}
        <span className="text-brand-green font-semibold italic">
          "Write the vision and make it plain."
        </span>{' '}
        That is exactly what we exist to help you do.
      </p>
      <p className="text-brand-brown opacity-70 leading-relaxed text-sm md:text-base">
        Our journals are more than just notebooks — they are tools for
        clarity, gratitude, prayer, and intentional living. Premium faux
        leather write-kits crafted for reflection and beauty in your
        quiet moments. Whether you are a student, a professional, or
        someone on a faith journey, there is a journal here for you.
      </p>
    </div>

    {/* Image */}
    <div className="rounded-3xl overflow-hidden shadow-sm">
      <img
        src={lifestyleHero}
        alt="Journaling lifestyle"
        className="w-full h-72 md:h-[500px] object-cover"
      />
    </div>

  </div>
</section>

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center py-4 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20"></div>
      </div>

      {/* ===== VALUES SECTION ===== */}
      <section className="bg-brand-cream px-6 md:px-16 py-12 md:py-20">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4 text-center">
          What We Stand For
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-brand-brown mb-10 md:mb-12">
          Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-cream flex items-center justify-center mx-auto mb-4">
              <PenLine className="text-brand-green w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="font-bold text-brand-brown mb-2">Intentionality</h3>
            <p className="text-brand-brown opacity-60 text-sm leading-relaxed">
              We design every journal to help you live and think with purpose.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-cream flex items-center justify-center mx-auto mb-4">
              <Heart className="text-brand-green w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="font-bold text-brand-brown mb-2">Faith</h3>
            <p className="text-brand-brown opacity-60 text-sm leading-relaxed">
              Rooted in scripture, our products are created to deepen your
              walk with God.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-cream flex items-center justify-center mx-auto mb-4">
              <Star className="text-brand-green w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="font-bold text-brand-brown mb-2">Quality</h3>
            <p className="text-brand-brown opacity-60 text-sm leading-relaxed">
              Every journal is crafted with care — because your vision
              deserves the best.
            </p>
          </div>

        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center py-4 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20"></div>
      </div>

      {/* ===== CLOSING SECTION ===== */}
      <section className="bg-brand-cream px-6 md:px-16 py-12 md:py-20 flex flex-col items-center text-center">
        <div className="bg-white rounded-3xl px-6 md:px-16 py-10 md:py-14 w-full max-w-4xl shadow-sm">
          <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
            Habakkuk 2:2
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-brown mb-4">
            This Is His Story
          </h2>
          <p className="text-brand-brown opacity-70 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
            TheHabakkuk2&#58;2 is not about one person — it is about a vision
            God placed in a heart and the faithfulness to write it down.
            Every journal that leaves our hands carries a prayer that it
            will help someone write their own vision and walk boldly in
            it. To God be all the glory.
          </p>
        </div>
      </section>

    </div>
  )
}

export default About