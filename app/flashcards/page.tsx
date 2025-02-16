"use client";
import React, { useState } from 'react';
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
import { Sparkles, Save, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore
import { useAuthState } from 'react-firebase-hooks/auth'; // For user authentication
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // For Firestore operations

export default function CreatePage() {
  const [user] = useAuthState(auth); // Get the authenticated user
  const [language, setLanguage] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [generatedCards, setGeneratedCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Set());

  const GEMINI_API_KEY = 'AIzaSyDsrKU2Z0HX1OGLR9zr-Ge79Bb_-loMAgU';

  // Toggle card flip
  const toggleCard = (index) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Generate flashcards using Gemini API
  const handleGenerate = async () => {
    if (!language || !difficulty || !additionalInfo) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);

    const defaultPrompt = `You are a language learning flashcard creator, you have to create 10 flashcards based on given inputs.
The mode of communication is English, and user will specify target language they want to learn. 
Both front and back of flashcards can be either words, phrases or a sentence. Mention instruction before it.

You should respond in the following JSON format, adding your content into the values of front & back:
{
  "flashcards":[
    {
      "front": "front content",
      "back": "back content"
    }
  ]
}

User's input: I want to learn ${language} at ${difficulty} level. Additional info: ${additionalInfo}`;

    try {
      const result = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: defaultPrompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const geminiResponse = result.data.candidates[0].content.parts[0].text;
      const parsedResponse = JSON.parse(geminiResponse);
      setGeneratedCards(parsedResponse.flashcards);
    } catch (error) {
      console.error('Error fetching response from Gemini:', error);
      alert('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Save all cards to Firestore
  const handleSaveAllCards = async () => {
    if (generatedCards.length === 0) {
      alert('No cards to save.');
      return;
    }

    if (!user) {
      alert('You must be logged in to save cards.');
      return;
    }

    const collectionName = prompt('Enter a name for your collection:');
    if (!collectionName) {
      alert('Collection name is required.');
      return;
    }

    try {
      // Add the collection to Firestore
      await addDoc(collection(db, 'collections'), {
        userId: user.uid, // Link to the authenticated user
        collectionName: collectionName,
        cards: generatedCards,
        createdAt: serverTimestamp(), // Add a timestamp
      });

      alert('Cards saved successfully!');
    } catch (error) {
      console.error('Error saving cards:', error);
      alert('Failed to save cards. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="flex gap-8">
          {/* Left side - Form */}
          <div className="w-[400px] flex-shrink-0 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Generate Flashcards
              </h1>
              <p className="text-gray-400">
                Create personalized flashcards using our AI-powered system
              </p>
            </div>

            <Card className="bg-black/50 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <label className="text-lg font-medium text-white">Select Language</label>
                  <Select onValueChange={setLanguage} value={language}>
                    <SelectTrigger className="h-12 bg-black border-purple-500/20 text-white">
                      <SelectValue placeholder="Choose a language" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-purple-500/20 text-white">
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
                    <SelectTrigger className="h-12 bg-black border-purple-500/20 text-white">
                      <SelectValue placeholder="Choose difficulty level" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-purple-500/20 text-white">
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

                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <div className="flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                        Generating...
                      </div>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate Flashcards
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Cards */}
          {generatedCards.length > 0 && (
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Generated Flashcards
                </h2>
                <Button
                  onClick={handleSaveAllCards}
                  variant="outline"
                  className="border-purple-500/20 bg-transparent text-white hover:bg-purple-500/10 hover:text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save All Cards
                </Button>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
                {generatedCards.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => toggleCard(index)}
                    className="group cursor-pointer perspective h-[200px]"
                  >
                    <div
                      className={`relative transform-style-preserve-3d transition-all duration-500 h-full ${
                        flippedCards.has(index) ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* Front of card */}
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <Card className="h-full bg-gradient-to-br from-purple-900/50 to-black border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                          <CardContent className="p-6 h-full flex flex-col">
                            <div className="flex-1 flex items-center justify-center">
                              <p className="text-xl font-medium text-white text-center">{card.front}</p>
                            </div>
                            <div className="mt-4 flex justify-center">
                              <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/20">
                                <ArrowRight className="w-4 h-4 mr-1" />
                                Click to flip
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Back of card */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                        <Card className="h-full bg-gradient-to-br from-purple-400 to-purple-800">
                          <CardContent className="p-6 h-full flex flex-col">
                            <div className="flex-1 flex items-center justify-center">
                              <p className="text-xl font-medium text-white text-center">{card.back}</p>
                            </div>
                            <div className="mt-4 flex justify-center">
                              <Badge variant="outline" className="bg-pink-500/10 text-pink-300 border-pink-500/20">
                                <ArrowRight className="w-4 h-4 mr-1" />
                                Click to flip back
                              </Badge>
                            </div>
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