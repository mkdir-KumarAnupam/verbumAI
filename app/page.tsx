"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Zap, Languages, ChevronRight, Brain, Sparkles } from 'lucide-react';
import CardStack from './components/CardStack';
import { useUser } from '@clerk/nextjs';
import Navbar from './components/Navbar';
import useTypewriter from '../hooks/useTypewriter';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const { user } = useUser();
  const typewriterText = useTypewriter(
    [
      'Master Your Native Tongue',
      'Fluent Starts Here',
      'Think. Speak. Master.',
      'Speak with Confidence',
      'Learn. Practice. Master.',
      'Words Unlock Worlds',
      'Elevate Your Speech',
      'Explore, Express, Excel',
      'Language is Power',
      'Go Basic to Brilliant',
      'Every Word Counts',
    ],
    200
  );

  const difficultyLevels = [
    {
      level: 'A1 (Beginner)',
      description: 'Learners can understand and use basic phrases and expressions.'
    },
    {
      level: 'A2 (Elementary)',
      description: 'Learners can understand frequently used expressions related to everyday life.'
    },
    {
      level: 'B1 (Intermediate)',
      description: 'Learners produce simple connected text on familiar topics, express opinions, and describe events, in a limited way.'
    },
    {
      level: 'B2 (Upper Intermediate)',
      description: 'Learners are capable of debating, discussing, and analyzing subjects in some depth.'
    },
    {
      level: 'C1 (Advanced)',
      description: 'Learners can understand a wide range of demanding, long texts and recognize implicit meaning.'
    },
    {
      level: 'C2 (Proficiency)',
      description: 'Learners at the C2 level have mastered the language.'
    }
  ];

  const features = [
    {
      title: 'Learn actively',
      description: 'Each time you look at a flashcard, you attempt to recall the word or phrase, which enhances your ability to remember it over time.',
      icon: Brain
    },
    {
      title: 'Practice spaced repetition',
      description: 'Reinforce challenging concepts with a scientifically proven method for boosting memory retention.',
      icon: Sparkles
    },
    {
      title: 'Focus on Core Vocabulary',
      description: 'Learn high-frequency words and phrases most commonly used in everyday conversations and essential for language fluency.',
      icon: Languages
    }
  ];

  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: difficultyRef, inView: difficultyInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/20 px-4 py-1">
                <Zap className="w-4 h-4 mr-2" />
                50+ Languages Available
              </Badge>

              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-white">Good morning, {user?.firstName || 'Learner'}, </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">{typewriterText}</span>
                <br />
              </h1>

              <p className="text-lg text-gray-400 max-w-xl">
                Did you know? Learning a new language can improve your memory, problem-solving skills, and even your understanding of your native language.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Link href="/create">
                    Get started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex-1">
              <CardStack />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20" ref={featuresRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-black/50 border-purple-500/20 backdrop-blur-sm p-6 hover:bg-black/60 transition-all duration-300">
                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Difficulty Levels */}
      <div className="container mx-auto px-4 py-20" ref={difficultyRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={difficultyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Difficulty Levels
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {difficultyLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={difficultyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-black/50 border-purple-500/20 backdrop-blur-sm p-6 hover:bg-black/60 transition-all duration-300">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">{level.level}</h3>
                  <p className="text-gray-400 text-sm">{level.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link 
              href="/"
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
            >
              Ver<span className="text-purple-400">bum</span>
            </Link>
            <div className="flex items-center space-x-4">
              {/* Add any additional footer links or content here */}
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}