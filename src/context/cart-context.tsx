
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-context';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { courses as allCourses, Course, CourseSegment } from '@/lib/courses-data';
import { useToast } from '@/hooks/use-toast';

export type CartItem = {
    courseId: string;
    segmentIds: Set<string>; // Set of segment IDs, 'full' if the whole course is added
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (courseId: string, segmentId?: string) => void;
  addBundleToCart: (bundle: { courseId: string; segmentIds: string[] }[]) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  loading: boolean;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  addBundleToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  loading: true,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const syncCart = (data: any) => {
      const cartData = data?.cartItems || [];
      const newCart = cartData.map((item: any) => ({
        courseId: item.courseId,
        segmentIds: new Set(item.segmentIds || []),
      }));
      setCart(newCart);
    };

    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const unsubscribe = onSnapshot(cartRef, (docSnap) => {
        syncCart(docSnap.data());
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      const localCart = localStorage.getItem('guestCart');
      syncCart(localCart ? JSON.parse(localCart) : { cartItems: [] });
      setLoading(false);
    }
  }, [user]);

  const updateCartInStorage = async (newCart: CartItem[]) => {
    const serializableCart = newCart.map(item => ({
        courseId: item.courseId,
        segmentIds: Array.from(item.segmentIds),
    }));

    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      await setDoc(cartRef, { cartItems: serializableCart }, { merge: true });
    } else {
      localStorage.setItem('guestCart', JSON.stringify({ cartItems: serializableCart }));
    }
    setCart(newCart); // Update state after storage operation
  };

  const addToCart = (courseId: string, segmentId?: string) => {
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;

    let newCart = [...cart];
    const existingCartItemIndex = newCart.findIndex(item => item.courseId === courseId);

    if (existingCartItemIndex > -1) {
      // Course is already in the cart, update its segments
      const existingItem = newCart[existingCartItemIndex];
      const updatedSegments = new Set(existingItem.segmentIds);

      if (segmentId) {
        if (updatedSegments.has(segmentId)) {
          toast({ variant: "destructive", title: "Already in Cart", description: `This topic is already in your cart.` });
          return;
        }
        updatedSegments.add(segmentId);
      } else { // Adding full course
        course.curriculum.forEach(seg => updatedSegments.add(seg.segmentId));
      }
      newCart[existingCartItemIndex] = { ...existingItem, segmentIds: updatedSegments };
    } else {
      // Course is not in the cart, add it
      const segmentIds = new Set<string>();
      if (segmentId) {
        segmentIds.add(segmentId);
      } else {
        course.curriculum.forEach(seg => segmentIds.add(seg.segmentId));
      }
      newCart.push({ courseId, segmentIds });
    }
    updateCartInStorage(newCart);
    toast({ title: "Added to Cart!", description: `${course.title} has been updated in your cart.` });
  };

  const addBundleToCart = (bundle: { courseId: string; segmentIds: string[] }[]) => {
    let newCart = [...cart];
    let itemsAdded = false;

    bundle.forEach(bundleItem => {
        const existingCartItemIndex = newCart.findIndex(item => item.courseId === bundleItem.courseId);
        if (existingCartItemIndex > -1) {
            // Merge segments
            const existingItem = newCart[existingCartItemIndex];
            const updatedSegments = new Set(existingItem.segmentIds);
            bundleItem.segmentIds.forEach(segId => updatedSegments.add(segId));
            newCart[existingCartItemIndex] = { ...existingItem, segmentIds: updatedSegments };
        } else {
            // Add new course
            newCart.push({ courseId: bundleItem.courseId, segmentIds: new Set(bundleItem.segmentIds) });
        }
        itemsAdded = true;
    });

    if(itemsAdded) {
        updateCartInStorage(newCart);
        toast({ title: "Bundle Added!", description: "Your personalized bundle has been added to your cart." });
    }
  };

  const removeFromCart = (courseId: string) => {
    const newCart = cart.filter(item => item.courseId !== courseId);
    updateCartInStorage(newCart);
  };

  const clearCart = () => {
    updateCartInStorage([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, addBundleToCart, removeFromCart, clearCart, loading }}>
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
