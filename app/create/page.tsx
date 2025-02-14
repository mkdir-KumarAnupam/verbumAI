'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Save, Languages, Brain } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function CreatePage() {
  const [language, setLanguage] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [generatedCards, setGeneratedCards] = useState([
    { front: 'Good morning', back: 'शुभ प्रभात' },
    { front: 'How are you?', back: 'आप कैसे हैं?' },
    { front: 'Thank you very much', back: 'बहुत बहुत धन्यवाद' },
  ]);

  const handleGenerate = () => {
    console.log('Generating cards with:', { language, difficulty, additionalInfo });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 pt-32">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/20">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Generation
            </Badge>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Generate Flashcards
            </h1>
            <p className="text-gray-400">
              Create personalized flashcards using our AI-powered system
            </p>
          </div>

          <Card className="bg-black/50 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-8 space-y-8">
              <div className="grid gap-8">
                <div className="space-y-4">
                  <label className="text-lg font-medium text-white">Select Language</label>
                  <Select onValueChange={setLanguage} value={language}>
                    <SelectTrigger className="h-14 bg-black border-purple-500/20 text-white">
                      <SelectValue placeholder="Choose a language" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-purple-500/20">
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-medium text-white">Select Difficulty</label>
                  <Select onValueChange={setDifficulty} value={difficulty}>
                    <SelectTrigger className="h-14 bg-black border-purple-500/20 text-white">
                      <SelectValue placeholder="Choose difficulty level" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-purple-500/20">
                      <SelectItem value="a1">A1 - Beginner</SelectItem>
                      <SelectItem value="a2">A2 - Elementary</SelectItem>
                      <SelectItem value="b1">B1 - Intermediate</SelectItem>
                      <SelectItem value="b2">B2 - Upper Intermediate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-medium text-white">Additional Information</label>
                  <Textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="min-h-[120px] bg-black border-purple-500/20 text-white resize-none"
                    placeholder="Enter any additional info about your level or desired cards..."
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Flashcards
              </Button>
            </CardContent>
          </Card>

          {/* Generated Cards */}
          {generatedCards.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Generated Flashcards
                </h2>
                <Button
                  variant="outline"
                  className="border-purple-500/20 text-white hover:bg-purple-500/10"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save All Cards
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {generatedCards.map((card, index) => (
                  <div key={index} className="group perspective">
                    <div className="relative transform-style-3d transition-transform duration-500 w-full h-full group-hover:rotate-y-180">
                      <div className="absolute w-full h-full backface-hidden">
                        <Card className="h-full bg-black/50 border-purple-500/20 backdrop-blur-sm hover:bg-black/70 transition-all duration-300">
                          <CardContent className="p-6 flex items-center justify-center min-h-[200px]">
                            <p className="text-xl font-medium text-white text-center">{card.front}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="absolute w-full h-full backface-hidden rotate-y-180">
                        <Card className="h-full bg-black/50 border-purple-500/20 backdrop-blur-sm hover:bg-black/70 transition-all duration-300">
                          <CardContent className="p-6 flex items-center justify-center min-h-[200px]">
                            <p className="text-xl font-medium text-white text-center">{card.back}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}