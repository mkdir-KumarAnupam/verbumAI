"use client"; // Add this line at the top
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '../components/Navbar';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CollectionsPage() {
  const { user } = useUser();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Now this will work

  // Fetch collections from Firestore
  useEffect(() => {
    const fetchCollections = async () => {
      if (user) {
        setLoading(true);
        try {
          const q = query(collection(db, 'collections'), where('user_id', '==', user.id));
          const querySnapshot = await getDocs(q);
          const userCollections = [];
          querySnapshot.forEach((doc) => {
            userCollections.push({ id: doc.id, ...doc.data() });
          });
          setCollections(userCollections);
        } catch (error) {
          console.error('Error fetching collections:', error);
          alert('Failed to fetch collections. Please try again.');
        } finally {
          setLoading(false);
        }
      } else {
        alert('You must be logged in to view collections.');
      }
    };

    fetchCollections();
  }, [user]);

  // Handle view collection details
  const handleViewCollection = (collectionId) => {
    router.push(`/collections/${collectionId}`); // Navigate to collection details page
  };

  // Handle refresh collections
  const handleRefresh = async () => {
    if (user) {
      setLoading(true);
      try {
        const q = query(collection(db, 'collections'), where('user_id', '==', user.id));
        const querySnapshot = await getDocs(q);
        const userCollections = [];
        querySnapshot.forEach((doc) => {
          userCollections.push({ id: doc.id, ...doc.data() });
        });
        setCollections(userCollections);
      } catch (error) {
        console.error('Error fetching collections:', error);
        alert('Failed to fetch collections. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex items-center justify-center">
          <p className="text-white">Loading collections...</p>
        </div>
      </div>
    );
  }

  // Empty collections state
  if (collections.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center space-y-4">
          <p className="text-white">You have no collections yet. Create one!</p>
          <Link href="/create">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Create New Collection
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Your Collections
          </h1>
          <div className="flex items-center space-x-4">
            <Button onClick={handleRefresh} variant="outline" className="border-purple-500/20 bg-transparent text-white hover:bg-purple-500/10">
              Refresh Collections
            </Button>
            <Link href="/create">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Create New Collection
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          {collections.map((collection) => (
            <div key={collection.id} onClick={() => handleViewCollection(collection.id)}>
              <Card className="bg-black/50 border-purple-500/20 backdrop-blur-sm cursor-pointer hover:border-purple-500/40 transition-all duration-300">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white">{collection.collection_name}</h2>
                  <p className="text-gray-400">{collection.cards.length} cards</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}