"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Trophy, HelpCircle, Users2, Bookmark } from 'lucide-react'; // Import Bookmark icon
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

const NavLink = ({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) => {
  return (
    <Link href={href}>
      <motion.div
        className="relative group"
        whileHover="hover"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          variants={{
            hover: {
              scale: 1.1,
            }
          }}
        />
        <motion.div
          className="relative px-4 py-2 rounded-xl bg-zinc-900/50 border border-purple-500/10 backdrop-blur-sm flex items-center space-x-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors group-hover:border-purple-500/30"
          variants={{
            hover: {
              y: -2,
            }
          }}
        >
          <Icon className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
          <span>{children}</span>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-pink-500/0"
            variants={{
              hover: {
                scaleX: 1,
                opacity: 1
              }
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Link href="/" className="relative">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Ver<span className="text-purple-400">bum</span>
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/leaderboard" icon={Trophy}>Leaderboard</NavLink>
            <NavLink href="/team" icon={Users}>Team</NavLink>
            <NavLink href="/friends" icon={Users2}>Friends</NavLink>
            <NavLink href="/support" icon={HelpCircle}>Support</NavLink>
            <NavLink href="/collections" icon={Bookmark}>Collections</NavLink> {/* Add this line */}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group ml-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-1 rounded-full bg-zinc-900/50 border border-purple-500/10 backdrop-blur-sm group-hover:border-purple-500/30">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
                <SignedOut>
                    <SignInButton>
                    <motion.div
                      className="relative group"
                      whileHover="hover"
                    >
                      <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      variants={{
                        hover: {
                        scale: 1.1,
                        }
                      }}
                      />
                      <motion.div
                      className="relative px-4 py-2 rounded-xl bg-zinc-900/50 border border-purple-500/10 backdrop-blur-sm flex items-center space-x-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors group-hover:border-purple-500/30"
                      variants={{
                        hover: {
                        y: -2,
                        }
                      }}
                      >
                      <span>Sign In</span>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-pink-500/0"
                        variants={{
                        hover: {
                          scaleX: 1,
                          opacity: 1
                        }
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      </motion.div>
                    </motion.div>
                    </SignInButton>
                </SignedOut>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}