
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-context';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, onSnapshot, DocumentData } from 'firebase/firestore';
import type { Course } from '@/lib/courses-data';
import { useToast } from '@/hooks/use-toast';

type CartContextType = {
  cart: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  loading: boolean;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  loading: true,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const unsubscribe = onSnapshot(cartRef, (docSnap) => {
        if (docSnap.exists()) {
          const cartData = docSnap.data() as DocumentData;
          setCart(cartData.courses || []);
        } else {
          setCart([]);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Handle guest cart using localStorage
      const localCart = localStorage.getItem('guestCart');
      setCart(localCart ? JSON.parse(localCart) : []);
      setLoading(false);
    }
  }, [user]);

  const updateCartInFirestore = async (newCart: Course[]) => {
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      await setDoc(cartRef, { courses: newCart }, { merge: true });
    } else {
      localStorage.setItem('guestCart', JSON.stringify(newCart));
    }
  };

  const addToCart = (course: Course) => {
    const isAlreadyInCart = cart.some(item => item.id === course.id);
    if (isAlreadyInCart) {
      toast({
        variant: "destructive",
        title: "Already in Cart",
        description: `${course.title} is already in your cart.`,
      });
      return;
    }
    const newCart = [...cart, course];
    setCart(newCart);
    updateCartInFirestore(newCart);
     toast({
        title: "Added to Cart!",
        description: `${course.title} has been added to your cart.`,
      });
  };

  const removeFromCart = (courseId: string) => {
    const newCart = cart.filter(item => item.id !== courseId);
    setCart(newCart);
    updateCartInFirestore(newCart);
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
        const cartRef = doc(db, 'carts', user.uid);
        setDoc(cartRef, { courses: [] });
    } else {
        localStorage.removeItem('guestCart');
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
