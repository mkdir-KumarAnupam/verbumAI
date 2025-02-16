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
import { Sparkles, Save, Languages, Brain, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { db } from '../config/firebase'; // Import Firebase Firestore
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { useUser } from '@clerk/nextjs'; // Import Clerk's useUser hook

// Custom Modal Component
const CollectionNameModal = ({ isOpen, onClose, onSubmit }) => {
  const [collectionName, setCollectionName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black/80 border border-purple-500/20 rounded-lg p-6 w-[400px]">
        <h2 className="text-xl font-bold text-white mb-4">Name Your Collection</h2>
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="Enter collection name"
          className="w-full p-2 bg-black/50 border border-purple-500/20 text-white rounded-md mb-4"
        />
        <div className="flex justify-end gap-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-purple-500/20 bg-transparent text-white hover:bg-purple-500/10"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit(collectionName);
              onClose();
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function CreatePage() {
  const [language, setLanguage] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [generatedCards, setGeneratedCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser(); // Get the user from Clerk

  const GEMINI_API_KEY = 'AIzaSyDsrKU2Z0HX1OGLR9zr-Ge79Bb_-loMAgU';

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

  const handleSaveAllCards = async (collectionName) => {
    if (!user) {
      alert('You must be logged in to save collections.');
      return;
    }

    if (generatedCards.length === 0) {
      alert('No cards to save.');
      return;
    }

    if (!collectionName) {
      alert('Collection name is required.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'collections'), {
        collection_name: collectionName,
        cards: generatedCards,
        created_at: new Date().toISOString(),
        user_id: user.id, // Save the user ID from Clerk
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
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="korean">Korean</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="russian">Russian</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
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
                      <SelectItem value="a1" className="text-white">
                        A1 - Beginner
                      </SelectItem>
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

          {generatedCards.length > 0 && (
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Generated Flashcards
                </h2>
                <Button
                  onClick={() => setIsModalOpen(true)}
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
                        flippedCards.has(index) ? 'scale-125' : ''
                      }`}
                    >
                      {/* Front of card */}
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <Card className="h-full bg-gradient-to-br from-purple-900/50 to-black border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                          <CardContent className="p-6 h-full flex flex-col">
                            <div className="flex-1 flex items-center justify-center">
                              <p className="text-xl font-medium text-white text-center">{card.back}</p>
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
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <Card className="h-full bg-gradient-to-br from-purple-400 to-purple-800 hover:scale-110 duration-300 ease-in">
                          <CardContent className="p-6 h-full flex flex-col">
                            <div className="flex-1 flex items-center justify-center">
                              <p className="text-xl font-medium text-white text-center transition-transform duration-500 ease-in-out transform group-hover:rotate-y-180 group-hover:scale-105  group-hover:hidden">
                                {card.front}
                              </p>
                              <p className="text-xl font-medium text-white text-center hidden group-hover:block transition-transform duration-500 ease-in-out transform group-hover:rotate-y-180 group-hover:scale-105  ">
                                {card.back}
                              </p>
                            </div>
                            <div className="mt-4 flex justify-center">
                              <Badge variant="outline" className="bg-pink-500/10 text-pink-300 border-pink-500/20">
                                <ArrowRight className="w-4 h-4 mr-1 " />
                                Hover to flip back
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

      <CollectionNameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveAllCards}
      />
    </div>
  );
}