'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Languages, Brain, BookOpen, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function FlashcardsPage() {
  const [cards] = useState([
    { front: 'Hello', back: 'नमस्ते', language: 'Hindi', difficulty: 'A1', category: 'Greetings' },
    { front: 'Good morning', back: 'शुभ प्रभात', language: 'Hindi', difficulty: 'A1', category: 'Greetings' },
    { front: 'Thank you', back: 'धन्यवाद', language: 'Hindi', difficulty: 'A1', category: 'Common Phrases' },
  ]);

  const [currentFilter, setCurrentFilter] = useState('all');

  return (
    <div className="min-h-screen bg-[#0F172A] py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/20">
            <BookOpen className="w-4 h-4 mr-2" />
            My Collection
          </Badge>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            My Flashcards
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Review and practice with your saved flashcards
          </p>
        </div>

        <Card className="border-purple-500/20 bg-[#1E293B]/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Flashcard Collection</CardTitle>
                <CardDescription>Filter and organize your flashcards</CardDescription>
              </div>
              <div className="flex gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-[#0F172A] border-purple-500/20">
                    <SelectValue placeholder="Filter by language" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] border-purple-500/20">
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-[#0F172A] border-purple-500/20">
                    <SelectValue placeholder="Filter by level" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] border-purple-500/20">
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="a1">A1 - Beginner</SelectItem>
                    <SelectItem value="a2">A2 - Elementary</SelectItem>
                    <SelectItem value="b1">B1 - Intermediate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start bg-[#0F172A] border border-purple-500/20 p-1">
                <TabsTrigger value="all" className="data-[state=active]:bg-purple-500/20">
                  All Cards
                </TabsTrigger>
                <TabsTrigger value="greetings" className="data-[state=active]:bg-purple-500/20">
                  Greetings
                </TabsTrigger>
                <TabsTrigger value="phrases" className="data-[state=active]:bg-purple-500/20">
                  Common Phrases
                </TabsTrigger>
                <TabsTrigger value="vocabulary" className="data-[state=active]:bg-purple-500/20">
                  Vocabulary
                </TabsTrigger>
              </TabsList>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {cards.map((card, index) => (
                  <div key={index} className="group perspective">
                    <div className="relative transform-style-3d transition-transform duration-500 w-full h-full group-hover:rotate-y-180">
                      <div className="absolute w-full h-full backface-hidden">
                        <Card className="h-full border-purple-500/20 bg-[#1E293B]/50 backdrop-blur-sm hover:bg-[#1E293B] transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex flex-col h-full">
                              <div className="flex justify-between items-start mb-6">
                                <Badge variant="outline" className="bg-purple-500/10 text-purple-300">
                                  {card.language}
                                </Badge>
                                <Badge variant="outline" className="bg-purple-500/10 text-purple-300">
                                  {card.difficulty}
                                </Badge>
                              </div>
                              <div className="flex-grow flex items-center justify-center">
                                <p className="text-xl font-medium text-white text-center">
                                  {card.front}
                                </p>
                              </div>
                              <div className="mt-6 text-sm text-gray-400 text-center">
                                Click to flip
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="absolute w-full h-full backface-hidden rotate-y-180">
                        <Card className="h-full border-purple-500/20 bg-[#1E293B]/50 backdrop-blur-sm hover:bg-[#1E293B] transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex flex-col h-full">
                              <div className="flex justify-between items-start mb-6">
                                <Badge variant="outline" className="bg-purple-500/10 text-purple-300">
                                  {card.category}
                                </Badge>
                              </div>
                              <div className="flex-grow flex items-center justify-center">
                                <p className="text-xl font-medium text-white text-center">
                                  {card.back}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}