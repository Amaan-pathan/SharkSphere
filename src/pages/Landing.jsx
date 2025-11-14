import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Users, 
  TrendingUp, 
  Target, 
  Handshake, 
  BarChart3,
  GraduationCap,
  DollarSign,
  CheckCircle2,
  Rocket,
  Search,
  FileText,
  Wrench,
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
    <div className="min-h-screen bg-black text-text-primary">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-8 lg:px-20 overflow-hidden">
        <div className="max-w-content mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-gold-muted/30 text-gold-muted text-sm font-medium">
                Entrepreneurship Cell • NST
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-hero sm:text-[4.5rem] lg:text-[5rem] font-extrabold mb-8 leading-[1.05] tracking-tight text-text-primary"
            >
              Build Startups. Find Co-Founders. Get Funded.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-lg text-text-secondary mb-12 leading-relaxed max-w-text"
            >
              The NST startup ecosystem connects ambitious founders, validates ideas through community feedback, 
              and provides a clear pathway from concept to funded company.
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

      {/* Mission Section - Alternating background */}
      <section className="py-20 px-8 lg:px-20 bg-charcoal">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-3xl"
          >
            <h2 className="text-h1 font-bold mb-6 leading-tight text-text-primary">
              We help students go from idea → product → funded startup.
            </h2>
            <p className="text-body-lg text-text-secondary leading-relaxed">
              Every successful startup begins with validation. We provide the platform, community, 
              and resources to turn your vision into reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why This Platform Exists */}
      <section className="py-20 px-8 lg:px-20 bg-black">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mb-16 max-w-3xl"
          >
            <h2 className="text-h1 font-bold mb-8 text-text-primary">Why This Platform Exists</h2>
            <div className="space-y-6 text-body text-text-secondary leading-relaxed">
              <p>
                Most student startups fail because they build in isolation. They don't validate ideas, 
                can't find co-founders, and lack access to mentorship and funding.
              </p>
              <p>
                NST E-Cell solves this by creating a structured ecosystem where:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-muted mt-1 flex-shrink-0" strokeWidth={2} />
                  <span>Ideas get validated through community feedback before you invest time building</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-muted mt-1 flex-shrink-0" strokeWidth={2} />
                  <span>Founders connect with complementary skills to form strong teams</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-muted mt-1 flex-shrink-0" strokeWidth={2} />
                  <span>Stage-based progression guides you from ideation to launch</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-muted mt-1 flex-shrink-0" strokeWidth={2} />
                  <span>Mentorship and funding pathways are built into the platform</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Icon-based features - Stripe/Notion style */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Validate Early',
                description: 'Get feedback from experienced entrepreneurs before you build.',
              },
              {
                icon: Handshake,
                title: 'Find Co-Founders',
                description: 'Connect with students who share your vision and complement your skills.',
              },
              {
                icon: TrendingUp,
                title: 'Track Progress',
                description: 'Move through stages with clear milestones and community support.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-gold-muted" strokeWidth={1.5} />
                </div>
                <h3 className="text-h3 font-semibold mb-2 text-text-primary">{feature.title}</h3>
                <p className="text-body text-text-secondary leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features - Alternating background */}
      <section className="py-20 px-8 lg:px-20 bg-charcoal">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mb-16"
          >
            <h2 className="text-h1 font-bold mb-4 text-text-primary">Key Features</h2>
            <p className="text-body-lg text-text-secondary max-w-text">
              Everything you need to build and launch your startup
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            <FeatureCard
              icon={Lightbulb}
              title="Post Your Startup Idea"
              description="Share your vision with the community. Get feedback, validation, and early supporters for your startup concept."
              delay={0}
            />
            <FeatureCard
              icon={Users}
              title="Join Startups You Believe In"
              description="Discover promising ideas and join teams as a co-founder. Find projects that align with your skills and interests."
              delay={0.1}
            />
            <FeatureCard
              icon={BarChart3}
              title="Progress Tracking"
              description="Monitor your startup's journey through each stage. Set milestones, track metrics, and celebrate wins."
              delay={0.2}
            />
            <FeatureCard
              icon={GraduationCap}
              title="Mentorship"
              description="Connect with experienced entrepreneurs, industry experts, and alumni who can guide your startup journey."
              delay={0.3}
            />
            <FeatureCard
              icon={DollarSign}
              title="Funding Pathway"
              description="Access resources, pitch opportunities, and funding connections. StartX-style support for student startups."
              delay={0.4}
            />
          </div>

          {/* Stage-Based Validation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h3 className="text-h2 font-bold mb-10 text-text-primary">Stage-Based Validation</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { stage: 'Ideation', description: 'Validate problem-solution fit', icon: Lightbulb },
                { stage: 'Research', description: 'Market analysis and user research', icon: Search },
                { stage: 'Business Model', description: 'Define revenue and strategy', icon: FileText },
                { stage: 'Prototype', description: 'Build and test your MVP', icon: Wrench },
                { stage: 'Launch', description: 'Go to market and scale', icon: Rocket },
              ].map((stage, index) => (
                <StageCard
                  key={index}
                  stage={stage.stage}
                  description={stage.description}
                  icon={stage.icon}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join? */}
      <section className="py-20 px-8 lg:px-20 bg-black">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mb-16"
          >
            <h2 className="text-h1 font-bold mb-4 text-text-primary">Why Join?</h2>
            <p className="text-body-lg text-text-secondary max-w-text">
              Join hundreds of founders building the next generation of startups
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Structured Path',
                description: 'Clear stages from idea to launch with community support at each step.',
              },
              {
                title: 'Access to Network',
                description: 'Connect with mentors, investors, and fellow founders in the NST ecosystem.',
              },
              {
                title: 'Validation First',
                description: 'Test ideas before building. Save time and resources by validating early.',
              },
              {
                title: 'Co-Founder Matching',
                description: 'Find the right team members with complementary skills and shared vision.',
              },
              {
                title: 'Funding Opportunities',
                description: 'Access to pitch events, grants, and investor connections for student startups.',
              },
              {
                title: 'Real-World Experience',
                description: 'Build a real startup while learning entrepreneurship through practice.',
              },
            ].map((benefit, index) => (
              <BenefitCard
                key={index}
                title={benefit.title}
                description={benefit.description}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Built for Founders, by Founders - Alternating background */}
      <section className="py-20 px-8 lg:px-20 bg-charcoal">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-3xl"
          >
            <h2 className="text-h1 font-bold mb-6 text-text-primary">
              Built for Founders, by Founders
            </h2>
            <p className="text-body-lg text-text-secondary leading-relaxed">
              This platform was created by student entrepreneurs who experienced the challenges of building 
              startups in isolation. We've built the tools and community we wish we had when we started.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - YC Style */}
      <section className="py-20 px-8 lg:px-20 bg-black">
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-h1 font-bold mb-6 text-text-primary">
              Start Building at NST E-Cell
            </h2>
            <p className="text-body-lg text-text-secondary mb-10 leading-relaxed">
              Join the community of founders turning ideas into funded startups. 
              Your startup journey starts here.
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
      <footer className="py-16 px-8 lg:px-20 border-t border-charcoal bg-surface">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center">
                  <span className="text-black font-bold">E</span>
                </div>
                <div>
                  <div className="font-semibold text-text-primary">E-Cell</div>
                  <div className="text-xs text-gold-muted font-semibold uppercase tracking-wider">NST</div>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Building the next generation of entrepreneurs
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-text-primary">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/dashboard" className="text-text-secondary hover:text-gold transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/create-idea" className="text-text-secondary hover:text-gold transition-colors">
                    Create Idea
                  </Link>
                </li>
                <li>
                  <a href="mailto:ecell@nst.edu.in" className="text-text-secondary hover:text-gold transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-text-primary">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-text-secondary hover:text-gold transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-text-secondary hover:text-gold transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-text-secondary hover:text-gold transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-charcoal text-center text-sm text-text-muted">
            <p>© 2024 E-Cell NST. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
