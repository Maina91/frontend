import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion, Variants, easeOut } from 'framer-motion'

// ✅ Use Variants type for safety
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
    <div className="flex flex-col min-h-screen">
      {/* 🔹 Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-xl font-bold text-primary">Aurora Capital</h1>
          <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
            <a href="#about">About</a>
            <a href="#products">Products</a>
            <a href="#calculator">Calculator</a>
            <a href="#fact-sheet">Fact Sheet</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <a href="/login">Client Portal</a>
            </Button>
            <Button asChild>
              <a href="/onboarding/signup">Open Account</a>
            </Button>
          </div>
        </div>
      </header>

      {/* 🔹 Hero */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-24">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-foreground"
            >
              Welcome to Aurora Money Market Fund
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground"
            >
              A trusted platform designed to grow your wealth responsibly while
              protecting your capital. Earn competitive returns with complete
              flexibility.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-4 pt-4"
            >
              <Button asChild>
                <a href="/signup">Open Account</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#products">Explore Products</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🔹 Key Fund Facts */}
      <section className="py-20 bg-white" id="products">
        <div className="container mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold text-center mb-12"
          >
            Aurora Money Market Fund (KES)
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
              { label: 'Fund Manager', value: 'Aurora Capital Ltd' },
              { label: 'Regulator', value: 'Capital Markets Authority' },
            ].map((fact, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5 text-center">
                    <p className="text-sm text-muted-foreground">
                      {fact.label}
                    </p>
                    <p className="text-base font-medium">{fact.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex justify-center mt-12 gap-4"
          >
            <Button asChild>
              <a href="/signup">Open Account</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#fact-sheet">Fact Sheet</a>
            </Button>
          </motion.div>
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
          <motion.h3 variants={fadeInUp} className="text-2xl font-semibold">
            About Us
          </motion.h3>
          <motion.p variants={fadeInUp} className="text-muted-foreground">
            Aurora Capital is a next-generation wealth management company
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
              <li>📧 info@auroracapital.com</li>
              <li>🏢 Aurora Towers, 5th Floor, Westlands, Nairobi, Kenya</li>
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
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>
          © 2025 Aurora Capital Ltd ·{' '}
          <a href="/terms" className="hover:underline">
            Terms of Use
          </a>{' '}
          |{' '}
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </p>
      </footer>
    </div>
  )
}
