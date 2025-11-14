import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Users, 
  BarChart3,
  GraduationCap,
  DollarSign,
  Check,
  Target,
  Search,
  Briefcase,
  Wrench,
  Rocket,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/Button.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import StageCard from '../components/StageCard.jsx';
import BenefitCard from '../components/BenefitCard.jsx';

const Landing = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-heading">
      {/* Hero Section */}
      <section className="relative pt-28 pb-section px-6 sm:px-8 lg:px-12 overflow-hidden">
        <div className="max-w-content mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.h1
              variants={itemVariants}
              className="text-hero font-semibold mb-6 leading-[1.2] tracking-tight text-text-heading"
            >
              Build Startups. Find Co-Founders. Get Funded.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-lg text-text-body mb-10 leading-relaxed max-w-text"
            >
              A platform for NST students to turn ideas into real companies — with structured validation, mentorship, and eligibility for StartX seed funding up to ₹1 Cr.
            </motion.p>

            {!user ? (
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4"
              >
                <Link to="/signup">
                  <Button size="lg" className="group">
                    Start Your Startup
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="secondary" size="lg">Explore Ideas</Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div variants={itemVariants}>
                <Link to="/dashboard">
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Tagline Band */}
      <section className="py-12 px-6 sm:px-8 lg:px-12 border-y border-border">
        <div className="max-w-content mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-body-lg text-text-heading font-medium max-w-3xl mx-auto"
          >
            NST's launchpad for student founders—where ideas grow into startups and startups grow into companies.
          </motion.p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-section px-6 sm:px-8 lg:px-12">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-text"
          >
            <h2 className="text-h1 font-semibold mb-6 text-text-heading">What We Do</h2>
            <p className="text-body-lg text-text-body leading-relaxed mb-4">
              We help students go from idea → product → funded startup.
            </p>
            <p className="text-body-lg text-text-body leading-relaxed">
              Post ideas, find teammates, validate fast, and get tracked through every stage of your founder journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why This Platform Exists */}
      <section className="py-section px-6 sm:px-8 lg:px-12 border-y border-border">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-text"
          >
            <h2 className="text-h1 font-semibold mb-6 text-text-heading">Why This Platform Exists</h2>
            <p className="text-body-lg text-text-body leading-relaxed mb-6">
              Most students have ideas. Very few execute.
            </p>
            <p className="text-body-lg text-text-body leading-relaxed mb-8">
              We fix that by giving you:
            </p>
            <ul className="space-y-4 list-none pl-0">
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-3 text-body-lg text-text-heading"
              >
                <Check className="w-5 h-5 text-purple-accent flex-shrink-0 mt-1" strokeWidth={2} />
                <span>A committed team</span>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-start gap-3 text-body-lg text-text-heading"
              >
                <Check className="w-5 h-5 text-purple-accent flex-shrink-0 mt-1" strokeWidth={2} />
                <span>Expert mentorship</span>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-start gap-3 text-body-lg text-text-heading"
              >
                <Check className="w-5 h-5 text-purple-accent flex-shrink-0 mt-1" strokeWidth={2} />
                <span>Clear milestones</span>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-start gap-3 text-body-lg text-text-heading"
              >
                <Check className="w-5 h-5 text-purple-accent flex-shrink-0 mt-1" strokeWidth={2} />
                <span>Funding pathways</span>
              </motion.li>
            </ul>
            <p className="text-body-lg text-text-body leading-relaxed mt-8">
              This is the infrastructure that turns "college projects" into companies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-section px-6 sm:px-8 lg:px-12">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-text"
          >
            <h2 className="text-h1 font-semibold mb-6 text-text-heading">Key Features</h2>
            <p className="text-body-lg text-text-body leading-relaxed">
              Everything you need to build and launch your startup.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureCard
              icon={Lightbulb}
              title="Post Your Startup Idea"
              description="Share your idea with the NST community. Specify what you need — co-founders, devs, designers, marketers."
              delay={0}
            />
            <FeatureCard
              icon={Users}
              title="Join Startups You Believe In"
              description="Browse ideas, join teams, like or dislike startup concepts to help the best ones rise."
              delay={0.1}
            />
            <FeatureCard
              icon={BarChart3}
              title="Progress Tracking"
              description="Founders get a clear roadmap, milestones, and weekly tasks to move from idea to MVP."
              delay={0.2}
            />
            <FeatureCard
              icon={GraduationCap}
              title="On-Demand Mentorship"
              description="Mentors join your team at the right stage — research, prototype, GTM, fundraising."
              delay={0.3}
            />
            <FeatureCard
              icon={DollarSign}
              title="Pathway to Funding"
              description="As your startup progresses, the platform auto-detects when you're ready to apply for StartX funding (up to ₹1 Cr)."
              delay={0.4}
            />
          </div>

          {/* Stage-Based Validation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-h2 font-semibold mb-10 max-w-text text-text-heading">
              Stage-Based Validation
            </h3>
            <p className="text-body-lg text-text-body mb-10 max-w-text">
              Every idea is tagged and verified by mentors like Siddharth Maheshwari and domain experts.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <StageCard 
                stage="Ideation" 
                description="Validate problem-solution fit" 
                icon={Target} 
                delay={0} 
              />
              <StageCard 
                stage="User Research" 
                description="Market analysis and user research" 
                icon={Search} 
                delay={0.05} 
              />
              <StageCard 
                stage="Business Model" 
                description="Define revenue and strategy" 
                icon={Briefcase} 
                delay={0.1} 
              />
              <StageCard 
                stage="Prototype" 
                description="Build and test your MVP" 
                icon={Wrench} 
                delay={0.15} 
              />
              <StageCard 
                stage="Launch" 
                description="Go to market and scale" 
                icon={Rocket} 
                delay={0.2} 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-section px-6 sm:px-8 lg:px-12 border-y border-border">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-text"
          >
            <h2 className="text-h1 font-semibold mb-6 text-text-heading">Why Join?</h2>
            <p className="text-body-lg text-text-body leading-relaxed">
              Join hundreds of founders building the next generation of startups.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard 
              title="Build a real startup, not a classroom project" 
              delay={0} 
            />
            <BenefitCard 
              title="Find serious co-founders" 
              delay={0.05} 
            />
            <BenefitCard 
              title="Validate faster" 
              delay={0.1} 
            />
            <BenefitCard 
              title="Stand out in placements and pitch events" 
              delay={0.15} 
            />
            <BenefitCard 
              title="Access mentorship + funding pipeline" 
              delay={0.2} 
            />
          </div>
        </div>
      </section>

      {/* Founder Philosophy Section */}
      <section className="py-section px-6 sm:px-8 lg:px-12">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-text"
          >
            <h2 className="text-h1 font-semibold mb-6 text-text-heading">About Shark Sphere</h2>
            <p className="text-body-lg text-text-body leading-relaxed">
              Shark Sphere is the entrepreneurial backbone of NST — where ideas get built, teams get formed, and students become founders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-section-lg px-6 sm:px-8 lg:px-12 border-y border-border">
        <div className="max-w-content mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h1 font-semibold mb-6 text-text-heading">Start Building</h2>
            <p className="text-body-lg text-text-body mb-10 leading-relaxed max-w-text mx-auto">
              Become part of NST's startup ecosystem. Your co-founder, your team, and your funding are one click away.
            </p>
            {!user ? (
              <Link to="/signup">
                <Button size="lg" className="group">
                  Register Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 sm:px-8 lg:px-12 border-t border-border bg-bg-primary">
        <div className="max-w-content mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-card bg-purple-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <div className="font-bold text-text-heading">NST E-Cell</div>
                <div className="text-xs text-text-muted font-semibold uppercase tracking-wider">Shark Sphere</div>
              </div>
            </div>
            <ul className="flex flex-wrap justify-center sm:justify-end gap-x-8 gap-y-4 text-sm">
              <li>
                <Link to="/dashboard" className="text-text-body hover:text-purple-accent transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/create-idea" className="text-text-body hover:text-purple-accent transition-colors">
                  Create Idea
                </Link>
              </li>
              <li>
                <a href="mailto:ecell@nst.edu.in" className="text-text-body hover:text-purple-accent transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="pt-8 mt-8 border-t border-border text-center text-sm text-text-muted">
            <p>© {new Date().getFullYear()} NST E-Cell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
