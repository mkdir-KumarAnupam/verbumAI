"use client";

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const TeamPage = () => {
  const team = [
    {
      name: 'Anupam Kumar',
      initials: 'AK',
      role: 'Lead Developer',
      description: 'Computer Science student passionate about web development. Currently exploring full-stack technologies and leading our team projects.',
      social: {}
    },
    {
      name: 'Harshita Mugdha',
      initials: 'HM',
      role: 'AI Engineer',
      description: 'Fascinated by AI technology and its potential. Working on natural language processing projects while learning the fundamentals.',
      social: {}
    },
    {
      name: 'Pawandeep Kaur',
      initials: 'PK',
      role: 'AI Engineer',
      description: 'Enthusiastic about AI and machine learning. Learning and implementing ML algorithms for real-world applications.',
      social: {}
    },
    
    {
      name: 'Aditya',
      initials: 'A',
      role: 'Backend Database Handler',
      description: 'Learning the ins and outs of database management. Keen on building efficient and scalable backend solutions.',
      social: {}
    },
    {
      name: 'Simranjeet Kaur',
      initials: 'SK',
      role: 'UI/UX Designer',
      description: 'Creative mind with an eye for design. Exploring modern UI/UX principles to create engaging user experiences.',
      social: {}
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <>
    <Navbar />
    <div className="h-[calc(100vh)] bg-black overflow-hidden"> {/* Assuming 64px navbar height */}
      <div className="container mx-auto px-4 py-8 mt-36">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4"
          >
            <div className="text-xs font-mono tracking-widest text-purple-500 bg-purple-500/10 px-3 py-1 rounded-full">
              Our Team
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-3 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-transparent bg-clip-text"
          >
            Meet the Innovators
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base"
          >
            Sleeping minds from the 24Hours Long Hackathon
          </motion.p>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-3 gap-4 mb-4">
            {team.slice(0, 3).map((member, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-purple-500/10 p-4 rounded-2xl transition-all duration-300 group-hover:border-purple-500/30">
                  <div className="mb-3">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center transition-all duration-300 group-hover:border-purple-500/40">
                      <span className="text-sm font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {member.initials}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-center mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {member.name}
                    </h3>
                    <p className="text-purple-400/80 text-xs text-center font-medium mb-2">{member.role}</p>
                    <p className="text-zinc-400 text-xs text-center leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-[66%] mx-auto">
            {team.slice(3).map((member, index) => (
              <motion.div
                key={index + 3}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-purple-500/10 p-4 rounded-2xl transition-all duration-300 group-hover:border-purple-500/30">
                  <div className="mb-3">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center transition-all duration-300 group-hover:border-purple-500/40">
                      <span className="text-sm font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {member.initials}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-center mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {member.name}
                    </h3>
                    <p className="text-purple-400/80 text-xs text-center font-medium mb-2">{member.role}</p>
                    <p className="text-zinc-400 text-xs text-center leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default TeamPage;