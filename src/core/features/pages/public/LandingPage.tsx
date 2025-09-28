import { easeOut, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-muted/30 to-white">
      {/* 🔹 Header */}
      <header className="fixed top-0 w-full z-50 border-b bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-xl font-bold text-primary">Investment Capital</h1>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <a className="hover:text-primary transition" href="#about">
              About
            </a>
            <a className="hover:text-primary transition" href="#products">
              Products
            </a>
            <a className="hover:text-primary transition" href="#calculator">
              Calculator
            </a>
            <a className="hover:text-primary transition" href="#fact-sheet">
              Fact Sheet
            </a>
            <a className="hover:text-primary transition" href="#contact">
              Contact
            </a>
          </nav>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <a href="/login">Client Portal</a>
            </Button>
            <Button asChild>
              <a href="/register">Open Account</a>
            </Button>
          </div>
        </div>
      </header>

      {/* 🔹 Hero */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-32 flex items-center">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-5xl font-extrabold text-foreground leading-tight"
            >
              Invest Smart. Grow Secure.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Investment Money Market Fund helps you grow your wealth with
              transparency, flexibility, and professional management.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-4 pt-4"
            >
              <Button size="lg" asChild>
                <a href="/register">Open Account</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#products">Explore Products</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🔹 Features */}
      <section className="py-20 bg-white border-b">
        <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: '💹',
              title: 'Competitive Returns',
              desc: 'Grow your capital with returns benchmarked against government T-Bills.',
            },
            {
              icon: '🔒',
              title: 'Safe & Secure',
              desc: 'Your investments are protected by trusted custodians and regulators.',
            },
            {
              icon: '⚡',
              title: 'Flexible Access',
              desc: 'No lock-in period—deposit or withdraw whenever you need.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="text-4xl">{item.icon}</div>
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 Key Fund Facts */}
      <section className="py-20 bg-muted/30" id="products">
        <div className="container mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Investment Money Market Fund (KES)
          </motion.h3>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { label: 'Currency', value: 'KES' },
              { label: 'Lock-in Period', value: 'No lock-in period' },
              { label: 'Management Fee', value: '2.0% p.a' },
              { label: 'Initial Fees', value: 'NIL' },
              { label: 'Benchmark', value: '91-day T-Bill +1.0% p.a' },
              { label: 'Min. Investment', value: 'KES 100.0' },
              { label: 'Compounding', value: 'Daily' },
              { label: 'Trustee', value: 'XYZ Trustee Ltd' },
              { label: 'Custodian', value: 'ABC Custodian Bank' },
              { label: 'Fund Manager', value: 'Investment Capital Ltd' },
              { label: 'Regulator', value: 'Capital Markets Authority' },
            ].map((fact, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="hover:shadow-xl hover:scale-105 transform transition duration-300 rounded-2xl">
                  <CardContent className="p-6 text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {fact.label}
                    </p>
                    <p className="text-lg font-semibold">{fact.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🔹 Testimonials */}
      <section className="py-20 bg-white border-t border-b">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h3
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            What Our Clients Say
          </motion.h3>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-muted-foreground italic"
          >
            “Investment Capital has completely changed the way I invest. I love the
            transparency and flexibility—they make professional wealth
            management accessible to everyone.”
          </motion.p>
          <p className="mt-4 font-medium">— Jane Doe, Nairobi</p>
        </div>
      </section>

      {/* 🔹 About */}
      <section className="py-20 bg-muted" id="about">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto max-w-4xl text-center space-y-6"
        >
          <motion.h3 variants={fadeInUp} className="text-3xl font-bold">
            About Us
          </motion.h3>
          <motion.p variants={fadeInUp} className="text-muted-foreground">
            Investment Capital is a next-generation wealth management company
            leveraging technology to provide retail investors with access to
            professional-grade investment solutions. We empower you to build
            wealth with transparency, security, and flexibility.
          </motion.p>
        </motion.div>
      </section>

      {/* 🔹 Contact */}
      <section className="py-20 bg-white" id="contact">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto grid md:grid-cols-2 gap-12"
        >
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>📞 +254-700-000-000</li>
              <li>📧 info@investmentcapital.com</li>
              <li>🏢 Investment Towers, 5th Floor, Westlands, Nairobi, Kenya</li>
              <li>Mon - Fri: 0900 - 1700 | Sat-Sun: By appointment</li>
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            <h4 className="text-lg font-medium">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="/faq" className="hover:underline">
                FAQ
              </a>
              <a href="/calculator" className="hover:underline">
                Investment Calculator
              </a>
              <a href="/products" className="hover:underline">
                Our Products
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 🔹 Footer */}
      <footer className="border-t py-10 bg-muted/30">
        <div className="container mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-semibold mb-3">Investment Capital</h4>
            <p className="text-muted-foreground">
              Building wealth responsibly with trust, transparency, and
              technology.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/terms" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Stay Updated</h4>
            <p className="text-muted-foreground mb-3">
              Subscribe to our newsletter for updates.
            </p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 border rounded-lg mb-2"
            />
            <Button className="w-full">Subscribe</Button>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2025 Investment Capital Ltd. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
