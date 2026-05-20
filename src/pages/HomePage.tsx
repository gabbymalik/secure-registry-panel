import { ShieldCheck, ArrowRight, UserPlus, LogIn, Lock, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4"
        >
          <Zap className="h-4 w-4 fill-current" />
          <span>The Ultimate User Portal</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground"
        >
          Secure Access for <span className="text-primary italic">Everyone.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Join our platform to experience seamless authentication and a powerful admin dashboard. 
          Manage your account and view the community in one place.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link to="/signup">
            <Button size="lg" className="h-12 px-8 text-base gap-2 group">
              <UserPlus className="h-5 w-5" />
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2">
              <LogIn className="h-5 w-5" />
              Sign In
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16"
        >
          {[
            { icon: Lock, title: "Secure Auth", desc: "Reliable sign up and login flow." },
            { icon: ShieldCheck, title: "Admin Panel", desc: "Advanced dashboard for management." },
            { icon: Users, title: "Community", desc: "Browse through our growing user list." }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors text-left space-y-3">
              <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}