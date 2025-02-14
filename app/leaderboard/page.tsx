'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Diamond, Trophy, Sparkles, Crown, Flame, Zap, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState('month');
  const [category, setCategory] = useState('overall');
  const [selectedUser, setSelectedUser] = useState(null);

  const leaderboardData = [
    {
      rank: 1,
      name: 'Rey Milbourne',
      title: 'Lead Developer at Verbum',
      avatar: '/avatars/rey.jpg',
      score: 155950,
      reward: 1000,
      streak: 15,
      badges: ['Polyglot', 'Speed Learner', 'Mentor'],
      languages: ['Spanish', 'French', 'German'],
      progress: 92,
    },
    {
      rank: 2,
      name: 'Sarah Chen',
      title: 'Senior AI Engineer',
      avatar: '/avatars/sarah.jpg',
      score: 47200,
      reward: 750,
      streak: 12,
      badges: ['Grammar Expert', 'Vocabulary Master'],
      languages: ['French', 'Italian'],
      progress: 85,
    },
    {
      rank: 3,
      name: 'Michael Park',
      title: 'ML Research Lead',
      avatar: '/avatars/michael.jpg',
      score: 32650,
      reward: 550,
      streak: 8,
      badges: ['Conversation Pro'],
      languages: ['Spanish', 'Portuguese'],
      progress: 78,
    },
    {
      rank: 4,
      name: 'Emma Wilson',
      title: 'NLP Specialist',
      avatar: '/avatars/emma.jpg',
      score: 29750,
      reward: 320,
      streak: 6,
      badges: ['Quick Learner'],
      languages: ['Spanish'],
      progress: 65,
    },
    {
      rank: 5,
      name: 'David Kumar',
      title: 'AI Research Engineer',
      avatar: '/avatars/david.jpg',
      score: 10950,
      reward: 10,
      streak: 3,
      badges: ['Beginner Pro'],
      languages: ['French'],
      progress: 45,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b bg-black">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-yellow-400 animate-pulse" />
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600">
                Leaderboard
              </h1>
            </div>
            <p className="text-gray-400 text-lg">Master your language journey, climb the ranks</p>
          </motion.div>

          {/* Filter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4 items-center"
          >
            <Badge 
              variant="outline" 
              className="bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer transform hover:scale-105"
            >
              <Diamond className="w-4 h-4 mr-2" /> Language Score
            </Badge>
            <Badge 
              variant="outline" 
              className="bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer transform hover:scale-105"
            >
              <Trophy className="w-4 h-4 mr-2" /> Achievements
            </Badge>
            <div className="ml-auto flex gap-4">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px] bg-black/60 border-purple-500/30 hover:border-purple-500/50 transition-colors">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-purple-500/30">
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px] bg-black/60 border-purple-500/30 hover:border-purple-500/50 transition-colors">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-purple-500/30">
                  <SelectItem value="overall">Overall</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Leaderboard Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-12 text-sm text-gray-400 pb-4 border-b border-purple-500/20">
                  <div className="col-span-1">PLACE</div>
                  <div className="col-span-5">CONTRIBUTOR</div>
                  <div className="col-span-3 text-right">SCORE</div>
                  <div className="col-span-3 text-right">REWARD</div>
                </div>
                
                <div className="space-y-4 mt-4">
                  {leaderboardData.map((user, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`
                        relative overflow-hidden
                        grid grid-cols-12 items-center group
                        hover:bg-purple-500/5 rounded-lg transition-all duration-300
                        cursor-pointer p-4 border border-transparent
                        hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]
                        ${selectedUser === index ? 'bg-purple-500/10 border-purple-500/40' : ''}
                      `}
                      onClick={() => setSelectedUser(selectedUser === index ? null : index)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="col-span-1 flex items-center">
                        {index === 0 && (
                          <div className="relative">
                            <Trophy className="w-6 h-6 text-yellow-400" />
                            <Sparkles className="w-3 h-3 absolute -right-1 -top-1 text-yellow-300 animate-pulse" />
                          </div>
                        )}
                        {index === 1 && <Trophy className="w-6 h-6 text-gray-400" />}
                        {index === 2 && <Trophy className="w-6 h-6 text-orange-400" />}
                        {index > 2 && <span className="text-gray-400 font-medium">{user.rank}</span>}
                        }
                      </div>
                      
                      <div className="col-span-5 flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12 ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          {user.streak > 10 && (
                            <div className="absolute -right-1 -bottom-1 bg-gradient-to-r from-orange-500 to-red-500 p-1 rounded-full">
                              <Flame className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white flex items-center gap-2">
                            {user.name}
                            {user.streak > 0 && (
                              <span className="text-orange-400 text-sm flex items-center">
                                <Flame className="w-4 h-4 mr-1" />
                                {user.streak} day streak
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-400">{user.title}</p>
                        </div>
                      </div>
                      
                      <div className="col-span-3 text-right">
                        <span className="text-blue-400 font-medium flex items-center justify-end gap-1 group-hover:scale-105 transition-transform">
                          {user.score.toLocaleString()}
                          <Diamond className="w-4 h-4" />
                        </span>
                      </div>
                      
                      <div className="col-span-3 text-right">
                        <span className="text-purple-400 font-medium flex items-center justify-end gap-1 group-hover:scale-105 transition-transform">
                          {user.reward}
                          <Diamond className="w-4 h-4" />
                        </span>
                      </div>

                      {/* Expanded Details */}
                      {selectedUser === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="col-span-12 mt-4 pt-4 border-t border-purple-500/20"
                        >
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-purple-400 font-medium mb-2 flex items-center gap-2">
                                <Star className="w-4 h-4" /> Badges
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {user.badges.map((badge, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="bg-purple-500/10 text-purple-300 border-purple-500/30"
                                  >
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-purple-400 font-medium mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Languages
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {user.languages.map((lang, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="bg-blue-500/10 text-blue-300 border-blue-500/30"
                                  >
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}