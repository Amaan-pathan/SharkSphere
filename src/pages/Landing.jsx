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
  ArrowRight,
  TrendingUp,
  Sparkles,
  Layers,
  Info,
  Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import StageCard from '../components/StageCard.jsx';
import BenefitCard from '../components/BenefitCard.jsx';
import favicon from '../assets/favicon.jpeg';

const Landing = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-heading">
      {/* Hero Section with Animated Background */}
      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-section-lg px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-DEFAULT/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-neon/10 rounded-full blur-3xl"
          />
          <div className="bg-mesh-soft" />
          <div className="bg-dots-soft" />
          <div className="bg-circuits" />
        </div>

        <div className="max-w-content mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl"
          >
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-purple-accent/30 text-purple-neon text-xs sm:text-sm font-medium">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">NST E-Cell • Shark Sphere</span>
                <span className="sm:hidden">NST E-Cell</span>
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-hero font-bold mb-4 sm:mb-6 leading-[1.1] tracking-tight text-text-heading section-glow"
            >
              Build Startups. Find Co-Founders. Get Funded.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-lg text-text-body/90 mb-6 sm:mb-10 leading-relaxed max-w-text"
            >
              A platform for NST students to turn ideas into real companies — with structured validation, mentorship, and eligibility for StartX seed funding up to ₹1 Cr.
            </motion.p>

            {!user ? (
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
              >
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button size="lg" variant="neon" className="group w-full sm:w-auto">
                    Start Your Startup
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">Explore Ideas</Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div variants={itemVariants} className="w-full sm:w-auto">
                <Link to="/dashboard" className="block w-full sm:w-auto">
                  <Button size="lg" variant="neon" className="w-full sm:w-auto">Go to Ideas</Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Tagline Band */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-y border-border/50">
        <div className="max-w-content mx-auto text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-h3 font-semibold text-text-heading max-w-4xl mx-auto leading-relaxed"
          >
            NST's launchpad for student founders—where ideas grow into startups and startups grow into companies.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-section px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="bg-hex-network" />
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'Active Ideas', value: '50+', icon: Lightbulb },
              { label: 'Founders', value: '200+', icon: Users },
              { label: 'Funded Startups', value: '12', icon: DollarSign },
              { label: 'Success Rate', value: '85%', icon: TrendingUp },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card glass className="text-center p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-DEFAULT/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-neon" />
                  </div>
                  <div className="text-xl sm:text-h2 font-bold text-text-heading mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-text-muted">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-section px-4 sm:px-6 lg:px-12">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-text px-4 sm:px-0"
          >
            <h2 className="text-h1 font-bold mb-4 sm:mb-6 text-text-heading section-glow flex items-center gap-2">
              <Layers className="w-6 h-6 text-purple-neon" />
              What We Do
            </h2>
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
      <section className="py-section px-4 sm:px-6 lg:px-12 border-y border-border/50">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-text px-4 sm:px-0"
          >
            <h2 className="text-h1 font-bold mb-6 text-text-heading section-glow flex items-center gap-2">
              <Info className="w-6 h-6 text-purple-neon" />
              Why This Platform Exists
            </h2>
            <p className="text-body-lg text-text-body leading-relaxed mb-6">
              Most students have ideas. Very few execute.
            </p>
            <p className="text-body-lg text-text-body leading-relaxed mb-8">
              We fix that by giving you:
            </p>
            <ul className="space-y-4 list-none pl-0">
              {[
                'A committed team',
                'Expert mentorship',
                'Clear milestones',
                'Funding pathways',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 text-body-lg text-text-heading"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-DEFAULT/20 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-purple-neon" strokeWidth={2.5} />
                  </div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            <p className="text-body-lg text-text-body leading-relaxed mt-8">
              This is the infrastructure that turns "college projects" into companies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-section px-4 sm:px-6 lg:px-12">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-16 max-w-text px-4 sm:px-0"
          >
            <h2 className="text-h1 font-bold mb-4 sm:mb-6 text-text-heading section-glow flex items-center gap-2">
              <Star className="w-6 h-6 text-purple-neon" />
              Key Features
            </h2>
            <p className="text-body-lg text-text-body leading-relaxed">
              Everything you need to build and launch your startup.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
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
            <h3 className="text-h2 font-bold mb-4 max-w-text text-text-heading px-4 sm:px-0">
              Stage-Based Validation
            </h3>
            <p className="text-body-lg text-text-body mb-6 sm:mb-10 max-w-text px-4 sm:px-0">
              Every idea is tagged and verified by mentors like Siddharth Maheshwari and domain experts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 sm:px-0">
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
      <section className="py-section px-4 sm:px-6 lg:px-12 border-y border-border/50">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-16 max-w-text px-4 sm:px-0"
          >
            <h2 className="text-h1 font-bold mb-4 sm:mb-6 text-text-heading section-glow flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-neon" />
              Why Join?
            </h2>
            <p className="text-body-lg text-text-body leading-relaxed">
              Join hundreds of founders building the next generation of startups.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
            {[
              'Build a real startup, not a classroom project',
              'Find serious co-founders',
              'Validate faster',
              'Stand out in placements and pitch events',
              'Access mentorship + funding pipeline',
            ].map((benefit, index) => (
              <BenefitCard 
                key={index}
                title={benefit} 
                delay={index * 0.05} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Founder Philosophy Section */}
      <section className="py-section px-4 sm:px-6 lg:px-12">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-text px-4 sm:px-0"
          >
            <h2 className="text-h1 font-bold mb-4 sm:mb-6 text-text-heading section-glow flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-neon" />
              About Shark Sphere
            </h2>
            <p className="text-body-lg text-text-body leading-relaxed">
              Shark Sphere is the entrepreneurial backbone of NST — where ideas get built, teams get formed, and students become founders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-section-lg px-4 sm:px-6 lg:px-12 border-y border-border/50 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-DEFAULT/5 via-purple-neon/5 to-purple-DEFAULT/5" />
        
        <div className="max-w-content mx-auto text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h1 font-bold mb-4 sm:mb-6 text-text-heading">Start Building</h2>
            <p className="text-body-lg text-text-body mb-6 sm:mb-10 leading-relaxed max-w-text mx-auto">
              Become part of NST's startup ecosystem. Your co-founder, your team, and your funding are one click away.
            </p>
            {!user ? (
              <Link to="/signup" className="inline-block w-full sm:w-auto">
                <Button size="lg" variant="neon" className="group w-full sm:w-auto">
                  Register Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard" className="inline-block w-full sm:w-auto">
                <Button size="lg" variant="neon" className="w-full sm:w-auto">Go to Ideas</Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-t border-border/50 bg-bg-primary">
        <div className="max-w-content mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg overflow-hidden shadow-glow-purple">
                <img src={favicon} alt="NST E-Cell Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-text-heading">NST E-Cell</div>
                <div className="text-xs text-purple-neon font-semibold uppercase tracking-wider">Shark Sphere</div>
              </div>
            </div>
            <ul className="flex flex-wrap justify-center sm:justify-end gap-x-8 gap-y-4 text-sm">
              <li>
                <Link to="/dashboard" className="text-text-body hover:text-purple-neon transition-colors">
                  Ideas
                </Link>
              </li>
              <li>
                <Link to="/create-idea" className="text-text-body hover:text-purple-neon transition-colors">
                  Create Idea
                </Link>
              </li>
              <li>
                <a href="mailto:admin@sharksphere.club" className="text-text-body hover:text-purple-neon transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="pt-8 mt-8 border-t border-border/50 text-center text-sm text-text-muted">
            <p>© {new Date().getFullYear()} NST E-Cell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
